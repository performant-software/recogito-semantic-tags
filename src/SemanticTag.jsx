import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CloseIcon } from '@recogito/recogito-client-core/src/Icons';

const SemanticTag = props => {

  const [ showDelete, setShowDelete ] = useState(false);

  const toggleDelete = () => 
    setShowDelete(!showDelete);

  return (
    <div className="r6o-semtag">
      <li key={props.uri} onClick={toggleDelete}>
        <label>{props.value}</label>

        <CSSTransition in={showDelete} timeout={200} classNames="r6o-semtag-delete">
          <span className="r6o-semtag-delete-wrapper" onClick={props.onDelete}>
            <span className="r6o-semtag-delete">
              <CloseIcon width={12} />
            </span>
          </span>
        </CSSTransition>
      </li>

      <div className="r6o-semtag-tooltip">
        <label>{props.label} {props.description}</label>
        <div className="tooltip-arrow" />
      </div>
    </div>
  )

}

export default SemanticTag;