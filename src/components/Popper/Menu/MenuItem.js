import React from "react";
import Button from "~/components/Button";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";

function MenuItem({ data }) {
  const cx = classNames.bind(styles);

  return (
    <Button className={cx("menu-item")} leftIcon={data.icon} to={data.to}>
      {data.title}
    </Button>
  );
}

export default MenuItem;
