import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import TagButtons from "../components/TagButtons";
import RenderNotes from "../components/RenderNotes";
// import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function HomePage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [tagSections, setTagSections] = useState(["All"]);
  const [selectedTag, setSelectedTag] = useState("All");
  const apiUrl = process.env.REACT_APP_API_URL;

  const [originalData, setOriginalData] = useState(null); //for searching

  const fetchData = async () => {
    try {
      // console.log(localStorage.getItem("token"));
      const response = await fetch(apiUrl, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        throw new Error("Network response was not ok");
      }

      const { notes } = await response.json();

      // console.log("result: ", notes);
      setData(notes);

      const uniqueTags = Array.from(new Set(notes.map((item) => item.tag)));
      setTagSections(["All", ...uniqueTags]);
      setOriginalData(notes);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert("user not logged in");
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        alert("user not logged in");
        navigate("/login");
      } else {
        fetchData();
      }
    }
  }, []);

  const filterNotesByTag = (tag) => {
    setSelectedTag(tag);
  };

  const handleDeleteNote = async (props) => {
    try {
      console.log(props);
      const response = await fetch(`${apiUrl}/${props._id}`, {
        method: "DELETE",
        headers: {
          "x-access-token": token,
        },
      });

      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
        return;
      }

      const updatedData = data.filter((note) => note._id !== props._id);
      setData(updatedData);
      setOriginalData(updatedData);

      const isLastNoteWithTag = !updatedData.some(
        (note) => note.tag === props.tag
      );

      if (isLastNoteWithTag) {
        const uniqueTags = Array.from(
          new Set(updatedData.map((item) => item.tag))
        );
        setTagSections(["All", ...uniqueTags]);
      }
    } catch (error) {
      console.error("Delete note error:", error.message);
      alert("Error deleting", error.message);
      alert("user not logged in");
      navigate("/login");
    }
  };

  const handleUpdateNote = async (id, updatedData) => {
    try {
      const tag = data.find((item) => item._id === id);
      console.log(tag);
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
        return;
      }

      const updatedNote = await response.json();
      console.log(`unote `, updatedNote);

      setData((prevData) => {
        return prevData.map((notes) =>
          notes._id === id ? { ...notes, ...updatedNote } : notes
        );
      });
      setOriginalData((prevData) => {
        return prevData.map((notes) =>
          notes._id === id ? { ...notes, ...updatedNote } : notes
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
      alert("user not logged in");
      navigate("/login");
    }
  };

  const handleNewNote = async (newNote) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
        return;
      }

      const createdNote = await response.json();
      console.log("  cn", createdNote);
      const { note } = createdNote;

      setData((prevData) => [...prevData, note]);

      console.log("dd", data);
      console.log("notes", note);

      setOriginalData((prevData) => [...prevData, note]);
      console.log("o data ", originalData);

      //if updated tag not there adding it
      if (!tagSections.includes(createdNote.tag)) {
        setTagSections((prevData) => [...prevData, createdNote.tag]);
      }
      console.log("tg ", tagSections);
    } catch (error) {
      console.error("Create note error:", error.message);
      alert("Error adding", error.message);
      alert("user not logged in");
      navigate("/login");
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
    // console.log("dat v filt", data);
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
