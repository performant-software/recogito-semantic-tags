import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CloseIcon } from '@recogito/recogito-client-core/src/Icons';

export default class SemanticTag extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showDelete: false
    }
  }

  toggleDelete = () => {
    this.setState({ showDelete: !this.state.showDelete });
  }

  render() {
    const ToolTip = () =>
      <div className="toolTip">
        Tooltip
      </div>

    return (
      <div className="r6o-semtag">
        <li key={this.props.uri} onClick={this.toggleDelete}>
          <label>{this.props.value}</label>

          <CSSTransition in={this.state.showDelete} timeout={200} classNames="r6o-semtag-delete">
            <span className="r6o-semtag-delete-wrapper" onClick={this.props.onDelete}>
              <span className="r6o-semtag-delete">
                <CloseIcon width={12} />
              </span>
            </span>
          </CSSTransition>
        </li>

        <div className="r6o-semtag-tooltip">
          <label>{this.props.label} {this.props.description}</label>
          <div className="tooltip-arrow" />
        </div>
      </div>
    )
  }

}