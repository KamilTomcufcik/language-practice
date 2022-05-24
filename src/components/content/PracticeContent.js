import { Fragment, useContext, useState } from 'react';
import WordsListContext from '../../store/words-list-context';
import WordList from '../List/WordList';
import classes from './PracticeContent.module.css';

function shuffle(array) {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

let practiceWords = [];

const PracticeContent = () => {
  const [practice, setPractice] = useState(false);
  const [counter, setCounter] = useState(Number(0));
  const [answer, setAnswer] = useState('');
  const [finished, setFinished] = useState(false);
  const wordsCtx = useContext(WordsListContext);

  const startHandler = () => {
    practiceWords = shuffle(wordsCtx.words.slice());
    setPractice(true);
  };

  const nextButtonHandler = () => {
    practiceWords[counter].answer = answer;
    // console.log(counter);
    if (wordsCtx.words.length === counter + 1) {
      setFinished(true);
    } else {
      setCounter((prevState) => prevState + 1);
    }
    setAnswer('');
  };

  const changeInputHandler = (event) => {
    setAnswer(event.target.value);
  };

  let text;

  if (wordsCtx.words.length === counter + 1) {
    text = 'Finish';
  } else {
    text = 'next';
  }

  return (
    <Fragment>
      {!practice && !finished && wordsCtx.words.length > 0 && (
        <button className={classes.startButton} onClick={startHandler}>
          start
        </button>
      )}
      {!practice && !finished && wordsCtx.words.length === 0 && (
        <p id='noWords'>You need to add words to your list first.</p>
      )}
      {practice && !finished && (
        <section className={classes.practice}>
          <p>{practiceWords[counter].word}</p>
          <input
            placeholder='Enter translation'
            value={answer}
            onChange={changeInputHandler}
          />
          <button className={classes.nextButton} onClick={nextButtonHandler}>
            {text}
          </button>
        </section>
      )}
      {finished && <WordList words={practiceWords} />}
    </Fragment>
  );
};

export default PracticeContent;
