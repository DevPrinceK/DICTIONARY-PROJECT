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

        // call the get definitions function
        //getDefinitions(wordData); // NOTE

        testDefinitions(wordData);

        // // displaying fetched data
        // display(typeof wordData[0].meanings);

        // // display content
        // display(wordData[0].meanings[0].definitions[0].definition);

    } else {
        display("No word entered");
    };


};

// // get definitions || Arrow function
// const getDefinitions = (data) => data.map((item) => item.meanings).map((sub - item) => sub - item.definitions).map((item) => item.meanings);

// get definitions
function getDefinitions(data) {
    let definitons = data.map((item) => item.meanings).map((member) => member.definitions).map((word) => word.definition);

    // display definitions
    display(definitons);
};


function testDefinitions(data) {
    let testDefines = data.map(member => member.meanings);

    // let testDefines2 = testDefines.map(item => item[0].definitions);
    let testDefines2 = testDefines.map(item => item.map(member => member.definitions));

    let actualDefinitions = testDefines2.map(word => word.map(item => item.definition));

    display(testDefines);
    display(testDefines2);
    display(actualDefinitions);
}

// function to display items === for debugging
const display = (item) => console.log(item);