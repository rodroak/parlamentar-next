import { detect } from "detect-browser";

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isChrome: false,
    };
  }

  componentDidMount() {
    const browser = detect();
    this.setState({
      isChrome: browser.name === "chrome",
      value: this.props.value,
    });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { isChrome, value } = this.state;
    const { min, max,color } = this.props;
    const newValue = Number(((value - min) * 100) / (max - min));
    const newPosition = 11 - newValue * 0.26;

    return (
      <div className="range-container">
        <p className="range-min">{min}</p>
        <div className="range-wrapper">
          <input
            className="range"
            min={min}
            max={max}
            type="range"
            value={value}
            onChange={this.handleChange}
            style={{
              background: isChrome
                ? `linear-gradient(90deg, ${color} 0%, ${color} ${newValue}%, #a7a7a7 ${newValue}%, #a7a7a7 100%)`
                : "transparent",
            }}
          />
          <p
            className="range-value"
            style={{
              left: `calc(${newValue}% + (${newPosition}px))`,
            }}
          >
            {value}
          </p>
        </div>
        <p className="range-max">{max}</p>
      </div>
    );
  }
}

export default Range;
