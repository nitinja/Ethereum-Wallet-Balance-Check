import React, { ReactElement, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./HistoryMenu.module.scss";
import FocusTrap from 'focus-trap-react';

interface Props {
  searchHistory: string[];
  onSelectAddress: (address: string) => void
}

/* Memoised Menu component showing history of search entries. only shows latest 5 entries. */
const HistoryMenu = React.memo(({ searchHistory, onSelectAddress }: Props): ReactElement => {
  const [menuVisible, setMenuVisible] = useState(false);

  /* Button ref to point to button element. Helps in calculating menu position */
  const ref = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setMenuVisible(!menuVisible);
  }, [menuVisible]);

  const getMenu = useCallback(() => {
    const el = ref?.current as any;
    const top = el?.offsetTop + el?.offsetHeight;
    const right = document.body.offsetWidth - (el?.offsetLeft + el?.offsetWidth);

    return createPortal(
      <div className={styles.menu__overlay} onClick={() => setMenuVisible(false)}>
        <div className={styles.menu__dropdown} style={{ top, right }}>
          <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
            <ul data-testid="history-menu" className={styles.menu__list}>
              {searchHistory.map((item) => (
                <li key={item} >
                  <button className={styles.menu__item} onClick={() => onSelectAddress(item)}>{item}</button>
                </li>
              ))}
            </ul>
          </FocusTrap>
        </div>
      </div>,
      document.body
    )
  }, [onSelectAddress, searchHistory]);

  return (
    <>
      <button data-testid="history-button" ref={ref} className={styles.menu__button} onClick={toggleMenu} disabled={!searchHistory || !searchHistory.length}>
        Search History ▾
      </button>
      {menuVisible && getMenu()}
    </>
  );
});

export default HistoryMenu;
