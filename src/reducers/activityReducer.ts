import type { Activity } from "../types";

export type ActivityActions =
  | {
      type: "SAVE_ACTIVITY";
      payload: {
        newActivity: Activity;
      };
    }
  | {
      type: "SET_ACTIVITY_ID";
      payload: {
        id: Activity["id"];
      };
    }
  | {
      type: "DELETE_ACTIVITY";
      payload: {
        id: Activity["id"];
      };
    }
  | {
      type: "RESTART_APP";
    };

export type ActivityState = {
  activities: Activity[];
  activityID: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");

  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activityID: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  switch (action.type) {
    case "SAVE_ACTIVITY": {
      let updatedActivities: Activity[] = [];

      if (state.activityID) {
        updatedActivities = state.activities.map((activity) =>
          activity.id === state.activityID
            ? action.payload.newActivity
            : activity
        );
      } else {
        updatedActivities = [...state.activities, action.payload.newActivity];
      }
      return {
        ...state,
        activities: updatedActivities,
        activityID: "",
      };
    }
    case "SET_ACTIVITY_ID":
      return {
        ...state,
        activityID: action.payload.id,
      };
    case "DELETE_ACTIVITY": {
      const activitiesFilter = state.activities.filter(
        (activity) => activity.id !== action.payload.id
      );

      return {
        ...state,
        activities: activitiesFilter,
      };
    }
    case "RESTART_APP": {
      return {
        activities: [],
        activityID: "",
      };
    }
    default:
      return state;
  }
};
