import { renderHook, act } from "@testing-library/react-hooks";
import { useFetch } from "../helpers/useFetch.ts";

beforeEach(() => {
  fetch.resetMocks();
});

describe("useFetch Hook", () => {
  test("should return loading param and data correctly", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        status: "1",
        message: "OK",
        result: "40891631566070000000000",
      })
    );

    const { result, waitForNextUpdate } = renderHook(
      () =>
        useFetch(
          "https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a"
        ),
      999,
      () => {}
    );
    act(() => {
      console.log("xxx ", result.current);
    });

    const [, loading, error] = result.current;
    expect(loading).toBe(true);
    expect(error).toBeNull();

    //wait for update
    await waitForNextUpdate();

    const [data1, loading1, error1] = result.current;
    expect(data1).toEqual({
      status: "1",
      message: "OK",
      result: "40891631566070000000000",
    });
    expect(loading1).toBe(false);
    expect(error1).toBeNull();
  });
  test("should return error is fetch errors out", async () => {
    fetch.mockRejectOnce("Some Error");

    const { result, waitForNextUpdate } = renderHook(
      () =>
        useFetch(
          "https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a"
        ),
      999,
      () => {}
    );
    act(() => {
      console.log("xxx ", result.current);
    });

    const [, loading, error] = result.current;
    expect(loading).toBe(true);
    expect(error).toBeNull();

    //wait for update
    await waitForNextUpdate();

    const [, loading1, error1] = result.current;
    expect(loading1).toBe(false);
    expect(error1).toBe("Some Error");
  });
});
