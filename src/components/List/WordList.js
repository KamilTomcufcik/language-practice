import WordListItem from './WordListItem';
import classes from './WordList.module.css';
import { Route } from 'react-router-dom';

const WordList = (props) => {
  // console.log('wordlist');
  return (
    <section className={classes.list}>
      <ul>
        <div className={classes.labels}>
          <label htmlFor='word'>Word</label>
          <label htmlFor='translation'>Translation</label>
          <Route path='/practice'>
            <label htmlFor='answer'>Answer</label>
          </Route>
        </div>
        <Route path='/my-list'>
          {props.words.map((word) => (
            <WordListItem
              key={word.id}
              id={word.id}
              word={word.word}
              translation={word.translation}
            />
          ))}
        </Route>
        <Route path='/practice'>
          {props.words.map((word) => (
            <WordListItem
              key={word.id}
              id={word.id}
              word={word.word}
              translation={word.translation}
              answer={word.answer}
            />
          ))}
        </Route>
      </ul>
    </section>
  );
};

export default WordList;
