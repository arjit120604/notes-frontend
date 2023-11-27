import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Edit from "./Edit";

const Note = ({ title, content, tag }) => {
  const tagColors = [
    {
      tag: "tag1",
      bgNote: "bg-red-200",
      text: "text-yellow-700",
      bgTag: "bg-green-100",
    },
    {
      tag: "tag9",
      bgNote: "bg-blue-200",
      text: "text-yellow-700",
      bgTag: "bg-green-100",
    },
    // Add more color mappings as needed
  ];

  const foundTag = tagColors.find((color) => color.tag === tag);
  const backgroundColor = foundTag ? foundTag.bgNote : "bg-yellow-200";
  const tagTextColor = foundTag ? foundTag.text : "text-yellow-800";
  const tagBg = foundTag ? foundTag.bgTag : "bg-green-100";

  return (
    <>
      <div
        className={`border p-4 mx-4 my-2 ${backgroundColor} relative h-[20vh]`}
      >
        <div className="absolute top-0 right-0 mt-1 mr-[3rem]">
          <Edit title={title} content={content} tag={tag} />
        </div>
        <button className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600">
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <div>
          <h4 className="text-xl font-mono font-bold mb-2">{title}</h4>
          <p className="text-gray-700 font-mono mb-2">{content}</p>
          <div className="flex items-center justify-end">
            <span className={`text-sm font-mono ${tagTextColor} ${tagBg}`}>
              #{tag}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
