// @flow
import React from 'react';
import Favourite from './Favourite.js';


type Props = {
  beer: {
    name: string,
    tagline: string,
    image_url: string,
  },
  setClicked: Function,
  toggleFavourite: Function,
  loadBeerImageOnScroll?: Function,
};


class Beer extends React.Component<Props> {
  static defaultProps = {
    loadBeerImageOnScroll: null,
  };

  imageElement = null;


  componentDidMount() {
    const { loadBeerImageOnScroll } = this.props;

    if (loadBeerImageOnScroll) {
      loadBeerImageOnScroll(this.imgElement);
    }
  }


  handleKeyUp = (event) => {
    const { setClicked } = this.props;
    
    if (event.which === 13) {
      setClicked();
    }
  };


  render() {
    const {
      beer,
      setClicked,
      toggleFavourite,
    } = this.props;
    const {
      name,
      tagline,
      image_url: imageUrl,
    } = beer;

    return (
      <div className="col-lg-4 col-md-6 beer mb-3">
        <div className="text-center p-3 mr-3 border rounded h-100">
          <div
            role="button"
            tabIndex={0}
            onClick={setClicked}
            onKeyUp={this.handleKeyUp}
          >
            <img
              alt={name}
              src="placeholder.jpg"
              data-src={imageUrl}
              ref={(element) => { this.imgElement = element; }}
              className="img-fluid lazy-load"
            />
            <h3 className="title">
              {name}
            </h3>
            <p>{tagline}</p>
          </div>
          <Favourite beer={beer} />
        </div>
      </div>
    );
  }
}

export default Beer;
