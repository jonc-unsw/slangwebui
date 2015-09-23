"use strict";
import React from "react";
import { Router } from "react-router";
import history from "./history";
import { routes } from "./routes.jsx";

React.render(<Router history={history}>{routes}</Router>, document.body);