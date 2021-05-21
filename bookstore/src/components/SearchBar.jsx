import { FormControl } from "react-bootstrap";
import { Component } from "react";

class SearchBar extends Component {
  handleFilterTextChange = (e) => {
    this.props.onFilterTextChange(e.target.value);
  };
  render() {
    return (
      <FormControl
        type='text'
        placeholder='Search'
        className='mr-sm-2'
        onChange={this.handleFilterTextChange}
        style={{ position: "sticky", top: 0, zIndex: 1 }}
      />
    );
  }
}

export default SearchBar;
