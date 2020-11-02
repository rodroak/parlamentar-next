import React from "react";

const VoteCard = ({ id, party, detail, type, passed, onClick }) => {
  return (
    <div className="vote-card" onClick={onClick}>
      <div className="vote-card__stats">
        <img
          className="vote-card__party-icon"
          src="/mp_icon.png"
          alt="mp icon"
        />
        <p className="vote-card__party-icon">{party}</p>
        <p className="vote-card__type">{type}</p>
        {passed ? (
          <i className="material-icons vote-card__pass">check_circle_outline</i>
        ) : (
          <i className="material-icons vote-card__fail">highlight_off</i>
        )}
      </div>
      <p className="vote-card__detail">{detail}</p>
    </div>
  );
};

export default VoteCard;
