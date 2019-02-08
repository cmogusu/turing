// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { isBefore, subHours } from 'date-fns';


type Props = {
  beer: {
    isFavourite: boolean,
    insertedOn: {},
  },
};

class Favourite extends React.Component<Props> {
  componentDidMount() {
    this.refreshBeerInDatabase();
  }


  refreshBeerInDatabase = () => {
    const { beer } = this.props;
    const { insertedOn, isFavourite } = beer;
    const sixHoursAgo = subHours(new Date(), 6);
    const randomDelayBeforeUpdate = Math.floor(Math.random() * 30) * 1000;

    if (!isFavourite) {
      return;
    }

    if (!insertedOn || isBefore(insertedOn, sixHoursAgo)) {
      setTimeout(() => {
        Meteor.call('beers.addFavourite', beer);
      }, randomDelayBeforeUpdate);
    }
  };


  toggleFavourite = () => {
    const { beer } = this.props;
    const { id, isFavourite } = beer;

    if (isFavourite) {
      Meteor.call('beers.removeFavourite', id);
    } else {
      Meteor.call('beers.addFavourite', beer);
    }
  };


  render() {
    const { beer } = this.props;
    const { isFavourite } = beer;

    return (
      <div
        onClick={this.toggleFavourite}
        onKeyUp={event => event.which === 13 && this.toggleFavourite()}
        tabIndex={0}
        role="button"
        className="d-inline-block mb-3"
      >
        <img
          alt="Favourite beer stars"
          className="favourite-stars"
          src={isFavourite ? 'stars-highlighted.png' : 'stars.png'}
        />
      </div>
    );
  }
}


export default Favourite;
