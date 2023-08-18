'use client';
import { FormEvent } from 'react';

interface SearchInputProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent) => void;
  onFocus?: () => void;
  onClick?: () => void;
  rightElement?: JSX.Element;
  leftElement?: JSX.Element;
}
const search = {
  path: 'M17 17L13.1396 13.1396M13.1396 13.1396C13.7999 12.4793 14.3237 11.6953 14.6811 10.8326C15.0385 9.96978 15.2224 9.04507 15.2224 8.11121C15.2224 7.17735 15.0385 6.25264 14.6811 5.38987C14.3237 4.5271 13.7999 3.74316 13.1396 3.08283C12.4793 2.42249 11.6953 1.89868 10.8326 1.54131C9.96978 1.18394 9.04507 1 8.11121 1C7.17736 1 6.25264 1.18394 5.38987 1.54131C4.5271 1.89868 3.74316 2.42249 3.08283 3.08283C1.74921 4.41644 1 6.2252 1 8.11121C1 9.99722 1.74921 11.806 3.08283 13.1396C4.41644 14.4732 6.2252 15.2224 8.11121 15.2224C9.99722 15.2224 11.806 14.4732 13.1396 13.1396Z',
  width: 18,
  height: 18,
};

const Input = ({
  placeholder,
  value,
  onChange,
  onSubmit,
  onFocus,
  onClick,
  rightElement,
  leftElement,
}: SearchInputProps) => {
  return (
    <section className="w-full flex justify-center items-center ">
      <form
        className="ml-4 w-4/5 rounded-[1.875rem] bg-white h-[38px] flex items-center justify-between shadow-sm border border-neutral-300 px-4"
        onSubmit={onSubmit}
      >
        <input
          className="outline-none text-sm w-full pl-3"
          placeholder={placeholder}
          value={value}
          onFocus={onFocus}
          onChange={onChange}
          onClick={onClick}
        ></input>
      </form>
      <ul></ul>
    </section>
  );
};

export default Input;
