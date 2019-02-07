// @flow
import React from 'react';

type Props = {
  setSearchQuery: Function,
};

class SearchForm extends React.Component<Props> {
  state = {
    searchTerm: '',
  };


  handleChange = (event) => {
    const { currentTarget } = event;
    const { value } = currentTarget;

    this.setState({ searchTerm: value });
    this.fetchBeers(value);
  };


  fetchBeers(searchTerm) {
    const { setSearchQuery } = this.props;
    const searchQuery = searchTerm ? `beer_name=${searchTerm}` : '';

    setSearchQuery(searchQuery);
  }


  render() {
    const { searchTerm } = this.state;

    return (
      <input
        onChange={this.handleChange}
        placeholder="Search for beer name"
        value={searchTerm}
        className="form-control"
      />
    );
  }
}

export default SearchForm;
