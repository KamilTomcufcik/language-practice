import { useContext, useRef } from 'react';
import WordsListContext from '../../store/words-list-context';
import classes from './AddToList.module.css';

const AddToList = () => {
  const wordInputRef = useRef();
  const translationInputRef = useRef();

  const wordsCtx = useContext(WordsListContext);
  const { words } = wordsCtx;

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log();
    // console.log();
    console.log(words[words.length - 1]);
    const newWord = {
      id: words.length === 0 ? 0 : words[words.length - 1].id + 1,
      word: wordInputRef.current.value,
      translation: translationInputRef.current.value,
    };

    wordsCtx.addWord(newWord);
    wordInputRef.current.value = '';
    translationInputRef.current.value = '';
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor='word'>Word</label>
      <label htmlFor='translation'>Translation</label>
      <input type='text' id='word' ref={wordInputRef} required />
      <input type='text' id='translation' ref={translationInputRef} required />
      <button>Add</button>
    </form>
  );
};

export default AddToList;
