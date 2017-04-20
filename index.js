
function AttributeBuilder( givenAttr ) {
  const attrs = givenAttr || {};
  
  function classes( classAttrs ) {
    const whitespace = ' ';
    attrs["class"] =  Object.keys( classAttrs ).filter( key => !!classAttrs[key] ).join(whitespace);
    return this;
  }
  
  function onclick( fn ) {
    set( "onclick", fn );
    return this;
  }
  
  function set( key, value ) {
    attrs[key] = value;
    return this;
  }
  
  function getAttrs() {
    return attrs;
  }
  
  return {
    classes: classes,
    getAttrs : getAttrs,
    set: set,
    onclick: onclick
  };
}

module.exports = givenAttr => new AttributeBuilder( givenAttr );