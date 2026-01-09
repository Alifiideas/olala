import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Projects</h1>

      {/* TODO APP */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        style={{
          background: "#fff",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Todo App (Python)</h2>
        <p>A simple Todo application built using Python + Flask.</p>

        <Link to="/todo">
          <button>Open Todo App</button>
        </Link>
      </motion.div>

      {/* DUPLICATE IMAGE DETECTOR */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        style={{
          background: "#fff",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Duplicate Image Detector (Python)</h2>
        <p>
          Upload JPG images, detect duplicates using image hashing, and delete
          selected duplicates.
        </p>

        <Link to="/duplicate-detector">
          <button>Open Duplicate Detector</button>
        </Link>
      </motion.div>
    </motion.section>
  );
}

export default Projects;
