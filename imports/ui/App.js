import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loading.js';
import { registerValidSW } from './serviceWorker';


const LoadableHomePage = Loadable({
  loader: () => import('./pages/HomePage.js'),
  loading: Loading,
});

const LoadableFavouritesPage = Loadable({
  loader: () => import('./pages/FavouritesPage.js'),
  loading: Loading,
});


class App extends React.Component<{}> {
  componentDidMount() {
    registerValidSW('/sw.js');
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            exact
            strict
            path="/"
            render={() => <LoadableHomePage isAdvancedSearchPage={0} />}
          />
          <Route
            path="/advanced-search"
            render={() => <LoadableHomePage isAdvancedSearchPage={1} />}
          />
          <Route
            path="/favourites"
            component={LoadableFavouritesPage}
          />

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
