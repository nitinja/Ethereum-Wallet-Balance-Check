import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Search from "../components/Search/Search";

let mockOnSearchRequest = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Search component ", () => {
  test("should initially show empty textbox and button disabled", async () => {
    render(
      <Search ethereumAddress={""} onSearchRequest={mockOnSearchRequest} />
    );
    expect(screen.getByTestId("search-input").value).toEqual("");
    expect(screen.getByTestId("network-select").value).toEqual("Mainnet");
    expect(screen.getByRole("button")).toBeDisabled();
  });
  test("should, when provide with valid address, show textbox with address, button enabled", async () => {
    render(
      <Search
        ethereumAddress={"0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a"}
        onSearchRequest={mockOnSearchRequest}
      />
    );
    expect(screen.getByTestId("search-input").value).toEqual(
      "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a"
    );
    expect(screen.getByTestId("network-select").value).toEqual("Mainnet");
    expect(screen.getByRole("button")).toBeEnabled();
    const errorMessage = screen.queryByText(
      "Please enter valid Ethereum address."
    );
    expect(errorMessage).toBeNull();
  });
  test("should, when invalid address entered, show error message", async () => {
    render(
      <Search ethereumAddress={""} onSearchRequest={mockOnSearchRequest} />
    );
    userEvent.type(screen.getByTestId("search-input"), "invalid-tests");
    fireEvent.blur(screen.getByTestId("search-input"));
    let button = screen.getByTestId("search-button");
    fireEvent.click(button);
    const errorMessage = await screen.getByTestId("input-invalid-error");
    expect(errorMessage).toBeInTheDocument();
  });
  test("should, when valid address entered and button pressed, call search callback prop once", async () => {
    render(
      <Search ethereumAddress={""} onSearchRequest={mockOnSearchRequest} />
    );
    userEvent.type(
      screen.getByTestId("search-input"),
      "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a"
    );
    fireEvent.blur(screen.getByTestId("search-input"));
    let button = screen.getByTestId("search-button");
    fireEvent.click(button);
    expect(mockOnSearchRequest).toHaveBeenCalledTimes(1);
  });
  test("should, when valid address entered and network selected, call search callback prop with selected network", async () => {
    render(
      <Search ethereumAddress={""} onSearchRequest={mockOnSearchRequest} />
    );
    userEvent.type(
      screen.getByTestId("search-input"),
      "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a"
    );
    fireEvent.blur(screen.getByTestId("search-input"));
    let button = screen.getByTestId("search-button");
    fireEvent.click(button);
    expect(mockOnSearchRequest).toHaveBeenCalledWith(
      "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
      "Mainnet"
    );
    userEvent.selectOptions(screen.getByTestId("network-select"), ["Rinkeby"]);
    fireEvent.click(button);
    expect(mockOnSearchRequest).toHaveBeenLastCalledWith(
      "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
      "Rinkeby"
    );
  });
});
