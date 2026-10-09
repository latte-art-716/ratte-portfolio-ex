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

import photo1 from "../assets/Moments VRC 001/001.png";
import photo2 from "../assets/Moments VRC 001/002.png";
import photo3 from "../assets/Moments VRC 001/003.png";
import photo4 from "../assets/Moments VRC 001/004.png";
import photo5 from "../assets/Moments VRC 001/005.png";
import photo6 from "../assets/Moments VRC 001/006.png";
import photo7 from "../assets/Moments VRC 001/007.png";
import photo8 from "../assets/Moments VRC 002/008.png";
import photo9 from "../assets/Moments VRC 002/009.png";
import photo10 from "../assets/Moments VRC 002/010.png";
import photo11 from "../assets/Moments VRC 002/011.png";
import photo12 from "../assets/Moments VRC 002/012.png";

const backgroundImages = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
  photo10,
  photo11,
  photo12,
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
  }
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
        <a href="/" className="photography-home-link">
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
