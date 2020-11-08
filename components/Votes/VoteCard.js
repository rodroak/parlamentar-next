import React from "react";
import { hexToRgb } from "../../lib/utils/utils";

export const VoteCardDummy = () => (
  <div className="vote-card vote-card-dummy">
    <div className="vote-card__stats">
      <img className="vote-card__party-icon" src="/mp_icon.png" alt="mp icon" />
      <p className="vote-card__party"></p>
      <p className="vote-card__type"></p>
      <i className="material-icons vote-card__pass">check_circle_outline</i>
    </div>
    <p className="vote-card__detail"></p>
  </div>
);

const VoteCard = ({
  voteData: { id, party, detail, type, passed },
  onClick,
  selected,
  selectedColor,
}) => {
  const { r, g, b } = hexToRgb(selectedColor);
  const voteCardStyles = {
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.05)`,
    border: `2px solid rgba(${r}, ${g}, ${b}, 0.8)`,
  };
  const selectedCardStyles = {
    color: `rgba(${r}, ${g}, ${b})`,
    fontWeight: 700,
  };
  return (
    <div
      className="vote-card"
      style={selected ? voteCardStyles : {}}
      onClick={onClick}
    >
      <div className="vote-card__stats">
        <img
          className="vote-card__party-icon"
          src="/mp_icon.png"
          alt="mp icon"
        />
        <p
          className="vote-card__party"
          style={selected ? selectedCardStyles : {}}
        >
          {party}
        </p>
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
