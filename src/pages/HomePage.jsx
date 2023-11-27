import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import Add from "../components/Add";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const [data, setData] = useState(null);
  const [tagSections, setTagSections] = useState(["All"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [selectedTag, setSelectedTag] = useState("All");

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);

      // Extract unique tags from the fetched data
      const uniqueTags = Array.from(new Set(result.map((item) => item.tag)));
      setTagSections(["All", ...uniqueTags]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures it runs only once on mount

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    // Filter notes based on the search term
    const filteredNotes = data.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredNotes);
  };

  const filterNotesByTag = (tag) => {
    setSelectedTag(tag);
  };

  const renderNotes = () => {
    if (selectedTag === "All") {
      return data.map((item) => (
        <div
          key={item.id}
          className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/4 p-2`}
        >
          <Note title={item.title} content={item.content} tag={item.tag} />
        </div>
      ));
    } else {
      const filteredNotes = data.filter((item) => item.tag === selectedTag);
      return filteredNotes.map((item) => (
        <div
          key={item.id}
          className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/4 p-2`}
        >
          <Note title={item.title} content={item.content} tag={item.tag} />
        </div>
      ));
    }
  };

  return (
    <div className="bg-[#f7f2e9] min-h-screen">
      <header className="font-extrabold font-mono text-8xl text-center pt-3">
        NOTES
      </header>

      <div className="flex justify-center mt-4">
        {tagSections.map((tag) => (
          <button
            key={tag}
            className={`mr-2 lg:mr-3 p-0.5 cursor-pointer md:p-1.5 lg:p-4 ${
              selectedTag === tag ? "font-bold text-xl" : "text-md"
            }`}
            onClick={() => filterNotesByTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="absolute right-1 md:right-8  mt-4 ">
        <SearchBar onSearch={handleSearch} />
      </div>
      {data ? (
        <>
          <div className="lg:ml-8 w-[30vw] mt-4">
            <Add />
          </div>
          <div className={`mt-8 flex flex-wrap `}>{renderNotes()}</div>
        </>
      ) : (
        // Loading message
        <div>Loading...</div>
      )}
    </div>
  );
}

export default HomePage;
