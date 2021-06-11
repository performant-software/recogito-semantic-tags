import React from 'react';
import { DebounceInput } from 'react-debounce-input';

const SearchInput = props => {

  return (
    <div className="r6o-semtags-search">
      <DebounceInput
        value={props.value}
        debounceTimeout={300}
        onChange={props.onChange} />
    </div>
  )

}

export default SearchInput;