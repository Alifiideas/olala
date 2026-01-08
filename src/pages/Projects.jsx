import { motion } from "framer-motion";

function Projects() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 }
        }
      }}
    >
      <h1>Projects</h1>

      {["Portfolio Website", "Todo App", "Weather App"].map((project) => (
        <motion.div
          key={project}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          style={{
            background: "#fff",
            padding: "20px",
            margin: "15px 0",
            borderRadius: "8px"
          }}
        >
          {project}
        </motion.div>
      ))}
    </motion.section>
  );
}

export default Projects;
