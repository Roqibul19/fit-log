import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="workout-card"
    >
      <img
        src={workout.image}
        alt={workout.name}
      />

      <div className="workout-card-content">
        <div className="tags">
          {workout.muscleGroups?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <h3>{workout.name}</h3>

        <p>{workout.equipment}</p>

        <div className="workout-stats">
          <span>◷ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>☆ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}