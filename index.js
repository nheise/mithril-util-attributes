var m = require( "mithril" )

function AttributeBuilder( givenAttrs ) {
  const attrs = givenAttrs || {}
  
  function classes( classAttrs ) {
    const whitespace = ' '
    attrs["class"] =  Object.keys( classAttrs ).filter( key => !!classAttrs[key] ).join(whitespace)
    return this
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
    return attrs
  }
  
  return {
    classes: classes,
    getAttrs : getAttrs,
    set: set,
    onclick: onclick,
    withAttr: withAttr
  }
}

module.exports = givenAttrs => new AttributeBuilder( givenAttrs )