import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import helpers from '../../utils/helpers';

// STATE
class Books extends Component {
  state = {
    books: [],
    title: "",
    url: "",
    results: [],
  };

// Life Cycle from REACT
  componentDidMount() {
    this.loadBooks();
    helpers.runQuery('lego', '2016', '2018')
    .then((data) => {
      this.setState({ results: data.docs})
    });
  }

// Events
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", url: ""})
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveBook({
        title: this.state.title,
        url: this.state.url,
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

// Life Cycle from REACT
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What NYT Articles Should I Search?</h1>
            </Jumbotron>
            {this.state.results.map(result => (
              <p>{result.web_url}</p>
            ))}
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.url}
                onChange={this.handleInputChange}
                name="url"
                placeholder="URL (required)"
              />
              <FormBtn
                disabled={!(this.state.url && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.url}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;