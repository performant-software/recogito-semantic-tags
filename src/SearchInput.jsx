import React, { useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';

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
        debounceTimeout={300}
        onChange={props.onChange} />
    </div>
  )

}

export default SearchInput;