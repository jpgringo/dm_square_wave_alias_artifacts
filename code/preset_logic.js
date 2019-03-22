autowatch = 1;

function loadPreset(presetIdentifier) {
    var presetIndex = undefined;
    const numericValue = parseInt(presetIdentifier);
    if (!isNaN(numericValue)) {
        presetIndex = numericValue;
    } else {
        const presetDescriptionsDict = new Dict('preset_descriptions');
        const parsedDict = JSON.parse(presetDescriptionsDict.stringify());
        const presetDescriptions = Object.keys(parsedDict);
        for (var prop in parsedDict) {
            if (parsedDict.hasOwnProperty(prop)) {
                if (parsedDict[prop][0] === presetIdentifier) {
                    presetIndex = parseInt(prop);
                    break;
                }
            }
        }
    }
    if (presetIndex !== undefined) {
        outlet(0, 'loadPreset', presetIndex);
    }
}