"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWorkout } from "../../../lib/api";
import { usePlan } from "../../context/PlanContext";

export default function WorkoutDetails() {
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    addToPlan,
    saveWorkout,
    plan,
  } = usePlan();

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkout(id);
        setWorkout(data);
      } catch (error) {
        console.error("Failed to load workout:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadWorkout();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="details-page">
        <div className="loading-box">
          <div className="loader"></div>
          <p>Loading workout...</p>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="details-page">
        <div className="error-box">
          <h2>Workout not found</h2>
          <p>Unable to load this workout.</p>
        </div>
      </main>
    );
  }

  const alreadyInPlan = plan.some(
    (item) => item.id === workout.id
  );

  return (
    <main className="details-page">

      <div className="details-container">

        {/* IMAGE */}
        <div className="details-image">
          <img
            src={workout.image}
            alt={workout.name}
          />
        </div>

        {/* CONTENT */}
        <div className="details-content">

          <h1>{workout.name}</h1>

          <p className="details-description">
            {workout.description}
          </p>

          {/* TAGS */}
          <div className="details-tags">
            {workout.muscleGroups?.map((tag) => (
              <span key={tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* INFO */}
          <div className="details-info">

            <div>
              <span>Equipment</span>
              <strong>{workout.equipment}</strong>
            </div>

            <div>
              <span>Difficulty</span>
              <strong>{workout.difficulty}</strong>
            </div>

            <div>
              <span>Sets</span>
              <strong>{workout.sets}</strong>
            </div>

            <div>
              <span>Reps</span>
              <strong>{workout.reps}</strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>
                {workout.duration} min
              </strong>
            </div>

            <div>
              <span>Calories</span>
              <strong>
                {workout.caloriesBurned} kcal
              </strong>
            </div>

            <div>
              <span>Rating</span>
              <strong>
                ⭐ {workout.rating}
              </strong>
            </div>

          </div>

          {/* INSTRUCTIONS */}
          <div className="instructions">

            <h2>INSTRUCTIONS</h2>

            <ol>
              {workout.instructions?.map(
                (instruction, index) => (
                  <li key={index}>
                    {instruction}
                  </li>
                )
              )}
            </ol>

          </div>

          {/* BUTTONS */}
          <div className="details-buttons">

            <button
              className="add-plan-btn"
              onClick={() => addToPlan(workout)}
              disabled={alreadyInPlan}
            >
              {alreadyInPlan
                ? "✓ Already in today's plan"
                : "＋ Add to today's plan"}
            </button>

            <button
  type="button"
  className="save-btn"
  onClick={() => {
    saveWorkout(workout);
  }}
>
  ♡ Save for later
</button>

          </div>

        </div>

      </div>

    </main>
  );
}