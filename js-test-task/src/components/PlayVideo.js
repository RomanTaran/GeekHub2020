import React, {useEffect} from "react";
import {useParams} from 'react-router-dom';
import YouTube from "react-youtube";
import {getVideoItem} from "../store/playvideoSlice";
import {useDispatch, useSelector} from "react-redux";

const PlayVideo = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const video = useSelector(state => state.video);
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(()=>{
    dispatch(getVideoItem(id));
  });
  const {snippet} = video[0];
  const {statistics} = video[0];

  return (
    <div>
      <YouTube videoId={id} opts={opts}/>
      <ul>
        <li>Title: {snippet.title}</li>
        <li>Description: {snippet.description}</li>
        <li>viewCount: {statistics.viewCount}</li>
        <li>likeCount: {statistics.likeCount}</li>
        <li>favoriteCount: {statistics.favoriteCount}</li>
        <li>commentCount: {statistics.commentCount}</li>
      </ul>
    </div>
  );
}

export default PlayVideo;