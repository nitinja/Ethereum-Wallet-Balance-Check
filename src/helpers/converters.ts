/* Convert Wei to Ether */

const WEI_TO_ETHER_FACTOR = 10e17;
const MILLIS_IN_HOUR = 1000 * 60 * 60;

export function convertWeiToEther(wei: number) {
  return wei / WEI_TO_ETHER_FACTOR;
}

/* TImestamp => human readable time "ago" */
export function convertTimestampToDaysHours(timestamp: number) {
  if (!timestamp) {
    return [];
  }
  /* Provided timestamp is in seconds */
  const diffInMillis = new Date().getTime() - timestamp * 1000;
  const totalHours = Math.trunc(diffInMillis / MILLIS_IN_HOUR);
  const days = Math.trunc(totalHours / 24);
  const hours = totalHours % 24;
  return [days, hours];
}
