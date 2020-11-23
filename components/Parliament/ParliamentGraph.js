import React, { useState, useEffect } from "react";
import MP from "./MP";
import * as d3 from "d3";
import { first } from "lodash";

const ParliamentGraph = ({ MPs, partyInfo, selectedVote }) => {
  // HOVER MP

  const onMouseOverMP = (party) => {
    d3.selectAll(".parliament__mp, .parliament__legend-item")
      .transition("hover-MP")
      .style("opacity", 0.2)
      .duration(250)
      .ease(d3.easeCubicOut);
    d3.selectAll(`.parliament__mp-${party}, .parliament__legend-item-${party}`)
      .transition("hover-MP")
      .style("opacity", 1)
      .duration(250)
      .ease(d3.easeCubicOut);
  };

  const onMouseLeaveMP = () => {
    d3.selectAll(".parliament__mp, .parliament__legend-item")
      .transition("hover-MP")
      .style("opacity", 1)
      .duration(1000)
      .ease(d3.easeCubicOut);
  };

  // GET WIDTH & HEIGHT FOR HEMICYCLE

  const MAX_PER_COLUMN = 24;
  const PER_ROW_BASIS = 5;
  const COLUMN_GAP = 16;
  const SPACIOUS = 2.5;

  const r = Number(MPs[0].r);
  const width = d3.max(MPs.map((d) => Number(d.cx))) + r + 20;
  const parliamentHeight = d3.max(MPs.map((d) => Number(d.cy))) + r;
  const height = r * (MAX_PER_COLUMN + 1) * SPACIOUS + 20;

  // SCALE FOR THE LEGEND

  const legendScale = d3
    .scaleBand()
    .domain(partyInfo.map((d) => d.party))
    .range([r * 2, r * (2 + partyInfo.length * SPACIOUS)]);

  // SCALES FOR WHEN VOTE IS SELECTED

  const voteVars = {
    for: {},
    against: {},
    abstention: {},
  };

  for (const pos of ["for", "against", "abstention"]) {
    voteVars[pos].total = selectedVote
      ? selectedVote.votesDetail.filter((d) => d.position === pos).length
      : 0;

    if (voteVars[pos].total < PER_ROW_BASIS) {
      voteVars[pos].perRow = voteVars[pos].total;
    } else if (voteVars[pos].total > PER_ROW_BASIS * MAX_PER_COLUMN) {
      voteVars[pos].perRow = Math.ceil(voteVars[pos].total / MAX_PER_COLUMN);
    } else {
      voteVars[pos].perRow = PER_ROW_BASIS;
    }

    voteVars[pos].xScale = d3
      .scaleLinear()
      .domain([0, voteVars[pos].perRow])
      .range([
        (-r * voteVars[pos].perRow * SPACIOUS) / 2,
        (r * voteVars[pos].perRow * SPACIOUS) / 2,
      ]);

    voteVars[pos].width =
      voteVars[pos].total === 0
        ? 0
        : voteVars[pos].total < PER_ROW_BASIS
        ? (r * PER_ROW_BASIS * SPACIOUS) / 2
        : voteVars[pos].xScale(voteVars[pos].perRow) + COLUMN_GAP / 2;
  }

  voteVars.for.displacement =
    voteVars.against.width > 0
      ? -voteVars.against.width - voteVars.for.width
      : voteVars.abstention.width > 0
      ? -(voteVars.abstention.width + voteVars.for.width) / 2
      : 0;

  voteVars.against.displacement = 0;

  voteVars.abstention.displacement =
    voteVars.against.width > 0
      ? voteVars.against.width + voteVars.abstention.width
      : voteVars.for.width > 0
      ? (voteVars.abstention.width + voteVars.for.width) / 2
      : 0;

  const yScale = d3
    .scaleLinear()
    .domain([0, MAX_PER_COLUMN])
    .range([height - r, height - r * MAX_PER_COLUMN * SPACIOUS]);
    
  // LIST OF MPS

  const MPsList = selectedVote ? selectedVote.votesDetail : MPs;

  return (
    <svg
      id="parliament__svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid"
      width="100%"
      height="100%"
    >
      <g id="parliament__graph">
        {MPsList.map((d) => (
          <MP
            cx={
              selectedVote
                ? voteVars[d.position].xScale(
                    d.positionIndex % voteVars[d.position].perRow
                  ) +
                  width / 2 +
                  voteVars[d.position].displacement
                : Number(d.cx) + 10
            }
            cy={
              selectedVote
                ? yScale(
                    Math.floor(d.positionIndex / voteVars[d.position].perRow)
                  ) - 30
                : Number(d.cy) + height - parliamentHeight - 30
            }
            r={r}
            fill={d.fillColor}
            party={d.party}
            partyIndex={d.partyIndex}
            onMouseOver={() => onMouseOverMP(d.party)}
            onMouseLeave={onMouseLeaveMP}
            key={`${d.party}-${d.partyIndex}`}
          />
        ))}
      </g>
      <g id="parliament__legend" transform={`translate(${width - 30}, ${0})`}>
        {partyInfo
          .filter((d) => d.party !== "Governo")
          .map((d) => (
            <g key={d.party + "_legend"}>
              <MP
                cx={0}
                cy={legendScale(d.party)}
                r={r}
                fill={d.info.fillColor}
                party={d.party}
                onMouseOver={() => onMouseOverMP(d.party)}
                onMouseLeave={() => onMouseLeaveMP()}
              />
              <text
                x={12}
                y={legendScale(d.party) + r / 2}
                fontSize={r * 1.6}
                className={`parliament__legend-item parliament__legend-item-${d.party}`}
                onMouseOver={() => onMouseOverMP(d.party)}
                onMouseLeave={() => onMouseLeaveMP()}
              >
                {d.party}
              </text>
            </g>
          ))}
      </g>
      {selectedVote && (
        <>
          <image
            href="https://firebasestorage.googleapis.com/v0/b/parlamentar-915f4.appspot.com/o/for.svg?alt=media&amp;token=0619ef39-85ac-4431-af4a-ebbca64b5552"
            width="20"
            height="20"
            x={
              voteVars.for.xScale(voteVars.for.perRow / 2) -
              r - // Center in column
              10 + // Width of image
              voteVars.for.displacement +
              width / 2 // Center within parliament graph
            }
            y={height - 20}
            opacity={voteVars.for.total ? 1 : 0}
          />
          <image
            href="https://firebasestorage.googleapis.com/v0/b/parlamentar-915f4.appspot.com/o/against.svg?alt=media&amp;token=65d1c57b-b6f9-4334-9f61-de8a2dadf294"
            width="20"
            height="20"
            x={
              voteVars.against.xScale(voteVars.against.perRow / 2) -
              r -
              10 +
              width / 2
            }
            y={height - 20}
            opacity={voteVars.against.total ? 1 : 0}
          />
          <image
            href="https://firebasestorage.googleapis.com/v0/b/parlamentar-915f4.appspot.com/o/abstention.svg?alt=media&amp;token=ad1977d9-d3d5-4f31-bdcb-0df9f36c99d1"
            width="20"
            height="20"
            x={
              voteVars.abstention.xScale(voteVars.abstention.perRow / 2) -
              r -
              10 +
              voteVars.abstention.displacement +
              width / 2
            }
            y={height - 20}
            opacity={voteVars.abstention.total ? 1 : 0}
          />
        </>
      )}
    </svg>
  );
};

export default ParliamentGraph;
