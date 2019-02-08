import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import BeerCollection from '../../api/BeerCollection.js';

type Props = {
  beers: Array<{}>,
  page: number,
  perPage: number,
  render: Function,
};


function FetchBeersFromMongodb(props: Props) {
  const { render, beers } = props;
  
  return render(beers);
}


export default withTracker((props) => {
  const { page, perPage } = props;
  const limit = page * perPage;

  Meteor.subscribe('beers', limit);

  return {
    beers: BeerCollection.find(
      {},
      { sort: { id: 1 } },
    ).fetch(),
  };
})(FetchBeersFromMongodb);
