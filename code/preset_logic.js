autowatch = 1;

function loadPreset(presetIdentifier) {
    var presetIndex = undefined;
    const numericValue = parseInt(presetIdentifier);
    post('will load preset \'' + presetIdentifier + '\'\n');
    post('numeric value is \'' + numericValue + '\'\n');
    if (!isNaN(numericValue)) {
        presetIndex = numericValue;
    } else {
        const presetDescriptionsDict = new Dict('preset_descriptions');
        const parsedDict = JSON.parse(presetDescriptionsDict.stringify());
        post('parsedDict:', Object.keys(parsedDict).length, "\n");
        const presetDescriptions = Object.keys(parsedDict);
        for (var prop in parsedDict) {
            if (parsedDict.hasOwnProperty(prop)) {
                if (parsedDict[prop][0] === presetIdentifier) {
                    post(parsedDict[prop][0] + '\n');
                    presetIndex = parseInt(prop);
                    break;
                }
            }
        }
    }
    post('presetIndex = ' + presetIndex + '\n');
    if (presetIndex !== undefined) {
        outlet(0, 'loadPreset', presetIndex);
    }
}