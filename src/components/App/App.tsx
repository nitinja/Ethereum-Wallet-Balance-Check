import React, { useState } from "react";
import { Networks, ApiNetworkTypes } from "../../model/Networks";
import Footer from "../Footer";
import Header from "../Header/Header";
import Search from "../Search/Search";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import styles from './App.module.scss';
import { useFetch } from "../../helpers/useFetch";
import { ApiResponse } from "../../model/ApiResponse";
// import { convertWeiToEther } from "../../helpers/converters";
import BalanceOutput from "../BalanceOutput/BalanceOutput";
import { Transaction } from "../../model/Transaction";
import AddressLink from "../AddressLink/AddressLink";

function transformResponse<T>(response: ApiResponse<T>): T {
  if(response.status === '1'){
    // const balanceInWei = Number(response.result);
    // return convertWeiToEther(balanceInWei);
    return response.result;
  } else {
    throw new Error("Server returned error: "+response.result);
  }
}

function App() {

  const [ethereumAddress, setEthereumAddress] = useState('0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a');

  const [balanceApiUrl, setBalanceApiUrl] = useState('');
  const [transactionsApiUrl, setTransactionsApiUrl] = useState('');
  
  const [balance, balanceLoading, balanceError] = useFetch<number>(balanceApiUrl, 0, transformResponse)
  const [transactions, transactionsLoading,transactionsError] = useFetch<Transaction[]>(transactionsApiUrl, [], transformResponse)
  const [exchangeRates, exchangeRatesLoading, exchangeRatesError] = useFetch<{ethusd:number}>('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=XEH2AFYZY3YYJFGA8CSQ1V8V2PRQX4GGH9',{ethusd: 0}, transformResponse);

  const onSearchRequest = (ethereumAddress: string, network: Networks): void => {
    console.log(ethereumAddress, network);
    setEthereumAddress(ethereumAddress);
    setBalanceApiUrl(getBalanceUrl(ethereumAddress, network)); 
    setTransactionsApiUrl(getAccountTransactionsUrl(ethereumAddress, network));
  };

  const getBalanceUrl = (ethereumAddress: string, network: Networks): string => { 
    return `https://${ApiNetworkTypes[network]}.etherscan.io/api?module=account&action=balance&address=${ethereumAddress}&apikey=XEH2AFYZY3YYJFGA8CSQ1V8V2PRQX4GGH9`
  }
  const getAccountTransactionsUrl = (ethereumAddress: string, network: Networks):string => {
    return `https://${ApiNetworkTypes[network]}.etherscan.io/api?module=account&action=txlist&page=1&offset=10&sort=desc&address=${ethereumAddress}&apikey=XEH2AFYZY3YYJFGA8CSQ1V8V2PRQX4GGH9`
  }
  
  const x = [{"blockNumber":"8202023","timeStamp":"1563819581","hash":"0x5afb8990f9ba7ecb7cb9ccc7c5522177f6d5e321ca18f070378ba416a71d8284","nonce":"62","blockHash":"0x6cd95e6b24fa9c5d8e33839890f379d8b91cad490b2639570f16fa06f58eaa3e","transactionIndex":"60","from":"0x19c16bfadf1e2412ec98afa694ee71a0ddcd309c","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"1000000000000000","gas":"21000","gasPrice":"4800000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"3894335","gasUsed":"21000","confirmations":"2106054"},{"blockNumber":"7720873","timeStamp":"1557329807","hash":"0xf2f5784e3df19a40731a89968d40f94d3b5fc2de95170f9ae7d9a673fd8717bb","nonce":"0","blockHash":"0xa42bf5bc0396c6564bddc0d7eac3c9ff3bb74cd35321ce9ab3e75d2ce75d16ed","transactionIndex":"27","from":"0x142379a22bc11a56a179d9d4644495f301a316c7","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"649000000000000000","gas":"100000","gasPrice":"10000000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"1852699","gasUsed":"21000","confirmations":"2587204"},{"blockNumber":"7673819","timeStamp":"1556695071","hash":"0x7d49cc787ee5826cd7231639874674b6e23241e6bde346a0fff070853e009611","nonce":"11","blockHash":"0x33801731a9760cfccde71a6ee0eb227220c1d86be7dfbde6eda0d67145ec4514","transactionIndex":"8","from":"0x957211ca8d57bb49604bca895b396faf743120fd","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"19000000000000000000","gas":"100000","gasPrice":"10000000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"259821","gasUsed":"21000","confirmations":"2634258"},{"blockNumber":"7673180","timeStamp":"1556686477","hash":"0x760635955bd731df1d87cf8be8aa479a54ac0cf5de8edf9bcda69675b7ccdee5","nonce":"9","blockHash":"0xf9843579c7a556530c3021448f34f675b1aba8bc2e5cb3fb75825a6309ee3d17","transactionIndex":"115","from":"0xc531e60a04eef96c00b2ee529332e555f9c1fb7e","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"400000000000000000","gas":"100000","gasPrice":"10000000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"5876892","gasUsed":"21000","confirmations":"2634897"},{"blockNumber":"7673146","timeStamp":"1556686165","hash":"0x0b494d733445d15c6ee457734d663a69290a587e32e967a15d7a44d36090c64a","nonce":"0","blockHash":"0x416d3a3843b2893e1df07e7a57ccd1b7bff5ce506e9f91902c75ddec4c7510dd","transactionIndex":"63","from":"0x2ea73152624fdd3d6c253574eb21c90d93bcfb84","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"1075000000000000000","gas":"100000","gasPrice":"10000000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"2477943","gasUsed":"21000","confirmations":"2634931"},{"blockNumber":"7673143","timeStamp":"1556686068","hash":"0xa79529eadc2720336f124abe0e94493e04c3203a916fc2de08ba1855966b4a5d","nonce":"0","blockHash":"0x96efdbea6b2c0d4d8856176fe994636b9cf307b6b494fcdd2fee6f3f46ac1800","transactionIndex":"121","from":"0x4e35edf880a40a424b6deb1ae9b247b0ac4086d7","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"999000000000000000","gas":"100000","gasPrice":"10000000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"7849968","gasUsed":"21000","confirmations":"2634934"},{"blockNumber":"7673138","timeStamp":"1556686044","hash":"0x3d9e8c170dd7559a315107d6a9c48a4bab841cdb0272a50fb66344ae56362b2e","nonce":"0","blockHash":"0xf8b2cbaf40254300ada40b7e94e88a24637a9c03a1bfff95679972e878d04125","transactionIndex":"15","from":"0x31b96b4b7f1ab6b7787e3cfaa8778c4ce5e37b5d","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"999000000000000000","gas":"100000","gasPrice":"10000000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"596408","gasUsed":"21000","confirmations":"2634939"},{"blockNumber":"7673138","timeStamp":"1556686044","hash":"0x878ddbccee21fd0fc582bb3d85fd799e46dfe8a3836144a874a513c2fac95bc8","nonce":"0","blockHash":"0xf8b2cbaf40254300ada40b7e94e88a24637a9c03a1bfff95679972e878d04125","transactionIndex":"14","from":"0x29478c67ad2864421cb6f69b90e84028b1045e05","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"840000000000000000","gas":"100000","gasPrice":"10000000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"575408","gasUsed":"21000","confirmations":"2634939"},{"blockNumber":"7673135","timeStamp":"1556686002","hash":"0x4a51db9873927e9387993eed410b35c50948ee334e6d0281b2ff75449bee8c6b","nonce":"0","blockHash":"0xba50ca7341a5eb53d6eb6fb40988ef960a6991e49a58da9ee650ba6ecbf00dd4","transactionIndex":"33","from":"0xc374d3dcd13e8cc8d92f1b86f4aeeaa051a218ab","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"28900000000000000000","gas":"100000","gasPrice":"10000000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"1659736","gasUsed":"21000","confirmations":"2634942"},{"blockNumber":"7673133","timeStamp":"1556685984","hash":"0xa3a0f9772dfa4ff272333ee8e5b3718693754edaaa15d64a37e48b3c873d4894","nonce":"0","blockHash":"0x15750d863aa52de6e053c44b4559390564d1bc9b266fdc6172272c4c749f410c","transactionIndex":"76","from":"0xd47aeb1b1a78131f4c120999e057af6515bc8c05","to":"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a","value":"26600000000000000000","gas":"100000","gasPrice":"10000000000","isError":"0","txreceipt_status":"1","input":"0x","contractAddress":"","cumulativeGasUsed":"3017637","gasUsed":"21000","confirmations":"2634944"}];

  return (
    <div className={styles.container}>
      <Header />
      <Search ethereumAddress={'0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a'} onSearchRequest={onSearchRequest} />
      <section className={styles.resultsSection}>
      {ethereumAddress && 
          <>
            <AddressLink ethereumAddress={ethereumAddress} />
            { balanceError 
              ? <div className={styles.errorMessage}>Error occurred while loading Balance.</div>
                : <BalanceOutput wei={balance} exchangeRateUSD={exchangeRates.ethusd} balanceLoading={balanceLoading}/>}
            { transactionsError
              ? <div className={styles.errorMessage}>Error occurred while loading Transactions.</div>
              : <TransactionsTable transactions={x} transactionsLoading={transactionsLoading}/>}
          </>
        }
      </section>
      <Footer />
    </div>
  );

}

export default App;