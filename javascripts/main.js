$(document).ready(function() {
//variables
    let outputContainer = $("#heroContainer");
    let dataArray = [];
    let teams = [];
    let genders = [];
    let characters = [];
    let thisTeam = "";
    let thisTeamId = "";
    let domString = "";
    let counter = 0;

// promises, resolves getting json data functions, splits dataArray and calls writeDOM
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

//functions for matching team name with id, filling description, and wriing domString.
    const matchTeam = () => {
        for (let q = 0; q < teams.length; q++) {
            if (thisTeam == teams[q].name) {
                teamId = teams[q].id;
            }
        }
    };

    const fillDescription = () => {
        for (let i = 0; i < characters.length; i++) {
            if (characters[i].gender_id == genders[0].id && characters[i].description === "") {
                characters[i].description = "abcde fghij klmno pqrst uvwxy z";
            } else if (characters[i].gender_id == genders[1].id && characters[i].description === "") {
                characters[i].description = "1234567890";
            }
        }
    };

    const writeDomString = () => {
            domString = "";
        for (let r = 0; r < characters.length; r++) {
            if (characters[r].team_id == teamId) {
                if (counter % 4 === 0) {
                    domString += `<div class="row">`;
                }
                domString += `<div class="panel panel-default col-md-3 red"><div class="panel-heading">`;
                domString += `<h3 class="panel-title">${characters[r].name}</h3></div>`;
                domString += `<img src="${characters[r].image}" alt="${characters[r].name}" class="img-circle center-block border-${characters[r].gender_id}">`;
                domString += `<div class="panel-body">${characters[r].description}`;
                domString += `</div></div>`;
                counter++;
                if (counter % 4 === 0) {
                    domString += `</div>`;
                }
            }
        }
    };

//writes DOM of pages
    const writeDOM = () => {
        matchTeam();
        fillDescription();
        writeDomString();
        outputContainer.html(domString);
    };

// button click event, hides marvel image, calls dataGetter
    $(".btn").click((event) => {
        thisTeam = $(event.currentTarget)[0].innerHTML;
        $(".loadBrand").hide();
        dataGetter();
    });
});