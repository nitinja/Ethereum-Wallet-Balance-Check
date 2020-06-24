import React, { useCallback, useEffect, useState } from "react";
import { getAccountTransactionsUrl, getBalanceUrl, getExchangeApiUrl, transformResponse } from '../../helpers/api-helpers';
import { useFetch } from "../../helpers/useFetch";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import { ExchangeResponse } from "../../model/ApiResponse";
import { Networks } from "../../model/Networks";
import { Transaction } from "../../model/Transaction";
import AddressLink from "../AddressLink/AddressLink";
import BalanceOutput from "../BalanceOutput/BalanceOutput";
import Footer from "../Footer";
import Header from "../Header/Header";
import Search from "../Search/Search";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import styles from './App.module.scss';

const HISTORY_LOCAL_STORAGE_KEY = 'searchHistory';

/* Main app component */
function App() {

  /* address entered by selecting history menu */
  const [ethereumAddressFromHistory, setEthereumAddressFromHistory] = useState('');

  /* Validated address */
  const [validatedEthereumAddress, setValidatedEthereumAddress] = useState('');

  /* URLs that will be used by useFetch hook for data fetching. Will be updated with parameters later. */
  const [balanceApiUrl, setBalanceApiUrl] = useState('');
  const [transactionsApiUrl, setTransactionsApiUrl] = useState('');

  /* useFetch custom hook that fetches data and handles loading as well as error */
  const [balance, balanceLoading, balanceError] = useFetch<number | null>(balanceApiUrl, null, transformResponse)
  const [transactions, transactionsLoading, transactionsError] = useFetch<Transaction[] | null>(transactionsApiUrl, null, transformResponse)
  const [exchangeRates, exchangeRatesLoading, exchangeRatesError] = useFetch<ExchangeResponse | null>(getExchangeApiUrl(), null, transformResponse);

  /* History menu entries in local storage managed as custom hook */
  const [searchHistory, saveSearchHistory] = useLocalStorage<string[]>(HISTORY_LOCAL_STORAGE_KEY, []);

  const onSearchRequest = useCallback((ethereumAddress: string, network: Networks): void => {
    setValidatedEthereumAddress(ethereumAddress);
    setBalanceApiUrl(getBalanceUrl(ethereumAddress, network));
    setTransactionsApiUrl(getAccountTransactionsUrl(ethereumAddress, network));
  }, []);

  /* Add address to history local storage when searched. Only stores 5 latest searches. */
  useEffect(() => {
    if (!validatedEthereumAddress) {
      return;
    }
    if (!searchHistory.includes(validatedEthereumAddress)) {
      saveSearchHistory([...searchHistory, validatedEthereumAddress].slice(-5));
    }
  }, [validatedEthereumAddress, saveSearchHistory, searchHistory]);

  return (
    <div className={styles.container}>
      <Header searchHistory={searchHistory} onSelectAddress={setEthereumAddressFromHistory} />
      <Search ethereumAddress={ethereumAddressFromHistory} onSearchRequest={onSearchRequest} />

      <hr />
      <section data-testid="results-section" className={styles.resultsSection}>
        {/* Will only be displayed in address validated by search component */}
        {validatedEthereumAddress &&
          <>
            <AddressLink ethereumAddress={validatedEthereumAddress} />
            {balanceError
              ? <div className="errorMessage">Error occurred while loading Balance.</div>
              : <BalanceOutput wei={balance} exchangeRateUSD={exchangeRates?.ethusd} balanceLoading={balanceLoading} exchangeRatesLoading={exchangeRatesLoading} exchangeRatesError={exchangeRatesError} />}
            {transactionsError
              ? <div className="errorMessage">Error occurred while loading Transactions.</div>
              : <TransactionsTable transactions={transactions} transactionsLoading={transactionsLoading} />}
          </>
        }
      </section>
      <Footer />
    </div>
  );
}

export default App;

