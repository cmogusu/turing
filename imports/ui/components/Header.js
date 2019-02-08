import React from 'react';
import 'intersection-observer';
import { NavLink } from 'react-router-dom';


type Props = {
  children?: Function,
};


class Header extends React.Component<Props> {
  state = {
    isNavbarFixed: false,
  };

  visibilityElement = null;

  headerObserver = null;

  componentDidMount() {
    this.createNavbarIntersectionObserver();
  }

  componentWillUnmount() {
    this.headerObserver.unobserve(this.visibilityElement);
  }


  createNavbarIntersectionObserver = () => {
    const intersectionOptions = {
      root: null,
      rootMargin: '1px',
      threshold: 1,
    };
    const fixNavbarToTopOfPage = (entries) => {
      const { isIntersecting } = entries[0];

      this.setState({
        isNavbarFixed: !isIntersecting,
      });
    };

    this.headerObserver = new window.IntersectionObserver(fixNavbarToTopOfPage, intersectionOptions);
    this.headerObserver.observe(this.visibilityElement);
  };


  getNavbar = () => (
    <nav className="navbar navbar-expand-lg justify-content-end">
      <ul className="nav">
        <li className="nav-item">
          <NavLink strict className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/favourites">Favourite</NavLink>
        </li>
      </ul>
    </nav>
  );


  render() {
    const { children } = this.props;
    const { isNavbarFixed } = this.state;

    const fixedHeaderStyle = {
      transform: `translateY(${isNavbarFixed ? '0%' : '-100%'})`,
    };

    return (
      <React.Fragment>
        <div className="fixed-navbar-wrapper w-100 position-fixed" style={fixedHeaderStyle}>
          <div className="container">
            {this.getNavbar()}
          </div>
        </div>

        <header className="text-center p-3 mb-3">
          <div className="container">
            {this.getNavbar()}

            <div>
              <h1 className="font-weight-bold h2">The Beer Bank</h1>
              <p>Find your favourite beer here</p>
            </div>

            {children}

            <div ref={(element) => { this.visibilityElement = element; }} />
          </div>
        </header>
      </React.Fragment>
    );
  }
}


Header.defaultProps = {
  children: [],
};


export default Header;
