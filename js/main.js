var tutorials = [];
var questions = [];

function setupGlobals() {
	var temp = '/partials/questionx.html';
	for (var i = 0 ; i < 36 ; i++) {
		var intstring = '';
		if (i < 10) {
			intstring = '0';
		}
		intstring = intstring.concat(i+1);
		var url = temp.replace("x", intstring);
		questions.push(url); 
	}
	var temp = '/partials/tutorialx.html';
	for (var i = 0 ; i < 4 ; i++) {
		var intstring = '';
		if (i < 10) {
			intstring = '0';
		}
		intstring = intstring.concat(i+1);
		var url = temp.replace("x", intstring);
		tutorials.push(url); 
	}
}


/*
	Parameters:
		type: integer variable
 			possible values:
 				0: game
 				1: content
 		key: string variable
 			depends on destination
 	Returns: none
*/
function loadPage(type, key) {
	
	/* variable for url */
	var URLvar = '';

	/* if else chain to set url variable */
	if (key === 'home') {
		URLvar = '/partials/home.html';
	}

	for (var i = 0 ; i < 4 ; i++) {
		var intstring = '';
		if (i < 10) {
			intstring = '0';
		}
		intstring = intstring.concat(i+1);
		if (key === 'tutorial'.concat(intstring)) {
			URLvar = tutorials[i];
		}
	}

	for (var i = 0 ; i < 36 ; i++) {
		var intstring = '';
		if (i < 10) {
			intstring = '0';
		}
		intstring = intstring.concat(i+1);
		if (key === 'question'.concat(intstring)) {
			URLvar = questions[i];
		}
	}

	$.ajax({
	    type: "GET",
	    url: URLvar,
	    dataType: "html",
	    success: function(data)
	    {
	      switch (type) {
		case 0:
			/* Game */
			$("#gameDiv").html(data);
			break;
		case 1:
			/* Tutorial Content */
			$("#mainContent").html(data);
			break;
	}
	    }
	});
}

function LCM(A)  // A is an integer array (e.g. [-50,25,-45,-18,90,447])
{   
    var n = A.length, a = Math.abs(A[0]);
    for (var i = 1; i < n; i++)
     { var b = Math.abs(A[i]), c = a;
       while (a && b){ a > b ? a %= b : b %= a; } 
       a = Math.abs(c*A[i])/(a+b);
     }
    return a;
}
 
/* For example:
   LCM([-50,25,-45,-18,90,447]) -> 67050
*/

function gcd(a, b) {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
};

function simplify (A) {
	var g = gcd (A[1], A[0]);

	return [A[0]/g, A[1]/g];
}

function add(A, B) {
	var denom = LCM([A[1], B[1]]);
	var factor1 = denom / B[1];
	var factor2 = denom / A[1];

	var newnum = A[0] * factor1 + B[0] * factor2;
	return [newnum, denom];
}

function subtract(A,B) {
	var C = [B[0], -1 * B[1]];
	return add(A, C);
}