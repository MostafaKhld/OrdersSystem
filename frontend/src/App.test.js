import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import React from "react";
import ReactDOM from "react-dom";
test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
