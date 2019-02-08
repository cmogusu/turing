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
  animateBeerOnScroll?: Function,
};


class Beer extends React.Component<Props> {
  static defaultProps = {
    animateBeerOnScroll: null,
  };

  wrapperElement = null;

  componentDidMount() {
    const { animateBeerOnScroll } = this.props;

    if (animateBeerOnScroll && this.wrapperElement) {
      animateBeerOnScroll(this.wrapperElement);
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
    } = this.props;
    const {
      name,
      tagline,
      image_url: imageUrl,
    } = beer;

    return (
      <div className="col-lg-4 col-md-6 beer mb-3">
        <div
          className="text-center p-3 mr-md-3 border rounded h-100"
          ref={(element) => { this.wrapperElement = element; }}
        >
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
              className="img-fluid lazy-load beer-image"
            />
            <h3 className="title">
              {name}
            </h3>
            <p className="mb-1">{tagline}</p>
          </div>
          <Favourite beer={beer} />
        </div>
      </div>
    );
  }
}

export default Beer;
