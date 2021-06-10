
import React, { Component } from 'react';
import VIAF from './connectors/VIAF';
import Wikidata from './connectors/Wikidata';

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

  onOpenDropdown = () => {
    this.setState({ isDropdownOpen: true });
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

  render() {
    return (
      <div className="r6o-widget r6o-semtags">
        <div
          className="r6o-semtags-taglist"
          onClick={this.onOpenDropdown}>

          ICON

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
                    <li key={suggestion.label}>
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