// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header.js';
import Body from '../components/Body.js';
import FetchBeersFromMongodb from '../helpers/FetchBeersFromMongodb.js';


class FavouritesPage extends React.Component<{}> {
  state = {
    page: 1,
    perPage: 25,
  };


  render() {
    const { page, perPage } = this.state;

    return (
      <div>
        <Header>
          <div className="mx-auto w-50">
            <NavLink strict className="nav-link" to="/advanced-search">Advanced Search</NavLink>
          </div>
        </Header>
        <FetchBeersFromMongodb
          page={page}
          perPage={perPage}
          render={beers => (
            <Body
              beers={beers}
              page={page}
              perPage={perPage}
              setPage={newPage => this.setState({ page: newPage })}
            />
          )}
        />
      </div>
    );
  }
}

export default FavouritesPage;
