
/*These are the javascript functions for level one
of the fraction rpg game.*/

var questionNum = 0;


function question01 (){
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,350,200);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(30,30,150,150);
    ctx.fillStyle = "#FF8800";
    ctx.fillRect( 30 , 30 , 75, 150);                   
    ctx.font = "56px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";                    
    ctx.fillText("=", canvas.width - 120 , canvas.height/2 + 28);


};


function question02 () {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,350,200);
	ctx.fillStyle = "#000000";
	ctx.fillRect(30,30,150, 150);
	ctx.fillStyle = "#FF8800";
	ctx.fillRect( 30 , 30 , 150	, 75);                   
	ctx.font = "56px Comic Sans MS";
	ctx.fillStyle = "black";
	ctx.textAlign = "left";                    
	ctx.fillText("=", canvas.width - 120 , canvas.height/2 + 28);  

};

function question03() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,350,200);
	ctx.fillStyle = "#000000";
	ctx.fillRect(30,30,150,150);
	ctx.fillStyle = "#FF8800";
	ctx.fillRect( 30 , 30 , 75, 75); 
	ctx.fillRect( 30 , 105 , 150, 75); 
	ctx.moveTo(105,30);
	ctx.lineTo(105,180);
	ctx.moveTo(30,105);
	ctx.lineTo(180,105);
	ctx.stroke();                 
	ctx.font = "56px Comic Sans MS";
	ctx.fillStyle = "black";
	ctx.textAlign = "left";                    
	ctx.fillText("=", canvas.width - 120 , canvas.height/2 + 28); 
}

function question04 () {
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("13over8");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("2over4");
    ctx.drawImage(img, 220,35);

}

function question05() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("4over7");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("4over2");
    ctx.drawImage(img, 220,35);

}

function question05() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("3over4");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("sub");
    ctx.drawImage(img , 118 , 80);
    var img = document.getElementById("1over2");
    ctx.drawImage(img, 220,35);

}

function question06() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,350,200);
	ctx.fillStyle = "#000000";
	ctx.fillRect(10,30,150,150);
	ctx.fillStyle = "#FF8800";
	ctx.fillRect( 10 , 30 , 75, 75); 
	ctx.fillRect( 10 , 105 , 150, 75); 
	ctx.moveTo(85,30);
	ctx.lineTo(85,180);
	ctx.moveTo(10, 105);
	ctx.lineTo(160,105);
	ctx.stroke(); 
	var img = document.getElementById("plus");
    ctx.drawImage(img , 162 , 50);
    var img = document.getElementById("6over8");
    ctx.drawImage(img, 245,35);
}

function question07() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("3over5");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("1over4");
    ctx.drawImage(img, 220,35);
}

function question08(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("13over50");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("3over20");
    ctx.drawImage(img, 220,35);
}

function question09(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("1over4");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("1over6");
    ctx.drawImage(img, 220,35);
}

function isCorrect() {
	var retBool = false;
	var numerator   = document.forms["ans"]["numerator"].value;
	var denominator = document.forms["ans"]["denominator"].value;
	console.log(numerator);
	console.log(denominator);
	var ansArr = [];
	ansArr[0] = [1 ,2];
	ansArr[1] = [1 ,2];
	ansArr[2] = [3 ,4];
	ansArr[3] = [17 ,8];
	ansArr[4] = [21 ,8];
	ansArr[5] = [1 , 4];


	switch(questionNum){
		case 0:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 1:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 2:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 3:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 4:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
	}
	console.log(retBool);
	return retBool;
}