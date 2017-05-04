$(document).ready(function() {

    const outputContainer = $("#heroContainer");
    // const buttonContainer = $("#buttonBucket");
    let dataArray = [];
    let teams = [];
    let genders = [];
    let characters = [];
    let thisTeam = "";
    let thisTeamId = "";
    let domString = "";


    // const generateBtn = () => {
    //     let buttonString = "";
    //     for (var x = 0; x < dataArray[0].length; x++) {
    //         buttonString += `<button id="${dataArray[0][x]}" type="button" class="btn btn-primary navbar-btn">${dataArray[0][x]}</button>`;
    //     }
    //     buttonContainer.html(buttonString);
    // };


    // image displayed in circle with pink/blue border for female/male
    // if character lacks description, add based on gender
    // female: "abcde fghij klmno pqrst uvwxy z"
    // male: "1234567890"


    //loop through team names and matches with button name
    const matchTeam = () => {
        for (let q = 0; q < teams.length; q++) {
            if (thisTeam == teams[q].name) {
                teamId = teams[q].id;
            }
        }
    };

    const styleCharacters = () => {


    };

    const writeDomString = () => {
        counter = 0;
        for (let r = 0; r < characters.length; r++) {
            if (characters[r].team_id == teamId) {
                if (counter % 4 === 0) {
                    domString += `<div class="row">`;
                }
                domString += `<div class="panel panel-default"><div class="panel-heading">`;
                domString += `<h3 class="panel-title">Panel title</h3></div>`;
                domString += `<div class="panel-body">${characters[r].description}`;
                domString += `<img src="${characters[r].image}" alt="${characters[r].name}" class="img-circle">`;
                domString += `</div></div>`;
                //domString += ``;

                counter++;
                if (counter % 4 === 0) {
                    domString += `</div>`;
                }

            }
        }

    };

    //accepts array, writes DOM of pages
    const writeDOM = () => {
        matchTeam();
        styleCharacters();
        writeDomString();
        outputContainer.append(domString);
    };


    // button click event, hides marvel image, calls dataGetter
    $(".btn").click((event) => {
        thisTeam = $(event.currentTarget)[0].innerHTML;
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
                teams = dataArray[0];
                genders = dataArray[1];
                characters = dataArray[2];
                writeDOM();
            })
            .catch((loadError) => console.log(loadError));
    };
});
