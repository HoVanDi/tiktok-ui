import React, { useEffect, useState, useRef } from "react";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountItem from "~/components/AccountItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);

function Search() {
  const [Searchvalue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounce = useDebounce(Searchvalue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResults([])
      return;
    }

    setLoading(true);
    fetch(
      `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        debounce
      )}&type=less` // encodeURIComponent nedd have when user search fucntion
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [debounce]);

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

            {searchResults.map((result) => (
              <AccountItem key={result.id} data={result} />
            ))}
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

        {!!Searchvalue && !loading && (
          <button className={cx("clear")}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={() => handleclear()}
            />
          </button>
        )}
        {loading && (
          <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
        )}

        <button className={cx("search-btn")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
