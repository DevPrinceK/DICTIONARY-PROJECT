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

        // NOTE NOTE NOTE
        getDefinitions(wordData);

    } else {
        display("No word entered");
    };


};

// get definitions || also calls other helper functions
function getDefinitions(data) {
    let arrayOfDefinitons = []; // to store all definitions

    // contains data on meanings of the word
    let meanings = data[0].meanings;
    let testDefines = meanings.map(item => item.definitions);

    // extracts the word class || part of speach
    let wordClass = meanings.map(item => item.partOfSpeech);



    // contains data on the phonetics of the word
    let phonoText = data[0].phonetics[0].text // TODO

    let definitions = testDefines.map(item => item.map(item => item.definition)); // NOTE DEFINITIONS ARE HERE!

    // Looping through the multi-dimensional array to create a 1-d array of definitions
    for (let i = 0; i < definitions.length; i++) {
        for (let j = 0; j < definitions[i].length; j++) {
            arrayOfDefinitons.push(definitions[i][j]);
        }
    }


    //NOTE HELPER FUNCTIONS
    //NOTE HELPER FUNCTIONS

    // calls the function to render the definitions on the page
    renderDefinitions(arrayOfDefinitons);

    // renders the phonetics on the page
    getPhonetics(phonoText);

    // renders the searched word in question
    renderWord(data[0].word);

    // renders the word class
    renderWordClass(wordClass);


};

// render main word on page
function renderWord(word) {
    document.getElementById('main-word').innerHTML = word;
};

// Takes the Array of definitions and renders it on the page
function renderDefinitions(data) {
    // Loops through the array and creates an html element for each item in the array
    // making it positble to be rendered on the page
    document.getElementById('definitions').innerHTML = `
    <ul class="list-group">${data.map(item => `<li class="list-group-item">${item}</li>`)}</ul>
    `
}


function renderWordClass(wordClass) {
    // Loops through the array and creates an html element for each item in the array
    // making it positble to be rendered on the page
    document.getElementById('word-class').innerHTML = `
    <ul class="list-group">${wordClass.map(item => `<li class="list-group-item">${item}</li>`)}</ul>
    `
}



// get the phonetics
function getPhonetics(phonoText) {
    document.getElementById('phonoText').innerHTML = phonoText;
}

// 


const display = (item) => console.log(item);