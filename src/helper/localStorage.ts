export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? null : (JSON.parse(serializedState) as T);
  } catch (e) {
    return null;
  }
};

export const setLocalStorage = <T>(key: string, obj: T): void => {
  try {
    const serializedState = JSON.stringify(obj);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.log(e.message);
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log(e.message);
  }
};
