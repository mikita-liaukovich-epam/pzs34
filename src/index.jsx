import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./utils/rootReducer";
import Main from "./views/Main/Main";
import '@pwabuilder/pwaupdate';

import './index.scss'

import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(rootReducer, composeWithDevTools());

export default function App() {
  return (
    <Provider store={store}>
      <Main />
      {/* <pwa-update /> */}
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
