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

    setInterval(() => {
      window.location.href = window.location.href
    }, 3000);
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Route path="/">
          <div>
            <Switch>
              <Route path={`/:guildId`}>
                <img src={this.state.thumbnail ? this.state.thumbnail : "https://cdn.pixabay.com/photo/2020/08/19/15/31/huangpu-river-5501210_960_720.jpg"} className="thumbnail"></img>
                <h1>현재 재생 중: {this.state.title ? this.state.title : "재생중인 곡 없음"}</h1>

                <MetaTags>
                  <meta http-equiv="refresh" content="2"></meta>
                </MetaTags>
                
                <Table striped bordered hover>
                  <thread><tr><th>번호</th><th>제목</th><th>길이</th></tr></thread>
                  <tr><th>{this.state.just}</th></tr>
                </Table>
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