import React from "react";

const TagButtons = ({ tagSections, selectedTag, filterNotesByTag }) => {
  const renderTagButtons = () => {
    return (
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
    );
  };

  return renderTagButtons();
};

export default TagButtons;
