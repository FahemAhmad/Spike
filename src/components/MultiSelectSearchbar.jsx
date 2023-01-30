/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
function MultiSelectSearchbar({
  placeholder,
  api,
  name = undefined,
  selectedValues,
  setSelectedValues,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 3) {
      api(searchQuery).then((res) => {
        setData(res.data);
      });
    }
  }, [searchQuery]);

  const handleCheckbox = (selectedValue) => {
    if (selectedValues.includes(selectedValue)) {
      setSelectedValues(
        selectedValues.filter((value) => value !== selectedValue)
      );
    } else {
      setSelectedValues([...selectedValues, selectedValue]);
    }
  };

  return (
    <>
      <SearchBarWithIcon
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div style={{ padding: 3 }}>
        <ul className="search-results" style={{ listStyleType: "none" }}>
          {searchQuery.length >= 3 &&
            data.map(
              (d) =>
                d[name] !== searchQuery && (
                  <li
                    key={d._id}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <input
                      style={{ width: 40, marginTop: 10 }}
                      type="checkbox"
                      onChange={() => {
                        setSearchQuery("");
                        return handleCheckbox(d[name] || d);
                      }}
                      checked={selectedValues.includes(d[name] || d)}
                    />
                    <p style={{ marginTop: -5 }}>{name ? d[name] : d}</p>
                  </li>
                )
            )}
        </ul>
        {selectedValues.length > 0 && (
          <>
            <p style={{ color: "darkgray" }}>Friends List :</p>
            <ul className="selected-values">
              {selectedValues.map((selectedValue, index) => (
                <li key={index}>
                  {selectedValue}
                  <span
                    onClick={() => {
                      setSelectedValues(
                        selectedValues.filter(
                          (value) => value !== selectedValue
                        )
                      );
                    }}
                  ></span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default MultiSelectSearchbar;
