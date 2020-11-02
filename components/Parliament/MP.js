import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const MP = ({
  cx,
  cy,
  r,
  fill,
  party,
  partyIndex,
  onMouseOver,
  onMouseLeave,
}) => {
  const [coords, setCoords] = useState({ cx, cy });

  useEffect(() => {
    if (coords.cx !== cx || coords.cy !== cy) {
      d3.select(`.parliament__mp${party}-${partyIndex}`)
        .transition("move-MP")
        .attr("cx", cx)
        .attr("cy", cy)
        .duration(500)
        .ease(d3.easeCubicInOut)
        .on("end", () => setCoords({ cx, cy }));
    }
  }, [cx, cy]);

  return (
    <circle
      cx={coords.cx}
      cy={coords.cy}
      r={r}
      style={{ fill: fill }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className={`parliament__mp parliament__mp-${party} parliament__mp${party}-${partyIndex}`}
    />
  );
};

export default MP;
