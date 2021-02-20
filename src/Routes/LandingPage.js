import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

export default class LandingPage extends React.Component {


  render() {
    return(
      <div className = 'landing'>
        <h1>Welcome to the Petful FIFO Shelter!</h1>
        <p>
            We operate on a FIFO model. We only have cats and dogs in our shelter, and only the one from each animal who has been
            in our shelter the longest can be adopted. Moreover, you can only adopt when it's your turn in the queue. You can start
            the process by clicking on the link below and adding your name to the end of the queue. You'll know when it's your turn.
            Happy adopting! 
        </p>
        <Link className='link' to={"/adoption"}>Start the adoption process</Link>
      </div>
    )
  }
}