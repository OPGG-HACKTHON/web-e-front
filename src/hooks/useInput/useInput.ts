import { ChangeEvent, Dispatch, SetStateAction } from 'react';

const useInput = <T>() => {
  const inputOnChangeEvent = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: Dispatch<SetStateAction<T>>
  ) => {
    const { name, value } = e.target;

    setValue((prevValue: T) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return [inputOnChangeEvent] as const;
};

export default useInput;
