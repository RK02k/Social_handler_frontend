import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagePromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract base64
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((base64Images) => {
        setImages(base64Images);
      })
      .catch((err) => console.error("Error converting images to base64:", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, socialHandle, images };
    try {
      await axios.post("http://localhost:5000/api/users", userData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Submission successful!");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Submission Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Social Media Handle:</label>
          <input
            type="text"
            className="form-control"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Images:</label>
          <input type="file" className="form-control" multiple onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
