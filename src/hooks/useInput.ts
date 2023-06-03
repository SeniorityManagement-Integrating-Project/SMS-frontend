import { useState } from 'react';

export const useInput = <T>({
  type,
  initialValue,
  name = undefined,
  placeholder = undefined,
}: {
  type: string;
  initialValue: T;
  name?: string;
  placeholder?: string;
}) => {
  const [value, setValue] = useState<T>(initialValue);
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return {
    type,
    value,
    name,
    placeholder,
    onChange: handleChange,
    setValue,
  };
};
