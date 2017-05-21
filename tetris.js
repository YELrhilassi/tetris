const canvas = document.getElementById('Tetris');
const context = canvas.getContext('2d');

const canvs = document.getElementById('Tetris2');
const ctx = canvs.getContext('2d');


context.scale(20,20);
ctx.scale(20,20);
const pointer = {
	pos: {x: 9, y: 0},
	piece: null,
}


function creatPiece(type) {
	if (type == 'T') {
		return [
			[0, 0, 0],
			[3, 3, 3],
			[0, 3, 0]
		];
	}else if (type == 'J') {
		return [
			[0, 0, 0],
			[9, 9, 9],
			[0, 0, 9]
		];
	}else if (type == 'L') {
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

function shuffle(){
	var array = ['I','L','J','Z','S','O','T'];
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




var pice1 = '';
var pice2 = '';
var _m = 0 ;
function picking(){
	var temp = generate();
	if (_m == 0 && pice1 !== '') {
		_m++;
		pice2 = generate();
		while (pice2 == pice1){
			pice2 = generate();
		}
		   // next(pice2);
		  console.log(pice2);
		return pice1;
	}else if (_m == 1 && pice2 !== '') {
		_m--;
		pice1 = generate();
		while(pice1 == pice2){
			pice1 = generate();
		}
		   // next(pice1);
		  console.log(pice1);
		return pice2;
	}else if (pice1 == '') {
		pice1 = generate();
		return temp;
	 }
}



// const piecess = ['I','L','J','Z','S','O','T'];
var n = 9;
function generate(){
	var pieces = shuffle (pieces);
	// pieces = shuffle (pieces);
	n--;
	if (n == 0) {
		n = 7;
	}
	var l = Math.floor((Math.random() * n)  );
	 // var q = Math.floor((Math.random() * n)  );
	 // var b = Math.floor((Math.random() * n)  );
	 // var c = Math.floor((Math.random() * n)  );
	 // var d = Math.floor((Math.random() * n)  );
	pieces[l] = 0 ;
	 // pieces[q] = 0 ;
	 // pieces[b] = 0 ;
	 // pieces[c] = 0 ;
	 // pieces[d] = 0 ;
	// pieces[b] = 0 ;

	// console.log(pieces);

	var x = Math.floor((Math.random() * 7) );
	while (pieces[x] == 0){
		x = Math.floor((Math.random() * 7) );
	}
 	
	return pieces[x];
}

function piecePick(){
	// var pieces = []; 
	// n--;
	// if (n == 1) {
	// 	n = 7;
	// }
	// pieces = shuffle(piecess);
	// var x = Math.floor((Math.random() * 7) + 0 );
	pointer.piece = creatPiece(picking());
	pointer.pos.y = 0;
	pointer.pos.x = Math.floor((Math.floor(20/2)) - (Math.floor(pointer.piece[0].length) / 2));
}

function draw(){

	context.fillStyle = '#000';
	context.fillRect( 1, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = '#000';
	ctx.fillRect( 0, 0, canvs.width, canvs.height);

	drawPiece(grid, {x: 0, y: 0});
	drawPiece(pointer.piece, pointer.pos);
	  next(pice1, pice2);

}

const coloring = [
	null,
	null,
	null,
	'#FF7F24',
	'#9A32CD',
	'#EEEE00',
	'#00CDCD',
	'#EE1289',
	'#EE2C2C',
	'#436EEE',


];


function nextyox(pice){
	if (pice[1][1] == 3) {
		return 0.5;
	}
}

function next(pice1, pice2){
	 var a = creatPiece(pice1);
	 var b = creatPiece(pice2);
	
	 if (_m == 0) {
	 	for (var j = 0; j < a.length; j++) {
			for (var i = 0; i < a[j].length; i++) {
				if (a[j][i]) {
				ctx.fillStyle = coloring[a[j][i]];
				ctx.fillRect( i + nextyox(a), j+nextyox(a), 0.95, 0.95);
				}
			}
		}



	 }


	else if (_m == 1 ) {
		for (var j = 0; j < b.length; j++) {
			for (var i = 0; i < b[j].length; i++) {
				if (b[j][i]) {
				ctx.fillStyle = coloring[b[j][i]];
				ctx.fillRect( i, j, 0.95, 0.95);
				}
			}
		}

	}
		
	
}


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
	outer:for (var j = grid.length-2; j > 1; j--) {
			for (var i = 1; i < grid[j].length-1; i++) {

				if (grid[j][i] == 0) {
					console.log(grid[j][i]);
					continue outer;
				}
			}
			
			console.log(grid[j][i]);
			temGrid = grid.splice(j, 1)[0].fill(0);
			grid.unshift(temGrid);	
			grid[0][0] = 2 ;
			grid[0][19] = 2;
			mG = 0;
					
		}
}



function pieceDrop(){
	
	pointer.pos.y++;
	erase (grid);		
	if (collide(grid, pointer)){
		pointer.pos.y--;
		merge(grid, pointer);
		piecePick();
	}
	dropCounter = 0 ;
}

var lasTime = 0;
var dropCounter = 0 ;
var dropInterval = 500;


function upDate(time = 0){

	draw();
	const Dt = time - lasTime ;
	lasTime = time;
	dropCounter += Dt;
	if (dropCounter > dropInterval) {
		pieceDrop();
	}
	requestAnimationFrame(upDate);
}
piecePick();
upDate();
