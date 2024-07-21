import PropTypes from "prop-types";
import React from "react";
import Button from "~/components/Button";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";

function MenuItem({ data, onClick }) {
  const cx = classNames.bind(styles);

  const classes = cx("menu-item", {
    separate: data.separate,
  });

  return (
    <Button
      className={classes}
      leftIcon={data.icon}
      to={data.to}
      onClick={onClick}
    >
      {data.title}
    </Button>
  );
}

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
