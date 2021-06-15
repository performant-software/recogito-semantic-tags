import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CloseIcon } from '@recogito/recogito-client-core/src/Icons';

const SemanticTag = props => {

  const [ showDelete, setShowDelete ] = useState(false);

  const toggleDelete = evt => {
    evt.stopPropagation();
    setShowDelete(!showDelete);
  }

  return (
    <li className="r6o-semtag-wrapper">
      <div className="r6o-semtag" onClick={toggleDelete}>
        <label>{props.id}</label>

        <CSSTransition in={showDelete} timeout={200} classNames="r6o-semtag-delete">
          <span className="r6o-semtag-delete-wrapper" onClick={props.onDelete}>
            <span className="r6o-semtag-delete">
              <CloseIcon width={12} />
            </span>
          </span>
        </CSSTransition>
      </div>

      <div className="r6o-semtag-tooltip">
        <div className="label">
          <span>{props.label}</span>
          <span className="description">{props.description}</span>
        </div>
        <div className="tooltip-arrow" />
      </div>
    </li>
  )

}

export default SemanticTag;