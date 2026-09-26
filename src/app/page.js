"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WorkoutCard from "@/components/WorkoutCard/WorkoutCard";
import { getWorkouts } from "@/lib/api";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load workouts.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  // Sort workouts
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration) - Number(b.duration);
    }

    if (sortBy === "calories") {
      return (
        Number(b.caloriesBurned) -
        Number(a.caloriesBurned)
      );
    }

    if (sortBy === "rating") {
      return (
        Number(b.rating) -
        Number(a.rating)
      );
    }

    return 0;
  });

  return (
    <>
      <Navbar />

      <main className="container">

        {/* =========================
            HERO
        ========================= */}
        <section className="hero">

          <div className="hero-content">

            <p className="eyebrow">
              WORKOUT LIBRARY
            </p>

            <h1>
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="hero-text">
              FitLog is a dark, no-nonsense gym companion:
              pick a lift, lock it into today's plan, and watch
              the week's work add up.
            </p>

            <Link
              href="#library"
              className="primary-btn"
            >
              BROWSE WORKOUTS
            </Link>

          </div>

          <div className="hero-image">

            <img
              src="/assets/banner.png"
              alt="Workout"
            />

          </div>

        </section>


        {/* =========================
            LIBRARY
        ========================= */}
        <section
          id="library"
          className="library"
        >

          <div className="section-heading">

            <div>
              <h2>THE LIBRARY</h2>

              <p>
                Twelve lifts covering every major muscle group.
              </p>
            </div>

            {/* SORT */}
            <div className="sort-wrapper">

              <label htmlFor="sort-workouts">
                Sort By
              </label>

              <select
                id="sort-workouts"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >

                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>

              </select>

            </div>

          </div>


          {/* LOADING */}
          {loading && (
            <div className="loading-box">

              <div className="loader"></div>

              <p>
                Loading workouts...
              </p>

            </div>
          )}


          {/* ERROR */}
          {!loading && error && (
            <div className="error-box">
              {error}
            </div>
          )}


          {/* WORKOUTS */}
          {!loading && !error && (
            <div className="workout-grid">

              {sortedWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                />
              ))}

            </div>
          )}

        </section>

      </main>

      <Footer />
    </>
  );
}