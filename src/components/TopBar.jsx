import React, { useState, useEffect } from "react";
import Add from "./Add";
import SearchBar from "./SearchBar";

const TopBar = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleSearch = (searchTerm) => {
    // console.log("Search term:", searchTerm);
    if (props.onSearch) {
      props.onSearch(searchTerm);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex justify-between items-center p-4">
      {isMobile ? (
        <Add button="Add" onAdd={props.onAdd} />
      ) : (
        <Add button="Add Note" onAdd={props.onAdd} />
      )}
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default TopBar;
