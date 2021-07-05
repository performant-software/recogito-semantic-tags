import React, { useEffect, useRef } from 'react';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import './SourcesList.scss';

const SourcesList = props => {

  const el = useRef();

  useEffect(() => {
    el.current?.querySelector('.selected').scrollIntoView()
  }, [ props.selectedSource ]);

  const selectedIdx =
    props.dataSources.findIndex(s => s.name === props.selectedSource.name);

  const skipLeft = () => {
    if (selectedIdx > 0)
      props.onSelectSource(props.dataSources[selectedIdx - 1]);
  }

  const skipRight = () => {
    if (selectedIdx < props.dataSources.length - 1)
     props.onSelectSource(props.dataSources[selectedIdx + 1]);
  }

  return (
    <div ref={el} className="r6o-semtags-sources">
      <div className="sources-list">
        <ul>
          { props.dataSources.map(source =>
            <li 
              key={source.name} 
              className={source.name === props.selectedSource.name && 'selected'}
              onClick={() => props.onSelectSource(source)}>

              {source.name}

            </li>
          )}
        </ul>
      </div>

      <div className="slide-arrows">
        <BiCaretLeft onClick={skipLeft} />
        <BiCaretRight onClick={skipRight} />
      </div>
    </div>
  )

}

export default SourcesList;