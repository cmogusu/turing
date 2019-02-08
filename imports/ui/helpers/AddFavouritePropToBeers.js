// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import BeerCollection from '../../api/BeerCollection.js';

type Props = {
  beers: Array<{}>,
  favouriteBeers: Array<{}>,
  render: Function,
};

class AddFavouritePropToBeers extends React.Component<Props> {
  getUpdatedBeers() {
    const { beers, favouriteBeers } = this.props;

    if (!favouriteBeers.length) {
      return beers;
    }

    const favouriteBeersIds = favouriteBeers.map(beer => beer.id);
    const updatedBeers = beers.map(beer => (
      Object.assign({}, beer, {
        isFavourite: favouriteBeersIds.includes(beer.id),
      })
    ));

    return updatedBeers;
  }

  render() {
    const { render } = this.props;
    const updatedBeers = this.getUpdatedBeers();

    return render(updatedBeers);
  }
}


export default withTracker((props) => {
  Meteor.subscribe('beers');

  const { beers } = props;
  const beerIds = beers.map(beer => beer.id.toString());

  return {
    favouriteBeers: BeerCollection.find(
      { _id: { $in: beerIds } },
      { id: 1 },
    ).fetch(),
  };
})(AddFavouritePropToBeers);
