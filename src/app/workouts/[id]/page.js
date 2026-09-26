import Image from "next/image";
import Link from "next/link";
import { getWorkout } from "../../lib/api";

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

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
            {workout.category?.map((tag) => (
              <span key={tag}>{tag}</span>
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
              <strong>{workout.duration} min</strong>
            </div>

            <div>
              <span>Calories</span>
              <strong>{workout.calories} kcal</strong>
            </div>

            <div>
              <span>Rating</span>
              <strong>⭐ {workout.rating}</strong>
            </div>

          </div>

          {/* INSTRUCTIONS */}
          <div className="instructions">

            <h2>INSTRUCTIONS</h2>

            <ol>
              {workout.instructions?.map((instruction, index) => (
                <li key={index}>
                  {instruction}
                </li>
              ))}
            </ol>

          </div>

          {/* BUTTONS */}
          <div className="details-buttons">

            <button className="add-plan-btn">
              ＋ Add to today&apos;s plan
            </button>

            <button className="save-btn">
              ♡ Save for later
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}