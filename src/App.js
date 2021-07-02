import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { useQueryClient, QueryClient, QueryClientProvider, } from 'react-query'

import {store} from './redux/store';

import Header from './components/header/Header';
import SideComp from './components/sidebar/SideComp';
import BlogDts from './components/blogs/BlogDts';
import NewBlog from './components/blogs/NewBlog';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="nahere">
            <div><Header /></div>
            <div className="HmCvr0">
              <SideComp />
              <div className="it_fl HmRgt_sd">
                  <Switch>
                    <Route exact path="/"><BlogDts /></Route>
                    <Route exact path="/new_blog"><NewBlog /></Route>
                    <Route exact path="/login"><LoginPage /></Route>
                  </Switch>
                </div>
            </div>
          </div>
      </Provider>
    </Router>
  )
}

export default App;
