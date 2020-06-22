import React, { ReactElement } from "react";
import styles from "./TransactionsTable.module.scss";
import { Transaction } from "../../model/Transaction";
import Loader from "../Loader";

interface Props {
  transactions: Transaction[];
  transactionsLoading: boolean;
}

export default function TransactionsTable({
  transactions,
  transactionsLoading,
}: Props): ReactElement {
  return (
    <>
      <div className={styles.transactionsContainer}>
        <h3 className={styles.transactionsContainer__title}>
          Recent Transactions
        </h3>
        {transactionsLoading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.tableStyle}>
              <table>
                <thead>
                  <tr>
                    <th>Hash</th>
                    <th>Block</th>
                    <th>Age</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => (<tr key={transaction.hash}>
                    <td>{transaction.hash}</td>
                    <td>{transaction.blockNumber}</td>
                    <td>{transaction.timeStamp}</td>
                    <td>{transaction.from}</td>
                    <td>{transaction.to}</td>
                    <td>{transaction.value}</td>
                  </tr>))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
