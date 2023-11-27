import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import TagButtons from "../components/TagButtons";
import RenderNotes from "../components/RenderNotes";

function HomePage() {
  const [data, setData] = useState(null);
  const [tagSections, setTagSections] = useState(["All"]);
  const [selectedTag, setSelectedTag] = useState("All");
  const apiUrl = "https://notes-backend-c5i7.onrender.com/api/notes";

  const [originalData, setOriginalData] = useState(null); //for searching

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);

      const uniqueTags = Array.from(new Set(result.map((item) => item.tag)));
      setTagSections(["All", ...uniqueTags]);
      setOriginalData(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // the empty dependency array ensures it runs only once on mount

  const filterNotesByTag = (tag) => {
    setSelectedTag(tag);
  };

  const handleDeleteNote = async (id, tag) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
        return;
      }

      const updatedData = data.filter((note) => note._id !== id);
      setData(updatedData);
      setOriginalData(updatedData);

      const isLastNoteWithTag = !updatedData.some((note) => note.tag === tag);

      if (isLastNoteWithTag) {
        const uniqueTags = Array.from(
          new Set(updatedData.map((item) => item.tag))
        );
        setTagSections(["All", ...uniqueTags]);
      }
    } catch (error) {
      console.error("Delete note error:", error.message);
      alert("Error deleting", error.message);
    }
  };

  const handleUpdateNote = async (id, updatedData) => {
    try {
      const tag = data.find((item) => item.id === id);
      console.log(tag);
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
        return;
      }

      const updatedNote = await response.json();

      setData((prevData) => {
        return prevData.map((note) =>
          note._id === id ? { ...note, ...updatedNote } : note
        );
      });
      setOriginalData((prevData) => {
        return prevData.map((note) =>
          note._id === id ? { ...note, ...updatedNote } : note
        );
      });
      // console.log(originalData);

      const updatedData2 = await data.filter((note) => note._id !== id);
      // console.log(updatedData2);
      const isLastNoteWithTag = !updatedData2.some((note) => note.tag === tag);

      // console.log(isLastNoteWithTag);

      if (isLastNoteWithTag) {
        const uniqueTags = Array.from(
          new Set(updatedData2.map((item) => item.tag))
        );
        setTagSections(["All", ...uniqueTags]);
      }

      if (!tagSections.includes(updatedNote.tag)) {
        setTagSections((prevData) => [...prevData, updatedNote.tag]);
      }
    } catch (error) {
      console.error("Update note error:", error.message);
      alert("Error updating", error.message);
    }
  };

  const handleNewNote = async (newNote) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
        return;
      }

      const createdNote = await response.json();

      setData((prevData) => [...prevData, createdNote]);

      setOriginalData((prevData) => [...prevData, createdNote]);

      //if updated tag not there adding it
      if (!tagSections.includes(createdNote.tag)) {
        setTagSections((prevData) => [...prevData, createdNote.tag]);
      }
    } catch (error) {
      console.error("Create note error:", error.message);
      alert("Error adding", error.message);
    }
  };

  const handleSearchData = (searchTerm) => {
    if (!originalData) {
      return;
    }

    if (!searchTerm) {
      // If search term is empty, show all notes
      setData(originalData);
      return;
    }

    const filteredData = originalData.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setData(filteredData);
  };

  return (
    <div className="bg-[#f7f2e9] min-h-screen">
      <header className="font-extrabold font-mono text-8xl text-center pt-3">
        NOTES
      </header>

      <div className="flex justify-center mt-4">
        <TagButtons
          tagSections={tagSections}
          selectedTag={selectedTag}
          filterNotesByTag={filterNotesByTag}
        />
      </div>
      <TopBar onAdd={handleNewNote} data={data} onSearch={handleSearchData} />
      {data ? (
        <div className={`mt-8 flex flex-wrap `}>
          <RenderNotes
            selectedTag={selectedTag}
            data={data}
            onDelete={handleDeleteNote}
            onEdit={handleUpdateNote}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default HomePage;
