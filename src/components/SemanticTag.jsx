import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Tooltip from 'rc-tooltip';
import { CloseIcon } from '@recogito/recogito-client-core/src/Icons';
import { BiLinkExternal } from 'react-icons/bi';
import { format } from '../connectors';

import './SemanticTag.scss';

const SemanticTag = props => {

  const [ showDelete, setShowDelete ] = useState(false);

  const toggleDelete = evt => {
    evt.stopPropagation();
    setShowDelete(!showDelete);
  }
  
  const tooltip = 
    <>
      <h4>{props.label}</h4>
      <p className="description">{props.description}</p>
      <a 
        onClick={evt => evt.stopPropagation()}
        href={props.uri}
        target="_blank">
        <BiLinkExternal />
      </a>
    </>

  return (
    <Tooltip placement="top" trigger="hover" overlay={tooltip}>
      <li className="r6o-semtag" onClick={toggleDelete}>
        <label>{format(props)}</label>
     
        <CSSTransition in={showDelete} timeout={200} classNames="r6o-semtag-delete">
          <span className="r6o-semtag-delete-wrapper" onClick={props.onDelete}>
            <span className="r6o-semtag-delete">
              <CloseIcon width={12} />
            </span>
          </span>
        </CSSTransition>
      </li>
    </Tooltip>
  )

}

export default SemanticTag;