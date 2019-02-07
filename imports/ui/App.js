import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import FavouritesPage from './pages/FavouritesPage.js';
import HomePage from './pages/HomePage.js';


function App() {
  return (
    <Router>
      <React.Fragment>
        <Route
          exact
          strict
          path="/"
          render={() => <HomePage isAdvancedSearchPage={false} />}
        />
        <Route
          path="/advanced-search"
          render={() => <HomePage isAdvancedSearchPage={true} />}
        />
        <Route
          path="/favourites"
          component={FavouritesPage}
        />

      </React.Fragment>
    </Router>
  );
}

export default App;
