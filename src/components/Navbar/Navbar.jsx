"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../../app/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = usePlan();

  return (
    <nav className="navbar">

      {/* Logo */}
<Link
  href="/"
  className="nav-logo"
  aria-label="FitLog Home"
>
  <img
    src="/assets/logo.png"
    alt="FITLOG"
  />

  <strong>FITLOG</strong>
</Link>

      {/* Navigation Links */}
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

      {/* Plan / Saved */}
      <div className="nav-stats">

        <Link
          href="/my-plan"
          className="plan-badge"
        >
          Plan <b>{plan.length}</b>
        </Link>

        <Link
          href="/my-plan"
          className="saved-badge"
        >
          Saved <b>{saved.length}</b>
        </Link>

      </div>

    </nav>
  );
}