import actions from "./actions";

export const initialState = {
  user: null,
  darkTheme: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    default:
      return state;
  }
}
