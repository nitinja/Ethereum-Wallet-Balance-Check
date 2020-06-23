
import React, { ReactElement, useEffect, useState } from 'react';
import { isEthereumAddressValid } from '../../helpers/validations';
import { ApiNetworkTypes, Networks } from '../../model/Networks';
import styles from './Search.module.scss';

interface Props {
    ethereumAddress: string;
    onSearchRequest: (ethereumAddress: string, network: Networks) => void;
}

const networksList: Networks[] = Object.keys(ApiNetworkTypes) as Networks[];

/* Search component with network selection option */
export default function Search({ ethereumAddress, onSearchRequest }: Props): ReactElement {
    const [address, setAddress] = useState(ethereumAddress || '');
    const [network, setNetwork] = useState<Networks>("Mainnet");

    /* Used for setting new address thru history menu. */
    const [oldAddress, setOldAddress] = useState(() => ethereumAddress || '');

    /* For validations */
    const [addressFieldInvalid, setAddressFieldInvalid] = useState(false);
    const [addressFieldBlured, setAddressFieldBlured] = useState(false);

    /* Used for sending history item to this component */
    if (ethereumAddress !== oldAddress) {
        setAddress(ethereumAddress);
        setOldAddress(ethereumAddress);
    }

    /* Note that "useCallback()" is not necessary on below functions, we are not passing those as props to components */

    const handleAddressChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(target.value);
    }

    const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        console.log("in select onchange", value);
        setNetwork(value as Networks);
    }

    const handleAddressBlur = () => {
        setAddressFieldBlured(true);
    }

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        if (!addressFieldInvalid) {
            onSearchRequest(address, network);
        }
    }

    useEffect(() => {
        const isAddressFieldInvalid = addressFieldBlured && !isEthereumAddressValid(address);
        setAddressFieldInvalid(isAddressFieldInvalid);
    }, [address, addressFieldBlured]);

    return (
        <div className={styles.search}>
            <form onSubmit={handleSearch} className={styles.search__form}>
                <div className={`${styles.search__formGroup} ${styles.search__inputContainer}`}>
                    <label className={styles.search__fieldLabel} htmlFor="search-input">Ethereum Address</label>
                    <input required value={address} id="search-input" onChange={handleAddressChange} onBlur={handleAddressBlur} autoComplete="off"
                        type="text" placeholder="Enter Ethereum address" className={`${styles.search__field} ${!addressFieldInvalid ? ' invalid' : ''}`} />
                    {addressFieldInvalid && <div className={styles.search__errorMessage}>Please enter valid Ethereum address.</div>}
                </div>
                <div className={`${styles.search__formGroup} ${styles.search__selectContainer}`}>
                    <label className={styles.search__fieldLabel} htmlFor="network-select">Network</label>
                    <select className={styles.search__field} id="network-select" value={network} onChange={handleNetworkChange}>
                        {networksList.map((network, index) => <option key={index} value={network}>{network}</option>)}
                    </select>
                </div>
                <button className={styles.search__searchButton} disabled={!address}>Search</button>
            </form>
        </div>
    )
}
