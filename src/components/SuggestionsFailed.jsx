import React from 'react';
import { Error } from '../Icons';

import './SuggestionsFailed.scss';

const SuggestionsFailed = props => {

  return (
    <div className="r6o-semtags-suggestions-failed">
      <Error /> Search service not available
    </div>
  )

}

export default SuggestionsFailed;