import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { LikeAction, WatchLaterAction } from "../../Redux/action";
import Header from "../Header";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";

import SideNavForMap from "../SideNavForMap";
import Tags from "../Tags";
import Style from "./index.module.css";

export default function VideoPlayer(props) {
  const dispatch = useDispatch();

  const { likedata, watchlaterdata } = useSelector(
    (state) => state.videoReducer
  );
  const location = useLocation();

  const [isLike, setIsLike] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(true);

  const like = () => {
    const myLikedVideo = [...likedata, location.state.item];
    dispatch(LikeAction(myLikedVideo));
    setIsLike(true);
  };

  useEffect(() => {
    let isLiked = likedata.filter(
      (o) => o.id.videoId === location.state.item.id.videoId
    )?.length;

    setIsLike(isLiked);
  }, []);

  const disLike = () => {
    setIsLike(false);
    let remainigLikeData = likedata.filter(
      (o) => o.id.videoId !== location.state.item.id.videoId
    );

    dispatch(LikeAction(remainigLikeData));
  };
  const watchLater = () => {
    const myWatchedVideo = [...watchlaterdata, location.state.item];
    dispatch(WatchLaterAction(myWatchedVideo));
    setIsWatchLater(false);
    alert("Succecfully Add In Watch Later Videos");
  };
  const removeWatchLater = () => {
    setIsWatchLater(true);
    alert("Succecfully Remove to Watch Later Videos");
  };
  return (
    <div className={Style.videoPlayer}>
      <Header />
      <div className={Style.videoPlayerContainer}>
        <div className={Style.navForMap}>
          <SideNavForMap />
        </div>
        <div className={Style.videoPlay}>
          <iframe
            src={`https://www.youtube.com/embed/${location.state.item.id.videoId}?autoplay=1`}
            frameborder="0"
            allow="autoplay"
            title="video"
            width="1195px"
            height="500px"
            allowfullscreen="true"
          />
          <div className={Style.playVideoTitle}>
            <div className={Style.leftForTitle}>
              <p className={Style.videoTitle}>
                {location.state.item.snippet.title}
              </p>
            </div>
            <div className={Style.right}>
              {!isLike ? (
                <div onClick={() => like()} className={Style.tagColor}>
                  <AiOutlineHeart />
                  <Tags tagTitle="LIKE" />
                </div>
              ) : (
                <div onClick={() => disLike()} className={Style.removeColor}>
                  <AiOutlineHeart />
                  <Tags tagTitle="DISLIKE" />
                </div>
              )}
              {isWatchLater ? (
                <div onClick={() => watchLater()} className={Style.tagColor}>
                  <MdOutlineWatchLater />
                  <Tags tagTitle="WatchLater" />
                </div>
              ) : (
                <div
                  onClick={() => removeWatchLater()}
                  className={Style.removeColor}
                >
                  <MdOutlineWatchLater />
                  <Tags tagTitle=" Remove Watch Later" />
                </div>
              )}

              <div onClick={() => like()} className={Style.tagColor}>
                <Tags tagTitle="Save" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className={Style.vidContainer}>
          {playvideo.length > 0 ? null : <WatchLaterComponent />}
        </div> */}
      </div>
    </div>
  );
}