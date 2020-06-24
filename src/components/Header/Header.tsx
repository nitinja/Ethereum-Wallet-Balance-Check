import React, { ReactElement } from 'react';
import styles from './Header.module.scss';
import HistoryMenu from './HistoryMenu';
interface Props {
    searchHistory: string[];
    onSelectAddress: (address: string) => void
}

/* Memoised Header and menu */
const Header = React.memo(({ searchHistory, onSelectAddress }: Props): ReactElement => {
    return (
        <header className={styles.header}>
            <div className={styles.header__mainTitle}>ETHEREUM CHECKER</div>
            <div className={styles.header__historyMenu}>
                <HistoryMenu searchHistory={searchHistory} onSelectAddress={onSelectAddress} />
            </div>
        </header>
    )
})

export default Header;
