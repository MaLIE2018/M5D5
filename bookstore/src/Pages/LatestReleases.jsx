import { Row, CardColumns, Col, Container } from "react-bootstrap";
import "../styles/css/latestReleases.css";
import React from "react";
import CommentArea from "../components/CommentArea";
import Product from "../components/Product";
import { withRouter } from "react-router-dom";

class LatestReleases extends React.Component {
  state = {
    currentProduct: {},
    products: [],
    loading: true,
    productId: undefined,
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
        return { ...state, products: data, loading: false, update: false };
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevState) {
    if (this.props.match.params.hasOwnProperty("id")) {
      if (this.props.match.params.id !== this.state.productId) {
        this.setState((state) => {
          return { productId: this.props.match.params.id };
        });
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>;
    } else {
      return (
        <Row className='bookrow mt-2 ml-2'>
          <Col md={7}>
            <Row>
              {this.state.products.map((product) => (
                <Col>
                  <Product
                    key={product._id}
                    product={product}
                    productId={product._id}
                    onDetailClick={this.handleClick}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={5}>
            {
              <CommentArea
                currentProduct={this.state.currentProduct}
                productId={this.state.productId}
              />
            }
          </Col>
        </Row>
      );
    }
  }
}

export default withRouter(LatestReleases);
