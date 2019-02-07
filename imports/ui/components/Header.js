import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  children?: Function,
};


function Header(props: Props) {
  const { children } = props;

  return (
    <header className="text-center px-3 mb-3">
      <div className="pt-3 navbar-wrapper w-100">
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
      </div>
      <div className="pb-3">
        <div>
          <h1 className="font-weight-bold h2">The Beer Bank</h1>
          <p>Find your favourite beer here</p>
        </div>
        {children}
      </div>
    </header>
  );
}


Header.defaultProps = {
  children: [],
};


export default Header;
