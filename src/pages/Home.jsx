import { motion } from "framer-motion";

function Home() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Hello, I'm John 👋</h1>
      <p>Frontend Developer | React | Vite</p>
    </motion.section>
  );
}

export default Home;
