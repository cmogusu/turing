import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { forEach } from 'lodash';
// import SimpleSchema from 'meteor/aldeed:simple-schema';


const BeerCollection = new Mongo.Collection('beers');

/*
BeerCollection.schema = new SimpleSchema({
  img: {
    type: String,
    label: 'User id of owner',
  },
  name: {
    type: String,
    label: 'User id of owner',
  },
  vehicleClass: {
    type: String,
    label: 'User id of owner',
  },
  passengers: {
    type: String,
    label: 'User id of owner',
  },
  luggage: {
    type: String,
    label: 'User id of owner',
  },
  price: {
    type: String,
    label: 'User id of owner',
  },
  createdAt: {
    type: Object,
    label: 'User id of owner',
  },
  owner: {
    type: String,
    label: 'Username of owner',
  },
  username: {
    type: String,
    label: 'User id of owner',
  },
  origin?: Location,
  destination?: Location,
  waypoints?: Array<Location>,
  hasSubmited?: boolean,
  date?: {},
  isReturnJourney?: boolean,
  passengers?: number,
  totalDistance?: number,
  totalDuration?: number,
});
*/

if (Meteor.isServer) {
  Meteor.publish('beers', () => BeerCollection.find());
}

Meteor.methods({
  'beers.addFavourite'(beer) {
    check(beer, Object);

    const { id } = beer;
    const favouritedBeer = Object.assign({}, beer, {
      isFavourite: true,
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
