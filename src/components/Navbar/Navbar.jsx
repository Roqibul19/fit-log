"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span>🏋️</span>
        <strong>FITLOG</strong>
      </div>

      <div className="nav-links">
        <Link
          href="/"
          className={pathname === "/" ? "active" : ""}
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className={pathname === "/my-plan" ? "active" : ""}
        >
          My Plan
        </Link>
      </div>

      <div className="nav-stats">
        <span>
          Plan <b>0</b>
        </span>

        <span>
          Saved <b className="saved-badge">0</b>
        </span>
      </div>
    </nav>
  );
}