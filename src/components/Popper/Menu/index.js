import PropTypes from "prop-types";
import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import styles from "./Menu.module.scss";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import classNames from "classnames/bind";
import MenuItem from "./MenuItem";
import Header from "./Header";

const defaulFn = () => {};
const cx = classNames.bind(styles);

function Menu({
  children,
  items = [],
  hideOnClick = false,
  onChange = defaulFn,
}) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const renderResult = (attrs) => {
    <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx("menu-popper")}>
        {history.length > 1 && (
          <Header title={current.title} onBack={handleBack} />
        )}

        <div className={cx("menu-body")}>{renderItems()}</div>
      </PopperWrapper>
    </div>;
  };

  // Reset to first page
  const handleResetMenu = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      hideOnClick={hideOnClick}
      interactive
      delay={[0, 700]}
      offset={[12, 8]}
      placement="bottom-end"
      render={renderResult}
      onHidden={handleResetMenu}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Menu;
