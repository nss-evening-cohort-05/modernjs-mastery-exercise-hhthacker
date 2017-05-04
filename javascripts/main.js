$(document).ready(function() {

    const outputContainer = $("#heroContainer");
    let dataArray = ;
    let thisTeam = "";

    //teams
    dataArray[0][0] //xmen
    dataArray[0][1] //avengers
    dataArray[0][2] //guardians of the galaxy

    //genders
    dataArray[1][0] //female
    dataArray[1][1] //male

    //characters
    dataArray[2].length //17
    dataArray[2][x].description
    dataArray[2][x].gender_id
    dataArray[2][x].team_id

    //print info
    dataArray[2][x].name
    dataArray[2][x].image
    dataArray[2][x].description

    //loop through team names and match with team id "thisTeam"
    //loop through character team_id and match with team id, push to new array
    //loop through new array characters and add border if gender_id and gender matches


    //accepts array, writes DOM of pages
    const writeDOM = () => {
        let domString = "";
        let counter = 0;
        console.log("in write dom", dataArray);
        for (let i = 0; i < dataArray.length; i++) {
            if (counter % 4 === 0) {
                domString += `<div class="row">`;
            }
            domString += `<div class="panel panel-default"><div class="panel-heading">`;
            domString += `<h3 class="panel-title">Panel title</h3></div>`;
            domString += `<div class="panel-body">${data[x].description}`;
            domString += `<img src="${data[x].image}" alt="${data[x].name}" class="img-circle">`;
            domString += `</div></div>`;
            //domString += ``;

            counter++;
            if (counter % 4 === 0) {
                domString += `</div>`;
            }

        }

        outputContainer.append(domString);
        // image displayed in circle with pink/blue border for female/male
        // if character lacks description, add based on gender
        // female: "abcde fghij klmno pqrst uvwxy z"
        // male: "1234567890"

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
                writeDOM();
            })
            .catch((loadError) => console.log(loadError));

    };


});
