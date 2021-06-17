
import React, { useEffect, useRef, useState } from 'react';
import useClickOutside from '@recogito/recogito-client-core/src/editor/useClickOutside';
import { RDFIcon } from './Icons';
import {
  SearchInput,
  SemanticTag,
  SuggestionsLoading,
  SuggestionsLoaded,
  SuggestionsFailed
} from './components';

import './SemanticTagMultiSelect.scss';

const SemanticTagMultiSelect = props => {

  const elem = useRef();

  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

  const [ query, setQuery ] = useState(props.query);

  const [ loadState, setLoadState ] = useState('LOADING');

  const [ suggestions, setSuggestions ] = useState([]);

  useEffect(() =>
    setQuery(props.query), [ props.query ]);
  
  useEffect(() => {
    setLoadState('LOADING');
    setSuggestions([]);

    if (isDropdownOpen && query)
      props.selectedSource
        .query(query, props.config)
        .then(suggestions => {
          setLoadState('LOADED');
          setSuggestions(suggestions);
        })
        .catch(() => setLoadState('FAILED'));
  }, [ isDropdownOpen, query, props.selectedSource ]);

  useClickOutside(elem, () => setIsDropdownOpen(false));

  const onToggleDropdown = () =>
    setIsDropdownOpen(!isDropdownOpen);

  const onQueryChanged = evt =>
    setQuery(evt.target.value);

  const onSelectSuggestion = suggestion => {
    props.onAddTag(suggestion);
    setIsDropdownOpen(false);
  }

  const onDeleteTag = tag => () =>
    props.onDeleteTag(tag);

  return (
    <div className="r6o-widget r6o-semtags" ref={elem}>
      <div 
        className={ isDropdownOpen ? 'r6o-semtags-taglist dropdown-open' : 'r6o-semtags-taglist' }
        onClick={onToggleDropdown}>
        
        <ul>
          {props.tags.map(tag => 
            <SemanticTag {...tag} onDelete={onDeleteTag(tag)} />
          )}
        </ul>

        <div className="placeholder">
          {props.tags.length === 0 && <RDFIcon width={20} /> } 
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
                  { props.dataSources.map(source =>
                    <li 
                      key={source.label} 
                      className={source === props.selectedSource && 'selected'}
                      onClick={() => props.onSelectSource(source)}>

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