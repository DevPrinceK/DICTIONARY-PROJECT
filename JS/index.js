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
        testDefinitions(wordData);

        //getDefinitions(wordData);

    } else {
        display("No word entered");
    };


};

// // get definitions || Arrow function
// const getDefinitions = (data) => data.map((item) => item.meanings).map((sub - item) => sub - item.definitions).map((item) => item.meanings);

// get definitions
function getDefinitions(data) {
    let arrayOfDefinitons = [];
    let meanings = data[0].meanings;
    let testDefines = meanings.map(item => item.definitions);

    let definitions = testDefines.map(item => item.map(item => item.definition)); // NOTE DEFINITIONS ARE HERE!

    // Looping through the multi-dimensional array to create a 1-d array of definitions
    for (let i = 0; i < definitions.length; i++) {
        for (let j = 0; j < definitions[i].length; j++) {
            arrayOfDefinitons.push(definitions[i][j]);
        }
    }

};


function testDefinitions(data) {

}