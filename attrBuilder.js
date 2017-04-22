var m = require( "mithril" )
var CssBuilder = require( "./cssBuilder.js" )

function AttributeBuilder( givenAttrs ) {
  const attrs = givenAttrs || {}
  var lastKey
  
  const cssBuilder = new CssBuilder( attrs );
  
  function onclick( fn ) {
    set( "onclick", fn )
    return this
  }
  
  function onchange( fn, param1, param2 ) {
    setEvent( "onchange", fn, param1, param2 )
    return this
  }
  
  function oninput( fn, param1, param2 ) {
    setEvent( "oninput", fn, param1, param2 )
    return this
  }
  
  function value( value ) {
    set( "value", value )
    return this
  }

  function key( key ) {
    set( "key", key )
    return this
  }
  
  function id( id ) {
    set( "id", id )
    return this
  }
  
  function name( value ) {
    set( "name", value )
    return this
  }
  
  function set( key, value ) {
    attrs[key] = value
    lastKey = key
    return this
  }
  
  function setEvent( key, fn, param1, param2 ) {
    var typeParam1 = typeof param1;
    var typeParam2 = typeof param2;
    var useWithAttr = typeParam1 !== "boolean" ? true : param1
    var thisArg = typeParam1 === "boolean" ? param2 : param1
    
    attrs[key] = useWithAttr ? m.withAttr( lastKey, fn, thisArg ) : fn
    
    return this
  }
  
  function withAttr( attrName, event, initialValue, callback, thisArg ) {
    attrs[attrName] = initialValue
    attrs[event] = m.withAttr( attrName, callback, thisArg )
    return this
  }
  
  function getAttributes() {
    cssBuilder.setClasses()
    return attrs
  }
  
  function newInstance( givenAttrs ) {
    return new AttributeBuilder( givenAttrs )
  }
  
  return {
    css: cssBuilder.css,
    get : getAttributes,
    set: set,
    onclick: onclick,
    onchange: onchange,
    oninput: oninput,
    value: value,
    id: id,
    key: key,
    withAttr: withAttr,
    'new': newInstance
  }
}

module.exports = new AttributeBuilder()