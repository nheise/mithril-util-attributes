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
    var attr = ma().getAttrs()
    o( attr ).deepEquals( {} )
  })

  o("ma with an object given, but no further invocations, must return given object", function() {
    var given = { myAttr: "myValue" }
    var attr = ma( given ).getAttrs()
    o( attr ).deepEquals( given )
  })

  o("ma set attribute, must set attribute", function() {
    var fn = () => true
    var attrs = ma().set( "attr", fn ).getAttrs()
    o( attrs.attr ).deepEquals( fn )
  })
  
  o("ma onclick, must set onclick function", function() {
    var fn = () => true
    var attrs = ma().onclick( fn ).getAttrs()
    o( attrs.onclick ).deepEquals( fn )
  })

  o.spec("ma classes", function() {
    o("when attribute is evaluate to true, use it as css class", function() {
      var attr = ma().classes( { 'my-class': true } ).getAttrs()
      o( attr["class"] ).equals( "my-class" )
    })
    o("when attribute is evaluate to false, don't use it as css class", function() {
      var attr = ma().classes( { 'my-class': false } ).getAttrs()
      o( attr["class"] ).equals( "" )
    })
    o("when two or more attribute are evaluate to true, connect them as css class", function() {
      var attr = ma().classes( { 'my-class': true, 'my-class2': false, 'my-class3': true } ).getAttrs()
      o( attr["class"] ).equals( "my-class my-class3" )
    })
  })
  
  o.spec("withAttr must set", function() {
    o("attr value and event, without thisArg", function() {
      var testValue
      var fn = (value) => testValue = value
      
      var attrs = ma().withAttr( "value", "oninput", "myValue", fn ).getAttrs()
      
      o( attrs.value ).equals( "myValue" )
      
      var event = { currentTarget: { value: "newValue" } }
      attrs.oninput( event )
      o( testValue ).equals( "newValue" )
    })
    o("attr value and event, with thisArg", function() {
      var testValue, context
      function fn(value){ testValue = value; context = this; }
      
      var attrs = ma().withAttr( "value", "oninput", "myValue", fn, { name: "myname" } ).getAttrs()
      
      o( attrs.value ).equals( "myValue" )
      
      var event = { currentTarget: { value: "newValue" } }
      attrs.oninput( event )
      o( testValue ).equals( "newValue" )
      o( context.name ).equals( "myname" )
    })
  })
  
})