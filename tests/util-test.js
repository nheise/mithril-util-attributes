var o = require("ospec")
var browserMock = require("mithril/test-utils/browserMock")

window = browserMock()

o.spec("mithril-util-attributes", function() {

  var ma

  o.beforeEach(function() {
    var mock = browserMock()
    if (typeof global !== "undefined") {
      global.window = mock
    }
    ma = require('../index.js')
  })
  
  o("ma without any givings, must create empty object", function() {
    var attr = ma.get()
    o( attr ).deepEquals( {} )
  })

  o("ma with an object given, but no further invocations, must return given object", function() {
    var given = { myAttr: "myValue" }
    var attr = ma.new( given ).get()
    o( attr ).deepEquals( given )
  })

  o("ma set attribute, must set attribute", function() {
    var fn = () => true
    var attrs = ma.set( "attr", fn ).get()
    o( attrs.attr ).deepEquals( fn )
  })
  
  o("ma onclick, must set onclick function", function() {
    var fn = () => true
    var attrs = ma.onclick( fn ).get()
    o( attrs.onclick ).deepEquals( fn )
  })

  o.spec("ma css", function() {
    
    o.beforeEach(function() {
      ma = ma.new()
    })
    
    o("when attribute is evaluate to true, use it as css class", function() {
      var attr = ma.css( 'my-class', true ).get()
      o( attr["class"] ).equals( "my-class" )
    })
    o("when attribute is evaluate to false, don't use it as css class", function() {
      var attr = ma.css( 'my-class', false ).get()
      o( attr["class"] ).equals( undefined )
    })
    o("when two or more attribute are evaluate to true, connect them as css class", function() {
      var attr = ma.css( 'my-class', true, 'my-class2', false, 'my-class3', true ).get()
      o( attr["class"] ).equals( "my-class my-class3" )
    })
    o("when css are given, concat new classes", function() {
      var given = { 'class': "myClass" }
      var attr = ma.css( 'my-class', true, 'my-class2', false, 'my-class3', true ).get()
      o( attr["class"] ).equals( "my-class my-class3" )
    })
    o("one argument must throw error", function( done ) {
      try { 
        ma.css( 'my-class' )
      }
      catch(e) {
        o(e).notEquals( undefined )
        done()
      }
    })
    o("three arguments must throw error", function( done ) {
      try { 
        ma.css( 'my-class', true, 'my-class2' )
      }
      catch(e) { 
        o(e).notEquals( undefined )
        done()
      }
    })
  })
  
  o.spec("withAttr must set", function() {
    
    o.beforeEach(function() {
      ma = ma.new()
    })
    
    o("attr value and event, without thisArg", function() {
      var testValue
      var fn = (value) => testValue = value
      
      var attrs = ma.withAttr( "value", "oninput", "myValue", fn ).get()
      
      o( attrs.value ).equals( "myValue" )
      
      var event = { currentTarget: { value: "newValue" } }
      attrs.oninput( event )
      o( testValue ).equals( "newValue" )
    })
    o("attr value and event, with thisArg", function() {
      var testValue, thisContext, context = { name: "myname" }
      function fn(value){ testValue = value; thisContext = this; }
      
      var attrs = ma.withAttr( "value", "oninput", "myValue", fn, context ).get()
      
      o( attrs.value ).equals( "myValue" )
      
      var event = { currentTarget: { value: "newValue" } }
      attrs.oninput( event )
      o( testValue ).equals( "newValue" )
      o( thisContext.name ).equals( "myname" )
    })
  })
  
  o.spec("set oninput", function() {
    
    o.beforeEach(function() {
      ma = ma.new()
    })
    
    o("withAttr function", function() {
      var testValue, initialValue = "BlaBlaBla"
      function fn(value){ testValue = value; context = this; }
      
      var attrs = ma.value( initialValue ).oninput( fn ).get()
      
      o( attrs.value ).equals( initialValue )
      
      var event = { currentTarget: { value: "newValue" } }
      attrs.oninput( event )
      o( testValue ).equals( "newValue" )
    })
    o("withAttr function and thisArg", function() {
      var testValue, initialValue = "BlaBlaBla", thisContext, context = { name: "myname" }
      function fn(value){ testValue = value; thisContext = this; }
      
      var attrs = ma.value( initialValue ).oninput( fn, context ).get()
      
      o( attrs.value ).equals( initialValue )
      
      var event = { currentTarget: { value: "newValue" } }
      attrs.oninput( event )
      o( testValue ).equals( "newValue" )
      o( thisContext.name ).equals( "myname" )
    })
    o("without withAttr function", function() {
      var testValue, initialValue = "BlaBlaBla"
      function fn(value){ testValue = value; context = this; }
      
      var attrs = ma.value( initialValue ).oninput( fn, false ).get()
      
      o( attrs.value ).equals( initialValue )
      
      var event = "newValue"
      attrs.oninput( event )
      o( testValue ).equals( "newValue" )
    })
  })
  
  o.spec("set onchange", function() {
    
    o.beforeEach(function() {
      ma = ma.new()
    })
    
    o("withAttr function", function() {
      var testValue, initialValue = "BlaBlaBla"
        function fn(value){ testValue = value; context = this; }
      
      var attrs = ma.value( initialValue ).onchange( fn ).get()
      
      o( attrs.value ).equals( initialValue )
      
      var event = { currentTarget: { value: "newValue" } }
      attrs.onchange( event )
      o( testValue ).equals( "newValue" )
    })
    o("withAttr function and thisArg", function() {
      var testValue, initialValue = "BlaBlaBla", thisContext, context = { name: "myname" }
      function fn(value){ testValue = value; thisContext = this; }
      
      var attrs = ma.value( initialValue ).onchange( fn, context ).get()
      
      o( attrs.value ).equals( initialValue )
      
      var event = { currentTarget: { value: "newValue" } }
      attrs.onchange( event )
      o( testValue ).equals( "newValue" )
      o( thisContext.name ).equals( "myname" )
    })
    o("without withAttr function", function() {
      var testValue, initialValue = "BlaBlaBla"
        function fn(value){ testValue = value; context = this; }
      
      var attrs = ma.value( initialValue ).onchange( fn, false ).get()
      
      o( attrs.value ).equals( initialValue )
      
      var event = "newValue"
      attrs.onchange( event )
      o( testValue ).equals( "newValue" )
    })
  })
  
})