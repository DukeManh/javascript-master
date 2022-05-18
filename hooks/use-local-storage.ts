import { useState, useLayoutEffect } from 'react';

const get = <T>(key:string) =>{
  if (typeof window === 'undefined') {
    return undefined;
  }
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) as T : undefined;
}

const set = <T>(key:string, value: T | undefined) =>{
  if (typeof window === 'undefined') {
    return;
  }
  if (value === undefined) {
    localStorage.removeItem(key);
  }
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
}

const useLocalStorage = <T>(key: string, defaultValue: T): [T,(v: T | undefined) => void ] => {
  const [value, setValue] = useState<T | undefined>(defaultValue);

  const setLocalStorage = (v: T | undefined) => {
    setValue(v);
    set(key, v);
  }

  useLayoutEffect(() => {
    setValue(get(key));
  }, [key])

  return [value ?? defaultValue, setLocalStorage];
}

export default useLocalStorage;
