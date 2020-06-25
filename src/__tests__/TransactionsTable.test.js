import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import TransactionsTable from "../components/TransactionsTable/TransactionsTable.tsx";

describe("TransactionsTable component ", () => {
  test("should show loading component when balanceLoading prop is true", async () => {
    render(
      <TransactionsTable transactions={null} transactionsLoading={true} />
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.queryByTestId("transactions-table")).toBeNull();
  });
  test("should show correct number of rows, values for timestamps and ether", async () => {
    render(
      <TransactionsTable
        transactions={transactionsData}
        transactionsLoading={false}
      />
    );
    expect(screen.queryByTestId("loader")).toBeNull();
    expect(screen.getAllByTestId("transaction-row")).toHaveLength(3);
    // Note that this test is time dependent and needs to be parametrized with current time. I have done on such test in the converter.test.js
    // expect(screen.getAllByTestId("transaction-date")[0].textContent).toEqual(
    //   "338 days, 13 hours"
    // );
    expect(
      screen.getAllByTestId("transaction-ether-value")[0].textContent
    ).toEqual("0.001 Ether");
  });
});

const transactionsData = [
  {
    blockNumber: "8202023",
    timeStamp: "1563819581",
    hash: "0x5afb8990f9ba7ecb7cb9ccc7c5522177f6d5e321ca18f070378ba416a71d8284",
    nonce: "62",
    blockHash:
      "0x6cd95e6b24fa9c5d8e33839890f379d8b91cad490b2639570f16fa06f58eaa3e",
    transactionIndex: "60",
    from: "0x19c16bfadf1e2412ec98afa694ee71a0ddcd309c",
    to: "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
    value: "1000000000000000",
    gas: "21000",
    gasPrice: "4800000000",
    isError: "0",
    txreceipt_status: "1",
    input: "0x",
    contractAddress: "",
    cumulativeGasUsed: "3894335",
    gasUsed: "21000",
    confirmations: "2131265",
  },
  {
    blockNumber: "7720873",
    timeStamp: "1557329807",
    hash: "0xf2f5784e3df19a40731a89968d40f94d3b5fc2de95170f9ae7d9a673fd8717bb",
    nonce: "0",
    blockHash:
      "0xa42bf5bc0396c6564bddc0d7eac3c9ff3bb74cd35321ce9ab3e75d2ce75d16ed",
    transactionIndex: "27",
    from: "0x142379a22bc11a56a179d9d4644495f301a316c7",
    to: "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
    value: "649000000000000000",
    gas: "100000",
    gasPrice: "10000000000",
    isError: "0",
    txreceipt_status: "1",
    input: "0x",
    contractAddress: "",
    cumulativeGasUsed: "1852699",
    gasUsed: "21000",
    confirmations: "2612415",
  },
  {
    blockNumber: "7673819",
    timeStamp: "1556695071",
    hash: "0x7d49cc787ee5826cd7231639874674b6e23241e6bde346a0fff070853e009611",
    nonce: "11",
    blockHash:
      "0x33801731a9760cfccde71a6ee0eb227220c1d86be7dfbde6eda0d67145ec4514",
    transactionIndex: "8",
    from: "0x957211ca8d57bb49604bca895b396faf743120fd",
    to: "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
    value: "19000000000000000000",
    gas: "100000",
    gasPrice: "10000000000",
    isError: "0",
    txreceipt_status: "1",
    input: "0x",
    contractAddress: "",
    cumulativeGasUsed: "259821",
    gasUsed: "21000",
    confirmations: "2659469",
  },
];
