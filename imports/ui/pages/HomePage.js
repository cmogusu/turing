// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header.js';
import Body from '../components/Body.js';
import SearchForm from '../components/SearchForm.js';
import AdvancedSearchForm from '../components/AdvancedSearchForm.js';
import { fetchBeers, createQuery } from '../functions/functions.js';
import AddFavouritePropToBeers from '../helpers/AddFavouritePropToBeers.js';


type Props = {
  isAdvancedSearchPage?: boolean,
};


class HomePage extends React.Component<Props> {
  static defaultProps = {
    isAdvancedSearchPage: true,
  };

  state = {
    beers: [],
    page: 1,
    perPage: 25,
    searchQuery: '',
  };

  isFetching = false;

  prevSearchQuery = '';

  loadingNextPageRetries = 0;


  componentDidMount() {
    this.fetchBeers();
  }


  componentDidUpdate(prevPros, prevState) {
    const searchQuery = createQuery(this.state);
    const prevSearchQuery = createQuery(prevState);

    if (searchQuery === prevSearchQuery || this.prevSearchQuery === searchQuery) {
      return;
    }

    this.fetchBeers();
  }


  fetchBeers = () => {
    const searchQuery = createQuery(this.state);

    this.prevSearchQuery = searchQuery;
    fetchBeers(searchQuery)
      .then((beers) => {
        const { page } = this.state;

        if (this.areFetchedBeersSameAsPreviousBeers(beers, page)) {
          return;
        }

        this.setState((thePrevState) => {
          const { beers: prevBeers, page: latestPage } = thePrevState;

          return {
            beers: latestPage === 1 ? beers : prevBeers.concat(beers),
          };
        });
      })
      .catch((error, status) => {
        console.log(error, status);
        // this.setState({})
      });
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


  areFetchedBeersSameAsPreviousBeers = (beers, page) => {
    const { beers: prevBeers } = this.state;
    const lastElementBeers = beers[beers.length - 1];
    const lastElementPrevBeers = prevBeers[prevBeers.length - 1];

    if (!lastElementPrevBeers || !lastElementBeers) {
      return false;
    }

    if (lastElementPrevBeers.id === lastElementBeers.id) {
      this.prevSearchQuery = createQuery(this.state);
      this.loadingNextPageRetries += 1;

      if (this.loadingNextPageRetries < 2) {
        setTimeout(() => {
          this.fetchNextPage(page);
        }, 1000);
      }

      return true;
    }

    return false;
  }


  fetchNextPage = (page) => {
    const state = Object.assign({}, this.state, { page });
    const searchQuery = createQuery(state);

    if (this.prevSearchQuery === searchQuery) {
      return;
    }

    this.prevSearchQuery = searchQuery;

    fetchBeers(searchQuery)
      .then((beers) => {
        if (this.areFetchedBeersSameAsPreviousBeers(beers, page)) {
          return;
        }

        this.setState((thePrevState) => {
          const { beers: thePrevBeers } = thePrevState;

          this.loadingNextPageRetries = 0;

          return {
            page,
            beers: thePrevBeers.concat(beers),
          };
        });
      })
      .catch(error => console.log('error', error));
  };


  render() {
    const { beers, page, perPage } = this.state;
    const { isAdvancedSearchPage } = this.props;


    if (isAdvancedSearchPage) {
      return (
        <div>
          <Header />
          <div className="row align-items-stretch">
            <div className="col-sm-4">
              <AdvancedSearchForm setSearchQuery={this.setSearchQuery} />
            </div>
            <div className="col-sm-8">
              <AddFavouritePropToBeers
                beers={beers}
                render={updatedBeers => (
                  <Body
                    beers={updatedBeers}
                    page={page}
                    perPage={perPage}
                    setPage={this.fetchNextPage}
                  />
                )}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header>
          <div className="mx-auto w-50">
            <SearchForm setSearchQuery={this.setSearchQuery} />
            <NavLink strict className="nav-link" to="/advanced-search">Advanced Search</NavLink>
          </div>
        </Header>
        <AddFavouritePropToBeers
          beers={beers}
          render={updatedBeers => (
            <Body
              beers={updatedBeers}
              page={page}
              perPage={perPage}
              setPage={this.fetchNextPage}
            />
          )}
        />
      </div>
    );
  }
}

export default HomePage;
