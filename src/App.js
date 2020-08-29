/* eslint-disable */
import React from 'react'
import './App.css'
import Table from 'react-bootstrap/Table'
import MetaTags from 'react-meta-tags'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"

var data = [
  {id: 1, name: 'Gob', value: '2'},
  {id: 2, name: 'Buster', value: '5'},
  {id: 3, name: 'George Michael', value: '4'}
]

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
        thumbnail: res.thumbnail[0],
        title: res.title[0],
        just: res.queue.split("\n").join("</tr><th>").split("&yoru%").join('</th><th>')
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
                <img src={this.state.thumbnail ? this.state.thumbnail : "https://cdn.pixabay.com/photo/2020/08/19/15/31/huangpu-river-5501210_960_720.jpg"}></img>
                <h1>현재 재생 중: {this.state.title ? this.state.title : "재생중인 곡 없음"}</h1>
                <meta http-equiv="refresh" content="2"></meta>
                <Table striped bordered hover>
                  <thread><tr><th>번호</th><th>제목</th><th>길이</th></tr></thread>
                  <tr><th>{this.state.just}</th></tr>
                </Table>
              </Route>
              <Route path={`/controller`}>
                <h1 class="center">올바른 경로로 접속해 주세요.</h1>
              <Link to="/">Home</Link>
              </Route>
              <Route path={`/`}>
                <h1 class="center">올바른 경로로 접속해 주세요.</h1>
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