import { v4 as uuidv4 } from "uuid";
import {
  type Dispatch,
  useState,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import type {
  ActivityActions,
  ActivityState,
} from "../reducers/activityReducer";

type FormProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
};

const Form = ({ dispatch, state }: FormProps) => {
  const initialState: Activity = {
    id: uuidv4(),
    category: 0,
    name: "",
    calories: 0,
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activityID) {
      const activity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activityID
      )[0];
      setActivity(activity);
    }
  }, [state.activityID, state.activities]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumber = ["category", "calories"].includes(e.target.id);
    const value = isNumber ? Number(e.target.value) : e.target.value;

    setActivity({
      ...activity,
      [e.target.id]: value,
    });
  };

  const isValidActivity = () => {
    const { category, name, calories } = activity;
    return name.trim() !== "" && category !== 0 && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "SAVE_ACTIVITY", payload: { newActivity: activity } });
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <section className="p-4 bg-white rounded shadow-xl shadow-purple-600">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 sm:col-span-2">
          <label
            htmlFor="category"
            className="block mb-2 text-lg font-semibold"
          >
            Categoría
          </label>
          <select
            id="category"
            className="w-full px-4 py-2 border rounded border-zinc-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            value={activity.category}
            onChange={handleChange}
          >
            <option value="0" hidden>
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-lg font-semibold">
            Actividad
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded border-zinc-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Ejem: Comida, ejercicio, etc."
            value={activity.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="calories"
            className="block mb-2 text-lg font-semibold"
          >
            Calorias
          </label>
          <input
            type="number"
            id="calories"
            className="w-full px-4 py-2 border rounded border-zinc-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Ejem: 300, 500, etc."
            min={0}
            value={activity.calories}
            onChange={handleChange}
          />
        </div>
        <div className="my-4 sm:col-span-2">
          <input
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white transition-all bg-purple-600 rounded cursor-pointer hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-zinc-200/70 disabled:text-zinc-400 disabled:cursor-not-allowed"
            disabled={!isValidActivity()}
            value="Guardar"
          />
        </div>
      </form>
    </section>
  );
};

export default Form;
