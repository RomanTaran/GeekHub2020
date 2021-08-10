import React, {useState} from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSearch} from "../store/searchSlice";

const SearchBox = () => {
  const style = {
    marginLeft:200,
    marginRight:200,
    marginTop:20,
    marginBottom:20
  };

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = () => dispatch(setSearch(searchValue));

  const handleChange = (event) => setSearchValue(event.target.value);

  const handleReset = () => setSearchValue('');

  return (
    <Form className="d-flex container-my" style={style}>
      <FormControl
        onChange={handleChange}
        value={searchValue}
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Link to={{pathname: "/results"}}>
        <input
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
          value="Search"
        />
      </Link>
      <input
        className="btn btn-danger"
        type="reset"
        onClick={handleReset}
        value="Reset"
      />
    </Form>
  );
};

export default SearchBox;
