import { Card, Nav } from "react-bootstrap";
import React from "react";
import { formatter } from "./../lib/formatter";
import { CreateOutline } from "react-ionicons";
import { Link, withRouter } from "react-router-dom";
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

  handleOpenCommentsClick = (e) => {
    e.preventDefault();
    this.props.onDetailClick(this.props.product);
  };

  render() {
    return (
      <Card
        style={this.state.selected ? this.STYLE.selected : {}}
        as={Link}
        to={`/LatestReleases/${this.props.productId}`}>
        <Card.Img
          variant='top'
          src={this.props.product.imageUrl}
          className='img-fluid'
        />
        <Card.Body>
          <Card.Title>{this.props.product.name}</Card.Title>
          <p>{this.props.product.description} </p>
          <p>{formatter.format(parseFloat(this.props.product.price))} </p>
        </Card.Body>
        <Nav.Link
          type='button'
          className='backoffice-editbtn btn btn-light float-right mx-1'
          as={Link}
          to={`/backoffice/${this.props.productId}`}>
          <CreateOutline
            color={"#00000"}
            title={"creartet"}
            height='25px'
            width='25px'
          />
        </Nav.Link>
      </Card>
    );
  }
}

export default withRouter(Product);
