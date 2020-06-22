import React, { ReactElement, useState } from 'react'
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
interface Props {
    visible:boolean;
    setVisible:(visible: boolean) => void;
    children: React.ReactNode,
    title: string
}

export default function Modal({children, visible, setVisible, title}: Props): ReactElement|null {
        if (visible){
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
