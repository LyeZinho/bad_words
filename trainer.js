/*
Train the model
*/

const natural = require('natural');
const brain = require('brain.js');
const fs = require("fs");

const badwords = require('./badwordslist.json');
const goodwords = require('./goodwordslist.json');

const network = new brain.recurrent.LSTM();


function stem(str) {
    return natural.PorterStemmer.stem(str);
}

function tokenizer(str) {
    var tokenizer = new natural.WordTokenizer();
    return tokenizer.tokenize(str);
}

function createWordDictionary(words) {
    var wordDictionary = {};
    words.forEach(word => {
        var tokenizedWord = tokenizer(word.input);
        tokenizedWord.forEach(token => {
            wordDictionary[stem(token)] = word.output;
        });
    });
}

console.log(words);





// const model = data.map(item => ({
//     input: item.input,
//     output: item.output
// }));
// console.log(model);

// const training = network.train(model, {
//     iterations: 300,
//     log: (error) => console.log(error)
// });


// const json = JSON.stringify(network.toJSON());
// fs.writeFileSync("./model.json", json);
// console.log("Model saved");