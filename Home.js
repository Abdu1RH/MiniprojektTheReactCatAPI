import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <h1>Welcome</h1>
      <br></br>
      <Link to="/cats">View Cat Pictures</Link>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>Favorite function is not available yet</p>
      <Link to="/favorites"> View Favorites</Link>
    </div>
  );
}

export default Home;
