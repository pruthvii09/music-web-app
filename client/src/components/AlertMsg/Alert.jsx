import React from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { motion } from "framer-motion";

const Alert = ({ type }) => {
  return (
    <motion.div
      initial={{ translateX: 200, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 200, opacity: 0 }}
      key={type}
      className={`fixed px-4 py-2 rounded-md backdrop-blur-md flex items-center justify-center top-12 right-12 shadow-md
      `}
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiSunglasses className="text-3xl text-green-500" />
          <p className="text-xl font-semibold text-green-500">Data Saved</p>
        </div>
      )}
      {type === "danger" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiSunglasses className="text-3xl text-red-500" />
          <p className="text-xl text-red-500 font-semibold">
            Failed to Save!! Try Again Later....
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
