import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import './App.css';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';
import MovieDiscoveryViewContainer from 'components/MovieDiscoveryViewContainer';

function App() {

  return (
    <Router>
      <NavigationHeader/>
      <Switch>
        <Route exact path="/">
          <MovieDiscoveryViewContainer/>
        </Route>
        <Route path="/movies/discover/:page" children={<MovieDiscoveryViewContainer/>}/>
        <Route path="/movies/discover" children={<MovieDiscoveryViewContainer/>}/>
          
        {/* </Route> */}
        {/* <Route path="/movies/discover/:page"> */}
        {/*   <MovieDiscoveryViewContainer/> */}
        {/* </Route> */}
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
