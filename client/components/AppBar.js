import Link from "next/link";

export default function AppBar({ currentUser }) {
  const links = [
    !currentUser && { label: "Register", href: "/auth/register" },
    !currentUser && { label: "Login", href: "/auth/login" },
    currentUser && { label: "Logout", href: "/auth/logout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
        <Link href={href}>
          <a className="nav-link link-light">{label}</a>
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link href="/">
        <a className="navbar-brand ms-3">Frankfurt UAS Cloud Shop</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
}
