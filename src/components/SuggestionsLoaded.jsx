import React from 'react';

const SuggestionsLoaded = props => {

  return (
    <ul>
      {props.suggestions.map(suggestion =>
        <li 
          key={suggestion.id}
          onClick={() => props.onSelectSuggestion(suggestion)}>

          <label>
            <span className="id">{suggestion.id}</span> {suggestion.label}
          </label>

          <p className="description">{suggestion.description}</p>
        </li>
      )}
    </ul>
  )

}

export default SuggestionsLoaded;