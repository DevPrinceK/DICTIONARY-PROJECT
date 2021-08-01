// Adding event listener to the search button
//document.getElementById('search-btn').addEventListener("click", fetchWord);

// fetch the data
async function fetchWord() {
    console.log("Fetch function is running");
    // fecthes data on speficied word
    let word = document.getElementById('input-word').value;
    console.log(`This is the entered word as returned by fnx: ${word}`);
    let wordJunk = await fetch(`https://wordsapiv1.p.mashape.com/words/example/examples`);

    // convert promise to json
    let wordData = await wordJunk.json();

    // displaying fetched data
    display(wordData);


};



// function to display items === for debugging
const display = (item) => console.log(item);