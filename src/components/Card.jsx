import React from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import CalenderComponent from "./CalenderComponent";
import "./Card.scss";

function Card() {
  return (
    <div className="card-container">
      <div className="head">
        <h3>Event Title</h3>
        <AiFillEye className="icon" size={25} />
      </div>
      <h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, illum?
      </h4>
      <CalenderComponent />
      <div className="shared-user">
        <p>Shared with:</p>
        <p className="badge">
          <span className="badge-letter">L</span>Lorem Ipsum
        </p>
      </div>
      <div className="endnote">
        <button className="card-edit">Edit</button>
        <AiFillDelete size={26} color={"black"} />
      </div>
    </div>
  );
}

export default Card;

// Title - view     all
// Description     !Task
// calender        events only
// Shared          all
// edit            !event
// delete     all
