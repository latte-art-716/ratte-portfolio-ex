import { useEffect, useState } from "react";
import "./App.css";

/* ========================================
   画像の読み込み
   ※ import はすべてファイルの先頭にまとめる
======================================== */

/* VRChat / WORKS */
import vrcImage1 from "./assets/images/VRChat紹介.png";
import vrcImage2 from "./assets/images/vrchat-introduction-card (1).png";
import vrcImage3 from "./assets/images/スクリーンショット 2026-08-13 005902.png";

/* Illustration */
import icon from "./assets/illustration/icon.jpg";
import hoshino from "./assets/illustration/ホシノ1.1.png";
import blueArchive from "./assets/illustration/ブルアカ写真集2finish.jpg";
import miku from "./assets/illustration/2026.8.31誕生日ミク.jpg";

/* Other */
import yachiyo from "./assets/images/ヤチヨ制服.png";
import xIcon from "./assets/content/new-2023-twitter-logo-x-icon-design_1017-45418.png";

/* VRC Photo */
import vrcphoto1 from "./assets/VRCphoto/VRChat001.png"
import vrcphoto2 from "./assets/VRCphoto/VRChat002.png"
import vrcphoto3 from "./assets/VRCphoto/VRChat003.png"
import vrcphoto4 from "./assets/VRCphoto/VRChat004.png"
import vrcphoto5 from "./assets/VRCphoto/VRChat005.png"
import vrcphoto6 from "./assets/VRCphoto/VRChat006.png"


/* ========================================
   WORKS 用画像
   ※ WORKS側はこちらを使用
======================================== */

const worksVrcImages = [
  vrcImage1,
  vrcImage2,
  vrcImage3,
];


/* ========================================
   INTRO / BACKGROUND 用画像
   ※ INTROと背景はこちらを使用
   ※ 将来、背景だけ変更したい場合は
      この配列だけ変更すればOK
======================================== */

const backgroundImages = [
  vrcphoto1,
  vrcphoto2,
  vrcphoto3,
  vrcphoto4,
  vrcphoto5,
  vrcphoto6,
];


function App() {

  /* ========================================
     MENU
  ======================================== */

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };


  /* ========================================
     BACKGROUND SLIDESHOW
  ======================================== */

  const [backgroundIndex, setBackgroundIndex] = useState(() => {
    return Math.floor(
      Math.random() * backgroundImages.length
    );
  });

  useEffect(() => {

    const timer = setInterval(() => {

      setBackgroundIndex((prev) => {
        return (
          (prev + 1) %
          backgroundImages.length
        );
      });

    }, 7000);

    return () => {
      clearInterval(timer);
    };

  }, []);


  /* ========================================
     INTRO
  ======================================== */

  const [introImage] = useState(() => {

    return backgroundImages[
      Math.floor(
        Math.random() *
        backgroundImages.length
      )
    ];

  });

  const [introActive, setIntroActive] =
    useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      setIntroActive(false);

    }, 2800);

    return () => {

      clearTimeout(timer);

    };

  }, []);


  /* ========================================
     MENU EVENTS
  ======================================== */

  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    };

    const handleResize = () => {

      if (window.innerWidth > 700) {
        closeMenu();
      }

    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

    };

  }, []);


  /* ========================================
     ILLUSTRATIONS
  ======================================== */

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


  /* ========================================
     RENDER
  ======================================== */

  return (
    <>

      {/* ========================================
          BACKGROUND SLIDESHOW
      ======================================== */}

      <div
        className="background-slideshow"
        aria-hidden="true"
      >

        {backgroundImages.map(
          (image, index) => (

            <div
              key={`background-${index}`}
              className={
                `background-slide ${
                  index === backgroundIndex
                    ? "active"
                    : ""
                }`
              }
              style={{
                backgroundImage:
                  `url("${image}")`,
              }}
            />

          )
        )}

        <div className="background-overlay" />

      </div>


      {/* ========================================
          INTRO
      ======================================== */}

      {introActive && (

        <div
          className="intro"
          aria-hidden="true"
        >

          <div
            className="intro-photo intro-photo-top"
            style={{
              backgroundImage:
                `url("${introImage}")`,
            }}
          />

          <div
            className="intro-photo intro-photo-bottom"
            style={{
              backgroundImage:
                `url("${introImage}")`,
            }}
          />

          <div className="intro-title">

            <span>
              Ratte
            </span>

            <small>
              CREATIVE PORTFOLIO
            </small>

          </div>

        </div>

      )}


      {/* ========================================
          HEADER
      ======================================== */}

      <header className="header">

        <div className="header-inner">

          <button
            className={
              `hamburger ${
                menuOpen
                  ? "active"
                  : ""
              }`
            }
            type="button"
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={toggleMenu}
          >

            <span></span>
            <span></span>
            <span></span>

          </button>


          <a
            href="#home"
            className="logo"
            onClick={closeMenu}
          >
            Top
          </a>

        </div>

      </header>


      {/* ========================================
          NAVIGATION
      ======================================== */}

      <nav
        className={
          `nav ${
            menuOpen
              ? "active"
              : ""
          }`
        }
        id="navigation"
        aria-hidden={!menuOpen}
      >

        <a
          href="#home"
          onClick={closeMenu}
        >
          HOME
        </a>

        <a
          href="#about"
          onClick={closeMenu}
        >
          ABOUT
        </a>

        <a
          href="#works"
          onClick={closeMenu}
        >
          WORKS
        </a>

        <a
          href="#photography"
          onClick={closeMenu}
        >
          PHOTOGRAPHY
        </a>

        <a
          href="#illustration"
          onClick={closeMenu}
        >
          ILLUSTRATION
        </a>

        <a
          href="#vrchat"
          onClick={closeMenu}
        >
          3D / VRCHAT
        </a>

        <a
          href="#contact"
          onClick={closeMenu}
        >
          CONTACT
        </a>

      </nav>


      {/* ========================================
          MAIN
      ======================================== */}

      <main>


        {/* ========================================
            HERO
        ======================================== */}

        <section
          className="hero"
          id="home"
        >

          <div className="hero-content">

            <p className="hero-label">
              CREATOR PORTFOLIO
            </p>

            <h1>
              Ratte
            </h1>

            <p className="hero-text">
              Illustration / VRChat / 3D / Creative
            </p>

          </div>

          <div className="hero-scroll">
            SCROLL
          </div>

        </section>


        {/* ========================================
            ABOUT
        ======================================== */}

        <section
          className="about"
          id="about"
        >

          <div className="about-content">

            <div className="about-title">

              <h3>
                AboutMe
              </h3>

              <p>
                CREATOR / RATTE
              </p>

            </div>


            <div className="about-profile">

              <div className="profile">

                <img
                  src={icon}
                  width="200"
                  alt="プロフィール画像"
                />

                <a
                  href="https://x.com/cafe_ratte7art"
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <img
                    src={xIcon}
                    width="40"
                    alt="X"
                  />

                </a>

              </div>


              <div className="about-text">

                <p>
                  こんにちはratteです。<br />
                  ここには私の今までのイラスト、3D作品、動画などクリエイトしたものがあります。
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

        <section
          className="works"
          id="works"
        >

          <div className="section-heading">

            <p className="section-number">
              01 / WORKS
            </p>

            <h2>
              SelectedWorks
            </h2>

          </div>


          <div className="works-grid">

            <a
              href="#illustration"
              className="work-card"
            >

              <div className="work-image">

                <img
                  src={yachiyo}
                  alt="Illustration"
                />

              </div>

              <div className="work-info">

                <h3>
                  Illustration
                </h3>

                <p>
                  CHARACTER / ARTWORK
                </p>

              </div>

            </a>


            <a
              href="#vrchat"
              className="work-card"
            >

              <div className="work-image">

                <img
                  src={worksVrcImages[0]}
                  alt="VRChat"
                />

              </div>

              <div className="work-info">

                <h3>
                  VRChat
                </h3>

                <p>
                  WORLD / 3D
                </p>

              </div>

            </a>

          </div>

        </section>


        {/* ========================================
            PHOTOGRAPHY
        ======================================== */}

        <section
          className="works"
          id="photography"
        >

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

            <div className="work-card">

              <div className="work-image">

                <img
                  src={worksVrcImages[1]}
                  alt="VRChat Photography"
                />

              </div>

              <div className="work-info">

                <h3>
                  VRChat Photography
                </h3>

                <p>
                  PHOTOGRAPHY
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ========================================
            ILLUSTRATION
        ======================================== */}

        <section
          className="works"
          id="illustration"
        >

          <div className="section-heading">

            <p className="section-number">
              03 / ILLUSTRATION
            </p>

            <h2>
              Illustration
            </h2>

          </div>


          {/* 1段目 */}

          <div className="works-slider">

            <div className="works-track">

              {[
                ...illustrations,
                ...illustrations,
              ].map((item, index) => {

                if (item.link) {

                  return (

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-card"
                      key={`first-${index}`}
                    >

                      <div className="work-image">

                        <img
                          src={item.image}
                          alt={item.title}
                        />

                      </div>

                      <div className="work-info">

                        <h3>
                          {item.title}
                        </h3>

                        <p>
                          ILLUSTRATION
                        </p>

                      </div>

                    </a>

                  );

                }


                return (

                  <div
                    className="work-card"
                    key={`first-${index}`}
                  >

                    <div className="work-image">

                      <img
                        src={item.image}
                        alt={item.title}
                      />

                    </div>

                    <div className="work-info">

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        ILLUSTRATION
                      </p>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>


          {/* 2段目 */}

          <div
            className={
              "works-slider works-slider-reverse"
            }
          >

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

                  <div
                    className={
                      "work-image empty-work-image"
                    }
                  />

                  <div className="work-info">

                    <h3>
                      Illustration {number}
                    </h3>

                    <p>
                      ILLUSTRATION
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ========================================
            3D / VRCHAT
        ======================================== */}

        <section
          className="works"
          id="vrchat"
        >

          <div className="section-heading">

            <p className="section-number">
              04 / 3D & VRCHAT
            </p>

            <h2>
              3D / VRChat
            </h2>

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

                <h3>
                  3D Works
                </h3>

                <p>
                  BLENDER / VRCHAT
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ========================================
            CONTACT
        ======================================== */}

        <section
          className="contact"
          id="contact"
        >

          <div className="contact-content">

            <p>
              SNSやお問い合わせはこちら。
            </p>

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

          <p>
            © 2026 RATTE / CREATIVE PORTFOLIO
          </p>

        </footer>

      </main>

    </>
  );
}

export default App;