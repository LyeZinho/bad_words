require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');
const fs = require('fs');
const path = require('path');

// The minimum prediction confidence.
const threshold = 0.9;

// Which toxicity labels to return.
const labelsToInclude = ['identity_attack', 'insult', 'threat'];

toxicity.load(threshold).then(model => {
    const sentences = ['you suck'];
    model.classify(sentences).then(predictions => {
        predictions.forEach(prediction => {
            console.log(prediction.label);
            console.log(prediction.results[0].match);
            console.log(prediction.results[0].probabilities);
        });
    });
});


