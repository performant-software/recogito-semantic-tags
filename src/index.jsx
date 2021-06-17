import React, { useState } from 'react';
import SemanticTagMultiSelect from "./SemanticTagMultiSelect";
import { VIAF, Wikidata } from './connectors';

/**
 * W3C annotation body -> generic 'tag' object
 */
const bodyToTag = body => ({
  uri: body.source,
  label: body.label,
  id: body.value,
  description: body.description
});

/**
 * Generic 'tag' object -> W3C annotation body
 */
 const tagToBody = tag => ({
  type: 'SpecificResource',
  purpose: 'classifying', // To discuss...
  source: tag.uri,
  value: tag.id,
  label: tag.label,
  description: tag.description,
});

/**
 * Just a hack - needs to be pulled from an external config later
 */ 
 const SOURCES = [
  new Wikidata(),
  new VIAF()
];

/**
 * This wrapper allows us to use the SemanticTagMultiSelect 
 * as a RecogitoJS/Annotorious plugin, while SemanticTagMultiSelect
 * itself remains reusable as a 'normal' React component (with 
 * no knowledge of WebAnnotations etc.)
 */
const SemanticTagPlugin = config => props => {

  const [ selectedSource, setSelectedSource ] = useState(SOURCES[0]); 

  const tagBodies = props.annotation ? 
    props.annotation.bodies.filter(b => b.purpose === 'classifying') : [];

  // Will be != null only if there is a text annotation
  const presetQuery = props.annotation?.quote; 

  const onDeleteTag = tag => {
    const body = tagBodies.find(b => b.source === tag.uri);
    if (body)
      props.onRemoveBody(body);
  }

  // Tags can only be added once (no multiple tags with same URI!)
  const onUpsertTag = tag => {
    const existing = tagBodies.find(b => b.source === tag.uri);
    if (existing)
      props.onUpdateBody(existing, tagToBody(tag));
    else
      props.onAppendBody(tagToBody(tag));
  }

  return (
    <SemanticTagMultiSelect 
      dataSources={SOURCES}
      selectedSource={selectedSource}
      tags={tagBodies.map(bodyToTag)}
      query={presetQuery}
      onAddTag={onUpsertTag}
      onDeleteTag={onDeleteTag}
      onSelectSource={setSelectedSource}
      config={config} />
  )

}

export default SemanticTagPlugin;

// For convenience, so we can import the non-RecogitoJS/Annotorious version easily
export { default as SemanticTagMultiSelect } from  './SemanticTagMultiSelect';
