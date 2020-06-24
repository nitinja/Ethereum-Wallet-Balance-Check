import React, { ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import FocusTrap from 'focus-trap-react';

interface Props {
    setVisible: (visible: boolean) => void;
    children: React.ReactNode;
    title: string;
}

/* A reusable modal component using react portals for accessibility */
export default function Modal({ children, setVisible, title }: Props): ReactElement | null {
    const closeModal = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            setVisible(false);
        }
    }

    /* Handle Escape key to close dialog */
    useEffect(() => {
        const controlDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                setVisible(false)
            }
        };
        window.addEventListener('keydown', controlDown);
        return () => {
            window.removeEventListener('keydown', controlDown);
        }
    }, [setVisible]);

    /* create portal */
    return createPortal(
        <aside className={styles.modal__overlay} onClick={closeModal}>
            <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
                <div className={styles.modal__container}>
                    <div>
                        <header className={styles.modal__title}>{title}</header>
                        <button className={styles.modal__closeButton} onClick={closeModal}>X</button>
                    </div>
                    {children}
                </div>
            </FocusTrap>
        </aside>
        , document.body);

}

