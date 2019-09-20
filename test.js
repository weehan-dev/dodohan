function test() {
	let test1;
	return id => {
		if (test1) return test1;
		test1 = id;
		return test1;
	};
}

const test1 = test();

console.log(test1("changhoi"));
console.log(test1("changhoi2"));
