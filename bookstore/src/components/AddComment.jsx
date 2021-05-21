import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Component } from "react";
import { join } from "path";

class AddComment extends Component {
  state = {
    saveSuccess: false,
  };

  handleCommentUpdate = (e) => {
    this.props.onCommentUpdate(e);
  };

  handleNewCommentSubmit = (e) => {
    e.preventDefault();
    this.props.onNewCommentSubmit(true);
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.newComment !== this.props.newComment) {
      try {
        let response = await fetch(`http://localhost:3001/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.props.currComment),
        });
        if (response.ok) {
        }
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };

  putComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        join(this.state.url, this.props.match.params.id),
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.props.newComment),
        }
      );
      if (!res.ok) throw "something went wrong";
    } catch (error) {}
  };

  deleteComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        join(this.state.url, this.props.match.params.id),
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw "something went wrong";
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <h6 className='mt-3'>Add Comments</h6>
        {this.state.saveSuccess && (
          <Alert
            variant='success'
            className='position-absolute'
            style={{
              top: 0,
            }}>
            Your comment got added
          </Alert>
        )}
        <Form onSubmit={this.handleNewCommentSubmit}>
          <Row>
            <Col>
              <Form.Group controlId='comment'>
                <Form.Label>Your comment</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={1}
                  value={this.props.currComment.comment}
                  onChange={(event) => this.handleCommentUpdate(event)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='rate'>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(event) => this.handleCommentUpdate(event)}
                  required>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
          <button
            type='button'
            className='backoffice-delbtn btn btn-danger float-right mx-1'>
            onClick={(e) => this.deleteComment(e)}
            <ion-icon name='close-circle-outline' />
          </button>
          <button
            type='button'
            onClick={(e) => this.putComment(e)}
            className='backoffice-editbtn btn btn-light float-right mx-1'>
            <ion-icon name='create-outline' />
          </button>
        </Form>
      </>
    );
  }
}

export default AddComment;
