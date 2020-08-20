/* eslint-disable */
import React from 'react'
import './App.css'
import axios from 'axios'
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
  constructor(props) {
    super(props)
    this.state = {
      Rendered:null
    }
  }

  componentDidMount() {
    this.renderAll()
  }

  renderAll = async() => {
    let guildId = window.location.href.replace(/[^0-9]/g,'').replace(3000, "")
    console.log(guildId)
    try {
      let res = await fetch(`http://localhost:3001/api/${guildId}`).then(r => r.json())
      // this will re render the view with new data
      this.setState({
        Rendered: res.title[0]
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
              <Route path={`/controller/:guildId`}>
                {this.state.Rendered}
              </Route>
              <Route path={`/controller`}>
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