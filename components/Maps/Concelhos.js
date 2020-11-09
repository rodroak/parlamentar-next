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

  if (!pt) {
    return <div>Getting data...</div>;
  }

  function scale(scaleFactor, width, height) {
    return d3.geoTransform({
      point: function (x, y) {
        this.stream.point(
          (x - width / 2) * scaleFactor + width / 2,
          -(y - height / 2) * scaleFactor + height / 2
        );
      },
    });
  }

  const geoPath = d3.geoPath().projection(scale(0.001, WIDTH, HEIGHT));

  const onClickConcelho = (d) => {
    if (idSelected === d.properties.id) {
      idOnClick({
        id: "500000",
        name: "Território Nacional",
      });
      d3.select("#pt")
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
      d3.select("#pt")
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
        <g id="pt">
          {topojson.feature(pt, pt.objects.concelhos).features.map((d, i) => {
            return (
              <path
                key={`concelhos-${d.properties.id}`}
                d={geoPath(d)}
                fill={idFillColor(d.properties.id)}
                stroke={"#ffffff"}
                strokeWidth={0.2}
                className="concelho-map__item"
                onClick={() => onClickConcelho(d)}
              />
            );
          })}
          {topojson.feature(pt, pt.objects.distritos).features.map((d, i) => {
            return (
              <path
                key={`distritos-${d.properties.id}`}
                d={geoPath(d)}
                fill={"#ffffff"}
                className="pt-map__item"
                opacity={0}
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
            stroke={"#ffffff"}
            strokeWidth={1}
          />
        </g>
      </svg>
    </>
  );
};

export default Concelhos;
