var mID = 0;

function setupGlobals() {

	$('#questionDiv').hide();
	$('#wholenum').hide();

}


/*
	Parameters:
 		key: string variable
 			depends on destination
 	Returns: none
*/
function loadPage(key) {
	
	/* variable for url */

	$("#mainContent").load(key + '.html', function() {
		if (key === 'tutorial01') {
			$('#title').html('What is a Fraction?');
		} else if (key === 'tutorial02') {
			$('#title').html('Simplification');
		} else if (key === 'tutorial03') {
			$('#title').html('Improper/Mixed Fractions');
		} else if (key === 'tutorial04') {
			$('#title').html('LCD');
		} else {
			$('#title').html('Addition/Subtraction');
		}
	});
}

function gameOn() {
	$('#gameDiv').toggle();
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