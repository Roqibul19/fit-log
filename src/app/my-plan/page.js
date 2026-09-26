"use client";

import Link from "next/link";
import { useState } from "react";
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

  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  const currentWorkouts =
    activeTab === "plan" ? plan : saved;

  return (
    <main className="my-plan-page">

      {/* HEADER */}
      <section className="plan-header">

        <span className="eyebrow">
          YOUR WORKOUT
        </span>

        <h1>MY PLAN</h1>

        <p>
          Cap of five lifts for today. Finish them,
          then load more.
        </p>

      </section>

      {/* METRICS */}
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

      {/* TABS */}
      <div className="plan-tabs">

        <button
          type="button"
          className={
            activeTab === "plan" ? "active" : ""
          }
          onClick={() => setActiveTab("plan")}
        >
          TODAY'S PLAN
          <span>{plan.length}</span>
        </button>

        <button
          type="button"
          className={
            activeTab === "saved" ? "active" : ""
          }
          onClick={() => setActiveTab("saved")}
        >
          SAVED
          <span>{saved.length}</span>
        </button>

      </div>

      {/* EMPTY STATE */}
      {currentWorkouts.length === 0 ? (

        <section className="empty-plan">

          <div className="empty-icon">
            +
          </div>

          <h2>NOTHING HERE YET</h2>

          <p>
            Browse the library and add a lift
            to get today moving.
          </p>

          <Link
            href="/"
            className="primary-button"
          >
            Go to workouts →
          </Link>

        </section>

      ) : (

        /* WORKOUT LIST */
        <section className="plan-list">

          {currentWorkouts.map((workout) => {

            const isDone =
              doneIds.includes(workout.id);

            return (
              <article
                key={workout.id}
                className={
                  isDone
                    ? "plan-card completed"
                    : "plan-card"
                }
              >

                {/* IMAGE */}
                <img
                  src={workout.image}
                  alt={workout.name}
                />

                {/* INFORMATION */}
                <div className="plan-card-info">

                  <div className="tags">

                    {workout.muscleGroups?.map(
                      (tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      )
                    )}

                  </div>

                  <h3>{workout.name}</h3>

                  <p>{workout.equipment}</p>

                  <div className="plan-stats">

                    <span>
                      ⏱ {workout.duration} min
                    </span>

                    <span>
                      🔥 {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      ★ {workout.rating}
                    </span>

                  </div>

                </div>

                {/* ACTIONS */}
                <div className="plan-actions">

                  <Link
                    href={`/workouts/${workout.id}`}
                    className="view-button"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done only for Today's Plan */}
                  {activeTab === "plan" && (
                    <button
                      type="button"
                      className={
                        isDone
                          ? "done-button completed-btn"
                          : "done-button"
                      }
                      onClick={() =>
                        markAsDone(workout.id)
                      }
                    >
                      {isDone
                        ? "✓ Done"
                        : "✓ Mark as Done"}
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromPlan(workout.id);
                      } else {
                        removeSaved(workout.id);
                      }
                    }}
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