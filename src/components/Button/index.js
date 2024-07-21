import PropTypes from "prop-types";
import classNames from "classnames/bind";
import React from "react";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  children,
  primary = false,
  outline = false,
  small = false,
  disable = false,
  large = false,
  rounded = false,
  text = false,
  className,
  leftIcon,
  RightIcon,
  onClick,
  ...passProps
}) {
  let Comp = "button";

  const props = {
    onClick,
    ...passProps,
  };

  //Remove event listeners when btn is disabled
  if (disable) {
    props.onClick = null;
  }

  if (to) {
    props.to = to; //link nội bộ
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a"; //link ngoài trang
  }

  const classes = cx("wrapper", {
    primary,
    outline,
    small,
    text,
    disable,
    large,
    rounded,
    [className]: className,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      <span className={cx("title")}>{children}</span>
      {RightIcon && <span className={cx("icon")}>{RightIcon}</span>}
    </Comp>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
