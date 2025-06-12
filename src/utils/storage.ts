/* eslint-disable @typescript-eslint/no-explicit-any */
export const saveToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = <T = any>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const clearStorage = (key: string) => {
  localStorage.removeItem(key);
};
