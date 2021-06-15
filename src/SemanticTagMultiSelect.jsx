
import React, { useEffect, useRef, useState } from 'react';
import useClickOutside from '@recogito/recogito-client-core/src/editor/useClickOutside';
import { VIAF, Wikidata } from './connectors';
import { RDFIcon } from './Icons';
import {
  SearchInput,
  SemanticTag,
  SuggestionsLoading,
  SuggestionsLoaded,
  SuggestionsFailed
} from './components';

import './SemanticTagMultiSelect.scss';

/**
 * Just a hack - needs to be pulled from an external config later
 */ 
const SOURCES = [
  new VIAF(),
  new Wikidata()
]

const SemanticTagMultiSelect = props => {

  const elem = useRef();

  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

  const [ query, setQuery ] = useState(props.annotation?.quote);
  
  const [ selectedSource, setSelectedSource ] = useState(SOURCES[1]);

  const [ loadState, setLoadState ] = useState('LOADING');

  const [ suggestions, setSuggestions ] = useState([]);

  useEffect(() =>
    setQuery(props.annotation?.quote), [ props.annotation ]);
  
  useEffect(() => {
    if (isDropdownOpen && query)
      selectedSource
        .query(query, props.config)
        .then(suggestions => {
          setLoadState('LOADED');
          setSuggestions(suggestions);
        })
        .catch(() => setLoadState('FAILED'));
  }, [ query, isDropdownOpen ]);

  useClickOutside(elem, () => setIsDropdownOpen(false));

  const onToggleDropdown = () =>
    setIsDropdownOpen(!isDropdownOpen);

  const onQueryChanged = evt =>
    setQuery(evt.target.value);

  const onSelectSuggestion = suggestion => {
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
    <div className="r6o-widget r6o-semtags" ref={elem}>
      <div 
        className={ isDropdownOpen ? 'r6o-semtags-taglist dropdown-open' : 'r6o-semtags-taglist' }
        onClick={onToggleDropdown}>
        
        <ul>
          {tags.map(tag => 
            <SemanticTag {...tag} onDelete={onDeleteTag(tag)} />
          )}
        </ul>

        <div className="placeholder">
          {tags.length === 0 && <RDFIcon width={20} /> } 
          <label>Click to add semantic tag...</label>
        </div> 
      </div>
      
      {isDropdownOpen && 
        <div className="r6o-semtags-dropdown-container">
          <div className="r6o-semtags-dropdown">
            <div className="r6o-semtags-dropdown-top">

              <SearchInput 
                value={query} 
                onChange={onQueryChanged} />

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
              {loadState === 'LOADING' &&
                <SuggestionsLoading /> }

              {loadState === 'LOADED' && 
                <SuggestionsLoaded 
                  suggestions={suggestions}
                  onSelectSuggestion={onSelectSuggestion} /> }

              {loadState === 'FAILED' && 
                 <SuggestionsFailed /> }
            </div>
          </div>
        </div>
      }
    </div>
  )

}

export default SemanticTagMultiSelect;