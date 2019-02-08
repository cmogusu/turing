import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

const BeerCollection = new Mongo.Collection('beers');

if (Meteor.isServer) {
  Meteor.publish('beers', (limit) => {
    check(limit, Match.Maybe(Number));

    return BeerCollection.find(
      {},
      { limit: limit || 25 },
    );
  });
}

Meteor.methods({
  'beers.addFavourite'(beer) {
    check(beer, Object);

    const { id } = beer;
    const favouritedBeer = Object.assign({}, beer, {
      isFavourite: true,
      insertedOn: new Date(),
    });

    BeerCollection.upsert({ _id: id.toString() }, {
      $set: favouritedBeer,
    });
  },


  'beers.removeFavourite'(_id) {
    check(_id, Number);

    BeerCollection.remove(_id.toString());
  },
});


export default BeerCollection;
