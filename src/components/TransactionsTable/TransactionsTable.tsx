import React, { ReactElement } from "react";
import styles from "./TransactionsTable.module.scss";
import { Transaction } from "../../model/Transaction";
import Loader from "../Loader";
import { convertTimestampToDaysHours, convertWeiToEther } from "../../helpers/converters";

interface Props {
  transactions: Transaction[];
  transactionsLoading: boolean;
}

/* Shows table of recent transactions. Truncated values are shown as full on tooltips. */
export default function TransactionsTable({
  transactions,
  transactionsLoading,
}: Props): ReactElement {

  const transformedTransaction = transformTransactionsList(transactions);

  return (
      <div className={styles.transactionsContainer}>
        <div className={styles.transactionsContainer__title}>
          Recent Transactions
        </div>
        {transactionsLoading ? <Loader /> :
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
                {transformedTransaction.map(transaction => (<tr key={transaction.hash}>
                  <td title={transaction.hash}>{transaction.hash}</td>
                  <td title={transaction.blockNumber}>{transaction.blockNumber}</td>
                  <td title={transaction.date}>{transaction.age}</td>
                  <td title={transaction.from}>{transaction.from}</td>
                  <td title={transaction.to}>{transaction.to}</td>
                  <td title={`${transaction.valueInEther}`}>{transaction.valueInEther} Ether</td>
                </tr>))}
              </tbody>
            </table>
          </div>
        }
      </div>
  );
}

/* transform transaction object to suitable data object */
export function transformTransactionsList(transactions: Transaction[]) {
  return transactions.map(transaction => {
    const [daysAgo, hoursAgo] = convertTimestampToDaysHours(transaction.timeStamp);
    const valueInEther = convertWeiToEther(transaction.value);
    return {
      ...transaction,
      age: `${daysAgo} days, ${hoursAgo} hours`,
      date: new Date(transaction.timeStamp * 1000).toString(),
      valueInEther
    };
  });
}

