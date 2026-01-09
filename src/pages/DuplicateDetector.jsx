import { useState } from "react";

function DuplicateDetector() {
  const [duplicates, setDuplicates] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // Upload images
  const uploadImages = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append("images", file);
    }

    await fetch("http://127.0.0.1:5000/upload-images", {
      method: "POST",
      body: formData
    });

    alert("Images uploaded successfully ✅");
  };

  // Detect duplicates
  const detectDuplicates = async () => {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:5000/detect-duplicates");
    const data = await res.json();
    setDuplicates(data);
    setLoading(false);
  };

  // Select / unselect duplicates
  const toggleSelect = (file) => {
    setSelected((prev) =>
      prev.includes(file)
        ? prev.filter((f) => f !== file)
        : [...prev, file]
    );
  };

  // Delete selected images
  const deleteSelected = async () => {
    if (selected.length === 0) return;

    await fetch("http://127.0.0.1:5000/delete-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: selected })
    });

    setSelected([]);
    detectDuplicates();
  };

  return (
    <section>
      <h1>Duplicate Image Detector (Python)</h1>

      <input
        type="file"
        accept=".jpg"
        multiple
        onChange={uploadImages}
      />

      <div style={{ marginTop: "15px" }}>
        <button onClick={detectDuplicates}>🔍 Detect Duplicates</button>

        {selected.length > 0 && (
          <button
            onClick={deleteSelected}
            style={{ marginLeft: "10px", background: "crimson", color: "#fff" }}
          >
            ❌ Delete Selected
          </button>
        )}
      </div>

      {loading && <p>Scanning images... ⏳</p>}

      {duplicates.length === 0 && !loading && (
        <p>No duplicate images found 👌</p>
      )}

      <ul>
        {duplicates.map((d, i) => (
          <li
            key={i}
            style={{
              background: "#ffe5e5",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "6px"
            }}
          >
            <input
              type="checkbox"
              onChange={() => toggleSelect(d.duplicate)}
              checked={selected.includes(d.duplicate)}
            />
            <span style={{ marginLeft: "10px", color: "red" }}>
              🚩 {d.duplicate}
            </span>
            <span style={{ marginLeft: "10px", fontSize: "14px" }}>
              (duplicate of {d.original})
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DuplicateDetector;
