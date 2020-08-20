/* eslint-disable */
import React from 'react'
import './App.css'
import Table from 'react-bootstrap/Table'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    this.renderAll()
    let match = useRouteMatch()
  }
  renderAll = async() => {
    let { guildId } = useParams()
    try {
      let res = await axios.get(`http://localhost:3001/api/${guildId}`);
      let will = res.data
      // this will re render the view with new data
      this.setState({
        rendered: will.title[0]
      })
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
        <Route path="/controller">
          <div>
            <Switch>
              <Route path={`${match.path}/:guildId`}>
                {this.state.rendered}
              </Route>
              <Route path={match.path}>
                <h1 class="center">올바른 경로로 접속해 주세요.</h1>
              <Link to="/">Home</Link>
              </Route>
            </Switch>
          </div>
        </Route>
        </div>
      </Router>
    )
  }
}

export default App;