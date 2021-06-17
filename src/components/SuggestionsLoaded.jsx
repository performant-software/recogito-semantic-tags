import React from 'react';
import { format } from '../connectors';

const SuggestionsLoaded = props => {

  return (
    <ul>
      {props.suggestions.map(suggestion =>
        <li 
          key={suggestion.uri}
          onClick={() => props.onSelectSuggestion(suggestion)}>

          <label>
            <span className="id">{format(suggestion)}</span> {suggestion.label}
          </label>

          <p className="description">{suggestion.description}</p>
        </li>
      )}
    </ul>
  )

}

export default SuggestionsLoaded;