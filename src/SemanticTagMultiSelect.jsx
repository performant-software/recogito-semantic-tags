
import React, { useEffect, useState } from 'react';
import VIAF from './connectors/VIAF';
import Wikidata from './connectors/Wikidata';
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

  const fetchSuggestions = () =>
    selectedSource
      .query(query)
      .then(suggestions => setSuggestions(suggestions));

  const onToggleDropdown = () => {
    console.log(query);
    if (!isDropdownOpen && query)
      fetchSuggestions();

    setIsDropdownOpen(!isDropdownOpen);
  }

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
      <div className="r6o-semtags-taglist">
        <button className="r6o-add-semtag" onClick={onToggleDropdown}>
          <RDFIcon width={24} />
        </button>

        <ul>
          {tags.map(tag => 
            <SemanticTag {...tag} onDelete={onDeleteTag(tag)} />
          )}
        </ul>
      </div>
      
      {isDropdownOpen && 
        <div className="r6o-semtags-dropdown-container">
          <div className="r6o-semtags-dropdown">
            <div className="r6o-semtags-dropdown-top">
              <div className="r6o-semtags-search">
                <input type="text" value={query} onChange={evt => setQuery(evt.target.value)} />
              </div>
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