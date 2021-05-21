import { ListGroup } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import { Component } from "react";

class CommentList extends Component {
  state = {
    filterText: "",
    url: "http://localhost:3001/reviews/",
  };

  handleFilterTextChange = (FilterText) => {
    this.setState({ filterText: FilterText, filteredComments: [] });
  };

  deleteComment = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(this.state.url + id, {
        method: "DELETE",
      });
      if (!res.ok) throw "something went wrong";
      this.props.onNewCommentSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const filterText = this.state.filterText;
    let comments;
    {
      if (filterText !== "") {
        let filteredComments = this.props.comments.filter(function (comment) {
          return (
            comment.comment.toLowerCase().includes(filterText.toLowerCase()) ||
            comment.author.toLowerCase().includes(filterText.toLowerCase())
          );
        });
        comments = filteredComments;
      } else {
        comments = this.props.comments;
      }
    }
    return this.props.comments.length !== 0 ? (
      <div
        className=''
        style={{ height: "30vh", overflow: "scroll", position: "relative" }}>
        <SearchBar
          currentText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <ListGroup>
          {comments.map((comment) => {
            return (
              <ListGroup.Item key={comment.id} commentId={comment.id}>
                Author: {comment.author} Comment: {comment.comment} Rating:{" "}
                {comment.rate}
                <button
                  type='button'
                  className='backoffice-delbtn btn btn-danger float-right mx-1'
                  onClick={(e) => this.deleteComment(e, comment.id)}>
                  <ion-icon name='close-circle-outline' />
                </button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    ) : (
      <h6>No Comments, add one!</h6>
    );
  }
}

export default CommentList;
