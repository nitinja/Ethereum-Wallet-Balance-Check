import React, { ReactElement } from 'react'
import HistoryMenu from './HistoryMenu'
import styles from './Header.module.scss';
interface Props {
    
}

export default function Header({}: Props): ReactElement {
    return (
        <div className={styles.header}>
            <div className={styles.header__mainTitle}>ETHEREUM CHECKER</div>
            <div className={styles.header__historyMenu}>
                <HistoryMenu/>
            </div>
        </div>
    )
}
