const ETHEREUM_VALIDATION_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function isEthereumAddressValid(address: string): boolean {
  return !!address && ETHEREUM_VALIDATION_REGEX.test(address);
}
