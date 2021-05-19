window.addEventListener('onload', function() {

	memorygame();

});

function memorygame() {

}

// select the start Game button 
document.querySelector(".control-buttons span").onclick = function () {
	
	// Prompt window to ask for name
	let yourName = prompt("What is Your Name ?");
	
	// Is name is empty
	if (yourName == null || yourName == '') {

		// Se name to unknown
		document.querySelector(".info-container .name span").innerHTML = 'Unknown';

	// Name is not empty
	} else {

	// Set name to your name
	document.querySelector(".info-container .name span").innerHTML = yourName;

	}

	// Rmove splash screen
	document.querySelector(".control-buttons").remove();

};

// Effect duration 
let duration = 1000;

// SElect blocks container
let blockcontainer = document.querySelector(".memory-game-blocks");

// Creat array from game blocks
let blocks = Array.from(blockcontainer.children);

// Creat range of keys
// let orderrange = [...Array(blocks.length).keys()];

let orderrange = Array.from(Array(blocks.length).keys());

// console.log(orderrange);
shuffle(orderrange);
// console.log(orderrange);

// Add order css property to game blocks 
blocks.forEach((block, index) => {

	block.style.order = orderrange[index];

	// add click event 
	block.addEventListener('click', function () {

		// trigger the flip block function
		flipblock(block);

	});

});


// Shuffle function 
function shuffle (array) {

	// setting vars 
	let current = array.length,
		temp,
		random;

	while (current > 0) {

		// get random number 
		random = Math.floor(Math.random() * current);

		// decrease length by one 
		current--;

		// [1] save current element in stash 
		temp = array[current];

		// [2] current element = random element 
		array[current] = array[random];

		// [3] random element = get element from stash 
		array[random] = temp;

	}

	return array;

}


// flip block function 
function flipblock (selectedblock) {

	// add class is-flipped
	selectedblock.classList.add('is-flipped');

	// collect all flip cards 
	let allflippedblocks = blocks.filter(flippedblock => flippedblock.classList.contains('is-flipped'));

	// if theres two selected blocks 
	if (allflippedblocks.length === 2) {

	// console.log('two flip selected');

	// stop clicking function 
	stopclicking();

	// check matched block function 
	checkmatchedblock(allflippedblocks[0], allflippedblocks[1] );

	}

}


// stop clicking function 
function stopclicking() {

	// add class no clicking on main container 
	blockcontainer.classList.add('no-clicking');

	setTimeout(() => {

		// remove class no-clicking after the duration 
		blockcontainer.classList.remove('no-clicking');

	}, duration);

	// setTimeout(function () {
	// 	blockcontainer.classList.remove('no-clicking');
	// }, 2000)

}


// check matched block 
function checkmatchedblock(firstblock, secondblock) {

	let triesElement = document.querySelector('.tries span');

	if (firstblock.dataset.technology === secondblock.dataset.technology) {

		firstblock.classList.remove('is-flipped');
		secondblock.classList.remove('is-flipped');

		firstblock.classList.add('has-matched');
		secondblock.classList.add('has-matched');

		// document.getElementById('success').play();

	} else {

		triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

		setTimeout(() => {

			firstblock.classList.remove('is-flipped');
			secondblock.classList.remove('is-flipped');

		}, duration);

		// document.getElementById('fail').play();

	}

}

