import React, { useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';

import { SearchIcon } from '../Icons';

import './SearchInput.scss';

const SearchInput = props => {

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChangeLanguage = evt =>
    props.onChangeLanguage(evt.target.value);

  return (
    <div className="r6o-semtags-search">
      <DebounceInput
        inputRef={inputRef}
        value={props.value}
        debounceTimeout={500}
        onChange={props.onChange} />
      
      <div className="icons">
        <div className="lang">
          {props.languages.length > 1 ?
            <select onChange={onChangeLanguage}>
              {props.languages.map(lang => 
                <option
                  key={lang}
                  value={lang}
                  selected={lang === props.currentLanguage}>{lang}</option>
              )}
            </select> :
            <label>{props.currentLanguage}</label>
          }
        </div>
        <SearchIcon width={18} />
      </div>
    </div>
  )

}

export default SearchInput;