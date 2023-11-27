// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

// function AddNote() {
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tag, setTag] = useState("");

//   const handleDialogOpen = () => {
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     // Reset input fields when closing the dialog
//     setTitle("");
//     setContent("");
//     setTag("");
//   };

//   const handleAddNote = () => {
//     // Handle adding the note with the provided title, content, and tag
//     console.log("Adding Note:", { title, content, tag });

//     // Perform any additional logic, e.g., sending data to a server

//     // Close the dialog after adding the note
//     handleDialogClose();
//   };

//   return (
//     <div className="flex justify-start p-4">
//       <button
//         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         onClick={handleDialogOpen}
//       >
//         <FontAwesomeIcon icon={faPlus} className="mr-2" />
//         Add Note
//       </button>

//       {isDialogOpen && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Add Note</h2>
//             <label className="block mb-2">
//               Title:
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full border p-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Content:
//               <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 className="w-full border p-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Tag:
//               <input
//                 type="text"
//                 value={tag}
//                 onChange={(e) => setTag(e.target.value)}
//                 className="w-full border p-2"
//               />
//             </label>
//             <div className="flex justify-end">
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
//                 onClick={handleAddNote}
//               >
//                 Add
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 onClick={handleDialogClose}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddNote;
