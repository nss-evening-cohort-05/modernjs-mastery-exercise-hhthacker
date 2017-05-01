$(document).ready(function() {

	const outputContainer = $("#heroContainer");
	let dataArray = [];
	let	myTeams = [];
	let	myGenders = [];
	let	myCharacters = [];

	let thisTarget = "";
	let currentTeam = "";

//accepts array, writes DOM of pages
	const writeDOM = (data) => {
		let domString = "";
		let counter = 0;
		console.log("in write dom", dataArray);
		for (let i = 0; i < dataArray.length; i++){
			if (counter % 3 === 0) {
				domString += `<div class="row">`;
			}
			domString += `<div class="panel panel-default"><div class="panel-heading">`;
			domString += `<h3 class="panel-title">Panel title</h3></div>`;
			domString += `<div class="panel-body">${data[x].description}`;
			domString += `<img src="${data[x].image}" alt="${data[x].name}" class="img-circle">`;
			domString += `</div></div>`;
			//domString += ``;

			counter++;
			if (counter % 3 === 0) {
				domString += `</div>`;
			}

			// if (data[x].name === thisTarget) {
			// 	currentTeam.push(data[x].id);
			// 	console.log("meow", data);

			// }
		}

		outputContainer.append(domString);
		// image displayed in circle with pink/blue border for female/male
			// <img src="..." alt="..." class="img-circle">
		// 4 panels in each row, created with bootstrap row class

		// bootstrap panel for each character
			//  <div class="panel panel-default"><div class="panel-heading">
		 	//  <h3 class="panel-title">Panel title</h3></div>
		 	//  <div class="panel-body">Panel content</div></div>

	// if character lacks description, add based on gender
		// female: "abcde fghij klmno pqrst uvwxy z"
		// male: "1234567890"

	};



// button click event, hides marvel image, calls dataGetter
	$(".btn").click((event) => {
  		thisTarget = $(event.currentTarget)[0].innerHTML;
    	$(".loadBrand").hide();
    	dataGetter();
  	});

// promises, resolves getting json data functions, passes dataArray to writeDOM
	const dataGetter = () => {

		const loadTeams = () => {
			return new Promise((resolve, reject) => {
				$.ajax("./db/teams.json")
				.done((data1) => resolve(data1.teams))
				.fail((error1) => reject(error1));
			});
		};

		const loadGenders = () => {
			return new Promise((resolve, reject) => {
				$.ajax("./db/genders.json")
				.done((data2) => resolve(data2.genders))
				.fail((error2) => reject(error2));
			});
		};

		const loadCharacters = () => {
			return new Promise((resolve, reject) => {
				$.ajax("./db/characters.json")
				.done((data3) => resolve(data3.characters))
				.fail((error3) => reject(error3));
			});
		};

		Promise.all([loadTeams(), loadGenders(), loadCharacters()])
		.then((result) => {
			result.forEach((xhrResult) => {
				dataArray.push(xhrResult);
			});
			sortArray();

		})
		.catch((loadError) => console.log(loadError));


	  };

	const sortArray = () => {
		console.log("hi", dataArray);
		console.log("first", dataArray.length);
			for (var i = 0; i > dataArray.length; i++) {
				if (dataArray[i].name === "X-men" || "The Avengers" || "Guardians of the Galaxy") {
					myTeams.push(dataArray[i]);
				} else if (dataArray[i].type === "Male" || "Female") {
					myGenders.push(dataArray[i]);
				} else (myCharacters.push(dataArray[i]));
			}
			console.log("did it work", myTeams, myGenders, myCharacters);

	};

});
