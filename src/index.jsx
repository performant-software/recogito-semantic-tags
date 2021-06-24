import React, { useState } from 'react';
import SemanticTagMultiSelect from './SemanticTagMultiSelect';
import { instantiateSource } from './connectors';

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

const APP_STORAGE_KEY = 'r6o-semtags-selected-source';

const restoreSelectedSource = sources => {
  const storedSelection = localStorage.getItem(APP_STORAGE_KEY);
  
  if (storedSelection) {
    // Check if the stored source is in the list
    const source = sources.find(s => s.name === storedSelection);

    // If not, default to first in list
    return source ? source : sources[0];
  } else {
    // Default to first in list
    return sources[0];
  }
}

/**
 * This wrapper allows us to use the SemanticTagMultiSelect 
 * as a RecogitoJS/Annotorious plugin, while SemanticTagMultiSelect
 * itself remains reusable as a 'normal' React component (with 
 * no knowledge of WebAnnotations etc.)
 */
const SemanticTagPlugin = config => props => {

  console.log('instantiating plugin', config);

  const sources = config.dataSources ? 
    config.dataSources.map(instantiateSource) : 
    [ instantiateSource('wikidata'), instantiateSource('viaf') ]; // defaults

  // Use selection persisted in localStorage, if able
  const [ selectedSource, setSelectedSource ] = useState(restoreSelectedSource(sources)); 

  const tagBodies = props.annotation ? 
    props.annotation.bodies.filter(b => b.purpose === 'classifying') : [];

  // Will be != null only if there is a text annotation
  const presetQuery = props.annotation?.quote; 

  const onSelectSource = source => {
    // Persist setting in localStorage
    localStorage.setItem(APP_STORAGE_KEY, source.name);
    setSelectedSource(source);
  }

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
      dataSources={sources}
      selectedSource={selectedSource}
      tags={tagBodies.map(bodyToTag)}
      query={presetQuery}
      onAddTag={onUpsertTag}
      onDeleteTag={onDeleteTag}
      onSelectSource={onSelectSource}
      config={config} />
  )

}

export default SemanticTagPlugin;

// For convenience, so we can import the non-RecogitoJS/Annotorious version easily
export { default as SemanticTagMultiSelect } from  './SemanticTagMultiSelect';
