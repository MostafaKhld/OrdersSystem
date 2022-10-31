import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <div className="d-flex align-items-end">
        <Form.Group controlId="search-box">
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="outline-success" className="ms-3">
            Seacrh
          </Button>
        </Form.Group>
      </div>
    </Form>
  );
}

export default SearchBox;
