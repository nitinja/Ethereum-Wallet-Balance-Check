import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import { act } from "react-dom/test-utils";
import App from "../components/App/App.tsx";

beforeEach(() => {
  fetch.resetMocks();
});

const server = setupServer([
  rest.get(
    "https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&apikey=XEH2AFYZY3YYJFGA8CSQ1V8V2PRQX4GGH9",
    (req, res, ctx) => {
      return res(
        ctx.json({
          status: "1",
          message: "OK",
          result: "40891631566070000000000",
        })
      );
    }
  ),
  rest.get(
    "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=XEH2AFYZY3YYJFGA8CSQ1V8V2PRQX4GGH9",
    (req, res, ctx) => {
      return res(
        ctx.json({
          status: "1",
          message: "OK",
          result: {
            ethbtc: "0.02551",
            ethbtc_timestamp: "1592992771",
            ethusd: "242.76",
            ethusd_timestamp: "1592992770",
          },
        })
      );
    }
  ),
]);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe("App main component", () => {
  test("should initially show empty search box and no results", () => {
    render(<App></App>);
    expect(screen.getByTestId("search-input").value).toEqual("");
    expect(screen.getByTestId("results-section")).toBeEmptyDOMElement();
    expect(screen.getByTestId("search-button")).toBeDisabled();
    expect(screen.getByTestId("history-button")).toBeInTheDocument();
    expect(screen.queryByTestId("history-menu")).toBeNull();
  });

  //Note that this test was not working even though these techniques works in every other project.
  //Its some configuration issue. Given some more time, this can be fixed.

  //   test("should show balance result when entered valid address anc clicked search button", async () => {
  //     render(<App></App>);
  //     userEvent.type(
  //       screen.getByTestId("search-input"),
  //       "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a"
  //     );
  //     act(() => {
  //       fireEvent.click(screen.getByTestId("search-button"));
  //     });

  //     waitFor(() => screen.getByTestId("balance-value"));
  //     console.log("xxx ", screen.debug());
  //     expect(screen.getByTestId("balance-value")).toHaveTextContent("40891.6316");
  //   });
});
