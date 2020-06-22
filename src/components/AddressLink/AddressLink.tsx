import React, { ReactElement, useState, useEffect } from "react";
import QRCode from 'qrcode';

import styles from "./AddressLink.module.scss";
import Modal from "./Modal";
interface Props {
  ethereumAddress: string
}

export default function AddressLink({ethereumAddress}: Props): ReactElement {
  const [popupVisible, setPopupVisible] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const handleAddressClick = () => {
    setPopupVisible(true)
  }

  useEffect(() => {
    const generateQR = async (text:string) => {
      try {
        const code = await QRCode.toDataURL(text);
        console.log(code)
        setQrCodeDataUrl(code);
      } catch (err) {
        console.error(err)
      }
    }
    generateQR(ethereumAddress);
  }, [ethereumAddress])

  return (
    <div className={styles.address}>
      <label className={styles.address__label}>Address:</label>
      <button className={styles.address__anchor} onClick={handleAddressClick}>{ethereumAddress}</button>
      <Modal visible={popupVisible} setVisible={setPopupVisible} title="QR Code"> 
        {qrCodeDataUrl && <img src={qrCodeDataUrl} alt={`QR code for ethereum address ${ethereumAddress}`} />}
      </Modal>
    </div>
  );
}
