import React from "react";
import Note from "./Note";

const RenderNotes = (props) => {
  // console.log("props.data.notes:", props.data);
  // console.log(props.selectedTag);
  if (props.selectedTag === "All") {
    return props.data.map((item) => (
      <div
        key={item._id}
        className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/4 p-2`}
      >
        <Note
          title={item.title}
          content={item.content}
          tag={item.tag}
          _id={item._id}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      </div>
    ));
  } else {
    const filteredNotes = props.data.filter(
      (item) => item.tag === props.selectedTag
    );
    return filteredNotes.map((item) => (
      <div
        key={item._id}
        className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/4 p-2`}
      >
        <Note
          title={item.title}
          content={item.content}
          tag={item.tag}
          _id={item._id}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
          onAdd={props.onAdd}
        />
      </div>
    ));
  }
};

export default RenderNotes;
