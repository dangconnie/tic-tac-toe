// 1. Set up the board
// 2. User should be able to click a box and a mark shows up
// 	-put an onclick in the first square
// 	-when user clicks, call function that puts an x in the box
// MILESTONE
// 3. Put an X on the square.
// 4. Keep track of who's turn it is.
// 5. When a square is clicked, put the symbol, and change who's turn it is.
// 6. Keep player from overwriting a square
// 7. We need a win check...



// Make a function to make square change
var whosTurn = 1;//Init whosTurn to player 1.
var player1Squares = [];
var player2Squares = [];
var someoneWon = false; //make it so that only one person can win. if this variable is false, we can start the game.

//make a button to play against the computer to set computerPlayer to true to start the game. It needs to start off as false.
var computerPlayer = true;

// Set up winner's array
var winningCombos = [
	['A1', 'B1', 'C1'], //row1
	['A2', 'B2', 'C2'], //row2
	['A3', 'B3', 'C3'], //row3
	['A1', 'A2', 'A3'], //column1
	['B1', 'B2', 'B3'], //column2
	['C1', 'C2', 'C3'], //column3
	['A1', 'B2', 'C3'], //diag1
	['A3', 'B2', 'C1']  //diag2

];

console.log(winningCombos);

function markSquare(currentSquare){
	//console.log(square.id);
	if((currentSquare.innerHTML === "X") || (currentSquare.innerHTML === "O")){
		//console.log("Someone is there. Stop cheating.");
		return "taken";
	}else if(someoneWon){
		console.log("Someone already won!");
	}else{
		if(whosTurn === 1){
			currentSquare.innerHTML = "X";
			whosTurn = 2;
			player1Squares.push(currentSquare.id);
			checkWin(1, player1Squares);
			if(computerPlayer){
				computerMove();
			}
		} else{
			//computer would be player 2 and needs to be called at the end of checkWin(1, player1Squares). Computer needs to randomly select a square.
			currentSquare.innerHTML = "O";
			whosTurn = 1;
			player2Squares.push(currentSquare.id);
			checkWin(2, player2Squares);
		}
	
	}
}

// This is how the player can play against the computer
function computerMove(){
	//Go find a randome square
	var needASquare = true;
	var squareDivs = document.getElementsByClassName('square');
	// Find a random number between 0 and 8 (array starts at 0) from the array. Math.random generates number between 0 and 1. We need the following lines to keep running until an open ssquare is found.
	while(needASquare){
		var randomNumber = (Math.ceil(Math.random() * 8)) + 1;
		var randomSquare = squareDivs[randomNumber];
		// call markSquare function with the randomSquare chosen. it will send a square up to a random square that the computer has tried. if it is taken, it will return "taken"
		isTaken = markSquare(randomSquare);
		console.log(isTaken);
		if(isTaken !== "taken"){
			needASquare = false;
		}
	}
}

function checkWin(whoJustWent, currentPlayerSquares){
	//currentPlayerSquares sends who array
	//Outer loop
	for (var i=0; i<winningCombos.length; i++){
		//Inner loop
		var rowCount = 0;
		for (var j=0; j<winningCombos[i].length; j++){
			//console.log(winningCombos[i][j]);

			//check to see if there are matches between player1square and player2square arrays and winning combo array
			//passed on currentPlayersSquares array 
			var winningSquare = winningCombos[i][j];
			if (currentPlayerSquares.indexOf(winningSquare) > -1){
				//Player has this square somewhere
				rowCount++;
			}
		}
		if(rowCount === 3){
			// Player had all 3 of these J's. Win.
			console.log("Player " + whoJustWent + " won!");
			gameOver(whoJustWent, winningCombos[i]);
			break;
		}
		//console.log("Combo completed");
	}
}
function gameOver(whoJustWon, winningCombo){
		var message = "Congrats to player " + whoJustWon + ". You just won with " + winningCombo;
		document.getElementById('message').innerHTML = message;
		for(var i=0; i<winningCombo.length; i++){
			document.getElementById(winningCombo[i]).className += ' winning-square';
		}
		someoneWon = true;
}