import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, } from 'react-query'

import {store} from './redux/store';

import Header from './components/header/Header';
import SideComp from './components/sidebar/SideComp';
import BlogDts from './components/blogs/BlogDts';
import NewBlog from './components/blogs/NewBlog';
import LoginPage from './components/blogs/BlogView';
import BlogView from './components/LoginPage/LoginPage';

// Create a client so we can use the react-query hooks all through out the site
const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <div className="nahere">
            <div><Header /></div>
            <div className="HmCvr0">
              <SideComp />
              <div className="it_fl HmRgt_sd">
                  <Switch>
                    <Route exact path="/"><BlogDts /></Route>
                    <Route exact path="/new_blog"><NewBlog /></Route>
                    <Route exact path="/login"><LoginPage /></Route>
                    <Route exact path="/BlogPage/:id"><BlogView /></Route>
                  </Switch>
                </div>
            </div>
          </div>
        </QueryClientProvider>
      </Provider>
    </Router>
  )
}

export default App;
