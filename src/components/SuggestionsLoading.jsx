import React from 'react';
import { LoadSpinner } from '../Icons';

import './SuggestionsLoading.scss';

const SuggestionsLoading= props => {

  return (
    <div className="r6o-semtags-suggestions-loading">
      <LoadSpinner />
    </div>
  )

}

export default SuggestionsLoading;