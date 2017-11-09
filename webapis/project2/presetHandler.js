// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const presetHandler = (requestType, presetArrayIndex, newPresetArray) => {
    let arr = [];
    let isValidIndex = (presetArrayIndex >=0 && presetArrayIndex < presets.length);
    
    if (requestType == 'GET') {
        if (isValidIndex) arr.push(200);
        else arr.push(404);
        
        arr.push(presets[presetArrayIndex]);
    }
    
    else if (requestType == 'PUT') {
       if (isValidIndex) arr.push(200);
        else arr.push(404);
        
        presets[presetArrayIndex] = newPresetArray;
        arr.push(presets[presetArrayIndex]);
    }
    
    else arr.push(400);
    
    return arr;
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
