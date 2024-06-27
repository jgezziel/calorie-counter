import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

import { activityReducer, initialState } from "./reducers/activityReducer";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  const handleRestartApp = () => {
    if (window.confirm("¿Estás seguro de reiniciar la app?")) {
      dispatch({ type: "RESTART_APP" });
    }
  };

  return (
    <>
      <header className="bg-purple-600">
        <div className="container max-w-3xl">
          <div className="flex flex-col items-center justify-between py-4 sm:flex-row">
            <h1 className="mb-2 text-2xl font-extrabold text-center text-white uppercase sm:mb-0 md:text-3xl">
              Contador de calorias
            </h1>
            <div className="text-right">
              <button
                type="button"
                className="px-3 py-2 font-medium text-purple-900 transition-all bg-purple-100 rounded ring-2 ring-purple-300 hover:bg-white focus:ring-offset-2 focus:ring-offset-purple-500 focus:ring-white hover:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-purple-400 disabled:opacity-60 disabled:bg-purple-400 disabled:text-purple-100"
                title="Reiniciar App"
                onClick={() => handleRestartApp()}
                disabled={canRestartApp}
              >
                Reiniciar App
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="py-10 bg-purple-500 md:py-14">
        <div className="container max-w-3xl">
          <Form state={state} dispatch={dispatch} />
        </div>
      </section>
      <section className="py-10 bg-zinc-900">
        <div className="container max-w-3xl">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>
      <section className="container max-w-3xl py-10">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
