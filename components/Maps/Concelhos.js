import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { getConcelhos } from "../../lib/data/eleicoes";

const Concelhos = ({ idFillColor }) => {
  const WIDTH = 350;
  const HEIGHT = 600;

  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    getConcelhos((concelhos) =>
      setGeographies(feature(concelhos, concelhos.objects.concelhos).features)
    );
  }, []);

  const albersProjection = d3
    .geoAlbers()
    .scale(6500)
    .rotate([7.8, 0])
    .center([0, 39.5])
    .translate([WIDTH / 2, HEIGHT / 2]);

  const geoPath = d3.geoPath().projection(albersProjection);

  return (
    <>
      <svg width={WIDTH} height={HEIGHT}>
        <g>
          {geographies.map((d, i) => {
            return (
              <path
                key={`path-${i}`}
                d={geoPath(d)}
                fill={idFillColor(d.properties.id)}
                stroke={"#FFFFFF"}
                strokeWidth={0.5}
              />
            );
          })}
        </g>
      </svg>
    </>
  );
};

export default Concelhos;
