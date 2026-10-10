
import { useEffect, useState } from "react";
import "./App.css";
import PhotographyPage from "./pages/PhotographyPage";
import SiteHeader from "./SiteHeader";

// ========================================
// 画像の読み込み
// ========================================

// WORKS
import vrcImage1 from "./assets/images/VRChat紹介.png";
import vrcImage2 from "./assets/images/vrchat-introduction-card (1).png";
import vrcImage3 from "./assets/images/スクリーンショット 2026-08-13 005902.png";

// Illustration
import icon from "./assets/illustration/icon.jpg";
import hoshino from "./assets/illustration/ホシノ1.1.png";
import blueArchive from "./assets/illustration/ブルアカ写真集2finish.jpg";
import miku from "./assets/illustration/2026.8.31誕生日ミク.jpg";

// Other
import yachiyo from "./assets/images/ヤチヨ制服.png";
import xIcon from "./assets/content/new-2023-twitter-logo-x-icon-design_1017-45418.png";
import pixiv from "./assets/content/unnamed.png";
import marshmallow from "./assets/content/marshmallow.png";

// VRChat Photo
import vrcphoto1 from "./assets/VRCphoto/VRChat001.png";
import vrcphoto2 from "./assets/VRCphoto/VRChat002.png";
import vrcphoto3 from "./assets/VRCphoto/VRChat003.png";
import vrcphoto4 from "./assets/VRCphoto/VRChat004.png";
import vrcphoto5 from "./assets/VRCphoto/VRChat005.png";
import vrcphoto6 from "./assets/VRCphoto/VRChat006.png";

// ========================================
// 画像配列
// ========================================

const worksVrcImages = [
  vrcImage1,
  vrcImage2,
  vrcImage3,
];

const backgroundImages = [
  vrcphoto1,
  vrcphoto2,
  vrcphoto3,
  vrcphoto4,
  vrcphoto5,
  vrcphoto6,
];

// ========================================
// Home Page
// ========================================

function HomePage() {
  // 背景スライドショー
  const [backgroundIndex, setBackgroundIndex] = useState(() =>
    Math.floor(Math.random() * backgroundImages.length)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBackgroundIndex(
        (prev) => (prev + 1) % backgroundImages.length
      );
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  // イントロ画像
  const [introImage] = useState(
    () =>
      backgroundImages[
        Math.floor(Math.random() * backgroundImages.length)
      ]
  );

  // イントロの状態
  const [introActive, setIntroActive] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  // ========================================
  // スクロールロック
  // イントロ終了までページの移動を禁止
  // ========================================

  useEffect(() => {
    if (introFinished) return;

    const preventScroll = (event) => {
      event.preventDefault();
    };

    const preventKeyScroll = (event) => {
      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];

      if (scrollKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    // マウスホイール・タッチによるスクロールを防ぐ
    window.addEventListener("wheel", preventScroll, {
      passive: false,
    });

    window.addEventListener("touchmove", preventScroll, {
      passive: false,
    });

    // キーボードによるスクロールを防ぐ
    window.addEventListener("keydown", preventKeyScroll);

    // ブラウザの通常スクロールもロック
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    const previousBodyOverflow =
      document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);

      document.documentElement.style.overflow =
        previousHtmlOverflow;

      document.body.style.overflow = previousBodyOverflow;
    };
  }, [introFinished]);

  // ========================================
  // イントロ画像の読み込み完了後にアニメーション開始
  // ========================================

  useEffect(() => {
    let cancelled = false;
    let timer;
    let started = false;

    const image = new Image();

    const startIntro = () => {
      if (cancelled || started) return;

      started = true;
      setIntroActive(true);

      // アニメーションを約2.8秒間表示
      timer = window.setTimeout(() => {
        if (cancelled) return;

        setIntroActive(false);
        setIntroFinished(true);
      }, 2800);
    };

    image.onload = startIntro;

    // 読み込みに失敗した場合はスクロールを解放
    image.onerror = () => {
      if (cancelled) return;

      setIntroActive(false);
      setIntroFinished(true);
    };

    image.src = introImage;

    // すでに画像がキャッシュされている場合
    if (image.complete && image.naturalWidth > 0) {
      startIntro();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);

      image.onload = null;
      image.onerror = null;
    };
  }, [introImage]);

  // ========================================
  // 写真ページから指定されたセクションへ移動
  // ========================================

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");

    if (!section) return;

    // イントロが終わるまで移動を待つ
    if (!introFinished) return;

    const scrollToSection = () => {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const timer = window.setTimeout(scrollToSection, 100);

    window.history.replaceState(
      {},
      "",
      window.location.pathname
    );

    return () => window.clearTimeout(timer);
  }, [introFinished]);

  // ========================================
  // イラスト一覧
  // ========================================

  const illustrations = [
    {
      image: icon,
      title: "Illustration 01",
      link: null,
    },
    {
      image: hoshino,
      title: "Illustration 02",
      link:
        "https://x.com/cafe_ratte7art/status/2085241957291532516",
    },
    {
      image: blueArchive,
      title: "Illustration 03",
      link:
        "https://x.com/cafe_ratte7art/status/2099758913302499530/photo/1",
    },
    {
      image: miku,
      title: "Illustration 04",
      link:
        "https://x.com/cafe_ratte7art/status/2094120607990554934/photo/1",
    },
  ];

  return (
    <>
      {/* ========================================
          背景スライドショー
      ======================================== */}

      <div
        className="background-slideshow"
        aria-hidden="true"
      >
        {backgroundImages.map((image, index) => (
          <div
            key={`background-${index}`}
            className={`background-slide ${
              index === backgroundIndex ? "active" : ""
            }`}
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />
        ))}

        <div className="background-overlay" />
      </div>

      {/* ========================================
          イントロ
      ======================================== */}

      {introActive && (
        <div className="intro" aria-hidden="true">
          <div
            className="intro-photo intro-photo-top"
            style={{
              backgroundImage: `url("${introImage}")`,
            }}
          />

          <div
            className="intro-photo intro-photo-bottom"
            style={{
              backgroundImage: `url("${introImage}")`,
            }}
          />

          <div className="intro-title">
            <span>Ratte</span>
            <small>CREATIVE PORTFOLIO</small>
          </div>
        </div>
      )}

      {/* 共通ヘッダー */}
      <SiteHeader />

      <main>
        {/* ========================================
            HERO
        ======================================== */}

        <section className="hero" id="home">
          <div className="hero-content">
            <p className="hero-label">
              CREATOR PORTFOLIO
            </p>

            <h1>Ratte</h1>

            <p className="hero-text">
              Illustration / VRChat / 3D / Creative
            </p>
          </div>

          <div className="hero-scroll">SCROLL</div>
        </section>

        {/* ========================================
            ABOUT
        ======================================== */}

        <section className="about" id="about">
          <div className="about-content">
            <div className="about-title">
              <h3>AboutMe</h3>
              <p>CREATOR / RATTE</p>
            </div>

            <div className="about-profile">
              <div className="profile">
                <img
                  src={icon}
                  width="200"
                  alt="プロフィール画像"
                />

                <div className="social-links">
                  <a
                    href="https://x.com/cafe_ratte7art"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={xIcon} alt="X" />
                  </a>

                  <a
                    href="https://www.pixiv.net/users/128382196/illustrations"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pixiv} alt="pixiv" />
                  </a>

                  <a
                    href="https://marshmallow-qa.com/me"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={marshmallow}
                      alt="marshmallow"
                    />
                  </a>
                </div>
              </div>

              <div className="about-text">
                <p>
                  こんにちはratteです。
                  <br />
                  ここには私の今までのイラスト、3D作品、動画など
                  クリエイトしたものがあります。
                </p>

                <p>
                  キャラクターイラストから3D空間、VRChatなどの写真作品など、
                  自分が「楽しい」「面白い」「残したい」と
                  思ったことを形にして残しています。
                  今の目標はイラストと3DCGなどを
                  <br />
                  利用して1分の映像を作ることです。
                  <br />
                  <br />
                  使用しているアプリ
                  <br />
                  ClipStudio Live2D Blender Unity Aviutl VSCode
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            WORKS
        ======================================== */}

        <section className="works" id="works">
          <div className="section-heading">
            <p className="section-number">01 / WORKS</p>
            <h2>SelectedWorks</h2>
          </div>

          <div className="works-grid">
            <a href="#illustration" className="work-card">
              <div className="work-image">
                <img src={yachiyo} alt="Illustration" />
              </div>

              <div className="work-info">
                <h3>Illustration</h3>
                <p>CHARACTER / ARTWORK</p>
              </div>
            </a>

            <a href="#vrchat" className="work-card">
              <div className="work-image">
                <img src={worksVrcImages[0]} alt="VRChat" />
              </div>

              <div className="work-info">
                <h3>VRChat</h3>
                <p>WORLD / 3D</p>
              </div>
            </a>
          </div>
        </section>

        {/* ========================================
            PHOTOGRAPHY
        ======================================== */}

        <section className="works" id="photography">
          <div className="section-heading">
            <p className="section-number">
              02 / PHOTOGRAPHY
            </p>

            <h2>
              VRChat
              <br />
              Photography
            </h2>
          </div>

          <div className="works-grid">
            <a
              href={`${window.location.pathname}?route=photography`}
              className="work-card"
            >
              <div className="work-image">
                <img
                  src={worksVrcImages[1]}
                  alt="VRChat Photography"
                />
              </div>

              <div className="work-info">
                <h3>VRChat Photography ↗</h3>
                <p>PHOTOGRAPHY</p>
              </div>
            </a>
          </div>
        </section>

        {/* ========================================
            ILLUSTRATION
        ======================================== */}

        <section className="works" id="illustration">
          <div className="section-heading">
            <p className="section-number">
              03 / ILLUSTRATION
            </p>
            <h2>Illustration</h2>
          </div>

          {/* 1段目 */}
          <div className="works-slider">
            <div className="works-track">
              {[...illustrations, ...illustrations].map(
                (item, index) => {
                  const content = (
                    <>
                      <div className="work-image">
                        <img
                          src={item.image}
                          alt={item.title}
                        />
                      </div>

                      <div className="work-info">
                        <h3>{item.title}</h3>
                        <p>ILLUSTRATION</p>
                      </div>
                    </>
                  );

                  if (item.link) {
                    return (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-card"
                        key={`first-${index}`}
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div
                      className="work-card"
                      key={`first-${index}`}
                    >
                      {content}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* 2段目 */}
          <div className="works-slider works-slider-reverse">
            <div className="works-track">
              {[
                "05",
                "06",
                "07",
                "08",
                "05",
                "06",
                "07",
                "08",
              ].map((number, index) => (
                <div
                  className="work-card"
                  key={`second-${index}`}
                >
                  <div className="work-image empty-work-image" />

                  <div className="work-info">
                    <h3>Illustration {number}</h3>
                    <p>ILLUSTRATION</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================
            3D / VRCHAT
        ======================================== */}

        <section className="works" id="vrchat">
          <div className="section-heading">
            <p className="section-number">
              04 / 3D &amp; VRCHAT
            </p>
            <h2>3D / VRChat</h2>
          </div>

          <div className="works-grid">
            <div className="work-card">
              <div className="work-image">
                <img
                  src={worksVrcImages[2]}
                  alt="3D Works"
                />
              </div>

              <div className="work-info">
                <h3>3D Works</h3>
                <p>BLENDER / VRCHAT</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            CONTACT
        ======================================== */}

        <section className="contact" id="contact">
          <div className="contact-content">
            <p>SNSやお問い合わせはこちら。</p>

            <a
              href="https://x.com/cafe_ratte7art"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              CONTACT ↗
            </a>
          </div>
        </section>

        {/* ========================================
            FOOTER
        ======================================== */}

        <footer className="footer">
          <p>© 2026 RATTE / CREATIVE PORTFOLIO</p>
        </footer>
      </main>
    </>
  );
}

// ========================================
// ページ切り替え
// ========================================

function App() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("route") === "photography") {
    return <PhotographyPage />;
  }

  return <HomePage />;
}

export default App;
