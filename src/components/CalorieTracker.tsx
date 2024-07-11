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
      <h3 className="mb-6 text-3xl font-bold text-center text-zinc-300">
        Resumen de calorias
      </h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-6 sm:justify-between">
        <CalorieDisplay calories={caloriesConsumed} category="Alimento" />
        <CalorieDisplay calories={caloriesBurned} category="Ejercicio" />
        <div className="block">
          <div className="px-4 pt-4 pb-3 mx-auto border-2 rounded border-zinc-700 bg-zinc-800 w-fit">
            <CalorieDisplay calories={caloriesNet} category="Diferencia" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CalorieTracker;
