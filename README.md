# Recogito Semantic Tags Widget

A semantic tagging widget for [RecogitoJS](https://github.com/recogito/recogito-js) 
and [Annotorious](https://github.com/recogito/annotorious). Live demo available
[here](https://recogito-semantic-tags.netlify.app/). Detailed documentation is 
[on the Wiki](https://github.com/performant-software/recogito-semantic-tags/wiki).

The widget can also be imported and used as a normal React component, similar to a standard 
multi-select dropdown. [Read more on the Wiki](https://github.com/performant-software/recogito-semantic-tags/wiki/Using-as-a-React-Component).

![Example](screencast.gif)

## Datasources

The widget includes built-in connectors to the following data sources:

- [Wikidata](https://github.com/performant-software/recogito-semantic-tags/wiki/Built-In-Connectors#wikidata)
- [VIAF](https://github.com/performant-software/recogito-semantic-tags/wiki/Built-In-Connectors#viaf)
- [SRU endpoint of the Bibliothèque nationale de France](https://github.com/performant-software/recogito-semantic-tags/wiki/Built-In-Connectors#bnf)
- [API endpoint of the JISC LibraryHub Discover service](https://github.com/performant-software/recogito-semantic-tags/wiki/Built-In-Connectors#jisc)
- [API endpoint of the Digital Public Library of America](https://github.com/performant-software/recogito-semantic-tags/wiki/Built-In-Connectors#dpla)

You can add your own connectors, too! [Learn how](https://github.com/performant-software/recogito-semantic-tags/wiki/Writing-your-own-Connectors).

## Use with RecogitoJS/Annotorious

Include RecogitoJS/Annotorious and the plugin script in the head of your page. Initialize the annotator
normally, and add the plugin as a widget.

```html
<html>
  <head>
    <link href="recogito.min.css" rel="stylesheet">
    <script src="recogito.min.js"></script>
    <script src="recogito-semantic-tags.min.js"></script>
  </head>

  <body>
    <script>
      window.onload = function() {
        // Plugin configuration options
        var config = {

          // List of data sources - string for built-in, objects
          // for custom or configurable sources (see Wiki for details)
          dataSources: [  
            'Wikidata',   
            'VIAF'
          ],

          // Pre-set search language (defaults to 'en'), set to
          // 'auto' to detect browser language
          language: 'en', 

          // Optional additional search languages the 
          // user can switch to
          availableLanguages: [
            'en', 'de', 'es'
          ]
          
          // Search result page length (default 20)
          limit: 10
        };

        var r = Recogito.init({
          content: 'content',
      	  widgets: [
            'COMMENT',
            recogito.SemanticTags(widgetConfig)
          ]
        });

        r.on('createAnnotation', function(a) {
          console.log('created', a);
        });
      }
    </script>
  </body>
</html>
```

For more details on how to configure the plugin and data sources, see the 
[Wiki](https://github.com/performant-software/recogito-semantic-tags/wiki/Using-with-RecogitoJS-or-Annotorious).
