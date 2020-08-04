import React from "react";
import "./App.css";
import AutoCompleteText from "./AutoCompleteText";
import countries from "./Countries";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      selectedCountry: [],
    };
  }

  countChanged = () => {
    this.setState({
      count: countries.length,
    });
  };

  resetCount = () => {
    this.setState({
      count: 5,
      selectedCountry: [],
    });
  };

  displayCountry = () => {
    this.setState({
      selectedCountry: this.state.selectedCountry[
        this.state.selectedCountry.length - 1
      ],
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-Component">
          <div className="App-Component">
            <AutoCompleteText
              items={countries}
              count={this.state.count}
              countChanged={this.countChanged}
              resetCount={this.resetCount}
              selectedCountry={this.state.selectedCountry}
              displayCountry={this.displayCountry}
            />
            {this.state.selectedCountry.length !== 0 ? 
              <p>Selected Country is {this.state.selectedCountry}</p>
             : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
