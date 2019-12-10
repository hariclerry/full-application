import React from 'react';

const NavBar = ({counters}) => {
  return ( 
    <nav className="navbar navbar-light bg-light">
  <a className="navbar-brand" href="/">Navbar</a>
  <div className="badge m-2 badge-secondary" >{counters.length}</div>
</nav>


   );
}
 
export default NavBar;