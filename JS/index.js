// Adding event listener to the search button
document.getElementById('search-btn').addEventListener("click", fetchWord);

// interim handler for the audio pronunciation functionality
document.getElementById('phono-audio').addEventListener("click", fetchWord);

// set favourite word
document.getElementById('fav-btn').addEventListener("click", setFavourite);

//
var audioFile;


// fetch the data
async function fetchWord(event) {
    // preventing the default button event
    event.preventDefault();

    // wrapping the fetch inside a try-except block to catch invalid words
    try {
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
            getAudio("https://lex-audio.useremarkable.com/mp3/example_us_1.mp3");
        };

    } catch (error) {
        console.log(error.name);
        // IF WORD IS NOT FOUND
        if (error.name == "TypeError") {
            let notApplicable = "Not Applicable";
            let word = document.getElementById('input-word').value;
            document.getElementById('main-word').innerHTML = word;
            document.getElementById('word-class').innerHTML = notApplicable;
            document.getElementById('synonym').innerHTML = notApplicable;
            document.getElementById('phonoText').innerHTML = notApplicable;
            document.getElementById('definitions').innerHTML = notApplicable;
            alert(`Sorry! ${word} not found! Try another word`);
        }
    }


};


// get definitions || also calls other helper functions
function getDefinitions(data) {
    let arrayOfDefinitons = []; // to store all definitions

    let arrayOfSynonyms = []; // to store all synonyms

    // contains data on meanings of the word
    let meanings = data[0].meanings;
    let testDefines = meanings.map(item => item.definitions);

    // extracts the word class || part of speach
    let wordClass = meanings.map(item => item.partOfSpeech);

    // contains data on the phonetics of the word
    let phonoText = data[0].phonetics[0].text; // TODO

    // AUDIO PHONETICS / pronunciation
    let phonoAudio = data[0].phonetics[0].audio;

    //let audioFile = phonoAudio;

    // NOTE DEFINITIONS ARE HERE!
    let definitions = testDefines.map(item => item.map(item => item.definition));

    // // extracts the synonyms if any
    let synonyms = testDefines.map(item => item.map(function (item) {
        if (item.hasOwnProperty("synonyms")) {
            return [item.synonyms];
        }
    }));

    // Looping through the multi-dimensional array to create a 1-d array of synonyms
    for (let i = 0; i < synonyms.length; i++) {
        for (let j = 0; j < synonyms[i].length; j++) {
            if (synonyms[i][j] !== undefined) {
                arrayOfSynonyms.push(synonyms[i][j]);
            }
        }
    }

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

    // render synonyms
    renderSynonyms(arrayOfSynonyms);

    // plays the audio pronunciation of the word
    getAudio(phonoAudio);

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

// renders the part of speach of the word
function renderWordClass(wordClass) {
    // Loops through the array and creates an html element for each item in the array
    // making it positble to be rendered on the page
    document.getElementById('word-class').innerHTML = `
    <ul class="list-group">${wordClass.map(item => `<li class="list-group-item">${item}</li>`)}</ul>
    `
}

//
function renderSynonyms(synonyms) {
    // Loops through the array and creates an html element for each item in the array
    // making it positble to be rendered on the page
    document.getElementById('synonym').innerHTML = `
    <ul class="list-group">${synonyms.map(item => `<li class="list-group-item">${item}</li>`)}</ul>
    `
}

// get the phonetics
function getPhonetics(phonoText) {
    document.getElementById('phonoText').innerHTML = phonoText;
}

// when audio button is clicked
document.getElementById('phono-audio').addEventListener("click", getAudio(audioFile));

// get audio pronunciation
function getAudio(phonoAudio) {
    let audio = new Audio(phonoAudio);
    // plays audio
    audio.play();

    // resets audio time so it can be replayed when needed
    audio.currentTime = 0;
}

// set favourite words
function setFavourite() {
    let date = new Date.now();
    document.getElementById('main-word').textContent;

    // storing the favourite word in a  local storage
    localStorage.setItem(date, document.getElementById('main-word').textContent);

}


function renderFavourite() {
    //
}

const display = (item) => console.log(item);