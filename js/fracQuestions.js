
/*These are the javascript functions for level one
of the fraction rpg game.*/

var questionNum = 0;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


function question01 (){
	questionNum = 0;
    ctx.clearRect(0,0,350,200);
    var img = document.getElementById("circ3.4");
    ctx.drawImage(img, 50,50);                   
    ctx.font = "56px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";                    
    ctx.fillText("=", canvas.width - 120 , canvas.height/2 + 28);


};


function question02 () {
	questionNum = 1;
	ctx.clearRect(0,0,350,200);
	 var img = document.getElementById("rect3.6");
    ctx.drawImage(img, 50,25);                   
	ctx.font = "56px Comic Sans MS";
	ctx.fillStyle = "black";
	ctx.textAlign = "left";                    
	ctx.fillText("=", canvas.width - 120 , canvas.height/2 + 28);  

};

function question03() {
	questionNum = 2;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("sqr3.4");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("sub");
    ctx.drawImage(img , 118 , 80);
    var img = document.getElementById("circ1.2");
    ctx.drawImage(img, 220,35);
}

function question04 () {
	questionNum = 3;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("13over8");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("2over4");
    ctx.drawImage(img, 220,35);

}

function question05() {
	questionNum = 4;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("4over7");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("4over2");
    ctx.drawImage(img, 220,35);

}

function question06() {
	questionNum = 5;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("3over4");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("sub");
    ctx.drawImage(img , 118 , 80);
    var img = document.getElementById("1over2");
    ctx.drawImage(img, 220,35);

}

function question07() {
	questionNum = 6;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("sqr3.4");
    ctx.drawImage(img, 20,35);
	var img = document.getElementById("plus");
    ctx.drawImage(img , 150 , 50);
    var img = document.getElementById("6over8");
    ctx.drawImage(img, 245,35);
    ctx.closePath();
}

function question08() {
	questionNum = 7;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("3over5");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("1over4");
    ctx.drawImage(img, 220,35);
}

function question09(){
	questionNum = 8;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("13over50");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("3over20");
    ctx.drawImage(img, 220,35);
}

function question10(){
	questionNum = 9;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("1over4");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 122 , 50);
    var img = document.getElementById("1over6");
    ctx.drawImage(img, 220,35);
}

function question11(){
	questionNum = 10;
	$("#wholenum").show();
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("3and3over4");
    ctx.drawImage(img, 110 ,35);
    ctx.font = "25px serif";
	ctx.fillStyle = "black";
	ctx.textAlign = "center"; 
    ctx.fillText("Convert to an inproper fraction ", 175 , 180 );
}

function question12(){	
	questionNum = 11;
	$("#wholenum").show();
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("12and1over3");
    ctx.drawImage(img, 110 ,35);
    ctx.font = "25px serif";
	ctx.fillStyle = "black";
	ctx.textAlign = "center"; 
    ctx.fillText("Convert to an inproper fraction ", 175 , 180 );
    
}

function question13(){
	questionNum = 12;
	$("#wholenum").show();	
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("52over6");
    ctx.drawImage(img, 110 ,35);
    ctx.font = "25px serif";
	ctx.fillStyle = "black";
	ctx.textAlign = "center"; 
    ctx.fillText("Enter a Mixed Number", 170 , 180 );
    
}

function question14(){
	questionNum = 13;
	$("#wholenum").show();	
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("39over6");
    ctx.drawImage(img, 110 ,35);
    ctx.font = "25px serif";
	ctx.fillStyle = "black";
	ctx.textAlign = "center"; 
    ctx.fillText("Enter a Mixed Number", 170 , 180 );
    
}

function question15(){
	questionNum = 14;
	$("#wholenum").show();	
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("75over20");
    ctx.drawImage(img, 90 ,35);
    ctx.font = "25px serif";
	ctx.fillStyle = "black";
	ctx.textAlign = "center"; 
    ctx.fillText("Enter a Mixed Number", 170 , 180 );
    
}

function question16() {
	questionNum = 15;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("4over5");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("sub");
    ctx.drawImage(img , 118 , 80);
    var img = document.getElementById("1over30");
    ctx.drawImage(img, 220,35);
}

function question17() {
	questionNum = 16;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("6over7");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("sub");
    ctx.drawImage(img , 118 , 80);
    var img = document.getElementById("1over3");
    ctx.drawImage(img, 220,35);
}

function question18 () {
	questionNum = 17;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("rect2.6");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("plus");
    ctx.drawImage(img , 118 , 80);
    var img = document.getElementById("rect3.6");
    ctx.drawImage(img, 220,35);
	
}

function question19 () {
	questionNum = 18;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("rect4.6");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("sub");
    ctx.drawImage(img , 118 , 80);
    var img = document.getElementById("circ1.2");
    ctx.drawImage(img, 220,35);

}

function question20 () {
	questionNum = 19;
	ctx.clearRect(0,0,350,200);
	var img = document.getElementById("circ3.4");
    ctx.drawImage(img, 10,35);
    var img = document.getElementById("sub");
    ctx.drawImage(img , 118 , 80);
    var img = document.getElementById("circ1.2");
    ctx.drawImage(img, 220,35);
}


function isCorrect() {
	var retBool = false;
	var wholenum = $('#wholenum').val();
	var numerator   = $("#numerator").val();
	var denominator = $("#denominator").val();
	console.log(wholenum);
	console.log(numerator);
	console.log(denominator);
	var ansArr = [];
	ansArr[0] = [3 ,4];
	ansArr[1] = [1 ,2];
	ansArr[2] = [1 ,4];
	ansArr[3] = [17 ,8];
	ansArr[4] = [18 ,7];
	ansArr[5] = [1 , 4];
	ansArr[6] = [3 , 2];
	ansArr[7] = [17 , 20];
	ansArr[8] = [41 , 100];
	ansArr[9] = [5 , 12];
	ansArr[10] = [15 , 4];
	ansArr[11] = [37 , 3];
	ansArr[12] = [8 , 1, 8];
	ansArr[13] = [1, 2, 6];
	ansArr[14] = [3 , 4, 3];
	ansArr[15] = [23 , 30];
	ansArr[16] = [11 , 21];
	ansArr[17] = [5 , 6];
	ansArr[18] = [1 , 6];
	ansArr[19] = [1 , 4];
	

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
		case 5:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 6:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 7:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 8:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 9:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 10:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 11:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 12:
			if((ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator) ||
				ansArr[questionNum][2] == wholenum){
				retBool = true;
			}
			break;
		case 13:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator
				&& ansArr[questionNum][2] == wholenum ){
				retBool = true;
			}
			break;
		case 14:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 15:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 16:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 17:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 18:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
		case 19:
			if(ansArr[questionNum][0] == numerator && ansArr[questionNum][1] == denominator){
				retBool = true;
			}
			break;
				break;
	}

                    
	$("#wholenum").hide();
	console.log(retBool);
	return retBool;
}