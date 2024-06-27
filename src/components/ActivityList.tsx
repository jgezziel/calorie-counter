import type { Activity } from "../types";

import { categories } from "../data/categories";
import type { ActivityActions } from "../reducers/activityReducer";
import { type Dispatch, useMemo } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    []
  );

  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );

  const handleEditDelete = (id: Activity["id"], action: "edit" | "delete") => {
    const typeAction =
      action === "edit" ? "SET_ACTIVITY_ID" : "DELETE_ACTIVITY";

    dispatch({
      type: typeAction,
      payload: { id },
    });
  };

  return (
    <>
      {isEmptyActivities ? (
        <h3 className="text-3xl font-semibold text-center text-zinc-300">
          No hay actividades registradas
        </h3>
      ) : (
        <>
          <h3 className="mb-5 text-3xl font-semibold text-center">
            Alimentación y ejercicio
          </h3>
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.id} className="border-b">
                <div className="flex flex-col gap-4 py-4 sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 mb-3 font-medium border-2 rounded-sm text-white ${
                        activity.category === 1
                          ? "border-purple-100/20 bg-purple-500"
                          : "border-pink-100/20 bg-pink-500"
                      }`}
                    >
                      {categoryName(Number(activity.category))}
                    </span>
                    <h4 className="text-xl font-semibold">{activity.name}</h4>
                    <p className="text-2xl font-bold text-gray-500">
                      {activity.calories} calorías
                    </p>
                  </div>
                  <div className="flex justify-end gap-4 p-1">
                    <button
                      type="button"
                      className="px-3 py-2 transition-all rounded text-sky-500 ring-2 ring-sky-500 hover:bg-sky-500 hover:text-white focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-500 hover:scale-95"
                      title="Editar actividad"
                      onClick={() => handleEditDelete(activity.id, "edit")}
                    >
                      <PencilIcon className="size-6" />
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 text-red-500 transition-all rounded ring-2 ring-red-500 hover:bg-red-500 hover:text-white focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500 hover:scale-95"
                      title="Eliminar actividad"
                      onClick={() => handleEditDelete(activity.id, "delete")}
                    >
                      <TrashIcon className="size-6" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ActivityList;
