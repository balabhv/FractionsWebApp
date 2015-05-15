function setup() {
  createCanvas( 800, 800);
}



function draw(){
    fill(255,175,0);
    drawFracSquare( 0 , 100 , 1 ,2);
    drawFracSquare( 0 , 210 , 2 ,2);
    drawFracSquare( 0 , 430 , 1 ,3);
    drawFracSquare( 0 , 540 , 2 ,3);
    drawFracSquare( 0 , 650 , 1 ,5);
    drawFracSquare( 110 , 100 , 2 ,5);
    drawFracSquare( 110 , 210 , 3 ,5);
    drawFracSquare( 110 , 320 , 4 ,5);
    drawFracSquare(200, 450, 1 ,4);
    drawFracSquare(200, 560, 2 ,4);
    drawFracSquare(200, 670, 3 ,4);
    drawFracCircle(360, 450 , 1 , 4);
    drawFracCircle(360, 560 , 2 , 4);
    drawFracCircle(360, 670 , 3 , 4);

}

function drawThreeQuarterSquare( x, y){

  fill(255, 0 ,0 );
  rect( x , y, 50, 50);
  rect( x + 50, y , 50, 50);
  rect( x + 50, y + 50 , 50, 50);

}

function drawHalfCircle( x,  y){
   arc(x, y, 100, 100 ,0 ,PI);
   line(x -50 , y , x + 50, y);

}

function drawQrtCircle( x, y){
   arc(x, y, 100, 100 ,0 ,PI/2);
   line(x , y , x + 50, y);
   line(x , y, x , y + 50);

}

function drawThreeQrtCircle( x, y){
   arc(x, y, 100, 100 ,0 ,PI * 1.5);
   line(x , y , x + 50, y);
   line(x , y, x , y - 50);

}

function drawQuad(x, y){
 quad(x, y, x + 100, y, x, y + 100, x + 100, y + 100);
 line( x, y, x, y + 100);
 line (x + 100, y, x + 100, y + 100);
}

function drawHalfBar( x , y){
  rect(x , y, 100 , 100);
  fill(0,0,0);
  rect(x, y, 50, 50);
}

/*
  draws a circle at pos x  and y
  d = denominator ( 4 )
  n  = numerator (1 -(d -1))
*/

function drawFracCircle ( x ,  y, n, d)
{
  var offset = 50;
    fill(255,0,0);
    arc(x + offset, y + offset, 100, 100 ,0 ,2*PI);
    fill(0,0,0);

    switch(d){

      case 4:
        if( n == 1){
        drawQrtCircle( x + offset , y +offset);
        }else if ( n == 2){
          drawHalfCircle(x + offset ,y + offset);
        }else if (n == 3){
          drawThreeQrtCircle(x + offset,y + offset);
        }
        break;

    }
}

/*
  draws a square at pos x  and y
  d = denominator ( 2 , 4)
  n  = numerator (1 -(d-1))
*/
function drawFracSquare( x , y,  n,  d){
 fill(255,175,0);
 rect(x, y , 100 , 100);
 fill(0,0,0);
 stroke(255, 255, 255);
 switch(d){

  case 2:
    if( n == 1){
      rect( x , y , 50 , 100);
    }else{
      stroke(0 ,0 , 0);
      line(x + 50, y, x + 50 , y + 100);
    }
    break;

  case 3:
    switch(n){
      case 2:
        rect(x , y + 33, 100, 33 );
      case 1:
        rect(x , y, 100,33 );
        break;
      default:
        break;
    }
    break;

  case 4:
    line(x + 50, y, x + 50 , y + 100);
    line(x , y + 50, x + 100 , y + 50);
    switch(n){
      case 3:
        rect(x,y + 50, 50 ,50);
      case 2:
        rect(x + 50,y, 50 ,50);
      case 1:
        rect(x,y, 50 ,50);
        break;
      default:
        break;
    }
    break;

  case 5:
    line(x + 20, y, x + 20 , y + 100);
    line(x + 40, y, x + 40 , y + 100);
    line(x + 60, y, x + 60 , y + 100);
    line(x + 80, y, x + 80 , y + 100);

    switch(n){
      case 4:
        rect(x ,y , 80, 100);
      case 3:
        rect(x ,y , 60, 100);
      case 2:
        rect(x, y, 40, 100);
      case 1:
        rect(x ,y , 20, 100);
        break;
      default:
        break;

    }
    if (n == 1){
      rect(x, y, 20 , 100);
    }else if ( n == 2){
      rect(x, y, 20 , 100);
      rect(x + 20, y, 20 , 100);
    }

 }
 stroke(0 ,0 , 0);

}
