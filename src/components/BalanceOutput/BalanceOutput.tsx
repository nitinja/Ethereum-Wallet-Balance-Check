import React, { ReactElement } from "react";
import { convertWeiToEther } from "../../helpers/converters";
import styles from "./BalanceOutput.module.scss";
interface Props {
  wei: number;
  exchangeRateUSD: number;
  balanceLoading: boolean;
}

export default function BalanceOutput({
  wei,
  exchangeRateUSD,
}: Props): ReactElement {
  const ether = convertWeiToEther(wei);
  const valueUSD = (ether * exchangeRateUSD);
  return (
    <div className={styles.balance}>
      <div className={styles.balance__container}>
        <div className={styles.balance__label}>Balance</div>
        <div className={styles.balance__balanceUnit}>
          <div className={styles.balance__value}>{ether.toFixed(4)}</div>
          <div className={styles.balance__unit}>Ether</div>
        </div>
      </div>
      <div className={styles.balance__container}>
        <div className={styles.balance__label}>Ether Value</div>
        <div className={styles.balance__balanceUnit}>
            <div className={styles.balance__value}>{valueUSD.toFixed(4)}</div>
            <div className={styles.balance__unit}>$</div>
        </div>
        <div className={styles.balance__label}>Rate: {exchangeRateUSD}$/ETH</div>
      </div>
    </div>
  );
}
