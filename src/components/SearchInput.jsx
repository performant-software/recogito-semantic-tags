import React, { useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';

import { SearchIcon } from '../Icons';

const SearchInput = props => {

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <div className="r6o-semtags-search">
      <DebounceInput
        inputRef={inputRef}
        value={props.value}
        debounceTimeout={500}
        onChange={props.onChange} />
      
      <div className="icon">
        <SearchIcon width={18} />
      </div>
    </div>
  )

}

export default SearchInput;