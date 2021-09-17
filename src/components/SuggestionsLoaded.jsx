import React from 'react';
import { FiBookOpen, FiMapPin, FiUser, FiUsers } from 'react-icons/fi';
import { BiLinkExternal } from 'react-icons/bi';
import { format } from '../connectors';

import './SuggestionsLoaded.scss';

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
              <>
                <span className="icon">{ICONS[suggestion.type]}</span>

                {suggestion.label}

                <a 
                  onClick={evt => evt.stopPropagation()}
                  href={suggestion.uri}
                  target="_blank">
                  <BiLinkExternal className="external"/>
                </a>
              </> :

              <>
                <a 
                  className="id" 
                  onClick={evt => evt.stopPropagation()}
                  href={suggestion.uri} 
                  target="_blank">{format(suggestion)}</a> {suggestion.label}
              </>
            } 
          </label>
          
          <p className="description">{suggestion.description}</p>
        </li>
      )}
    </ul>
  )

}

export default SuggestionsLoaded;