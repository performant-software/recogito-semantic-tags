import React from 'react';
import { FiBookOpen, BiMap, FiMapPin, FiUser, FiUsers } from 'react-icons/fi';
import { format } from '../connectors';

const ICONS = {
  Place:  <FiMapPin />,
  Person: <FiUser />,
  Group:  <FiUsers />,
  Work:   <FiBookOpen />
};

const SuggestionsLoaded = props => {

  return (
    <ul>
      {props.suggestions.map(suggestion =>
        <li 
          key={suggestion.uri}
          onClick={() => props.onSelectSuggestion(suggestion)}>

          <label>
            {suggestion.type ?
              <span className="icon">{ICONS[suggestion.type]}</span> :
              <span className="id">{format(suggestion)}</span>
            } {suggestion.label}
          </label>
          
          <p className="description">{suggestion.description}</p>
        </li>
      )}
    </ul>
  )

}

export default SuggestionsLoaded;