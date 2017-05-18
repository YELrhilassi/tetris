const canvas = document.getElementById('Tetris');
const context = canvas.getContext('2d');

const piece = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0]
];
const grid = createGid( 18, 27);

const pointer = {
	pos: {x: 0, y: 0},
	piece: piece
}

var p = 0;


function drawPiece(piece, offset){
	for (var j = 0; j < piece.length; j++) {
		for (var i = 0; i < piece[j].length; i++) {
				if (piece[j][i]) {
					context.fillStyle = 'green';
					context.fillRect( (i*20) + offset.x, (j*20) + offset.y, 20, 20);
					context.strokeStyle = 'red' ;
					context.strokeRect((i*20) + offset.x, (j*20) + offset.y, 20, 20); 

				}			
			}	
	}
}





function draw(){

	context.fillStyle = '#000';
	context.fillRect( 0, 0, canvas.width, canvas.height);

	drawPiece(pointer.piece, pointer.pos);
}


document.addEventListener("keydown", keyPressed );
function keyPressed(event){
	if (event.keyCode == 37 ) {
		//left
		pointer.pos.x -= 20;
	}else if (event.keyCode == 39) {
		//right
		pointer.pos.x += 20;
	}else if (event.keyCode == 40) {
		//down
		pieceDrop();
	}

}


function pieceDrop(){
	pointer.pos.y += 20;
	if (collide(grid, pointer)) {
		pointer.pos.y -= 20;
		merge(piece, pointer);
		pointer.pos.y = 0;

		p = 0;
	}
	dropCounter = 0 ;
}

function createGid( w, h){ //creat a grid , so we can save the pieces 
	const _grid = [];
	while(h--){
		_grid.push(new Array(w).fill(0));
	}
	return _grid
}



function merge(grid, pointer){   						//to copie the piece into the grid
	for (var j = 0; j < pointer.piece.length; j++) {
		for (var i = 0; i < pointer.piece[j].length; i++) {
				if (pointer.piece[j][i]) {
					grid[j + (pointer.pos.y/20)][i + (pointer.pos.x/20)] = pointer.piece[j][i]; // i had to multiple by the size of the square "20"
																								//so the squares will be not stacked up

				}			
			}	
	}
	
}

	

function collide(grid, pointer){          // it send true if the piece touch the botom or another piece , else -> false

	for(var j = 0; j < pointer.piece.length; j++){
		for(var i = 0; i < pointer.piece[j].length; i++){   
		
			if (pointer.piece[j][i] !== 0){											// i made all this "if" instead of "&&" so i can debug it
				if ( p == grid.length) {

					

					 	return true ;
					 
				
				}	
										
			}

		}	
		   
	}
		
  return false;	

}
	



var lasTime = 0;
var dropCounter = 0 ;
var dropInterval = 1000;

function upDate(time = 0){       // to refresh the canvas
	const Dt = time - lasTime ;
	lasTime = time;
	dropCounter += Dt;
	if (dropCounter > dropInterval) {
		pieceDrop();
	}

	draw();

	requestAnimationFrame(upDate);
}

upDate();
