"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlan } from "../context/PlanContext";

export default function MyPlan() {
  const {
    plan,
    saved,
    doneIds,
    removeFromPlan,
    removeSaved,
    markAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
    0
  );

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  // Sort current list
  const sortedWorkouts = useMemo(() => {
    return [...currentWorkouts].sort((a, b) => {
      if (sortBy === "duration") {
        return Number(a.duration || 0) - Number(b.duration || 0);
      }

      if (sortBy === "calories") {
        return (
          Number(a.caloriesBurned || 0) -
          Number(b.caloriesBurned || 0)
        );
      }

      if (sortBy === "rating") {
        return Number(a.rating || 0) - Number(b.rating || 0);
      }

      return 0;
    });
  }, [currentWorkouts, sortBy]);

  return (
    <main className="my-plan-page">
      {/* Header */}
      <section className="plan-header">
        <span className="eyebrow">YOUR WORKOUT</span>

        <h1>MY PLAN</h1>

        <p>
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      {/* Metrics */}
      <section className="plan-metrics">
        <div className="metric-card">
          <span>EXERCISES</span>
          <strong>{plan.length}</strong>
        </div>

        <div className="metric-card">
          <span>MINUTES</span>
          <strong>{totalMinutes}</strong>
        </div>

        <div className="metric-card">
          <span>CALORIES</span>
          <strong>{totalCalories}</strong>
        </div>
      </section>

      {/* Tabs + Sort */}
      <div className="plan-controls">
        <div className="plan-tabs">
          <button
            type="button"
            className={activeTab === "plan" ? "active" : ""}
            onClick={() => setActiveTab("plan")}
          >
            TODAY'S PLAN <span>{plan.length}</span>
          </button>

          <button
            type="button"
            className={activeTab === "saved" ? "active" : ""}
            onClick={() => setActiveTab("saved")}
          >
            SAVED <span>{saved.length}</span>
          </button>
        </div>

        {/* Sort */}
         <div className="sort-box">
    <label htmlFor="sort-workouts">SORT BY</label>

    <div className="sort-select-wrapper">
      <select
        id="sort-workouts"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="duration">Duration</option>
        <option value="calories">Calories</option>
        <option value="rating">Rating</option>
      </select>

      <span className="sort-chevron">⌄</span>
    </div>
  </div>

</div>

      {/* Empty State */}
      {sortedWorkouts.length === 0 ? (
        <section className="empty-plan">
          <div className="empty-icon">+</div>

          <h2>NOTHING HERE YET</h2>

          <p>
            Browse the library and add a lift to get today moving.
          </p>

          <Link href="/" className="primary-button">
            GO TO WORKOUTS →
          </Link>
        </section>
      ) : (
        /* Workout List */
        <section className="plan-list">
          {sortedWorkouts.map((workout) => {
            const isDone = doneIds.includes(workout.id);

            return (
              <article
                key={workout.id}
                className={
                  isDone
                    ? "plan-card completed"
                    : "plan-card"
                }
              >
                <img
                  src={workout.image}
                  alt={workout.name}
                />

                <div className="plan-card-info">
                  {/* Muscle Tags */}
                  <div className="tags">
                    {workout.muscleGroups?.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <h3>{workout.name}</h3>

                  <p>{workout.equipment}</p>

                  <div className="plan-stats">
                    <span>
                      ◷ {workout.duration} min
                    </span>

                    <span>
                      🔥 {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      ★ {workout.rating}
                    </span>
                  </div>
                </div>

                <div className="plan-actions">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="view-button"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      type="button"
                      className={
                        isDone
                          ? "done-button completed-btn"
                          : "done-button"
                      }
                      onClick={() => markAsDone(workout.id)}
                    >
                      {isDone
                        ? "✓ Done"
                        : "✓ Mark as Done"}
                    </button>
                  )}

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeSaved(workout.id)
                    }
                  >
                    ×
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}