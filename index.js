var m = require( "mithril" )

function AttributeBuilder( givenAttrs ) {
  const WHITESPACE = ' '
  const attrs = givenAttrs || {}
  var lastKey
  
  let cssClasses = {}
  if( attrs["class"] !== undefined ) { 
    cssClasses[attrs["class"]] = true 
  }
  
  function css() {
    if( arguments.length % 2 != 0 ) {
      throw Error("CSS class definition must be a value pair, attribute name and true/false");
    }
    for( var i = 0; i < arguments.length; i += 2 ) {
      cssClasses[arguments[i]] = arguments[i+1]
    }
    return this
  }
  
  function addCssClasses() {
    var classStr = Object.keys( cssClasses ).filter( key => !!cssClasses[key] ).join( WHITESPACE )
    if( classStr.length > 0 ) { 
      attrs["class"] = classStr
    }
  }
  
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
  
  function setEvent( key, fn, param1, param2 ) {
    var typeParam1 = typeof param1;
    var typeParam2 = typeof param2;
    var useWithAttr = typeParam1 !== "boolean" ? true : param1
    var thisArg = typeParam1 === "boolean" ? param2 : param1
    
    attrs[key] = useWithAttr ? m.withAttr( lastKey, fn, thisArg ) : fn
    
    return this
  }

  function set( key, value ) {
    attrs[key] = value
    lastKey = key
    return this
  }
  
  function withAttr( attrName, event, initialValue, callback, thisArg ) {
    attrs[attrName] = initialValue
    attrs[event] = m.withAttr( attrName, callback, thisArg )
    return this
  }
  
  function getAttributes() {
    addCssClasses()
    return attrs
  }
  
  function newInstance( givenAttrs ) {
    return new AttributeBuilder( givenAttrs )
  }
  
  return {
    css: css,
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