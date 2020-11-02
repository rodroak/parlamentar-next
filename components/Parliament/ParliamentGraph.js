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

  const r = Number(MPs[0].r);
  const width = d3.max(MPs.map((d) => Number(d.cx))) + r + 50;
  const height = r * 25 * 2.5 + 20;

  // SCALE FOR THE LEGEND

  const legendScale = d3
    .scaleBand()
    .domain(partyInfo.map((d) => d.party))
    .range([r * 2, r * (2 + partyInfo.length * 2.5)]);

  // SCALES FOR WHEN VOTE IS SELECTED

  const perRow = 5;
  const xScale = d3
    .scaleLinear()
    .domain([0, perRow])
    .range([-r * perRow * 1.25, r * perRow * 1.25]);
  const yScale = d3
    .scaleLinear()
    .domain([0, 25])
    .range([height - r, height - r * 25 * 2.5]);

  // LIST OF MPS

  const MPsList = selectedVote ? selectedVote.votesDetail : MPs;

  return (
    <svg
      id="parliament__svg"
      viewBox={`0 0 ${width} ${height}`}
      width="auto"
      height="auto"
    >
      <g id="parliament__graph">
        {MPsList.map((d) => (
          <MP
            cx={
              selectedVote
                ? xScale(d.positionIndex % perRow) +
                  (width - 50) / 2 +
                  (d.position === "for"
                    ? -xScale(perRow) * 2 - 15
                    : d.position === "abstention"
                    ? xScale(perRow) * 2 + 15
                    : 0)
                : d.cx
            }
            cy={
              selectedVote
                ? yScale(Math.floor(d.positionIndex / perRow)) - 30
                : d.cy
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
      <g id="parliament__legend" transform={`translate(${width - 35}, ${0})`}>
        {partyInfo.map((d) => (
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
              xScale(Math.floor(perRow / 2)) - // Center in column
              10 - // Width of image
              xScale(perRow) * 2 - // Width of other columns
              15 + // Gap between columns
              (width - 50) / 2 // Center within parliament graph
            }
            y={height - 20}
          />
          <image
            href="https://firebasestorage.googleapis.com/v0/b/parlamentar-915f4.appspot.com/o/against.svg?alt=media&amp;token=65d1c57b-b6f9-4334-9f61-de8a2dadf294"
            width="20"
            height="20"
            x={xScale(Math.floor(perRow / 2)) - 10 + (width - 50) / 2}
            y={height - 20}
          />
          <image
            href="https://firebasestorage.googleapis.com/v0/b/parlamentar-915f4.appspot.com/o/abstention.svg?alt=media&amp;token=ad1977d9-d3d5-4f31-bdcb-0df9f36c99d1"
            width="20"
            height="20"
            x={
              xScale(Math.floor(perRow / 2)) -
              10 +
              xScale(perRow) * 2 +
              15 +
              (width - 50) / 2
            }
            y={height - 20}
          />
        </>
      )}
    </svg>
  );
};

export default ParliamentGraph;
