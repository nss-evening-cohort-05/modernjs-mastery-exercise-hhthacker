$(document).ready(function() {

//accepts array, writes DOM of pages
	const writeDOM = (dataArray) => {
		let domString = "";
		console.log("i'm in the dom writer function", dataArray);

	// writeDOM function should write everything to DOM
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
  		console.log($(event.currentTarget));
    	$(".loadBrand").hide();
    	dataGetter();
  	});


// promises, resolves getting json data functions, passes dataArray to writeDOM
	const dataGetter = () => {
		const dataArray = [];

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




		loadTeams().then((teamData) => {
			teamData.forEach((teams) => {
				dataArray.push(teams);
				//data.value="teams";
			});
			return loadGenders();
		}).then((genderData) => {
			genderData.forEach((gender) => {
				dataArray.push(gender);
			});
			return loadCharacters();
		}).then((characterData) => {
			characterData.forEach((character) => {
				dataArray.push(character);
					writeDOM(dataArray);
			});
		});
};

});
