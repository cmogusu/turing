// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SearchForm from '../components/SearchForm.js';
import BeerCollection from '../../api/BeerCollection.js';
import Header from '../components/Header.js';
import Body from '../components/Body.js';


type Props = {
  beers: Array<{}>,
};

class FavouritesPage extends React.Component<Props> {
  state = {
    page: 1,
    perPage: 5,
  };

  setSearchQuery = (searchQuery) => {
    this.setState((prevState) => {
      const { searchQuery: prevSearchQuery } = prevState;
      const newState = {
        searchQuery,
      };

      if (searchQuery !== prevSearchQuery) {
        newState.page = 1;
      }

      return newState;
    });
  };


  fetchNextPage = (page) => {
    console.log(page);
  };


  render() {
    const { beers } = this.props;
    const { page, perPage } = this.state;

    return (
      <div>
        <Header>
          <div className="mx-auto w-50">
            <SearchForm setSearchQuery={this.setSearchQuery} />
            <NavLink strict className="nav-link" to="/advanced-search">Advanced Search</NavLink>
          </div>
        </Header>
        <Body
          beers={beers}
          page={page}
          perPage={perPage}
          setPage={this.fetchNextPage}
        />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('beers');

  return {
    beers: BeerCollection.find().fetch(),
  };
})(FavouritesPage);
