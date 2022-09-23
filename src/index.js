import {ColorModeScript} from "@chakra-ui/react";
import React, {StrictMode} from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter} from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import * as Admin from "services/Admin";
import * as User from "services/User";
import {faker} from "@faker-js/faker";
import {getRandomElementFrom, isEmpty, pipe} from "services/utilities";

// add default time locale
TimeAgo.addDefaultLocale(en);

// seed localstorage with dummy data
const internet = faker.internet;
isEmpty(Admin.all()) &&
  [...new Array(3)].forEach(() => {
    const username = internet.userName();
    pipe(
      Admin.create,
      Admin.save
    )({
      username: username,
      email: `${username}@gmail.com`,
      password: "password",
    });
  });

const name = faker.name;
isEmpty(User.all()) &&
  [...new Array(10)].forEach(() => {
    pipe(
      User.create,
      User.save
    )({
      firstName: name.firstName(),
      lastName: name.lastName(),
      startingBalance: parseFloat(faker.finance.amount()),
      admin: getRandomElementFrom(Admin.all()),
    });
  });

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter basename="/tgb">
      <ColorModeScript />
      <App />
    </BrowserRouter>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
