import React from "react";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("avata")} src="https://res.cloudinary.com/dsp0tuvsv/image/upload/v1693389958/SOCIAL/zktigctbpfr2dmxo33jj.jpg" alt="hoa"></img>
      <div className={cx("info")}>
        <h4 className={cx("name")}>
            <span>Ho Van Di</span>
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
        </h4>
        <span className={cx("username")}> hovandi</span>
      </div>
    </div>
  );
}

export default AccountItem;
