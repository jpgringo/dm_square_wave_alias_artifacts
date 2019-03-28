var a;

function makeToggle() {
	if(a === undefined) {
		a = patcher.newdefault(20, 60, "toggle");
		a.presentation(1);
		a.bgcolor(1.0, 0.2, 0.2, 1);
		//a.bgcolor = [1.0, 0.2, 0.2, 1];
		a.varname = "foobar";
		//a.presentation_mode = true;
		//a.bgcolor = '#FF0000';
	}
}

function deleteToggle() {
	post('a:', a, '\n');
	if(a !== undefined) {
		patcher.remove(a);
		a = undefined;
	}
}