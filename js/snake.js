document.addEventListener('DOMContentLoaded',()=>{
	const squares = document.querySelectorAll('.grid div');
	const scoreDisplay = document.querySelector('span');
	const startBtn = document.querySelector('.start');

	const width = 10;
	let currentIndex = 0 //first div in the grid
	let appleIndex = 0;
	let currentSnake = [2,1,0]; //div with value of 2 is the head, q being the body and value of 0 is the tail

	let direction = 1;
	let score = 0;
	let speed = 0.9;
	let intervalTime = 0;
	let interval = 0;

	// Start and restart the game
	function startGame() {
		currentSnake.forEach(index => squares[index].classList.remove('snake'));
		squares[appleIndex].classList.remove('apple');
		clearInterval(interval);
		score = 0;
		randomApple()
		direction = 1;
		scoreDisplay.innerText = score;
		intervalTime = 1000;
		currentSnake = [2,1,0];
		currentIndex = 0;
		currentSnake.forEach(index => squares[index].classList.add('snake'));
		interval = setInterval(moveOutcomes, intervalTime);
	}

	// Handles outcomes of all snake movement
	function moveOutcomes() {

		// If snake hits any wall or itself
		if(
			( currentSnake[0] + width >= (width*width) && direction === width ) || //if snake hits the bottom
			( currentSnake[0] % width === width - 1 && direction === 1 ) || //if snake hits right wall
			( currentSnake[0] % width === 0 && direction === -1 ) || //if snake hits left wall
			( currentSnake[0] - width < 0 && direction === -width ) || //if snake hits the top
			( squares[currentSnake[0] + direction].classList.contains('snake') ) //if snake hits itself
		) {
			return clearInterval(interval);
		}

		const tail = currentSnake.pop();
		squares[tail].classList.remove('snake');
		currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head of the array

		// When snake gets the apple
		if(squares[currentSnake[0]].classList.contains('apple')) {
			squares[currentSnake[0]].classList.remove('apple');
			squares[tail].classList.add('snake');
			currentSnake.push(tail);
			randomApple();

			score++;
			scoreDisplay.innerText = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveOutcomes, intervalTime);
		}
		squares[currentSnake[0]].classList.add('snake');
	}

	// Generate new apple once it is eaten
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * squares.length);
		} while(squares[appleIndex].classList.contains('snake')); //making sure apples dont appear on the snake
		squares[appleIndex].classList.add('apple');
	}

	// assigning functions to keycodes
	function control(e) {
		squares[currentIndex].classList.remove('snake'); //rmeoving snake class for all squares

		if(e.keyCode === 39) {
			// right arrow key, snake will go right by one
			direction = 1;
		}
		else if(e.keyCode === 38) {
			// up arrow key, snake will move up one
			direction = -width;
		}
		else if(e.keyCode === 37) {
			// left arrow key
			direction = -1;
		}
		else if(e.keyCode === 40) {
			// down arrow key
			direction = +width;
		}
	}

	document.addEventListener('keyup', control);
	startBtn.addEventListener('click', startGame);


});