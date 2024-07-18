import React, { useEffect, useState, useRef } from "react";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountItem from "~/components/AccountItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const [Searchvalue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setSearchResults([1, 1, 1, 1]);
    }, 0);
  }, []);

  const handleclear = () => {
    setSearchValue("");
    setSearchResults([]);
    inputRef.current.focus();
  };

  const handleHideresult = () => {
    setShowResult(false);
  };

  return (
    <HeadlessTippy
      interactive
      visible={showResult && searchResults.length > 0}
      render={(attrs) => (
        <div className={cx("search-results")} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx("search-title")}>Accounts</h4>
            <AccountItem />
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideresult}
    >
      <div className={cx("search")}>
        <input
          ref={inputRef}
          value={Searchvalue}
          type="text"
          placeholder="Search accounts and videos"
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        />

        {!!Searchvalue && (
          <button className={cx("clear")}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={() => handleclear()}
            />
          </button>
        )}
        {/* <FontAwesomeIcon className={cx("loading")} icon={faSpinner} /> */}

        <button className={cx("search-btn")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
