// Adding event listener to the search button
document.getElementById('search-btn').addEventListener("click", fetchWord);

// fetch the data
async function fetchWord(event) {
    event.preventDefault();
    console.log("Fetch function is running");
    // fecthes data on speficied word
    let word = document.getElementById('input-word').value;
    if (word !== "") {
        console.log(`This is the entered word as returned by fnx: ${word}`);
        let wordJunk = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);

        // convert promise to json
        let wordData = await wordJunk.json();

        // testing for the extraction of the definitions
        //testFunction(wordData);

        // NOTE NOTE NOTE
        getDefinitions(wordData);

    } else {
        display("No word entered");
    };


};

// get definitions
function getDefinitions(data) {
    let arrayOfDefinitons = []; // to store all definitions

    let meanings = data[0].meanings;
    let testDefines = meanings.map(item => item.definitions);

    let definitions = testDefines.map(item => item.map(item => item.definition)); // NOTE DEFINITIONS ARE HERE!

    // Looping through the multi-dimensional array to create a 1-d array of definitions
    for (let i = 0; i < definitions.length; i++) {
        for (let j = 0; j < definitions[i].length; j++) {
            arrayOfDefinitons.push(definitions[i][j]);
        }
    }

    display(arrayOfDefinitons);

    // calls the function to render the definitions on the page
    testFunction(arrayOfDefinitons);
};



// for testing the extraction of useful data
function testFunction(data) {
    // document.getElementById('definitions').innerHTML = `
    //      <ul class="list-group">
    //      ${data.map(function(definition){
    //          return ` <li class="list-group-item">${definition}</li>`
    //      }).join("")}
    //     </ul>
    // `

    // TRIAL 2 // NOTE
    document.getElementById('definitions').innerHTML = `
    <ul class="list-group">${data.map(item => `<li class="list-group-item">${item}</li>`)}</ul>
    `

    // // TRIAL 3 // NOTE
    // document.getElementById('definitions').innerHTML = `
    //     <select onchange="getOtData(this.value)">
    //         <option selected>Choose A Country</option>
    //         ${data.map(function(definition){
    //         return `<option>${definition}</option>`
    //         }).join("")}
    //     </select>
    //     `


    // test
    display(data);

}



const display = (item) => console.log(item);