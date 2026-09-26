"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [doneIds, setDoneIds] = useState([]);
  const [toast, setToast] = useState("");

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

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
  }, [doneIds]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      showToast("Already in today's plan");
      return;
    }

    if (plan.length >= 5) {
      showToast("Today's plan is full. Maximum 5 lifts.");
      return;
    }

    setPlan((prev) => [...prev, workout]);

    showToast(`${workout.name} added to today's plan`);
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));

    setDoneIds((prev) =>
      prev.filter((item) => item !== id)
    );

    showToast("Workout removed");
  };

  const saveWorkout = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      showToast("Already saved");
      return;
    }

    setSaved((prev) => [...prev, workout]);

    showToast(`${workout.name} saved for later`);
  };

  const removeSaved = (id) => {
    setSaved((prev) =>
      prev.filter((item) => item.id !== id)
    );

    showToast("Removed from saved");
  };

  const markAsDone = (id) => {
    if (doneIds.includes(id)) {
      showToast("Workout already completed");
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

      {toast && (
        <div className="fitlog-toast">
          {toast}
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}