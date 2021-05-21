import React, { Component } from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import "../styles/css/commentArea.css";
import { Col, Spinner, Row } from "react-bootstrap";
import { withRouter } from "react-router";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    currComment: {
      comment: "",
      rate: 0,
      elementId: "",
    },
    newComment: false,
  };

  handleNewCommentSubmit = (newComment) => {
    this.setState({ newComment: newComment });
  };

  handleCommentUpdate = (e) => {
    e.preventDefault();
    let id = e.target.id;
    this.setState({
      currComment: {
        ...this.state.currComment,
        [id]: parseInt(e.target.value)
          ? parseInt(e.target.value)
          : e.target.value,
        elementId: this.props.currentProduct._id,
      },
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.productId !== this.props.productId) {
      console.log(
        "this.props.productId:",
        this.props.productId,
        prevProps.productId
      );
      this.fetchData();
    }
    if (prevProps.currentProduct !== this.props.currentProduct) {
      this.fetchData();
    }
    if (prevState.newComment !== this.state.newComment) {
      this.setState({
        newComment: false,
        currComment: { comment: "", rate: 1, elementId: "" },
      });
      this.fetchData();
    }
  };

  componentDidMount = async () => {
    if (this.props.match.params.id) {
      this.fetchData();
    } else {
      this.setState((state) => {
        return { loading: false };
      });
    }
  };

  fetchData = async () => {
    try {
      let response = await fetch(
        `http://localhost:3001/reviews/${this.props.productId}`
      );

      if (response.ok) {
        console.log("resOk");
        let data = await response.json();
        console.log("data:", data);
        this.setState((state) => {
          return { comments: data, isLoading: false, newComment: false };
        });
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner animation='border' role='status' className='mt-5'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      );
    } else {
      return (
        <div className='commentArea overflow-auto my-5'>
          <Row className='mx-2'>
            <Col sm={5} md={2} lg={2}>
              <img
                src={this.props.currentProduct.imageUrl}
                alt=''
                className='img-fluid'
              />
            </Col>
            <Col sm={7} md={10} lg={10}>
              <h4>{this.props.currentProduct.name}</h4>
              <CommentList comments={this.state.comments} />
              <Row className=''>
                <Col>
                  <AddComment
                    currComment={this.state.currComment}
                    onCommentUpdate={this.handleCommentUpdate}
                    onNewCommentSubmit={this.handleNewCommentSubmit}
                    newComment={this.state.newComment}
                    productId={this.props.productId}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default withRouter(CommentArea);
