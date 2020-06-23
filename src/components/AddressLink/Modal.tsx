import React, { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface Props {
    visible:boolean;
    setVisible:(visible: boolean) => void;
    children: React.ReactNode,
    title: string
}

/* A reusable modal component using react portals for accessibility */
export default function Modal({children, visible, setVisible, title}: Props): ReactElement|null {
        if (visible){
            /* create portal */
            return createPortal(
                <aside className={styles.modal__overlay}>
                    <div className={styles.modal__container}>
                        <div>
                        <header className={styles.modal__title}>{title}</header>
                        <button className={styles.modal__closeButton} onClick={() => setVisible(false)}>X</button>
                        </div>
                        {children}
                    </div>
                </aside>
            , document.body)
        }
        return null
         
}
