import React from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import CalenderComponent from "./CalenderComponent";
import "./Card.scss";

function Card({
  title,
  description,
  sharedWith,
  setCallback,
  offCallback,
  edit,
  calender,
}) {
  let newData = sharedWith.map(JSON.stringify);
  newData = new Set(newData);
  newData = Array.from(newData).map(JSON.parse);

  return (
    <div className="card-container">
      <div className="head">
        {title && <h3>{title.substring(0, 10)}....</h3>}
        <AiFillEye className="icon" size={25} onClick={setCallback} />
      </div>
      {description && <h4>{description}</h4>}
      {calender && <CalenderComponent />}
      {sharedWith && (
        <div className="shared-user">
          <p>Shared with: </p>
          {newData.map((s, index) => (
            <p className="badge" key={index}>
              <span className="badge-letter">{s.email[0]}</span>
              {s.email}
            </p>
          ))}
        </div>
      )}
      <div className="endnote">
        {edit && <button className="card-edit">Edit</button>}
        <AiFillDelete size={26} color={"black"} onClick={offCallback} />
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
