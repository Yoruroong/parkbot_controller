/* eslint-disable */
import React from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username:null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api')
      .then(res=>res.json())
      .then(data=>this.setState({username:data.username}));
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Route path="/controller">
          <Controller />
        </Route>
        </div>
      </Router>
    )
  }
}

function Controller() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:guildId`}>
          <Guild />
        </Route>
        <Route path={match.path}>
          <h1 class="center">올바른 경로로 접속해 주세요.</h1>
          <Link to="/">Home</Link>
        </Route>
      </Switch>
    </div>
  );
}

let send
function Guild() {
  let { guildId } = useParams()
  fetch(`http://localhost:3001/api/${guildId}`).then(res=>res.json()).then(data=>send=data)
  console.log(send)
  if(!send) return <h1>길드정보가 없습니다. 올바른 경로로 접속했는지 확인해주세요.</h1>
  return <p>{send.queue.split("[#").join("<br />[#")}</p>
}

export default App;