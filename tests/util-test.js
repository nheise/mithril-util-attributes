var o = require("ospec");

var ma = require('../index.js');

o.spec("mithril-util-attributes", function() {
  
  o("ma without any givings, must create empty object", function() {
    var attr = ma().getAttrs();
    o( attr ).deepEquals( {} );
  });

  o("ma with an object given, but no further invocations, must return given object", function() {
    var given = { myAttr: "myValue" };
    var attr = ma( given ).getAttrs();
    o( attr ).deepEquals( given );
  });

  o("ma set attribute, must set attribute", function() {
    var fn = () => true;
    var attrs = ma().set( "attr", fn ).getAttrs();
    o( attrs.attr ).deepEquals( fn );
  });
  
  o("ma onclick, must set onclick function", function() {
    var fn = () => true;
    var attrs = ma().onclick( fn ).getAttrs();
    o( attrs.onclick ).deepEquals( fn );
  });

  o.spec("ma classes", function() {
    o("when attribute is evaluate to true, use it as css class", function() {
      var attr = ma().classes( { 'my-class': true } ).getAttrs();
      o( attr["class"] ).equals( "my-class" );
    });
    o("when attribute is evaluate to false, don't use it as css class", function() {
      var attr = ma().classes( { 'my-class': false } ).getAttrs();
      o( attr["class"] ).equals( "" );
    });
    o("when two or more attribute are evaluate to true, connect them as css class", function() {
      var attr = ma().classes( { 'my-class': true, 'my-class2': false, 'my-class3': true } ).getAttrs();
      o( attr["class"] ).equals( "my-class my-class3" );
    });
  });
  
});