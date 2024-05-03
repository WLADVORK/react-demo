import React from 'react';

import './add-item.css';

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    console.log(e.target.value);
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form className="addItem d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.label}
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="lol"
        />
        <button className="btn btn-outline-secondary">add item</button>
      </form>
    );
  }
}
