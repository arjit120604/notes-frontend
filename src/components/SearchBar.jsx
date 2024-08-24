import React, { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };
  useEffect(() => {
    if (searchTerm === "") {
      const delayDebounceFn = setTimeout(() => {
        onSearch(searchTerm);
      }, 200);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, onSearch]);

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // onChange={handleSearchTermChange}
        className="border p-2  ml-1 mr-2 w-[42vw] lg:w-[80vw]"
      />
      <button
        className="bg-blue-500 text-white  px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
