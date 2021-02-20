import React from "react";
import './People.css'


export default function People(props) {
  const data = props.people.map((x, id) => {
    return <li className='people_list' key={id}>{x}</li>;
  });

  return (
    <div className='people'>
      <h3>Our current waitlist:</h3>
      <ul>{data}</ul>
      {props.enableSubmit &&<form className = 'name_submit' onSubmit={props.submitName}>
      <input type="text" placeholder="Enter your name" value={props.name} onChange={props.setName} />
      <button>Submit</button>
      </form>}
    </div>
  );
}