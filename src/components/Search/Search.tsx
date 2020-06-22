
import React, { ReactElement, useState, useEffect } from 'react'
import styles from './Search.module.scss';
import { Networks, ApiNetworkTypes } from '../../model/Networks';
import { isEthereumAddressValid } from '../../helpers/validations';

interface Props {
    ethereumAddress: string;
    onSearchRequest: (ethereumAddress: string, network: Networks) => void;
}

const networksList: Networks[] = Object.keys(ApiNetworkTypes) as Networks[];

export default function Search({ ethereumAddress, onSearchRequest }: Props): ReactElement {
    const [address, setAddress] = useState(ethereumAddress || '');
    const [network, setNetwork] = useState<Networks>("Mainnet");
    const [oldAddress, setOldAddress] = useState(() => ethereumAddress || '');
    const [addressFieldInvalid, setAddressFieldInvalid] = useState(false);
    const [addressFieldBlured, setAddressFieldBlured] = useState(false);

    if (ethereumAddress !== oldAddress) {
        setAddress(ethereumAddress);
        setOldAddress(ethereumAddress);
    }

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        // console.log("in onchange", value);
        setAddress(value);
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
        if(!addressFieldInvalid){
            onSearchRequest(address, network);
        }
    }

    useEffect(() => {
        const isAddressFieldInvalid = addressFieldBlured && !isEthereumAddressValid(address);
        // console.log("validating", address, addressFieldBlured, isAddressFieldInvalid)
        setAddressFieldInvalid(isAddressFieldInvalid);
    },[address, addressFieldBlured]);

    return (
        <div className={styles.search}>
            <form onSubmit={handleSearch}>
                <div className={styles.search__formGroup}>
                    <label className={styles.search__fieldLabel} htmlFor="search-input">Ethereum Address</label>
                    <input required value={address} id="search-input" onChange={handleAddressChange} onBlur={handleAddressBlur} autoComplete="off"
                        type="text" placeholder="Enter Ethereum address" className={`${styles.search__field} ${!addressFieldInvalid ? ' invalid' : ''}`} />
                    {addressFieldInvalid && <div className={styles.search__errorMessage}>Please enter valid Ethereum address.</div>}
                </div>
                <div className={styles.search__formGroup}>
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
