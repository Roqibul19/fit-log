import Link from "next/link";
import WorkoutCard from "../components/WorkoutCard/WorkoutCard";
import { getWorkouts } from "../lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <div className="container">

      {/* =========================
          HERO
      ========================= */}
      <section className="hero">

        <div className="hero-content">

          <span className="hero-eyebrow">
            WORKOUT LIBRARY
          </span>

          <h1>
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p>
            FitLog is a dark, no-nonsense gym companion:
            pick a lift, lock it into today&apos;s plan,
            and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="hero-button"
          >
            BROWSE WORKOUTS
            <span>→</span>
          </Link>

        </div>

        <div className="hero-image">

          <img
            src="/assets/banner.png"
            alt="FitLog Workout"
          />

        </div>

      </section>


      {/* =========================
          WORKOUT LIBRARY
      ========================= */}
      <section
        id="library"
        className="library"
      >

        <div className="library-heading">

          <span className="section-eyebrow">
            THE LIBRARY
          </span>

          <h2>
            WORKOUT LIBRARY
          </h2>

          <p>
            Twelve lifts covering every major muscle group.
          </p>

        </div>


        {/* WORKOUT CARDS */}
        <div className="workout-grid">

          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}

        </div>

      </section>

    </div>
  );
}