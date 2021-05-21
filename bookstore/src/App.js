import PageNavbar from './components/PageNavbar'
import Footer from './components/Footer'
import Welcome from './Pages/Welcome'
import LatestReleases from './Pages/LatestReleases'
import {Container} from 'react-bootstrap'
import React from 'react';

import {Route,BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import { CreateProducts } from './Pages/CreateProducts';

class App extends React.Component{



  render() {
      return (
        <Router>
          <Container fluid className='m-0 p-0'>
          <PageNavbar />
          {/* <Redirect exact from="/" to="Welcome" /> */}
          <Switch>
            <Route path="/Welcome" component={Welcome}/>
            <Route path="/LatestReleases" exact component={LatestReleases}/>
            <Route path="/LatestReleases/:id" component={LatestReleases}/>
            <Route path={["/backoffice"]} exact component={CreateProducts}/>
            <Route path={["/backoffice/:id"]} component={CreateProducts}/>
            
          </Switch>
          <Footer/>
          </Container>
        </Router>
      );
  }
}

export default App;
