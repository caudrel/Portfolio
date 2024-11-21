import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="main-menu">
        {/* <h1>
          <Link href="/" className="button logo link-button">
            <span className="mobile-short-label">nom court mobile</span>
            <span className="desktop-long-label text-xl">full name desktop</span>
          </Link>
        </h1> */}
      </div>
      <nav className="flex pl-2 h-[54px]"></nav>
    </header>
  );
}
