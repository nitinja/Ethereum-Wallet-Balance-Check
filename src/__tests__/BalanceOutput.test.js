import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import BalanceOutput from "../components/BalanceOutput/BalanceOutput.tsx";

describe("BalanceOutput component ", () => {
  test("should show loading component when balanceLoading prop is true", async () => {
    render(
      <BalanceOutput
        wei={null}
        exchangeRateUSD={null}
        balanceLoading={true}
        exchangeRatesLoading={false}
        exchangeRatesError={""}
      />
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.queryByTestId("balance-value")).toBeNull();
    expect(screen.queryByTestId("usd-value")).toBeNull();
  });
  test("should show ether balance converted in ETHER and USD when provided ether balance in wei and exchange rate", async () => {
    render(
      <BalanceOutput
        wei={40891631566070000000000}
        exchangeRateUSD={234.49}
        balanceLoading={false}
        exchangeRatesLoading={false}
        exchangeRatesError={""}
      />
    );
    expect(screen.queryByTestId("loader")).toBeNull();
    expect(screen.queryByTestId("balance-value").textContent).toEqual(
      "40891.6316"
    );
    expect(screen.queryByTestId("usd-value").textContent).toEqual("9588678.69");
  });
  test("should show ether balance converted in ETHER and USD when provided ether balance in wei and exchange rate", async () => {
    render(
      <BalanceOutput
        wei={40891631566070000000000}
        exchangeRateUSD={234.49}
        balanceLoading={false}
        exchangeRatesLoading={false}
        exchangeRatesError={""}
      />
    );
    expect(screen.queryByTestId("loader")).toBeNull();
    expect(screen.queryByTestId("balance-value").textContent).toEqual(
      "40891.6316"
    );
    expect(screen.queryByTestId("usd-value").textContent).toEqual("9588678.69");
  });
});
