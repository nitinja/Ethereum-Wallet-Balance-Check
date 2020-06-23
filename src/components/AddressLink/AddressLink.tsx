import QRCode from 'qrcode';
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import styles from "./AddressLink.module.scss";
import Modal from "./Modal";

interface Props {
  ethereumAddress: string
}

/* Component for showing Ethereum address and a QR code popup when clicking it */
export default function AddressLink({ ethereumAddress }: Props): ReactElement {
  const [popupVisible, setPopupVisible] = useState(false);
  /* Qr code */
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [qrCodeError, setQrCodeError] = useState<string | null>();

  const handleAddressClick = useCallback(() => {
    setPopupVisible(true)
  }, []);

  useEffect(() => {
    const generateQR = async (text: string) => {
      try {
        const code = await QRCode.toDataURL(text);
        setQrCodeDataUrl(code);
      } catch (err) {
        console.error(err);
        setQrCodeError('Error occurred while generating QR code.');
      }
    }
    generateQR(ethereumAddress);
  }, [ethereumAddress])

  return (
    <div className={styles.address}>
      <label className={styles.address__label}>Address:</label>
      <button className={styles.address__anchor} onClick={handleAddressClick}>{ethereumAddress}</button>
      <Modal visible={popupVisible} setVisible={setPopupVisible} title="QR Code">
        {qrCodeError && <div className="errorMessage">{qrCodeError}</div>}
        {qrCodeDataUrl && <img src={qrCodeDataUrl} alt={`QR code for ethereum address ${ethereumAddress}`} />}
        <div>{ethereumAddress}</div>
      </Modal>
    </div>
  );
}
