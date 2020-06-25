import {
  convertWeiToEther,
  convertTimestampToDaysHours,
} from "../helpers/converters";

describe("Converters ", () => {
  test("should convert WEI to ether correctly", () => {
    expect(convertWeiToEther(40891631566070000000000)).toEqual(40891.63156607);
    expect(convertWeiToEther(0)).toEqual(0);
  });
  test("should convert timestamp in seconds to days/hourscorrectly", () => {
    const currentTimeInMillis = 1593070961112;
    expect(
      convertTimestampToDaysHours(1563819581, currentTimeInMillis)
    ).toEqual([338, 13]);
    expect(
      convertTimestampToDaysHours(1557329807, currentTimeInMillis)
    ).toEqual([413, 16]);
  });
});
