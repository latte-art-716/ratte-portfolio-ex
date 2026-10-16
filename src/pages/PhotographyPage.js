import { useEffect, useState } from "react";
import "./PhotographyPage.css";
import SiteHeader from "../SiteHeader";

// ========================================
// VRChat写真をフォルダから自動取得
// ========================================
//
// 新しいアルバムは、次のようなフォルダを作成してください。
//
// src/assets/Album/2026-10-15/001.png
// src/assets/Album/2026-10-15/002.png
//
// フォルダ名を YYYY-MM-DD にすると、年月・日付を自動認識します。

const albumImageContext = require.context(
  "../assets/Album",
  true,
  /\.(png|jpe?g|webp)$/i
);

const allAlbumImages = albumImageContext.keys().map((path) => {
  const parts = path.split("/");

  return {
    path,
    folder: parts[1],
    filename: parts.slice(2).join("/"),
    src: albumImageContext(path),
  };
});

// ========================================
// 既存アルバムの日付・表紙設定
// ========================================

const legacyAlbumInfo = {
  "Moments VRC 001": { date: "2026-10-06" },
  "Moments VRC 002": { date: "2026-10-07" },
  "Moments VRC 003": { date: "2026-10-08" },
  "Moments VRC 004": { date: "2026-10-09" },
  "Moments VRC 005": { date: "2026-10-10" },
  "Moments VRC 006": {
    date: "2026-10-11",
    cover: "031.png",
  },
  "Moments VRC 007": { date: "2026-10-12" },
  "Moments VRC 008": { date: "2026-10-13" },
  "Moments VRC 009": { date: "2026-10-14" },
};

// ========================================
// 背景スライドショーに使う写真
// ========================================

const backgroundImageFiles = [
  ["Moments VRC 001", "001.png"],
  ["Moments VRC 001", "002.png"],
  ["Moments VRC 001", "003.png"],
  ["Moments VRC 001", "005.png"],
  ["Moments VRC 001", "006.png"],
  ["Moments VRC 001", "007.png"],
  ["Moments VRC 002", "008.png"],
  ["Moments VRC 002", "009.png"],
  ["Moments VRC 002", "010.png"],
  ["Moments VRC 003", "013.png"],
  ["Moments VRC 003", "014.png"],
  ["Moments VRC 003", "015.png"],
  ["Moments VRC 003", "018.png"],
  ["Moments VRC 003", "020.png"],
  ["Moments VRC 003", "021.png"],
  ["Moments VRC 004", "023.png"],
  ["Moments VRC 005", "027.png"],
  ["Moments VRC 005", "029.png"],
  ["Moments VRC 006", "030.png"],
  ["Moments VRC 006", "031.png"],
  ["Moments VRC 006", "032.png"],
  ["Moments VRC 006", "033.png"],
  ["Moments VRC 006", "034.png"],
];

const backgroundImages = backgroundImageFiles
  .map(([folder, filename]) =>
    allAlbumImages.find(
      (image) =>
        image.folder === folder && image.filename === filename
    )?.src
  )
  .filter(Boolean);

// ========================================
// アルバムをフォルダから自動生成
// ========================================

const albumFolders = [
  ...new Set(allAlbumImages.map((image) => image.folder)),
];

const albums = albumFolders
  .map((folder) => {
    const folderImages = allAlbumImages
      .filter((image) => image.folder === folder)
      .sort((a, b) =>
        a.filename.localeCompare(b.filename, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );

    const legacyInfo = legacyAlbumInfo[folder];

    // YYYY-MM-DD 形式のフォルダ名を認識
    const dateFromFolder = /^\d{4}-\d{2}-\d{2}$/.test(folder)
      ? folder
      : null;

    const date = legacyInfo?.date || dateFromFolder;

    // 日付が判定できないフォルダはアルバム一覧に表示しない
    if (!date || folderImages.length === 0) {
      return null;
    }

    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!match) {
      return null;
    }

    const [, , month, day] = match;
    const title = `${Number(month)}/${Number(day)}の思い出`;

    // 既存アルバムに表紙指定があればそれを使用
    // 新しいアルバムは、ファイル名順で最初の写真を表紙にする
    const coverImage =
      folderImages.find(
        (image) => image.filename === legacyInfo?.cover
      ) || folderImages[0];

    return {
      id: `album-${folder}`,
      folder,
      title,
      date,
      description: "Moments captured in virtual worlds.",
      cover: coverImage.src,
      photos: folderImages.map((image) => {
        const number = image.filename.match(/\d+/)?.[0];

        return {
          src: image.src,
          alt: `VRChat Photo ${number || image.filename}`,
        };
      }),
    };
  })
  .filter(Boolean);

// ========================================
// アルバムの並び順・年月一覧
// ========================================

// 新しい日付のアルバムを先頭に並べる
const sortedAlbums = [...albums].sort((a, b) =>
  b.date.localeCompare(a.date)
);

// アルバムに存在する年月を重複なしで取得し、新しい順に並べる
const availableMonths = [
  ...new Set(sortedAlbums.map((album) => album.date.slice(0, 7))),
].sort((a, b) => b.localeCompare(a));

// プルダウンに表示する年月
function formatMonth(month) {
  const [year, monthNumber] = month.split("-");
  return `${year}年${Number(monthNumber)}月`;
}

// ========================================
// 日付表示
// ========================================

function formatDate(date) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", ".");
}

// ========================================
// Photography Page
// ========================================

export default function PhotographyPage() {
  // 背景スライドショー
  const [backgroundIndex, setBackgroundIndex] = useState(() =>
    backgroundImages.length > 0
      ? Math.floor(Math.random() * backgroundImages.length)
      : 0
  );

  useEffect(() => {
    if (backgroundImages.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setBackgroundIndex(
        (previous) => (previous + 1) % backgroundImages.length
      );
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  // アルバムと写真の選択
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // 年月フィルター。初期表示は最新の年月
  const [selectedMonth, setSelectedMonth] = useState(
    () => availableMonths[0] || ""
  );

  // 選択中の年月に合うアルバムだけを表示
  const filteredAlbums = selectedMonth
    ? sortedAlbums.filter((album) =>
        album.date.startsWith(selectedMonth)
      )
    : sortedAlbums;

  // ライトボックスの写真移動
  function changePhoto(direction) {
    if (!selectedAlbum || selectedPhoto === null) {
      return;
    }

    const photoCount = selectedAlbum.photos.length;

    if (photoCount === 0) {
      return;
    }

    setSelectedPhoto((current) => {
      if (current === null) {
        return null;
      }

      return (current + direction + photoCount) % photoCount;
    });
  }

  // キーボード操作
  useEffect(() => {
    function handleKeyDown(event) {
      if (selectedPhoto === null) {
        return;
      }

      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedPhoto((current) => {
          if (current === null || !selectedAlbum) {
            return current;
          }

          const count = selectedAlbum.photos.length;

          return count > 0 ? (current + 1) % count : current;
        });
      }

      if (event.key === "ArrowLeft") {
        setSelectedPhoto((current) => {
          if (current === null || !selectedAlbum) {
            return current;
          }

          const count = selectedAlbum.photos.length;

          return count > 0
            ? (current - 1 + count) % count
            : current;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto, selectedAlbum]);

  // ライトボックス表示中は背景スクロールを止める
  useEffect(() => {
    if (selectedPhoto === null) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  // アルバム一覧に戻る
  function backToAlbums() {
    setSelectedPhoto(null);
    setSelectedAlbum(null);
  }

  return (
    <div className="photography-intro">
      {/* 背景スライドショー */}
      <div
        className="photography-background"
        aria-hidden="true"
      >
        {backgroundImages.map((image, index) => (
          <div
            key={`photo-background-${index}`}
            className={`photography-background-slide ${
              index === backgroundIndex ? "active" : ""
            }`}
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />
        ))}

        <div className="photography-background-overlay" />
      </div>

      {/* 共通ヘッダー */}
      <SiteHeader isPhotography />

      {/* メインコンテンツ */}
      <main className="photography-page">
        <a
          href={process.env.PUBLIC_URL + "/"}
          className="photography-home-link"
        >
          ← HOME
        </a>

        {/* ページタイトル */}
        <header className="photography-heading">
          <p className="photography-eyebrow">
            CREATIVE WORKS / PHOTOGRAPHY
          </p>

          <h1>Photography</h1>

          <p className="photography-subtitle">
            Moments captured in virtual worlds.
          </p>
        </header>

        {/* アルバム一覧 */}
        {!selectedAlbum && (
          <>
            {/* 年月フィルター */}
            <div className="photography-filter">
              <label
                className="photography-filter-label"
                htmlFor="photography-month"
              >
                SELECT MONTH
              </label>

              <div className="photography-filter-control">
                <select
                  id="photography-month"
                  className="photography-month-select"
                  value={selectedMonth}
                  onChange={(event) =>
                    setSelectedMonth(event.target.value)
                  }
                  aria-label="表示するアルバムの年月"
                >
                  <option value="">すべての月</option>

                  {availableMonths.map((month) => (
                    <option key={month} value={month}>
                      {formatMonth(month)}
                    </option>
                  ))}
                </select>

                <span
                  className="photography-filter-chevron"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </div>

              <p className="photography-filter-count">
                {filteredAlbums.length}{" "}
                {filteredAlbums.length === 1 ? "ALBUM" : "ALBUMS"}
              </p>
            </div>

            <section
              className="photography-albums"
              aria-label="Photography albums"
            >
              {filteredAlbums.length === 0 ? (
                <p className="photography-empty">
                  この月のアルバムはまだありません。
                </p>
              ) : (
                filteredAlbums.map((album, index) => (
                  <button
                    type="button"
                    key={album.id}
                    className="photography-album-card"
                    style={{
                      "--album-index": index,
                    }}
                    onClick={() => setSelectedAlbum(album)}
                  >
                    <div className="photography-cover">
                      <img
                        src={album.cover}
                        alt={`${album.title} cover`}
                        loading="lazy"
                      />
                    </div>

                    <p className="photography-date">
                      {formatDate(album.date)}
                    </p>

                    <h2>{album.title}</h2>

                    <p className="photography-description">
                      {album.description}
                    </p>

                    <span className="photography-count">
                      {String(album.photos.length).padStart(2, "0")}{" "}
                      PHOTOS
                    </span>
                  </button>
                ))
              )}
            </section>
          </>
        )}

        {/* アルバム詳細 */}
        {selectedAlbum && (
          <section
            className="photography-detail"
            key={selectedAlbum.id}
          >
            <button
              type="button"
              className="photography-back"
              onClick={backToAlbums}
            >
              <span aria-hidden="true">←</span>
              <span>BACK TO ALBUMS</span>
            </button>

            <header className="photography-detail-heading">
              <p className="photography-eyebrow">
                PHOTOGRAPHY ALBUM
              </p>

              <h2>{selectedAlbum.title}</h2>

              <p className="photography-subtitle">
                {formatDate(selectedAlbum.date)}
              </p>

              <p className="photography-description">
                {selectedAlbum.description}
              </p>
            </header>

            {/* 写真一覧 */}
            <div className="photography-gallery">
              {selectedAlbum.photos.map((photo, index) => (
                <button
                  type="button"
                  className="photography-photo-card"
                  key={`${selectedAlbum.id}-${index}`}
                  onClick={() => setSelectedPhoto(index)}
                  aria-label={`${photo.alt} を拡大表示`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ライトボックス */}
        {selectedPhoto !== null && selectedAlbum && (
          <div
            className="photography-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="写真の拡大表示"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedPhoto(null);
              }
            }}
          >
            {/* 閉じる */}
            <button
              type="button"
              className="photography-lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="閉じる"
            >
              ×
            </button>

            {/* 前の写真 */}
            {selectedAlbum.photos.length > 1 && (
              <button
                type="button"
                className="photography-lightbox-arrow prev"
                onClick={() => changePhoto(-1)}
                aria-label="前の写真"
              >
                ‹
              </button>
            )}

            {/* 拡大写真 */}
            <img
              className="photography-lightbox-image"
              src={selectedAlbum.photos[selectedPhoto].src}
              alt={selectedAlbum.photos[selectedPhoto].alt}
            />

            {/* 次の写真 */}
            {selectedAlbum.photos.length > 1 && (
              <button
                type="button"
                className="photography-lightbox-arrow next"
                onClick={() => changePhoto(1)}
                aria-label="次の写真"
              >
                ›
              </button>
            )}

            {/* 写真番号 */}
            <p className="photography-lightbox-counter">
              {String(selectedPhoto + 1).padStart(2, "0")}
              {" / "}
              {String(selectedAlbum.photos.length).padStart(2, "0")}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}