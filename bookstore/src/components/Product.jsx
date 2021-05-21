import { Card } from "react-bootstrap";
import React from "react";
import { formatter } from "./../lib/formatter";
import { CreateOutline } from "react-ionicons";
import { Link } from "react-router-dom";
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.STYLE = {
      selected: {
        backgroundColor: "#EEEEF0",
        transform: "scale(1.04)",
        transition: "all 0.2s ease",
      },
    };
  }

  state = {
    selected: false,
  };

  handleOpenCommentsClick = () => {
    this.props.onDetailClick(this.props.product);
  };

  render() {
    return (
      <Card
        style={this.state.selected ? this.STYLE.selected : {}}
        onClick={this.handleOpenCommentsClick}>
        <Card.Img variant='top' src={this.props.product.imageUrl} />
        <Card.Body>
          <Card.Title>{this.props.product.name}</Card.Title>
          <p>{this.props.product.description} </p>
          <p>${formatter.format(parseFloat(this.props.product.price))} </p>
        </Card.Body>
        <button
          type='button'
          className='backoffice-editbtn btn btn-light float-right mx-1'
          as={Link}
          to={`/backoffice/${this.props.product._id}`}>
          <CreateOutline
            color={"#00000"}
            title={"creartet"}
            height='25px'
            width='25px'
          />
        </button>
      </Card>
    );
  }
}

export default Product;
