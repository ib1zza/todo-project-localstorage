import React, {useContext} from "react";
import s from "../css/Modal.module.scss";
import { motion } from "framer-motion";

import {useModalContext} from "../context/ModalContext";

interface ModalProps {

  children?: React.ReactNode;

}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const {setModal} = useModalContext();
    const hideF = () => setModal(false);
  return (
    <>
      <motion.div
        className={s.modalBg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
      />
      <motion.div
        className={s.modalBlock}
        onClick={hideF}
        initial={{ y: -300 }}
        animate={{ y: 0 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
