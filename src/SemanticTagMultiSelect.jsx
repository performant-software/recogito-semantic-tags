
import React, { Component } from 'react';
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

export default class SemanticTagMultiSelect extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: false,
      query: '',
      selectedSource: SOURCES[1],
      suggestions: []
    }
  }

  componentWillReceiveProps(props) {
    if (props.annotation?.quote)
      this.setState({ query: props.annotation.quote });
  }

  onToggleDropdown = () => {
    const { isDropdownOpen } = this.state;
    this.setState({ isDropdownOpen: !isDropdownOpen });

    if (!isDropdownOpen)
      this.fetchSuggestions();
  }

  onChangeQuery = evt =>
    this.setState({ query: evt.target.value });

  onSelectSource = selectedSource => () =>
    this.setState({ selectedSource });

  fetchSuggestions = () =>
    this.state.selectedSource
      .query(this.state.query)
      .then(suggestions => this.setState({ suggestions }));

  onSelectSuggestion = suggestion => () => {
    this.props.onAppendBody({
      type: 'SpecificResource',
      source: suggestion.uri,
      value: suggestion.id,
      label: suggestion.label,
      description: suggestion.description,
      purpose: 'classifying' // To discuss...
    });

    this.setState({ isDropdownOpen: false });
  }

  onDeleteTag = tag => () => {
    this.props.onRemoveBody(tag);
  }

  render() {
    const tags = this.props.annotation ? 
      this.props.annotation.bodies.filter(b => b.purpose === 'classifying') : [];
  
    return (
      <div className="r6o-widget r6o-semtags">
        <div className="r6o-semtags-taglist">
          <button className="r6o-add-semtag" onClick={this.onToggleDropdown}>
            <RDFIcon width={24} />
          </button>

          <ul>
            {tags.map(tag => 
              <SemanticTag {...tag} onDelete={this.onDeleteTag(tag)} />
            )}
          </ul>
        </div>
        
        { this.state.isDropdownOpen && 
          <div className="r6o-semtags-dropdown-container">
            <div className="r6o-semtags-dropdown">
              <div className="r6o-semtags-dropdown-top">
                <div className="r6o-semtags-search">
                  <input type="text" value={this.state.query} onChange={this.onChangeQuery} />
                </div>
                <div className="r6o-semtags-sources">
                  <ul>
                    { SOURCES.map(source =>
                      <li 
                        key={source.label} 
                        className={source === this.state.selectedSource && 'selected'}
                        onClick={this.onSelectSource(source)}>

                        {source.label}

                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="r6o-semtags-dropdown-bottom">
                <ul>
                  {this.state.suggestions.map(suggestion =>
                    <li 
                      key={suggestion.id}
                      onClick={this.onSelectSuggestion(suggestion)}>

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

}