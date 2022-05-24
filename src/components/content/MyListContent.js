import { Fragment, useCallback, useContext, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import WordsListContext from '../../store/words-list-context';
import WordsFilter from '../Filter/WordsFilter';
import AddToList from '../List/AddToList';
import WordList from '../List/WordList';
import classes from './MyListContent.module.css';

const MyListContent = () => {
  const history = useHistory();
  const wordsCtx = useContext(WordsListContext);
  const [words, setWords] = useState([]);

  // useEffect(() => {
  //   document.title = "This is a title"
  // }, [])

  const editListHandler = () => {
    history.push('/my-list/new-words');
  };

  const backHandler = () => {
    history.goBack();
  };

  const filterWords = useCallback((filteredWords) => {
    setWords(filteredWords);
  }, []);

  return (
    <Fragment>
      <Route path='/my-list' exact>
        <div className={classes.button}>
          <button onClick={editListHandler}>Edit Your List</button>
        </div>
      </Route>
      <Route path='/my-list/new-words'>
        <div className={classes.button}>
          <button onClick={backHandler}>Back</button>
        </div>
        <AddToList />
      </Route>
      <WordsFilter filterWords={filterWords} />
      {wordsCtx.words && wordsCtx.words.length > 0 && words.length > 0 && (
        <WordList words={words.slice().reverse()} />
      )}
      {wordsCtx.words.length > 0 && words.length === 0 && (
        <p id='noWords'>
          Could not find the word or the translation you are looking for.
        </p>
      )}
      {wordsCtx.words.length === 0 && (
        <p id='noWords'>You have not added any words yet.</p>
      )}
    </Fragment>
  );
};

export default MyListContent;
