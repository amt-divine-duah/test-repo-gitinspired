import { useState } from 'react';

const useSearch = () => {
  const [word, setWord] = useState<string>('');
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: string = e.currentTarget.value;
    setWord(input);
  };

  return { search, word };
};

export default useSearch;
