# mithril-util-attributes

[Usage](#usage) | [API](#api)

Utility for Mithril creating attributes

## Usage

### Basic Usage

First create the builder, use it and get the attributes to use them in the mithril function.

```javascript
var m = require('mithril')
var ma = require('mithril-util-attributes')

var div = m( "div", ma.id( "0" ).get() )
```
### Create CSS Classes

```javascript
var div = m( "div", ma.css( "highlight", ctrl.isHighlighted(), "bold", ctrl.isBold(), "italic",  ctrl.isItalic() ).get() )

// when ctrl.isHighlighted() == true
// when ctrl.isBold() == false
// when ctrl.isItalic() == true
// will create an attribute object { 'class': 'highlight italic' }
```

---

## API

### builder ma.new( [Object givenAttributes] )

---
### builder ma.get()

---
### builder ma.css( String cssClassName, Boolean useit [,String cssClassName, Boolean useIt ] )
Can be invoked as often you like.
The last class of two or more identical classes will win.
---
### builder ma.id( Object id )

---
### builder ma.key( Object key )

---
### builder ma.onclick( Function callback )

---
### builder ma.value( Object value )

---
### builder ma.onchange( Function callback [, Boolean useMithrilWithAttr [, Object thisArg ]] )

---
### builder ma.withAttr( attrName, event, initialValue, callback [, thisArg] )

---
