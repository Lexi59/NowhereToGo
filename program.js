//currently the players can 1) not move 2) move on top of each other 3) sit forever trying to figure out a move
let size = 50;
let width = 70;
let height = 70;
let numNodes = 19;
let tbl = [[0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
			[1,1,0,1,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0],
			[0,1,1,0,1,0,1,0,0,1,1,0,0,0,0,0,0,0,0],
			[0,0,1,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0],
			[0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0],
			[0,0,0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,0],
			[0,0,0,0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0],
			[0,0,0,0,0,1,1,0,0,1,0,1,0,0,1,1,0,0,0],
			[0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0],
			[0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,0],
			[0,0,0,0,0,0,0,0,1,1,0,0,1,0,1,0,1,1,0],
			[0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,1,0,1,1],
			[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0]]

let bd; 
let activeBlockers = new Array();
let ply1, ply2;
let gameOver = false;
let playerTurn = 1;

function setup(){
	createCanvas(500,500);
	background(255);
	bd = new Board();
	ply1 = new Player(1);
    ply2 = new Player(2);
	ply1.turn1();
	ply2.turn1();
	playerTurn = 0;
}
function draw(){
	if (playerTurn == 1){
		ply1.play();
		playerTurn = 2;
	} else{
		ply2.play();
		playerTurn = 1;
	}
	if(gameOver == true){
		noLoop();
		return;
	}
	bd.show();
	for(var i = 0; i < bd.platforms.length; i++){
		stroke(0);
		strokeWeight(.5);
		fill(0);
		text(i, bd.platforms[i].x - 5,bd.platforms[i].y-10);
	}
	for(var j = 0; j < activeBlockers.length; j++){
		activeBlockers[j].show();
	}
	ply2.show();
	ply1.show();
}
function isPath(current, desired){
	if(current == desired){
		return true; 
	}
	var queue = new Queue();
	var visited = new Array(numNodes);
	for(var i = 0; i < visited.length; i++){
		visited[i] = false;
	}
	visited[current] = true;
	queue.enqueue(current);

	while(queue.qList.length > 0){
		current = queue.qList[queue.head];
		queue.dequeue();
		for(var i = 0; i < tbl[current].length; i++){
			if(tbl[current][i] == 1 && ply1.plat.id != i && ply2.plat.id != i){
				if(i == desired){
					return true;
				}
				if(!visited[i]){
					visited[i] = true;
					queue.enqueue(i);
				}
			}
		}
	}
	return false;
}
