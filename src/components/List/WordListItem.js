import { useContext } from 'react';
import { Route } from 'react-router-dom';
import WordsListContext from '../../store/words-list-context';
import classes from './WordListItem.module.css';

const WordListItem = (props) => {
  const wordsCtx = useContext(WordsListContext);

  const removeHandler = () => {
    wordsCtx.removeWord(props.id);
    //console.log(props.id);
  };

  let style = '';

  if (props.translation === props.answer) {
    style = 'correct';
  } else {
    style = 'false';
  }

  return (
    <li className={classes.item}>
      <p>{props.word}</p>
      <p>{props.translation}</p>
      <Route path='/practice'>
        <p className={classes[`${style}`]}>{props.answer}</p>
      </Route>
      <Route path='/my-list/new-words'>
        <button onClick={removeHandler}>Remove</button>
      </Route>
    </li>
  );
};

export default WordListItem;
