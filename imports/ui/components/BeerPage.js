// @flow
import React from 'react';

type Props = {
  name: string,
  tagline: string,
  image_url: string,
  ibu: number,
  abv: number,
  ebc: number,
  description: string,
  food_pairing: Array<string>,
  children?: Array,
};


function BeerPage(props: Props) {
  const {
    name,
    tagline,
    image_url: imageUrl,
    ibu,
    abv,
    ebc,
    description,
    food_pairing: foodPairing,
    children,
  } = props;

  return (
    <div className="beer-page p-3">
      <div className="row">
        <div className="col-sm-3">
          <img alt={name} src={imageUrl} className="img-fluid" />
        </div>

        <div className="col-sm-9">
          <h3 className="title">{name}</h3>
          <p>{tagline}</p>
          <hr />

          <div className="mb-3">
            <div className="d-inline-block mr-3">
              <strong>IBU: </strong>
              <span>{ibu}</span>
            </div>
            <div className="d-inline-block mr-3">
              <strong>ABV: </strong>
              <span>{abv}</span>
            </div>
            <div className="d-inline-block mr-3">
              <strong>EBC: </strong>
              <span>{ebc}</span>
            </div>
          </div>

          <div className="description mb-3">{description}</div>

          <div className="best-served-with">
            <h5>Best served with:</h5>
            <ul>
              {foodPairing.map((food, index) => <li key={index}>{food}</li>)}
            </ul>
          </div>
        </div>

        <div className="recommendations">{children}</div>
      </div>
    </div>
  );
}

BeerPage.defaultProps = {
  children: [],
}

export default BeerPage;
