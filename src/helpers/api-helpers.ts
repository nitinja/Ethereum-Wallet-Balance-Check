import { Networks, ApiNetworkTypes } from "../model/Networks";
import { ApiResponse } from "../model/ApiResponse";

const API_DOMAIN = "etherscan.io/api";

/* API key - read from env file. In production, we don't store secrets in frontend projects.*/
export const API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;

export const getBalanceUrl = (
  ethereumAddress: string,
  network: Networks
): string => {
  return getApiUrl(ApiNetworkTypes[network], {
    module: "account",
    action: "balance",
    address: ethereumAddress,
  });
};

export const getAccountTransactionsUrl = (
  ethereumAddress: string,
  network: Networks
): string => {
  return getApiUrl(ApiNetworkTypes[network], {
    module: "account",
    action: "txlist",
    page: 1,
    offset: 10, // can be extended to add pagination support
    sort: "desc",
    address: ethereumAddress,
  });
};

export function getExchangeApiUrl(): string {
  return getApiUrl("api", {
    module: "stats",
    action: "ethprice",
  });
}

/* Returns URL by combining  domain, subdomain, params and api key */
function getApiUrl(
  subDomain: string,
  urlParamsObject: { [key: string]: string | number }
  ) {
    if (!API_KEY) {
      throw new Error("No API Key found, please provide in .env file.");
    }
    const urlParamsObjectWithApiKey = Object.assign({}, urlParamsObject, {
      apikey: API_KEY,
  })
  const paramString = buildURLQuery(urlParamsObjectWithApiKey);
  return `https://${subDomain}.${API_DOMAIN}?${paramString}`;
}

/* builds url query string. Taken from StackOverflow */
function buildURLQuery(obj: { [key: string]: string | number }): string {
  return Object.entries(obj)
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");
}

/* Transform data returned by useFetch hook */
export function transformResponse<T>(response: ApiResponse<T>): T {
  if (response.status === "1") {
    return response.result;
  } else {
    throw new Error("Server returned error: " + response.result);
  }
}
