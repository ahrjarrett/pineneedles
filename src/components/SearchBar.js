import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.filterStudents(this.state.term);
  // };

  handleChange = e => {
    const term = e.target.value;
    console.log(term);
    this.setState({ term });
    // this.setState({ term }, (nextProps, nextState) => this.props.filterStudents(nextState.term));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="Nav-search-form">
          <input
            className="Nav-search-input"
            placeholder="Search students"
            type="text"
            value={this.state.term}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
