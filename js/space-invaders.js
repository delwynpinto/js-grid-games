document.addEventListener('DOMContentLoaded', ()=>{
	const squares = document.querySelectorAll('.grid div');
	const resultDisplay = document.querySelector('#result');

	let width = 15;
	let currentShooterIndex = 202;
	let currentInvaderIndex = 0;
	let alienInvadersTakenDown = [];
	let result = 0;
	let direction = 1;
	let invaderId;

	// Defining the alien invaders
	const alienInvaders = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      15,16,17,18,19,20,21,22,23,24,
      30,31,32,33,34,35,36,37,38,39
    ]

	// Drawing the alien invaders
	alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));

	// drawing the shooter
	squares[currentShooterIndex].classList.add('shooter');

	// Moving the shooter
	function moveShooter(e) {
		squares[currentShooterIndex].classList.remove('shooter');
		switch(e.keyCode) {
			// left arrow key
			case 37:
			// condition to check if the shooter is on the left end of the grid
			if(currentShooterIndex % width !== 0) {
				currentShooterIndex -= 1;
			}
			break;

			// right arrow key
			case 39:
			// condition to check if the shooter is on the right end of the grid
			if (currentShooterIndex % width < width -1) {
				currentShooterIndex += 1;
			}
			break;
		}
		squares[currentShooterIndex].classList.add('shooter');
	}

	document.addEventListener('keydown', moveShooter);

	// Moving the alien invaders
	function moveInvaders() {
		const leftEdge = alienInvaders[0] % width === 0;
		const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1;

		if( (leftEdge && direction === -1) || (rightEdge && direction === 1) ) {
			// Move the invaders down a row
			direction = width;
		}
		else if (direction === width) {
			if(leftEdge) {
				// Changing the direction, to make invaders go right
				direction = 1
			}
			else {
				// Changing direction, to make invaders go left
				direction = -1;
			}
		}

		for(let i =0; i <= alienInvaders.length -1 ; i++) {
			squares[alienInvaders[i]].classList.remove('invader');
		}

		for(let i =0; i <= alienInvaders.length -1; i++) {
			alienInvaders[i] += direction;
		}

		for(let i =0; i <= alienInvaders.length -1; i++) {
			if(!alienInvadersTakenDown.includes(i)) {
				squares[alienInvaders[i]].classList.add('invader');
			}		
		}

		// Conditions for Game Over
		if( squares[currentShooterIndex].classList.contains('invader','shooter') ){
			resultDisplay.textContent = 'Game Over';
			squares[currentShooterIndex].classList.add('boom');
			clearInterval(invaderId);
		}

		for (let i =0; i <= alienInvaders.length; i++) {
			if(alienInvaders[i] > (squares.length - (width-1)) ) {
				resultDisplay.textContent = 'Game Over';
				squares[currentShooterIndex].classList.add('boom');
				clearInterval(invaderId);
			}
		}
		// Winning Condition
		if(alienInvadersTakenDown.length === alienInvaders.length) {
			resultDisplay.textContent = 'You Win!'
			clearInterval(invaderId);
		}
	}

	invaderId = setInterval(moveInvaders, 500);

	// Shooting at the aliens
	function shoot(e) {
		let laserId;
		let currentLaserIndex = currentShooterIndex;
		// Move the laser from the shooter to the alien invader
		function moveLaser() {
			squares[currentLaserIndex].classList.remove('laser');
			currentLaserIndex -= width;
			squares[currentLaserIndex].classList.add('laser');
			if(squares[currentLaserIndex].classList.contains('invader')) {
				squares[currentLaserIndex].classList.remove('laser');
				squares[currentLaserIndex].classList.remove('invader');
				squares[currentLaserIndex].classList.add('boom');

				setTimeout(() => squares[currentLaserIndex].classList.remove('boom'),250);
				clearInterval(laserId);

				const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
				alienInvadersTakenDown.push(alienTakenDown);
				result++;
				resultDisplay.textContent = result;
			}

			if(currentLaserIndex < width) {
				clearInterval(laserId);
				setTimeout(()=> squares[currentLaserIndex].classList.remove('laser'), 100);
			}
		}

		switch(e.keyCode) {
			case 32:
			laserId = setInterval(moveLaser, 100);
			break;
		}
	}

	document.addEventListener('keyup', shoot)
});