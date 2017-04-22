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
// will create { 'class': 'highlight italic' }
```

### Create Event bi-directional binding

```javascript
m( "input", ma.name( "description" ).value( "initialValue" ).oninput( ctrl.setDescription ).get() )
```

---

## API

#### builder ma.new( [Object givenAttributes] )

Creates a new instance of the builder. If you have attributes already, you can them handover via optional parameter. 

---
#### Object ma.get()

Creates the attribute object.

---
#### builder ma.css( String cssClassName, Boolean useit [,String cssClassName, Boolean useIt ] )

Can be invoked as often you like.
The last class of two or more identical classes will win.

---
#### builder ma.id( String id )

---
#### builder ma.key( String key )

---
#### builder ma.onclick( Function callback )

---
#### builder ma.value( String value )

---
#### builder ma.oninput( Function callback [, Boolean useMithrilWithAttrFunction [, Object thisArg ]] )

---
#### builder ma.onchange( Function callback [, Boolean useMithrilWithAttrFunction [, Object thisArg ]] )

---
#### builder ma.withAttr( String attrName, String event, Object initialValue, Function callback [, Object thisArg ] )

Will invoke this internally:
```javascript
attrs[attrName] = initialValue
attrs[event] = m.withAttr( attrName, callback, thisArg )
```

---

#### builder ma.set( String key, Any value )

You are able to set anything you like.
