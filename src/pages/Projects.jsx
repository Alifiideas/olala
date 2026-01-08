import { motion } from "framer-motion";

function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Projects</h1>

      {/* TODO APP PROJECT */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        style={{
          background: "#fff",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
        }}
      >
        <h2>Todo App (Python)</h2>
        <p>A simple Todo application built using Python.</p>

        <a
          href="https://todo-flask.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>View Todo App</button>
        </a>
      </motion.div>
    </motion.section>
  );
}

export default Projects;

