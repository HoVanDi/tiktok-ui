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
import * as searchService from "~/services/searchService";
import styles from "./Search.module.scss";
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);

function Search() {
  const [Searchvalue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(Searchvalue, 500);
  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResults([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const results = await searchService.search(debouncedValue);
      setSearchResults(results);
      setLoading(false);
    };

    fetchApi();
  }, [debouncedValue]);

  const handleclear = () => {
    setSearchValue("");
    setSearchResults([]);
    inputRef.current.focus();
  };

  const handleHideresult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    console.log(e);
    const searchValue = e.target.value;

    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    //Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
    <div>
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
            onChange={handleChange}
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
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onMouseDown={(e) => e.preventDefault()}
            />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
