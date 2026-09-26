"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [doneIds, setDoneIds] = useState([]);
  const [toast, setToast] = useState("");

  // Load saved data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    const storedDone = localStorage.getItem("fitlog-done");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    if (storedDone) {
      setDoneIds(JSON.parse(storedDone));
    }
  }, []);

  // Save plan
  useEffect(() => {
    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved]);

  // Save completed workouts
  useEffect(() => {
    localStorage.setItem(
      "fitlog-done",
      JSON.stringify(doneIds)
    );
  }, [doneIds]);

  // Toast
  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  // Add workout to today's plan
  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      showToast("Already in today's plan!");
      return;
    }

    if (plan.length >= 5) {
      showToast("Today's plan is full!");
      return;
    }

    setPlan((prev) => [...prev, workout]);

    showToast("Added to today's plan!");
  };

  // Remove workout from plan
  const removeFromPlan = (id) => {
    setPlan((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setDoneIds((prev) =>
      prev.filter((item) => item !== id)
    );

    showToast("Workout removed!");
  };

  // Save workout
  const saveWorkout = (workout) => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      showToast("Already saved!");
      return;
    }

    setSaved((prev) => [...prev, workout]);

    showToast("Saved!");
  };

  // Remove saved workout
  const removeSaved = (id) => {
    setSaved((prev) =>
      prev.filter((item) => item.id !== id)
    );

    showToast("Removed from saved!");
  };

  // Mark workout as done
  const markAsDone = (id) => {
    if (doneIds.includes(id)) {
      showToast("Workout already completed!");
      return;
    }

    setDoneIds((prev) => [...prev, id]);

    showToast("Workout marked as done ✓");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        markAsDone,
        showToast,
      }}
    >
      {children}

      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: "30px",
            transform: "translateX(-50%)",
            background: "#f4c430",
            color: "#111",
            padding: "13px 24px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: "800",
            zIndex: 99999,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            whiteSpace: "nowrap",
          }}
        >
          {toast}
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}