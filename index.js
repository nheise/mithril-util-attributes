var m = require( "mithril" )

function AttributeBuilder( givenAttrs ) {
  const WHITESPACE = ' '
  const attrs = givenAttrs || {}
  
  let cssClasses = {}
  if( attrs["class"] != undefined ) { 
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
  
  function set( key, value ) {
    attrs[key] = value
    return this
  }
  
  function withAttr( attrName, event, initialValue, callback, thisArg ) {
    attrs[attrName] = initialValue
    attrs[event] = m.withAttr( attrName, callback, thisArg )
    return this
  }
  
  function getAttrs() {
    addCssClasses()
    return attrs
  }
  
  return {
    css: css,
    getAttrs : getAttrs,
    set: set,
    onclick: onclick,
    withAttr: withAttr
  }
}

module.exports = givenAttrs => new AttributeBuilder( givenAttrs )