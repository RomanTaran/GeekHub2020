import React, {useState} from 'react';
import {Form, FormControl} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSearch} from "../store/searchSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = () => dispatch(setSearch(searchValue));

  const handleChange = (event) => setSearchValue(event.target.value);

  const handleReset = () => setSearchValue('');

  return (
    <Form className="d-flex">
      <FormControl
        onChange={handleChange}
        value={searchValue}
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Link to={{pathname: "/results"}}><input className="btn btn-primary" type="submit" onClick={handleSubmit}
                                               value="Submit"/></Link>
      <input className="btn btn-danger" type="reset" onClick={handleReset} value="Reset"/>
    </Form>
  );
};

export default SearchBox;
