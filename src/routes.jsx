"use strict";
import React from 'react';
import Router from 'react-router';

import { Index } from './index.jsx';

import { App } from './components/app/app.jsx';
import { Home } from './components/home.jsx';
import { CreateForm } from './components/create.jsx';
import { ProjectNotFound } from './components/errors/projectnotfound.jsx';
import { Uploading } from './components/uploading.jsx';

let { RouteHandler, DefaultRoute, Route, Link, NotFoundRoute } = Router;

var routes = (
  <Route path="/" handler={Index}>

    <DefaultRoute name="home" handler={Home} />

    <Route name="project" path="project/:id" handler={App}>
      <NotFoundRoute handler={ProjectNotFound} />
    </Route>

    <Route name="create" path="create" handler={CreateForm} />

    <Route name="uploading" path="uploading/:id" handler={Uploading} />

  </Route>
);

export { routes };