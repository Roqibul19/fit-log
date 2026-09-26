import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">

      <div className="not-found-number">
        404
      </div>

      <h1>PAGE NOT FOUND</h1>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <Link
        href="/"
        className="primary-button"
      >
        ← Back to workouts
      </Link>

    </main>
  );
}