function sayHello (name, capital) {
	return "Hello " + (!!capital ? name.toUpperCase() : name);
}
