import React, { useState } from "react";
import axios from "axios";

function EmailSendingComponent() {
  const [subject, setSubject] = useState("");
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleAttachmentChange = (event) => {
    const newAttachments = Array.from(event.target.files);
    setAttachments((prevAttachments) => [
      ...prevAttachments,
      ...newAttachments,
    ]);
  };

  const removeAttachment = (attachmentIndex) => {
    setAttachments((prevAttachments) => {
      const newAttachments = [...prevAttachments];
      newAttachments.splice(attachmentIndex, 1);
      return newAttachments;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    try {
      console.log("to", to);
      console.log("to", body);
      const formData = new FormData();
      formData.append("to", to);
      formData.append("body", body);
      if (subject) {
        formData.append("subject", subject);
      }
      for (let i = 0; i < attachments.length; i++) {
        formData.append("attachments", attachments[i]);
      }
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        // Handle error - access token not found in localStorage
        return;
      }
      console.log("form data", formData.values);

      // Set the Authorization header with the existing access token
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

      await axios.post("http://localhost:4000/emails/send", formData);
      setSubject("");
      setTo("");
      setBody("");
      setAttachments([]);
      setError("");
    } catch (error) {
      setError(error.message);
    }
    setSending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="to-input">To:</label>
        <input
          id="to-input"
          type="email"
          value={to}
          onChange={handleToChange}
          required
        />
      </div>
      <div>
        <label htmlFor="subject-input">Subject:</label>
        <input
          id="subject-input"
          type="text"
          value={subject}
          onChange={handleSubjectChange}
        />
      </div>
      <div>
        <label htmlFor="body-input">Body:</label>
        <textarea
          id="body-input"
          value={body}
          onChange={handleBodyChange}
          required
        />
      </div>
      <div>
        <label htmlFor="attachments-input">Attachments:</label>
        <input
          id="attachments-input"
          type="file"
          multiple
          onChange={handleAttachmentChange}
        />
        {attachments.map((attachment, index) => (
          <div key={index}>
            {attachment.name}{" "}
            <button type="button" onClick={() => removeAttachment(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send"}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default EmailSendingComponent;
