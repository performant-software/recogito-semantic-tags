import React, { Component } from 'react';
import SemanticTagMultiSelect from "./SemanticTagMultiSelect";

/**
 * A note on a current limitation of the RecogitoJS/Annotorious 
 * plugin API: only class components supported at the moment,
 * no functional components and hooks.
 */
export default class SemanticTagPlugin extends Component {

  constructor(props) {
    super(props)
  }

  // We'll use this wrapper as an adapter for using
  // the SemanticTagMultiSelect either as a 
  // RecogitoJS/Annotorious plugin, or a 'normal' React
  // component (with no knowledge of WebAnnotations etc.)

  render() {
    return (
      <SemanticTagMultiSelect {...this.props} />
    )
  }

}

// For convenience, so we can import the non-RecogitoJS/Annotorious version easily
export { default as SemanticTagMultiSelect } from  './SemanticTagMultiSelect';
