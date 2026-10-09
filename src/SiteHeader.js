import { useEffect, useState } from "react";

export default function SiteHeader({ isPhotography = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 700) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const homeLink = (section) =>
    isPhotography ? `/?section=${section}` : `#${section}`;

  const photographyLink = `${window.location.pathname}?route=photography`;

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            type="button"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <a
            href={isPhotography ? "/" : "#home"}
            className="logo"
            onClick={() => setMenuOpen(false)}
          >
            Top
          </a>
        </div>
      </header>

      <nav
        className={`nav ${menuOpen ? "active" : ""}`}
        id="navigation"
        aria-hidden={!menuOpen}
      >
        <a href={homeLink("home")} onClick={() => setMenuOpen(false)}>
          HOME
        </a>

        <a href={homeLink("about")} onClick={() => setMenuOpen(false)}>
          ABOUT
        </a>

        <a href={homeLink("works")} onClick={() => setMenuOpen(false)}>
          WORKS
        </a>

        <a href={photographyLink} onClick={() => setMenuOpen(false)}>
          PHOTOGRAPHY
        </a>

        <a
          href={homeLink("illustration")}
          onClick={() => setMenuOpen(false)}
        >
          ILLUSTRATION
        </a>

        <a href={homeLink("vrchat")} onClick={() => setMenuOpen(false)}>
          3D / VRCHAT
        </a>

        <a href={homeLink("contact")} onClick={() => setMenuOpen(false)}>
          CONTACT
        </a>
      </nav>
    </>
  );
}