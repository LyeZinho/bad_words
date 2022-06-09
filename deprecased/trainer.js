const natural = require('natural');
const brain = require('brain.js');
const fs = require("fs");
const path = require("path");

const network = new brain.NeuralNetwork(
    {
        hiddenLayers: [10, 10],
        learningRate: 0.01,
        activation: 'sigmoid'
    }
);

const badwords = require('./badwordslist.json');
const goodwords = require('./goodwordslist.json');

//Append goodwors and badwords
var rawdata = goodwords.concat(badwords);

console.log(rawdata);

function stem(str) {
    return natural.PorterStemmer.stem(str);
}

function tokenizer(str) {
    var tokenizer = new natural.WordTokenizer();
    return tokenizer.tokenize(str);
}

function createDictionary(rawdata){
    var tokenidedArray = rawdata.map(function(item){
        const tokens = item.input.split(' ')
        return tokens.map(token => natural.PorterStemmer.stem(token))
    })
    //return tokenidedArray in single string array
    return tokenidedArray.reduce((acc, cur) => acc.concat(cur), []);
}

var dictionary = createDictionary(rawdata);

function encode(str){
    /*
    Create one vector with 0 with length of dictionary~
    Verify for each tokenized string in str if it is in dictionary
    if it is, set the index of the tokenized string to 1
    if not just leave it as 0
    */
    var encoded = [];
    var tokens = tokenizer(str);
    for(var i = 0; i < dictionary.length; i++){
        if(tokens.includes(dictionary[i])){
            encoded.push(1);
        }else{
            encoded.push(0);
        }
    }
    return encoded;
}


function testEncode(){
    var encoded = encode("I am a bad person and I am a good person cum, pusy 2g1c");
    var encodedPath = path.join(__dirname, "encoded.json");
    fs.writeFileSync(encodedPath, JSON.stringify(encoded));
}

let encodedTrainingdata = rawdata.map(function(item){
    return {
        input: encode(item.input),
        output: item.output
    }
});

//Train with logging
network.train(encodedTrainingdata, {
    iterations: 20000,
    log: true,
    errorThresh: 0.005
});

const json = JSON.stringify(network.toJSON());
fs.writeFileSync("./model.json", json);
console.log("Model saved");