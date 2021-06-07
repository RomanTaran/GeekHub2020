import React from "react";
import {Link} from "react-router-dom";

export default function Video(props) {
  const {id, title, thumbnails} = props;
  return (
    <li key={id}>
      <Link to={`/playvideo/${id}`}>
        {title}
        <img src={thumbnails} alt={title}/>
      </Link>
    </li>
  );
}