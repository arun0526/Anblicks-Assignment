import React from "react";
import "./AutoCompleteText.css";

class AutoCompleteText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
      selected: false,
      authenticated: true,
      notauthenticated: false,
    };
  }

  authenticated = (e) => {
    this.setState({
      authenticated: true,
      notauthenticated: false,
    });
  };

  notAuthenticated = (e) => {
    this.setState({
      authenticated: false,
      notauthenticated: true,
    });
  };

  onTextChanged = (e) => {
    this.props.resetCount();
    const { items } = this.props;
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = items.sort().filter((v) => regex.test(v));
    }
    this.setState(() => ({
      suggestions,
      text: value,
      selected: false,
    }));
  };

  suggestionsSelected(value) {
    this.props.selectedCountry.push(value);
    this.props.displayCountry();
    this.setState({
      text: value,
      suggestions: [],
      selected: true,
    });
  }

  addCountry = () => {
    this.props.items.push(this.state.text);
    this.setState({
      suggestions: [...this.state.suggestions, this.state.text],
    });
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      if (this.state.text.length !== 0 && !this.state.selected) {
        return (
          <ul>
            <li>
              <b>{this.state.text}</b> Not Found{" "}
              {this.state.authenticated ? (
                <button onClick={this.addCountry} className="add-button">
                  Add & Select
                </button>
              ) : null}
            </li>
          </ul>
        );
      } else {
        return null;
      }
    }

    return (
      <ul>
        {suggestions.slice(0, this.props.count).map((item, index) => (
          <li key={index} onClick={() => this.suggestionsSelected(item)}>
            {item}
          </li>
        ))}
        {suggestions.length > this.props.count ? (
          <span className="count" onClick={this.props.countChanged}>
            <small>{suggestions.length - 5} more</small>
          </span>
        ) : null}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <p className="user">
          <span className="user-type">
            <input
              type="radio"
              value="authenticated"
              onChange={this.authenticated}
              checked={this.state.authenticated === true}
            />
            <span>Authenticated</span>
          </span>
          <span className="user-type">
            <input
              type="radio"
              value="notAuthenticated"
              onChange={this.notAuthenticated}
              checked={this.state.notauthenticated === true}
            />
            <span>Not Authenticated</span>
          </span>
        </p>
        <div className="AutoCompleteText">
          <input
            type="text"
            placeholder="Search a location ..."
            value={this.state.text}
            onChange={this.onTextChanged}
          />
          {this.renderSuggestions()}
        </div>
      </div>
    );
  }
}

export default AutoCompleteText;
