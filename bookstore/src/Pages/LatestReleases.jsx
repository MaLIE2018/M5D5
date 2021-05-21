import { Row, CardColumns, Col } from "react-bootstrap";
import "../styles/css/latestReleases.css";
import React from "react";
import CommentArea from "../components/CommentArea";
import Product from "../components/Product";

class LatestReleases extends React.Component {
  state = {
    currentProduct: {},
    products: [],
    loading: false,
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

      const data = res.json();
      this.setState((state) => {
        return { ...state, products: data };
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    //this.getData()
  }

  render() {
    const { loading, products } = this.state;
    if (loading) {
      return <div>Loading</div>;
    } else {
      return (
        <Row className='bookrow m-0'>
          <Col md={7}>
            <CardColumns>
              {products.map((book) => (
                <Product
                  key={book._id}
                  product={book}
                  onDetailClick={this.handleClick}
                />
              ))}
            </CardColumns>
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
