// @flow
import React from 'react';

type Props = {
  name: string,
  image_url: string,
  setClicked: Function,
};


class RecommendedBeer extends React.Component<Props> {
  handleKeyUp = (event) => {
    const { setClicked } = this.props;
    const { currentTarget } = event;

    setClicked(currentTarget);
  };


  setFavourite = () => {
    console.log('i was Favourited!!');
  };


  render() {
    const {
      name,
      setClicked,
      image_url: imageUrl,
    } = this.props;

    return (
      <div
        className="col-sm-4 mb-3 recommended-beer"
        onClick={setClicked}
        onKeyUp={this.handleKeyUp}
        role="button"
        tabIndex={0}
      >
        <div className="text-center p-3 mr-md-3 border rounded">
          <img alt={name} src={imageUrl} className="img-fluid" />
          <h4 className="title">{name}</h4>
        </div>
      </div>
    );
  }
}

export default RecommendedBeer;
