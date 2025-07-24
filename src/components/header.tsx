import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header style={{ padding: 20, background: "#eee" }}>
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1>Tanstack Tech Demo</h1>
        </Link>
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/pokemon">Pokemon</Link>
          <Link to="/posts">Posts</Link>
        </div>
      </div>
    </header>
  );
}
