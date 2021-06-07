import React from "react";
import {getVideoList} from "../store/videoSlice";
import {connect} from "react-redux";
import Video from "./Video";

class VideoList extends React.Component {

  componentDidMount() {
    this.props.getVideoList();
  }

  render() {
    let videos = this.props.videos;
    const listVideos = videos.map((item) =>
      <Video
        key={item.id.videoId}
        id={item.id.videoId}
        title={item.snippet.title}
        thumbnails={item.snippet.thumbnails.default.url}
        playVideo={this.props.playVideo}
      />
    )
    return (
      <ul>{listVideos}</ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videos: state.videoList
  }
}

export default connect(mapStateToProps, {getVideoList})(VideoList);