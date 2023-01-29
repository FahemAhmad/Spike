import React, { useEffect } from "react";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBarWithIcon = (props) => (
  <div className="search">
    <i className="search-icon">
      <BiSearchAlt2 />
    </i>
    <input type="text" className="search-field" {...props} />
  </div>
);

function SearchBar({
  placeholder,
  api,
  name = undefined,
  searchQuery,
  setSearchQuery,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 3) {
      api(searchQuery).then((res) => {
        setData(res.data);
      });
    }
  }, [searchQuery]);

  return (
    <>
      <SearchBarWithIcon
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div style={{ padding: 3 }}>
        <ul className="search-results">
          {searchQuery.length >= 3 &&
            data.map(
              (d) =>
                d[name] !== searchQuery && (
                  <li
                    key={d._id}
                    onClick={() => setSearchQuery(d ? d[name] : d)}
                    onKeyDown={() => {}}
                    style={{ cursor: "pointer" }}
                    role="menuitem"
                  >
                    {name ? d[name] : d}
                  </li>
                )
            )}
        </ul>
      </div>
    </>
  );
}

export default SearchBar;
