"use strict";
import React from "react";
import { Route } from "react-router";

import { Index } from "./index.jsx";

import { App } from "./components/app/app.jsx";
import { Home } from "./components/home.jsx";
import { HeaderInApp } from "./components/common/header.jsx";
import { CreateForm } from "./components/create.jsx";
import { Uploading } from "./components/uploading.jsx";
import { Overview, Statistics } from "./components/overview.jsx";

let routes = (
  <Route component={Index}>

    <Route path="/" component={Home} />

    <Route path="project/:id">

      <Route path="overview" component={Overview} >
        <Route path="statistics" component={Statistics} />
      </Route>

      <Route path="view" components={{content: App, header: HeaderInApp }} />

    </Route>

    <Route path="create" component={CreateForm} />

    <Route path="uploading/:id" component={Uploading} />

  </Route>
);

export { routes };