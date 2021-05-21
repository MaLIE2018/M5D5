import { Row, CardColumns, Col, Container } from "react-bootstrap";
import "../styles/css/latestReleases.css";
import React from "react";
import CommentArea from "../components/CommentArea";
import Product from "../components/Product";

class LatestReleases extends React.Component {
  state = {
    currentProduct: {},
    products: [],
    loading: true,
  };

  handleClick = (currentProduct) => {
    this.setState((state) => {
      return { currentProduct: currentProduct };
    });
  };

  async getData() {
    try {
      const res = await fetch("http://localhost:3001/products");
      if (!res.ok) throw "something went wrong";
      const data = await res.json();
      this.setState((state) => {
        return { ...state, products: data, loading: false };
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>;
    } else {
      console.log(this.state.products);
      return (
        <Row className='bookrow mt-2 ml-2'>
          <Col md={7}>
            <Row>
              {this.state.products.map((product) => (
                <Col>
                  <Product
                    key={product._id}
                    product={product}
                    onDetailClick={this.handleClick}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={5}>
            {<CommentArea currentProduct={this.state.currentProduct} />}
          </Col>
        </Row>
      );
    }
  }
}

export default LatestReleases;
