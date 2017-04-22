const WHITESPACE = ' '

function CssBuilder( attrs = {} ) {
  
  const cssClasses = {}
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
  
  function setClasses() {
    var classStr = Object.keys( cssClasses ).filter( key => !!cssClasses[key] ).join( WHITESPACE )
    if( classStr.length > 0 ) { 
      attrs["class"] = classStr
    }
  }
  
  return {
    css: css,
    setClasses: setClasses
  }
}

module.exports = CssBuilder;