document.addEventListener('DOMContentLoaded', ()=>{
	const squares = document.querySelectorAll('.grid div');
	const timeLeft = document.querySelector('#time-left');
	const result = document.querySelector('#result');
	const startBtn = document.querySelector('#button');
	const carsLeft = document.querySelectorAll('.car-left');
	const carsRight = document.querySelectorAll('.car-right');
	const logsLeft = document.querySelectorAll('.log-left');
	const logsRight = document.querySelectorAll('.log-right');

	const width = 9;
	let currentIndex = 76;
	let currentTime = 20;
	let timerId;

	// Rendering the frog on the starting point
	squares[currentIndex].classList.add('frog');

	// Moving the frog
	function moveFrog(e) {
		squares[currentIndex].classList.remove('frog');
		switch(e.keyCode) {

			// Left arrow key
			case 37:
			if(currentIndex % width !== 0 ) {
				currentIndex -= 1;
			}
			break;

			// Down Arrow Key
			case 38:
			if(currentIndex - width >= 0) {
				currentIndex -= width;
			}
			break;

			// Right Arrow Key
			case 39:
			if(currentIndex % width < width-1) {
				currentIndex += 1;
			}
			break;

			// Up Arrow Key
			case 40:
			if(currentIndex + width < width * width) {
				currentIndex += width;
			}
			break;
		}
		squares[currentIndex].classList.add('frog');
		win()
		lose()
	}

	// Moving cars
	function autoMoveCars() {
		carsLeft.forEach(carLeft => moveCarsLeft(carLeft));
		carsRight.forEach(carRight => moveCarsRight(carRight));
	}
	
	// Moving cars left in a time loop
	function moveCarsLeft(carLeft) {
		switch(true) {
			case carLeft.classList.contains('c1') :
			carLeft.classList.remove('c1');
			carLeft.classList.add('c2');
			break;

			case carLeft.classList.contains('c2') :
			carLeft.classList.remove('c2');
			carLeft.classList.add('c3');
			break;

			case carLeft.classList.contains('c3') :
			carLeft.classList.remove('c3');
			carLeft.classList.add('c1');
			break;
		}
	}

	// Moving cars right in a time loop
	function moveCarsRight(carRight) {
		switch(true) {
			case carRight.classList.contains('c1') :
			carRight.classList.remove('c1');
			carRight.classList.add('c3');
			break;

			case carRight.classList.contains('c2') :
			carRight.classList.remove('c2');
			carRight.classList.add('c1');
			break;

			case carRight.classList.contains('c3') :
			carRight.classList.remove('c3');
			carRight.classList.add('c2');
			break;
		}
	}

	// Moving logs
	function autoMoveLogs() {
		logsLeft.forEach(logLeft => moveLogsLeft(logLeft));
		logsRight.forEach(logRight => moveLogsRight(logRight));
	}

	// Moving logss left in a time loop
	function moveLogsLeft(logLeft) {
		switch(true) {
			case logLeft.classList.contains('l1') :
			logLeft.classList.remove('l1');
			logLeft.classList.add('l2');
			break;

			case logLeft.classList.contains('l2') :
			logLeft.classList.remove('l2');
			logLeft.classList.add('l3');
			break;

			case logLeft.classList.contains('l3') :
			logLeft.classList.remove('l3');
			logLeft.classList.add('l4');
			break;

			case logLeft.classList.contains('l4') :
			logLeft.classList.remove('l4');
			logLeft.classList.add('l5');
			break;

			case logLeft.classList.contains('l5') :
			logLeft.classList.remove('l5');
			logLeft.classList.add('l1');
			break;
		}
	}

	// Moving logs right in a time loop
	function moveLogsRight(logRight) {
		switch(true) {
			case logRight.classList.contains('l1') :
			logRight.classList.remove('l1');
			logRight.classList.add('l5');
			break;

			case logRight.classList.contains('l2') :
			logRight.classList.remove('l2');
			logRight.classList.add('l1');
			break;

			case logRight.classList.contains('l3') :
			logRight.classList.remove('l3');
			logRight.classList.add('l2');
			break;

			case logRight.classList.contains('l4') :
			logRight.classList.remove('l4');
			logRight.classList.add('l3');
			break;

			case logRight.classList.contains('l5') :
			logRight.classList.remove('l5');
			logRight.classList.add('l4');
			break;
		}
	}

	// Move the frog when it is sitting on a log moving left
	function moveWithLogLeft() {
		if(currentIndex >=27 && currentIndex < 35) {
			squares[currentIndex].classList.remove('frog');
			currentIndex += 1;
			squares[currentIndex].classList.add('frog');
		}
	}

	// Move the frog when it is sitting on a log moving left
	function moveWithLogRight() {
		if(currentIndex > 18 && currentIndex <= 26) {
			squares[currentIndex].classList.remove('frog');
			currentIndex -= 1;
			squares[currentIndex].classList.add('frog');
		}
	}

	// Rules to win the game
	function win() {
		if(squares[4].classList.contains('frog')) {
			result.innerHTML = "You Won!"
			squares[currentIndex].classList.remove('frog');
			clearInterval(timerId);
			document.removeEventListener('keyup', moveFrog);
		}
	}

	// Rules to lose the game
	function lose() {
		if( currentTime === 0 ||
			squares[currentIndex].classList.contains('c1') ||
			squares[currentIndex].classList.contains('l4') ||
			squares[currentIndex].classList.contains('l5')
		) {
			result.innerHTML = "You Lose!"
			squares[currentIndex].classList.remove('frog');
			clearInterval(timerId);
			document.removeEventListener('keyup', moveFrog);
		}
	}

	// Moving all pieces
	function movePieces() {
		currentTime--;
		timeLeft.innerHTML = currentTime;
		autoMoveCars();
		autoMoveLogs();
		moveWithLogLeft();
		moveWithLogRight();
		lose();
	}

	// Starting and pausing the game
	startBtn.addEventListener('click',()=>{
		if(timerId) {
			clearInterval(timerId);
		}
		else {
			timerId = setInterval(movePieces, 1000);
			document.addEventListener('keyup', moveFrog);
		}
	});

});