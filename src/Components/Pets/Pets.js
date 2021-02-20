import React from "react";
import './Pets.css'

export default function Pets(props) {

  return (
    <div className= 'pets'>
      {props.cat&&<ul>
        <li>
          <img className='pet_image' alt={props.cat.description} src={props.cat.imageURL} />
        </li>
        <li>Description: {props.cat.description}</li>
        <li>Name: {props.cat.name}</li>
        <li>Gender: {props.cat.gender}</li>
        <li>Breed: {props.cat.breed}</li>
        <li>Journey: {props.cat.story}</li>
      </ul>
      }
      {props.cat && props.showAdopt && (
        <button onClick={() => props.adoptAnimal("cat")}>Adopt me!</button>
      )}
    {props.dog &&
      <ul>
        <li>
          <img className='pet_image' alt={props.dog.description} src={props.dog.imageURL} />
        </li>
        <li>Description: {props.dog.description}</li>
        <li>Name: {props.dog.name}</li>
        <li>Gender: {props.dog.gender}</li>
        <li>Breed: {props.dog.breed}</li>
        <li>Journey: {props.dog.story}</li>
      </ul>
}
      {props.dog && props.showAdopt && (
        <button onClick={() => props.adoptAnimal("dog")}>Adopt me!</button>
      )}
      <div>
        {props.showAdopt && (
        <button onClick={() => props.adoptAnimal('all')}>Adopt both!</button>
      )}
      </div>
    </div>
  );
}