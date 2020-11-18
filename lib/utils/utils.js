export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getType = (id) => {
  if (id === "500000") return "pt";
  else if (id.slice(2, 6) === "0000") return "distrito";
  else if (id.slice(4, 6) === "00") return "concelho";
  else return "freguesia";
};
