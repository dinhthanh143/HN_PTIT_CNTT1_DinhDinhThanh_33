type StateType = {
  msg: string;
  style: string;
  status: boolean;
};
const initNotification:StateType = {
  msg: "AVBC",
  style: "alert alert-success",
  status: false,
};
type ActionType =
  | { type: "ADDED" }
  | { type: "UPDATED" }
  | { type: "FAILED" }
  | { type: "OFF" };

const notify = (state: StateType = initNotification, action: ActionType) => {
  switch (action.type) {
    case "ADDED":
      return {
        msg: "ADDED TO CART SUCCESSFULLY",
        style: "alert alert-success",
        status: true,
      };
    case "UPDATED":
      return {
        msg: "UPDATED CART SUCCESSFULLY",
        style: "alert alert-warning",
        status: true,
      };
    case "FAILED":
      return {
        msg: "NOT ENOUGH ITEM IN STOCK",
        style: "alert alert-error",
        status: true,
      };

    case "OFF":
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
};
export default notify;
