import { useContext, useEffect, useState } from 'react';
import WordsListContext from '../../store/words-list-context';
import classes from './WordsFilter.module.css';

const WordsFilter = (props) => {
  const [word, setWord] = useState(true);
  const [filter, setFilter] = useState('');

  const wordsCtx = useContext(WordsListContext);

  const { words } = wordsCtx;
  const { filterWords } = props;

  useEffect(() => {
    let filteredWords;
    if (word && filter.length > 0) {
      filteredWords = words.filter((word) => word.word.includes(filter));
    } else if (!word && filter.length > 0) {
      filteredWords = words.filter((trans) =>
        trans.translation.includes(filter)
      );
    } else {
      filteredWords = words;
    }

    filterWords(filteredWords);
  }, [filter, filterWords, word, words]);

  const toggleHandler = () => {
    setWord((prevState) => !prevState);
  };

  const changeHandler = (event) => {
    setFilter(event.target.value.trim());
    // console.log(event.target.value);
  };

  let placeholder;
  let title;

  if (word) {
    placeholder = 'Enter word';
    title = <h2>Word Filter</h2>;
  } else {
    placeholder = 'Enter translation';
    title = <h2>Translation Filter</h2>;
  }

  return (
    <section className={classes.filter}>
      {title}
      <input
        placeholder={placeholder}
        onChange={changeHandler}
        value={filter}
        disabled={words.length === 0}
      />
      <button onClick={toggleHandler} disabled={words.length === 0}>
        Toggle Word/Translation Filter
      </button>
    </section>
  );
};

export default WordsFilter;
