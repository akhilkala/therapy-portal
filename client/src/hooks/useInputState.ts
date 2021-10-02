import { useState } from "react";

export interface InputState {
  value: string;
  handleChange: (e: any) => void;
  handleReset: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const useInputState = (init?: string): InputState => {
  const initialState = init || "";

  const [value, setValue] = useState<string>(initialState);

  const handleChange = (e: any): void => setValue(e.target.value);

  const handleReset = (): void => setValue(initialState);

  return { value, handleChange, handleReset, setValue };
};

export default useInputState;
