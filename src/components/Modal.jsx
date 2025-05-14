import React from "react";
import styles from "./Modal.module.css";

// props : (propriedades) são parâmentros que você passa de componente pai para um componente filho no React
//         Elas servem para enviar dados e também funções de um componente para outro.
//         abaixo temos três: isOpen, onClose, onConfirm

const Modal = ({isOpen, onClose, onConfirm}) => {

    if(!isOpen ) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <p className={styles.modelHeader}>
                    Tem certeza que deseja excluir este item?
                </p>
                <div className={styles.modalButtons}>
                   <button
                        className={`${styles.button} ${styles.cancel}`}
                        onClick={onClose}
                    >
                      Cancelar
                   </button>
                   <button
                        className={`${styles.button} ${styles.confirm}`}
                        onClick={onConfirm}
                    >
                      Excluir
                   </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;