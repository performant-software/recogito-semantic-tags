
import React, { useEffect, useState } from 'react';
import VIAF from './connectors/VIAF';
import Wikidata from './connectors/Wikidata';
import SearchInput from './SearchInput';
import SemanticTag from './SemanticTag';
import { RDFIcon } from './Icons';

import './SemanticTagMultiSelect.scss';

// Just a hack
const SOURCES = [
  new VIAF(),
  new Wikidata()
]

const SemanticTagMultiSelect = props => {

  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

  const [ query, setQuery ] = useState(props.annotation?.quote);
  
  const [ selectedSource, setSelectedSource ] = useState(SOURCES[1]);

  const [ suggestions, setSuggestions ] = useState([]);

  useEffect(() =>
    setQuery(props.annotation?.quote), [ props.annotation ]);
  
  useEffect(() => {
    if (isDropdownOpen && query)
      selectedSource
        .query(query)
        .then(suggestions => setSuggestions(suggestions));
  }, [ query, isDropdownOpen ]);

  const onToggleDropdown = () =>
    setIsDropdownOpen(!isDropdownOpen);

  const onQueryChanged = evt =>
    setQuery(evt.target.value);

  const onSelectSuggestion = suggestion => () => {
    props.onAppendBody({
      type: 'SpecificResource',
      source: suggestion.uri,
      value: suggestion.id,
      label: suggestion.label,
      description: suggestion.description,
      purpose: 'classifying' // To discuss...
    });

    setIsDropdownOpen(false);
  }

  const onDeleteTag = tag => () =>
    props.onRemoveBody(tag);

  const tags = props.annotation ? 
    props.annotation.bodies.filter(b => b.purpose === 'classifying') : [];

  return (
    <div className="r6o-widget r6o-semtags">
      <div 
        className={ isDropdownOpen ? 'r6o-semtags-taglist dropdown-open' : 'r6o-semtags-taglist' }
        onClick={onToggleDropdown}>

        {tags.length == 0 ? 
          <div className="placeholder">
            <RDFIcon width={20} /> Click to add a semantic tag
          </div> : 
          <ul>
            {tags.map(tag => 
              <SemanticTag {...tag} onDelete={onDeleteTag(tag)} />
            )}
          </ul>
        }
      </div>
      
      {isDropdownOpen && 
        <div className="r6o-semtags-dropdown-container">
          <div className="r6o-semtags-dropdown">
            <div className="r6o-semtags-dropdown-top">
              <SearchInput value={query} onChange={onQueryChanged} />

              <div className="r6o-semtags-sources">
                <ul>
                  { SOURCES.map(source =>
                    <li 
                      key={source.label} 
                      className={source === selectedSource && 'selected'}
                      onClick={() => setSelectedSource(source)}>

                      {source.label}

                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="r6o-semtags-dropdown-bottom">
              <ul>
                {suggestions.map(suggestion =>
                  <li 
                    key={suggestion.id}
                    onClick={onSelectSuggestion(suggestion)}>

                    <label>
                      <span className="id">{suggestion.id}</span> {suggestion.label}
                    </label>

                    <p className="description">{suggestion.description}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      }
    </div>
  )

}

export default SemanticTagMultiSelect;