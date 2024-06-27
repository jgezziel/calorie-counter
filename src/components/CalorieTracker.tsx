import { useMemo } from "react";
import { Activity } from "../types";

import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};
const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (acc, activity) =>
          activity.category === 1 ? acc + activity.calories : acc,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (acc, activity) =>
          activity.category === 2 ? acc + activity.calories : acc,
        0
      ),
    [activities]
  );

  const caloriesNet = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesBurned, caloriesConsumed]
  );

  return (
    <>
      <h3 className="text-3xl font-bold text-zinc-300 text-center mb-6">
        Resumen de calorias
      </h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-6 sm:justify-between">
        <CalorieDisplay calories={caloriesConsumed} category="Alimento" />
        <CalorieDisplay calories={caloriesBurned} category="Ejercicio" />
        <div className="block">
          <div className="border-2 px-4 pt-4 pb-3 rounded border-zinc-700 bg-zinc-800 w-fit mx-auto">
            <CalorieDisplay calories={caloriesNet} category="Diferencia" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CalorieTracker;
