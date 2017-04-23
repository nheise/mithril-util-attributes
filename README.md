# mithril-util-attributes

[Usage](#usage) | [API](#api)

Utility for Mithril creating attributes

## Usage

### Basic Usage

First create the builder, use it and get the attributes to use them in the mithril function.

```javascript
var m = require('mithril')
var ma = require('mithril-util-attributes')

var div = m( "div", ma().id( "0" ).get() )
```
### Create CSS Classes

```javascript
var div = m( "div", ma().css( "highlight", ctrl.isHighlighted(), "bold", ctrl.isBold(), "italic",  ctrl.isItalic() ).get() )

// when ctrl.isHighlighted() == true
// when ctrl.isBold() == false
// when ctrl.isItalic() == true
// will create { 'class': 'highlight italic' }
```

### Create Event bi-directional binding

```javascript
m( "input", ma().name( "description" ).value( "initialValue" ).oninput( ctrl.setDescription ).get() )
```

---

## API

### Create the Builder

#### Builder ma( [Object givenAttributes] )

Creates a new instance of the builder. If you have attributes already, you can them handover via optional parameter.

### Builder

#### Builder builder.new( [Object givenAttributes] )

Creates a new instance of the builder. If you have attributes already, you can them handover via optional parameter.

---
#### Object builder.get()

Creates the attribute object.

---
#### Builder builder.css( String cssClassName, Boolean useit [,String cssClassName, Boolean useIt ] )

Can be invoked as often you like.
The last class of two or more identical class strings will win.

---
#### Builder builder.id( String id )

---
#### Builder builder.key( String key )

---
#### Builder builder.onclick( Function callback )

---
#### Builder builder.value( String value )

---
#### Builder builder.oninput( Function callback [, Boolean useMithrilWithAttrFunction [, Object thisArg ]] )

---
#### Builder builder.onchange( Function callback [, Boolean useMithrilWithAttrFunction [, Object thisArg ]] )

---
#### Builder builder.withAttr( String attrName, String event, Object initialValue, Function callback [, Object thisArg ] )

This will invoke internally:
```javascript
attrs[attrName] = initialValue
attrs[event] = m.withAttr( attrName, callback, thisArg )
```

---

#### Builder builder.set( String key, Any value )

Set any attribute you like.
