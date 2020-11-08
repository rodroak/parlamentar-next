import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { getConcelhos } from "../../lib/data/eleicoes";

const Concelhos = ({ idFillColor, idOnClick, idSelected }) => {
  const WIDTH = 350;
  const HEIGHT = 600;

  const [pt, setPt] = useState(null);

  useEffect(() => {
    getConcelhos((pt) => setPt(pt));
  }, []);

  const albersContinente = d3
    .geoAlbers()
    .scale(6500)
    .rotate([7.8, 0])
    .center([0, 39.55])
    .translate([WIDTH / 2, HEIGHT / 2]);

  const geoPath = d3.geoPath().projection(albersContinente);

  if (!pt) {
    return <div></div>;
  }

  const onClickConcelho = (d) => {
    if (idSelected === d.properties.id) {
      idOnClick({
        id: "500000",
        name: "Território Nacional",
      });
      d3.select("#concelhos")
        .transition()
        .duration(750)
        .attr("transform", "translate(0, 0)");
    } else {
      const bounds = geoPath.bounds(d);
      const dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];
      const x = (bounds[0][0] + bounds[1][0]) / 2;
      const y = (bounds[0][1] + bounds[1][1]) / 2;
      const scale = 0.9 / Math.max(dx / WIDTH, dy / HEIGHT);
      const translate = [WIDTH / 2 - scale * x, HEIGHT / 2 - scale * y];
      idOnClick({ ...d.properties });
      d3.select("#concelhos")
        .transition()
        .duration(750)
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
    }
  };

  return (
    <>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid"
        width="100%"
        height="100%"
      >
        <g id="concelhos">
          {topojson.feature(pt, pt.objects.concelhos).features.map((d, i) => {
            return (
              <path
                key={`concelhos-${d.properties.id}`}
                d={geoPath(d)}
                fill={idFillColor(d.properties.id)}
                stroke={"#f1f1f1"}
                strokeWidth={0.2}
                className="concelhos-map__item"
                opacity={idSelected === d.properties.id ? 1 : 0.5}
                onClick={() => onClickConcelho(d)}
              />
            );
          })}
          <path
            key={`path-districts`}
            d={geoPath(
              topojson.mesh(pt, pt.objects.distritos, (a, b) => a !== b)
            )}
            fill={"none"}
            stroke={"#FFFFFF"}
            strokeWidth={1}
          />
        </g>
      </svg>
    </>
  );
};

export default Concelhos;
