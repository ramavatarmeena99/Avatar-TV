import React from "react";
import Header from "../Component/Header";
import SideNavForMap from "../Component/SideNavForMap";
import LikeComponent from "../Component/LikeComponent";
import Style from "./index.module.css";
import { useSelector } from "react-redux";

export default function Liked() {
  const { likedata } = useSelector((state) => state.videoReducer);

  return (
    <div>
      <Header />
      <div className={Style.like}>
        <div className={Style.navForMap}>
          <SideNavForMap />
        </div>
        {likedata.length > 0 ? null : <LikeComponent />}
      </div>
    </div>
  );
}
