import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/header/Header';
import SideComp from './components/sidebar/SideComp';
import BlogDts from './components/blogs/BlogDts';
import NewBlog from './components/blogs/NewBlog';
import LoginPage from './components/LoginPage/LoginPage';


function App() {
  return (
    <Router>
      <div className="">
        <div><Header /></div>
        <div className="HmCvr0">
          <div className="it_fl HmLft_sd"><SideComp /></div>
          <div className="it_fl HmRgt_sd">
              <Switch>
                <Route exact path="/"><BlogDts /></Route>
                <Route exact path="/new_blog"><NewBlog /></Route>
                <Route exact path="/login"><LoginPage /></Route>
              </Switch>
            </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
