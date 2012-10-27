
module("test module");
test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

test("fail test", function(){
	ok( false, "Will failed!" );
});

module("test module2");
test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

test("fail test", function(){
	ok( false, "Will failed!" );
});