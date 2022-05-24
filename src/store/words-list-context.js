import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './auth-context';

const WordsListContext = React.createContext({
  words: [
    {
      id: Number(),
      word: '',
      translation: '',
    },
  ],
  addWord: (newWord) => {},
  removeWord: (wordId) => {},
  initialHttp: () => {},
});

const putHttp = async (token, UID, words) => {
  const url = `https://language-practice-41c4b-default-rtdb.europe-west1.firebasedatabase.app/users/${UID}/words.json?auth=${token}`;
  const res = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(words),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (!res.ok) {
      const data = res.json();
      throw new Error(data.error.message);
    }
  } catch (err) {
    alert(err.message);
  }
};

export const WordsListContextProvider = (props) => {
  const [wordss, setWordss] = useState([]);
  const authCtx = useContext(AuthContext);

  const { token, UID } = authCtx;

  // console.log(wordss);

  useEffect(() => {
    let isInitial = true;
    if (token && UID && isInitial) {
      const initialHttp = async () => {
        const url = `https://language-practice-41c4b-default-rtdb.europe-west1.firebasedatabase.app/users/${UID}/words.json?auth=${token}`;
        const response = await fetch(url);
        try {
          if (!response.ok) {
            throw new Error(response.status);
          }
        } catch (error) {
          alert(error.message);
        }

        const data = await response.json();

        if (data) {
          const finalData = [];
          for (const key in data) {
            finalData.push({
              id: +key,
              word: data[key].word,
              translation: data[key].translation,
            });
          }
          setWordss(finalData);
        }
        isInitial = false;
      };
      initialHttp();
    }
    if (!token && !UID) {
      isInitial = true;
    }
  }, [token, UID]);

  const wordsAddHandler = (newWord) => {
    if (wordss) {
      setWordss((prevState) => {
        const words = [...prevState, newWord];
        putHttp(token, UID, words);
        return words;
      });
    } else {
      setWordss([newWord]);
      putHttp(token, UID, newWord);
    }
  };

  const wordsRemoveHandler = (wordId) => {
    if (wordss.length > 1) {
      setWordss((prevState) => {
        const words = prevState.filter((word) => word.id !== wordId);
        putHttp(token, UID, words);
        return words;
      });
    } else {
      setWordss([]);
      putHttp(token, UID, []);
    }
  };

  const contextValue = {
    words: wordss,
    addWord: wordsAddHandler,
    removeWord: wordsRemoveHandler,
  };

  return (
    <WordsListContext.Provider value={contextValue}>
      {props.children}
    </WordsListContext.Provider>
  );
};

export default WordsListContext;
