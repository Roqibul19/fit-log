import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WorkoutCard from "@/components/WorkoutCard/WorkoutCard";
import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <>
      <Navbar />

      <main className="container">

        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">WORKOUT LIBRARY</p>

            <h1>TRAIN WITH INTENT. LOG EVERY SET.</h1>

            <p className="hero-text">
              FitLog is a dark, no-nonsense gym companion:
              pick a lift, lock it into today's plan, and watch
              the week's work add up.
            </p>

            <Link href="#library" className="primary-btn">
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


        {/* Library */}
        <section id="library" className="library">

          <div className="section-heading">
            <h2>THE LIBRARY</h2>
            <p>Twelve lifts covering every major muscle group.</p>
          </div>

          <div className="workout-grid">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}