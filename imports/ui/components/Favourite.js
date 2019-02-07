// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';


type Props = {
  beer: {
    isFavourite: boolean,
  },
};

class Favourite extends React.Component<Props> {
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
      <button type="button" onClick={this.toggleFavourite}>
        {isFavourite ? 'Unfavourite' : 'Favourite'}
      </button>
    );
  }
}


export default Favourite;
