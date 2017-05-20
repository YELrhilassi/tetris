const canvas = document.getElementById('Tetris');
const context = canvas.getContext('2d');



context.scale(20,20);
const pointer = {
	pos: {x: 9, y: 0},
	piece: creatPiece('S'),
}


function creatPiece(type) {
	if (type == 'T') {
		return [
			[0, 0, 0],
			[3, 3, 3],
			[0, 3, 0]
		];
	}else if (type == 'L') {
		return [
			[0, 0, 0],
			[9, 9, 9],
			[0, 0, 9]
		];
	}else if (type == 'J') {
		return [
			[0, 0, 0],
			[5, 5, 5],
			[5, 0, 0]
		];
	}else if (type == 'I') {
		
		return [
			[0, 4, 0, 0],
			[0, 4, 0, 0],
			[0, 4, 0, 0],
			[0, 4, 0, 0]
		];
	}else if (type == 'O') {
		return [
			[6, 6],
			[6, 6],
		];
	}else if (type == 'S') {
		// pointer.coloor = 'orange';
		return [
			[0, 7, 7],
			[7, 7, 0],
			[0, 0, 0]
		];
	}else if (type == 'Z') {
		return [
			[8, 8, 0],
			[0, 8, 8],
			[0, 0, 0]
		];
	}
}

function shuffle(array){
	var currentIndex = array.length;
	var randomIndex = 0;
	var temValue = 0;

	while (currentIndex !== 0){
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex-- ;

		temValue = array[currentIndex];
		array[currentIndex ] = array[randomIndex];
		array[randomIndex] = temValue ;
	}
	return array;
}


var piecess = ['I','L','J','Z','S','O','T'];
var n = 7;

function piecePick(piecess){
	var pieces = []; 
	n--;
	if (n == 1) {
		n = 7;
	}
	pieces = shuffle(piecess);
	pieces.slice(n);
	var x = Math.floor((Math.random() * 7) + 0 );
	pointer.piece = creatPiece(pieces[x]);
	pointer.pos.y = 0;
	pointer.pos.x = Math.floor((Math.floor(20/2)) - (Math.floor(pointer.piece[0].length) / 2));
}

function draw(){

	context.fillStyle = '#000';
	context.fillRect( 1, 0, canvas.width, canvas.height);
	
	
	drawPiece(grid, {x: 0, y: 0});
	drawPiece(pointer.piece, pointer.pos);
 
}

const coloring = [
	null,
	null,
	null,
	'green',
	'red',
	'yellow',
	'orange',
	'violet',
	'pink',
	'blue',


];



function drawPiece(piece,offset){
	for(var j = 0; j < piece.length; j++ ){
		for (var i = 0; i < piece[j].length; i++) {
			if (piece[j][i] == 3 || piece[j][i] == 4 || piece[j][i] == 5 ||piece[j][i] == 6 ||piece[j][i] == 7 ||piece[j][i] == 8||piece[j][i] == 9){
				context.fillStyle = coloring[piece[j][i]];
				context.fillRect( i + offset.x,
								  j + offset.y, 0.95, 0.95);
			}

		}
	}
}


function pieceMove(dire){
	pointer.pos.x += dire ;
	
	for (var j = 0; j < pointer.piece.length; j++){ 
		for (var i = 0; i < pointer.piece[j].length; i++) {
			if (pointer.piece[j][i] && grid[j + pointer.pos.y][i + pointer.pos.x]){
				pointer.pos.x -= dire ;	
			}

		}
	}
}


function testing(grid, pointer){
	for (var j = 0; j < pointer.piece.length; j++){ 
		for (var i = 0; i < pointer.piece[j].length; i++) {
			if (pointer.piece[j][i] && grid[j + pointer.pos.y][i + pointer.pos.x]){
				return true;	
			}

		}
	}
}

function pieceRotate(dir){
	const pos = pointer.pos.x;
	var offset = 1;
	rotate(pointer.piece, dir);	
	while(collide(grid, pointer)){
		pointer.pos.x += offset;
		offset = -(offset + (offset > 0 ? 1 : -1));
		if (offset > pointer.piece[0].length) {
			rotate(pointer.piece, -dir);
			pointer.pos.x = pos;
			return;
		}

	}

				
		
}

document.addEventListener("keydown", keyPressed );
function keyPressed(event){
	if (event.keyCode == 37 ) {
		//left
		pieceMove(-1);
			// pointer.pos.x--;
	}else if (event.keyCode == 39) {
		//right
		pieceMove(1);
		// pointer.pos.x ++;
	}else if (event.keyCode == 40) {
		//down
		pieceDrop();
	}else if (event.keyCode == 38) {
		//rotate right
		pieceRotate(1);
	}else if (event.keyCode == 83) {
		//rotate left
		pieceRotate(-1);
	}

}


function rotate (piece, dir) {
	for (var j = 0; j < piece.length; j++){
		for(var i = 0; i < j; i++ ){

			[
				piece[j][i],
				piece[i][j]
			] = [

				piece[i][j],
				piece[j][i]
			];
		}
	}

	if (dir > 0) {
		for(var j = 0; j < piece.length; j++){
			piece[j].reverse();
		}
	}else {
		piece.reverse();
	}
}


const grid = createGid( 20, 28);

function createGid( w, h){ //creat a grid , so we can save the pieces 
	const _grid = [];

	for (var i = 0; i < h; i++) {
		_grid.push(new Array(w).fill(0));
		_grid[i][0] = 2;
		_grid[i][w-1] = 2;
	}

	// while(h--){
	// 	var j = 0;
	// 	_grid.push(new Array(w).fill(0));
	// 	_grid[j][0] = 2;
	// 	_grid[j][w] = 2;
	// 	j++
	// }
	_grid.push(new Array(w).fill("-"))
	return _grid
}


function merge(grid, pointer){
	for (var j = 0; j < pointer.piece.length; j++){ 
		for (var i = 0; i < pointer.piece[j].length; i++) {
			if (pointer.piece[j][i]) {
				grid[j + pointer.pos.y][i + pointer.pos.x] = pointer.piece[j][i];
			}		
		}
	}
}


function collide(grid, pointer){
	for (var j = 0; j < pointer.piece.length; j++){ 
		for (var i = 0; i < pointer.piece[j].length; i++) {
			if (pointer.piece[j][i] && grid[j + pointer.pos.y][i + pointer.pos.x]){
					
						console.log("collide");
						return true;		
			}
		}
	}
  return false;
}






function erase (grid) {
	var temGrid = [];
	outer:for (var j = grid.length - 2; j > 1; j--) {
		var mult = 1 ;
		for (var i = 1; i < grid[j].length-1; i++) {
			
			// mult *= grid[j][i];

			if (grid[j][i] == 0) {

				continue outer;
			}	
		}
		temGrid = grid.splice(j, 1)[0].fill(0);
		grid.unshift(temGrid);	
	}
}



function pieceDrop(){
	
	pointer.pos.y++;
	if (collide(grid, pointer)){
		pointer.pos.y--;
		merge(grid, pointer);
		piecePick(piecess);
		erase (grid);		
	}
	dropCounter = 0 ;
}

var lasTime = 0;
var dropCounter = 0 ;
var dropInterval = 500;


function upDate(time = 0){       // to refresh the canvas
	draw();
	const Dt = time - lasTime ;
	lasTime = time;
	dropCounter += Dt;
	if (dropCounter > dropInterval) {
		pieceDrop();
	}

	requestAnimationFrame(upDate);
}
upDate();
