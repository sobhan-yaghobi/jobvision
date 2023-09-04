import React from "react";
import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="absolute top-2 left-2">
      <motion.div
        className="w-4 h-4 border-solid border-2 border-jv-primary border-r-transparent border-t-transparent rounded-full"
        animate={{ rotate: 2500 }}
        transition={{
          type: "spring",
          damping: 300,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      ></motion.div>
    </div>
  );
}

export default Loading;
