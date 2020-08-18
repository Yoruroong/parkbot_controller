import React from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Route path="/controller">
          <Controller />
        </Route>
      </div>
    </Router>
  );
}

function Controller() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:guildId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h1 class="center">올바른 경로로 접속해 주세요.</h1>
          <Link to="/">Home</Link>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { guildId } = useParams();
  return <h3>요청된 ID: {guildId}</h3>;
}