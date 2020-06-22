import React, { useState } from "react";
// export function getData(key: string) {
//   if (!localStorage) {
//     return;
//   }
//   try {
//     const data = JSON.parse(localStorage.getItem(key) || '[]');
//     return data;
//   } catch (error) {
//     console.log(`Error accessing ${key} from local storage.`);
//   }
// }
// export function setData(key: string, data:string) {
//   if (!localStorage) {
//     return;
//   }
//   try {
//     localStorage.setItem(key, JSON.stringify(data));
//   } catch (error) {
//     console.log(`Error storing ${key} from local storage.`);
//   }
// }

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (arg: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || "[]");
      return data;
    } catch (error) {
      console.log(`Error accessing ${key} from local storage.`);
    }
  });

  if (!localStorage) {
    throw new Error("localstorage not available.");
  }

  function setStorageValue(value: T): void {
    setValue(value);
  }

  return [value, setStorageValue];
}
