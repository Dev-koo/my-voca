import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const CorrectSign = ({ isCorrect, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <SignPanel
          initial={{ display: "none" }}
          animate={{ display: "block", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Sign isCorrect={isCorrect}>
            {isCorrect === "right" ? "정답" : "오답"}
          </Sign>
        </SignPanel>
      )}
    </AnimatePresence>
  );
};

export default CorrectSign;

const Sign = styled.div`
  color: ${(props) => (props.isCorrect === "right" ? "skyblue" : "pink")};
`;

const SignPanel = styled(motion.div)`
  position: absolute;
  bottom: 1rem;
  right: 50%;
  transform: translateX(50%);
  text-align: center;
  font-size: 2rem;
  z-index: 1;
  /* color: ${(props) => (props.isCorrect === "right" ? "skyblue" : "pink")}; */
`;
