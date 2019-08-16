import React from 'react';
import './App.css';
import Homepage from "./pages/homepage"
import BookDescription from './pages/bookDescripton'
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'
import store from './publics_redux/redux/store'
import {Provider} from 'react-redux'
import Data from './components/data'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      regisShow: false,
      loginShow: false,
      regSuccesShow: false,
      regFailedShow: false,
      logFailedShow: false,
      addBookShow: false,
      addBookSuccess: false,
      donateBookSuccess: false,
      search:'',
      Data

    }
  }

// login button
showLogin = () => {
  this.setState({loginShow: true})
}
hideLogin = () => {
    this.setState({
        loginShow: false,
        regisShow: false
    })
}
// regis button
showRegis = () => {
    this.setState({regisShow: true})
}
hideRegis = () => {
    this.setState({
        regisShow: false,
        loginShow: false
    })
}
// add button
showAddBook = () => {
    this.setState({
        addBookShow: true
    })
}
hideAddBook = () => {
    this.setState({
        addBookShow: false
    })
}
// donate button


setSearch = (kucing) => {
    this.setState({ search: kucing })
}

  
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <Router>
          <Switch >
            <Route exact path={'/'}>
        <Homepage showaaLogin={this.showLogin} showRegis={this.showRegis} kartolo={this.showAddBook}  setSearchtul={this.setSearch} prop={this.state} search={this.state.search} openRegis={this.state.regisShow} onCloseRegis={this.hideRegis} onCloseLogin={this.hideLogin} openLogin={this.state.loginShow} openAdd={this.state.addBookShow} onCloseAdd={this.hideAddBook}  openRegSuc={this.state.regSuccesShow} opeRegFail={this.state.regFailedShow} openLogFail={this.state.logFailedShow} />

            </Route>
            <Route path={"/:bookid"} component={BookDescription}>
                {/* <BookDescription /> */}
            </Route>
          </Switch>
        </Router>
        
      </div>
      </Provider>
    )
  }
}



export default App;
