import React, { useState } from "react";
import axios from "axios";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [sharedWith, setSharedWith] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextContentChange = (event) => {
    setTextContent(event.target.value);
  };

  const handleSharedWithChange = (event) => {
    setSharedWith(event.target.value.split(",").map((email) => email.trim()));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    axios
      .post("http://localhost:4000/notes", {
        title,
        textContent,
        sharedWith: sharedWith.length ? sharedWith : null,
      })
      .then((response) => {
        setIsLoading(false);
        setErrorMessage("");

        alert("Note created successfully!");
      })
      .catch((error) => {
        setIsLoading(false);

        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to create note.");
        }
      });
  };

  return (
    <div>
      <h1>Create a new note</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="textContent">Text content:</label>
          <textarea
            id="textContent"
            value={textContent}
            onChange={handleTextContentChange}
          />
        </div>
        <div>
          <label htmlFor="sharedWith">
            Shared with (comma-separated email addresses):
          </label>
          <input
            type="text"
            id="sharedWith"
            value={sharedWith.join(", ")}
            onChange={handleSharedWithChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Create Note
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
