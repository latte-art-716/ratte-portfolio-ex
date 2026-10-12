//【追加内容】
//- アルバム名：
//- 撮影日：
//- 説明文：
//- 写真ファイル名：
//- 表紙にする写真：
//- 写真の並び順：
//
//【ルール】
//- 既存のアルバムや写真は削除・変更しない
//- 新しいアルバムは一番上に表示する
//- 写真の並び順は指定した順番にする
//- 既存のデザインや機能は維持する
//- 必要な import 文も追加する
//- 変更後のコードは省略せず、ファイル単位で提示する
//- 不要な部分まで書き換えない
//=========================================
//import  from "../assets/Moments VRC/";
//=========================================
import { useEffect, useState } from "react";
import "./PhotographyPage.css";
import SiteHeader from "../SiteHeader";

// ========================================
// VRChat写真
// ========================================

import photo1 from "../assets/Album/Moments VRC 001/001.png";
import photo2 from "../assets/Album/Moments VRC 001/002.png";
import photo3 from "../assets/Album/Moments VRC 001/003.png";
import photo4 from "../assets/Album/Moments VRC 001/004.png";
import photo5 from "../assets/Album/Moments VRC 001/005.png";
import photo6 from "../assets/Album/Moments VRC 001/006.png";
import photo7 from "../assets/Album/Moments VRC 001/007.png";
//===========================================================
import photo8 from "../assets/Album/Moments VRC 002/008.png";
import photo9 from "../assets/Album/Moments VRC 002/009.png";
import photo10 from "../assets/Album/Moments VRC 002/010.png";
import photo11 from "../assets/Album/Moments VRC 002/011.png";
import photo12 from "../assets/Album/Moments VRC 002/012.png";
//============================================================
import photo13 from "../assets/Album/Moments VRC 003/013.png";
import photo14 from "../assets/Album/Moments VRC 003/014.png";
import photo15 from "../assets/Album/Moments VRC 003/015.png";
import photo16 from "../assets/Album/Moments VRC 003/016.png";
import photo17 from "../assets/Album/Moments VRC 003/017.png";
import photo18 from "../assets/Album/Moments VRC 003/018.png";
import photo19 from "../assets/Album/Moments VRC 003/019.png";
import photo20 from "../assets/Album/Moments VRC 003/020.png";
import photo21 from "../assets/Album/Moments VRC 003/021.png";
//============================================================
import photo22 from "../assets/Album/Moments VRC 004/022.png";
import photo23 from "../assets/Album/Moments VRC 004/023.png";
import photo24 from "../assets/Album/Moments VRC 004/024.png";
import photo25 from "../assets/Album/Moments VRC 004/025.png";
//============================================================
import photo26 from "../assets/Album/Moments VRC 005/026.png";
import photo27 from "../assets/Album/Moments VRC 005/027.png";
import photo28 from "../assets/Album/Moments VRC 005/028.png";
import photo29 from "../assets/Album/Moments VRC 005/029.png";
//============================================================
import photo30 from "../assets/Album/Moments VRC 006/030.png";
import photo31 from "../assets/Album/Moments VRC 006/031.png";
import photo32 from "../assets/Album/Moments VRC 006/032.png";
import photo33 from "../assets/Album/Moments VRC 006/033.png";
import photo34 from "../assets/Album/Moments VRC 006/034.png";
import photo35 from "../assets/Album/Moments VRC 006/035.png";
//============================================================
import photo36 from "../assets/Album/Moments VRC 007/036.png";
import photo37 from "../assets/Album/Moments VRC 007/037.png";
import photo38 from "../assets/Album/Moments VRC 007/038.png";
import photo39 from "../assets/Album/Moments VRC 007/039.png";
import photo40 from "../assets/Album/Moments VRC 007/040.png";


const backgroundImages = [
  photo1,
  photo2,
  photo3,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
  photo10,
  photo13,
  photo14,
  photo15,
  photo18,
  photo20,
  photo21,
  photo23,
  photo27,
  photo29,
  photo30,
  photo31,
  photo32,
  photo33,
  photo34,
];

// ========================================
// アルバム設定
// 新しいアルバムは配列の先頭に追加
// ========================================

const albums = [
  {
    id: "vrchat-001",
    title: "10/06の思い出",
    date: "2026-10-06",
    description: "Moments captured in virtual worlds.",
    cover: photo1,
    photos: [
      { src: photo1, alt: "VRChat Photo 001" },
      { src: photo2, alt: "VRChat Photo 002" },
      { src: photo3, alt: "VRChat Photo 003" },
      { src: photo4, alt: "VRChat Photo 004" },
      { src: photo5, alt: "VRChat Photo 005" },
      { src: photo6, alt: "VRChat Photo 006" },
      { src: photo7, alt: "VRChat Photo 007" },
    ],
  },

  {
    id: "vrchat-002",
    title: "10/07の思い出",
    date: "2026-10-07",
    description: "Moments captured in virtual worlds.",
    cover: photo8,
    photos: [
      { src: photo8, alt: "VRChat Photo 008" },
      { src: photo9, alt: "VRChat Photo 009" },
      { src: photo10, alt: "VRChat Photo 010" },
      { src: photo11, alt: "VRChat Photo 011" },
      { src: photo12, alt: "VRChat Photo 012" },
    ],
  },

  {
    id: "vrchat-003",
    title: "10/08の思い出",
    date: "2026-10-08",
    description: "Moments captured in virtual worlds.",
    cover: photo13,
    photos: [
      { src: photo13, alt: "VRChat Photo 013" },
      { src: photo14, alt: "VRChat Photo 014" },
      { src: photo15, alt: "VRChat Photo 015" },
      { src: photo16, alt: "VRChat Photo 016" },
      { src: photo17, alt: "VRChat Photo 017" },
      { src: photo18, alt: "VRChat Photo 018" },
      { src: photo19, alt: "VRChat Photo 019" },
      { src: photo20, alt: "VRChat Photo 020" },
      { src: photo21, alt: "VRChat Photo 021" },
    ],
  },

  {
    id: "vrchat-004",
    title: "10/09の思い出",
    date: "2026-10-09",
    description: "Moments captured in virtual worlds.",
    cover: photo22,
    photos: [
      { src: photo22, alt: "VRChat Photo 022" },
      { src: photo23, alt: "VRChat Photo 023" },
      { src: photo24, alt: "VRChat Photo 024" },
      { src: photo25, alt: "VRChat Photo 025" },
    ],
  },

  {
    id: "vrchat-005",
    title: "10/10の思い出",
    date: "2026-10-10",
    description: "Moments captured in virtual worlds.",
    cover: photo26,
    photos: [
      { src: photo26, alt: "VRChat Photo 026" },
      { src: photo27, alt: "VRChat Photo 027" },
      { src: photo28, alt: "VRChat Photo 028" },
      { src: photo29, alt: "VRChat Photo 029" },
    ],
  },

  {
    id: "vrchat-006",
    title: "10/11の思い出",
    date: "2026-10-11",
    description: "Moments captured in virtual worlds.",
    cover: photo31,
    photos: [
      { src: photo30, alt: "VRChat Photo 030" },
      { src: photo31, alt: "VRChat Photo 031" },
      { src: photo32, alt: "VRChat Photo 032" },
      { src: photo33, alt: "VRChat Photo 033" },
      { src: photo34, alt: "VRChat Photo 034" },
      { src: photo35, alt: "VRChat Photo 035" },
    ],
  },
  
  {
    id: "vrchat-007",
    title: "10/12の思い出",
    date: "2026-10-12",
    description: "Moments captured in virtual worlds.",
    cover: photo36,
    photos: [
      { src: photo36, alt: "VRChat Photo 036" },
      { src: photo37, alt: "VRChat Photo 037" },
      { src: photo38, alt: "VRChat Photo 038" },
      { src: photo39, alt: "VRChat Photo 039" },
      { src: photo40, alt: "VRChat Photo 040" },
    ],
  },

];

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
    Math.floor(Math.random() * backgroundImages.length)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBackgroundIndex(
        (previous) =>
          (previous + 1) % backgroundImages.length
      );
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  // アルバムと写真の選択
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // 新しい日付のアルバムを先頭に表示
  const sortedAlbums = [...albums].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  // ライトボックスの写真移動
  function changePhoto(direction) {
    if (!selectedAlbum || selectedPhoto === null) return;

    const photoCount = selectedAlbum.photos.length;

    if (photoCount === 0) return;

    setSelectedPhoto((current) => {
      if (current === null) return null;

      return (
        (current + direction + photoCount) % photoCount
      );
    });
  }

  // キーボード操作
  useEffect(() => {
    function handleKeyDown(event) {
      if (selectedPhoto === null) return;

      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedPhoto((current) => {
          if (current === null || !selectedAlbum) return current;

          const count = selectedAlbum.photos.length;
          return (current + 1) % count;
        });
      }

      if (event.key === "ArrowLeft") {
        setSelectedPhoto((current) => {
          if (current === null || !selectedAlbum) return current;

          const count = selectedAlbum.photos.length;
          return (current - 1 + count) % count;
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
    if (selectedPhoto === null) return;

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
      {/* ========================================
          背景スライドショー
      ======================================== */}

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

      {/* ========================================
          メインコンテンツ
      ======================================== */}

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

        {/* ========================================
            アルバム一覧
        ======================================== */}

        {!selectedAlbum && (
          <section
            className="photography-albums"
            aria-label="Photography albums"
          >
            {sortedAlbums.length === 0 ? (
              <p>アルバムはまだありません。</p>
            ) : (
              sortedAlbums.map((album, index) => (
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
        )}

        {/* ========================================
            アルバム詳細
        ======================================== */}

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

        {/* ========================================
            ライトボックス
        ======================================== */}

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
              {String(selectedAlbum.photos.length).padStart(
                2,
                "0"
              )}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
