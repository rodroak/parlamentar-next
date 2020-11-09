import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { getConcelhos } from "../../lib/data/eleicoes";

const MapPT = ({ idFillColor, idOnClick, idSelected }) => {
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

  const zoomToArea = (d) => {
    const bounds = geoPath.bounds(d);
    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = 0.9 / Math.max(dx / WIDTH, dy / HEIGHT);
    const translate = [WIDTH / 2 - scale * x, HEIGHT / 2 - scale * y];
    d3.select("#map-pt")
      .transition()
      .duration(750)
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
  };

  const getType = (id) => {
    if (id === "500000") return "pt";
    else if (id.slice(2, 6) === "0000") return "distrito";
    else if (id.slice(4, 6) === "00") return "concelho";
    else return "freguesia";
  };

  const zoomOut = () => {
    idOnClick({
      id: "500000",
      name: "Território Nacional",
    });
    d3.select("#map-pt")
      .transition()
      .duration(750)
      .attr("transform", "translate(0, 0)");
  };

  return (
    <>
      <svg
        className="map-pt__svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid"
        width="100%"
        height="100%"
      >
        <g id="map-pt">
          <rect height={HEIGHT} width={WIDTH} opacity={0} onClick={zoomOut} />
          {(getType(idSelected) === "concelho" ||
            getType(idSelected) === "freguesia") &&
            topojson
              .feature(pt, pt.objects.freguesias)
              .features.filter(
                (d) => d.properties.id.slice(0, 4) === idSelected.slice(0, 4)
              )
              .map((d, i) => {
                return (
                  <path
                    key={d.properties.id}
                    d={geoPath(d)}
                    stroke={"#f1f1f1"}
                    strokeWidth={0.05}
                    fill={idFillColor(d.properties.id)}
                    className={`map-pt__freguesia ${
                      idSelected !== d.properties.id && "map-pt__selectable"
                    } ${
                      getType(idSelected) === "freguesia" &&
                      idSelected !== d.properties.id &&
                      "map-pt__bw"
                    }`}
                    onClick={() => {
                      idOnClick({ ...d.properties });
                    }}
                  />
                );
              })}
          {topojson.feature(pt, pt.objects.concelhos).features.map((d, i) => {
            if (idSelected.slice(0, 4) === d.properties.id.slice(0, 4))
              return null;
            return (
              <path
                key={d.properties.id}
                d={geoPath(d)}
                stroke={"#f1f1f1"}
                strokeWidth={0.2}
                fill={idFillColor(d.properties.id)}
                className={`map-pt__concelho ${
                  idSelected.slice(0, 2) === d.properties.id.slice(0, 2) &&
                  "map-pt__selectable"
                } ${
                  (getType(idSelected) === "concelho" ||
                    getType(idSelected) === "freguesia") &&
                  idSelected.slice(0, 4) !== d.properties.id.slice(0, 4) &&
                  idSelected.slice(0, 2) === d.properties.id.slice(0, 2) &&
                  "map-pt__bw"
                }`}
                onClick={() => {
                  if (idSelected.slice(0, 2) === d.properties.id.slice(0, 2)) {
                    zoomToArea(d);
                    idOnClick({ ...d.properties });
                  }
                }}
              />
            );
          })}
          {topojson.feature(pt, pt.objects.distritos).features.map((d, i) => {
            if (idSelected.slice(0, 2) === d.properties.id.slice(0, 2))
              return null;
            return (
              <path
                key={d.properties.id}
                d={geoPath(d)}
                stroke={"#f1f1f1"}
                strokeWidth={1}
                className={`map-pt__distrito map-pt__trans map-pt__selectable ${
                  getType(idSelected) !== "pt" &&
                  idSelected.slice(0, 2) !== d.properties.id.slice(0, 2) &&
                  "map-pt__bw"
                }`}
                onClick={() => {
                  zoomToArea(d);
                  idOnClick({ ...d.properties });
                }}
              />
            );
          })}
        </g>
      </svg>
      {getType(idSelected) !== "pt" && (
        <button className="map-pt__zoom-out" onClick={zoomOut}>
          <i className="material-icons">zoom_out_map</i>
        </button>
      )}
    </>
  );
};

export default MapPT;
