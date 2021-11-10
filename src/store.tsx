import React, { createContext, useState } from 'react';
import { Snippet } from './types';

interface State {
  data: any;
  [key: string]: any;
}

export interface Context {
  snippets: State;
  loading?: any;
  isToggled: any;
}

const initialContext = {
  snippets: {
    data: [],
    setSnippets: () => ({}),
  },
  loading: { data: false },
  isToggled: { data: false },
};

const store = createContext<Context>(initialContext);
const { Provider } = store;

console.log('inside src/store.tsx');
const StateProvider = ({ children }: any) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const [pageLoading, setPageLoading] = useState(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const value = {
    loading: { data: pageLoading, setPageLoading },
    isToggled: { data: isToggled, setIsToggled },
    snippets: { data: snippets, setSnippets },
  };

  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider };
