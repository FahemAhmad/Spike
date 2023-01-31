/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import CalenderComponent from "./CalenderComponent";
import "./Card.scss";

function Card({
  title,
  description,
  sharedWith,
  edit,
  isPersonal,
  setActionNumber,
  containerClick,
  eventTime,
  index,
}) {
  let newData = sharedWith?.map(JSON.stringify);
  newData = new Set(newData);
  newData = Array.from(newData)?.map(JSON.parse);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="card-container" onClick={() => containerClick(index)}>
      <div className="head">
        {title && (
          <h3>{title.length > 10 ? `${title.substring(0, 10)}...` : title}</h3>
        )}
        <AiFillEye
          className="icon"
          size={25}
          onClick={() => setActionNumber(2)}
        />
      </div>

      {description && (
        <h4 style={{ minHeight: 50, maxHeight: 50 }}>
          {description.length > 200
            ? `${description.substring(0, 200)}...`
            : description}
        </h4>
      )}

      {eventTime && <CalenderComponent eventTime={eventTime} />}
      {isPersonal ? (
        <span className="badge">
          <span className="badge-letter">P</span>
          Personal
        </span>
      ) : sharedWith ? (
        <div className="shared-user" style={{ gap: 10 }}>
          <p style={{ marginBottom: 10 }}>Shared with: </p>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {newData.map((s, index) => (
              <span className="badge" key={index}>
                <span className="badge-letter">{s?.email[0]}</span>
                {s.email}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="endnote">
        {edit && (
          <button className="card-edit" onClick={() => setActionNumber(3)}>
            Edit
          </button>
        )}
        <AiFillDelete
          size={26}
          color={"black"}
          onClick={() => setActionNumber(4)}
        />
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
