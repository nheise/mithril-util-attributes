var o = require("ospec")

var CssBuilder = require('../cssBuilder.js')

o.spec("cssBuilder", function() {

  var cssBuilder, attrs

  o.beforeEach(function() {
    attrs = {}
    cssBuilder = new CssBuilder( attrs )
  })
  
  o("when attribute is evaluate to true, use it as css class", function() {
    var attr = cssBuilder.css( 'my-class', true ).setClasses()
    o( attrs["class"] ).equals( "my-class" )
  })
  o("when attribute is evaluate to false, don't use it as css class", function() {
    var attr = cssBuilder.css( 'my-class', false ).setClasses()
    o( attrs["class"] ).equals( undefined )
  })
  o("when two or more attribute are evaluate to true, connect them as css class", function() {
    var attr = cssBuilder.css( 'my-class', true, 'my-class2', false, 'my-class3', true ).setClasses()
    o( attrs["class"] ).equals( "my-class my-class3" )
  })
  o("when css are given, concat new classes", function() {
    var given = { 'class': "myClass" }
    var attr = cssBuilder.css( 'my-class', true, 'my-class2', false, 'my-class3', true ).setClasses()
    o( attrs["class"] ).equals( "my-class my-class3" )
  })
  o("one argument must throw error", function( done ) {
    try { 
      cssBuilder.css( 'my-class' )
    }
    catch(e) {
      o(e).notEquals( undefined )
      done()
    }
  })
  o("three arguments must throw error", function( done ) {
    try { 
      cssBuilder.css( 'my-class', true, 'my-class2' )
    }
    catch(e) { 
      o(e).notEquals( undefined )
      done()
    }
  })
  
})