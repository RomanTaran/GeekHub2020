import React from 'react';
import {Form, FormControl, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

const SearchBox = (props) => {
    console.log(props);
    return (
        <Form className="d-flex">
            <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
            />
            <Link to='/results'><input className="btn btn-primary" type="submit" value="Submit"/></Link>
            <input className="btn btn-danger" type="reset" value="Reset"/>
        </Form>
    );
};

export default SearchBox;
