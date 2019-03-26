autowatch = 1;
outlets = 2;

var score = undefined;

function scoreLoaded() {
    const scoreDict = new Dict('score');
    const scoreDictObj = this.patcher.getnamed('score_dict');
    scoreDictObj.bang(); // to output into associated dict.view objects
    score = JSON.parse(scoreDict.stringify());
    getSettings();
    getSectionNames();
}

function getSettings() {
    const fakeSettings = {
        presets: {
            data_file: "experimental_score_001_presets.json",
            descriptions_file: "../data/experimental_score_001_preset_descriptions.json"
        }
    };
    if (score !== undefined) {
        outputSectionValues(score.__settings, 'settings');
    }
}

function getSectionNames() {
    var sectionNameList = [];
    if (score !== undefined) {
        sectionNameList = Object.keys(score.sections);
    }
    outlet(1, 'sectionNames', sectionNameList);
}

function outputSectionValues(section, path, excludedKeys) {
    if (path === undefined) {
        path = [];
    } else if (typeof path === 'string') {
        path = [path];
    }
    const objectKeys = Object.keys(section);
    for (var i = 0; i < objectKeys.length; i++) {
        const key = objectKeys[i];
        if (excludedKeys !== undefined && excludedKeys.indexOf(key) !== -1) {
            continue;
        }
        const subsection = section[objectKeys[i]];
        if (subsection instanceof Array) {
            outlet(0, [path.concat(key).join(' '), subsection.join(' ')]);
        }
        else if (subsection instanceof Object) {
            outputSectionValues(subsection, path.concat(key), excludedKeys);
        } else {
            if (typeof subsection === 'string') {
                subsection = '"' + subsection + '"';
            }
            outlet(0, [path.concat(key).join(' '), subsection].join(' '));
        }
    }
}

retrievePhrase.local = 1;
function retrievePhrase(sectionIdentifier, phraseIdentifier) {
    var phrase = undefined;
    if(phraseIdentifier === undefined) {
        phraseIdentifier = 0;
    }
    const section = retrieveSection(sectionIdentifier);
    if (section != undefined) {
        if (section.structure !== undefined && section.structure.phrases !== undefined) {
            var phraseIndex =  parseInt(phraseIdentifier);
            if(isNaN(phraseIndex)) {

            } else {
                if(phraseIndex < section.structure.phrases.length) {
                    phrase = section.structure.phrases[phraseIndex];
                    phrase.index = phraseIndex;
                }
            }
        }
    }
    return phrase;
}

function serializeRamp(ramp) {
    return (ramp.initial !== undefined ? ramp.initial + ', ' : '') +ramp.points.join(' ');
}

function getPhrase(sectionIdentifier, phraseIdentifier) {
    post('sectionIdentifier:', sectionIdentifier, '\n');
    const phrase = retrievePhrase(sectionIdentifier, phraseIdentifier);
    if (phrase !== undefined) {
        outlet(0, ['phrase id', sectionIdentifier, phrase.index, phrase.name].join(' '));
        if(phrase.ramps !== undefined) {
            const rampKeys = Object.keys(phrase.ramps);
            for(var i=0; i < rampKeys.length; i++) {
                const rampString = serializeRamp(phrase.ramps[rampKeys[i]])
                outlet(0, ['phrase', 'ramp', sectionIdentifier, phrase.name, rampKeys[i], rampString].join(' '));
            }
        }
    }
}

retrieveSection.local = 1;
function retrieveSection(sectionIdentifier) {
    var section = undefined;
    if (score !== undefined && score.sections !== undefined) {
        var numericValue = parseInt(sectionIdentifier);
        if (!isNaN(numericValue)) {
            sectionIdentifier = Object.keys(score.sections)[numericValue];
        } else {
            numericValue = Object.keys(score.sections).indexOf(sectionIdentifier);
        }
        section = score.sections[sectionIdentifier];
    }
    section.id = sectionIdentifier
    section.index = numericValue;
    return section;
}

function getSection(sectionIdentifier) {
    const section = retrieveSection(sectionIdentifier);
    if (section != undefined) {
        const currentSectionDict = new Dict('current_section');
        currentSectionDict.parse(JSON.stringify(section));
        outlet(0, 'section name ' + section.id);
        outlet(0, 'section index ' + section.index);
        outputSectionValues(section, 'section', ['phrases']);
        getPhrase(section.id);
    }
}

function hello() {
    post('hello\n');
    outlet(0, 'hello again');
}

function foobar() {
    const scoreDict = new Dict('score');
    const parsedDict = JSON.parse(scoreDict.stringify());
    post('parsedDict', parsedDict.__settings.presets.data_file, '\n');
    // for(let p in parsedDict) {
    //     post(`${p}: `. parsedDict[p], '\n');
    // }
    // post('parsedDict:', parsedDict, '\n');
    // const settings = scoreDict.get('__settings');
    // post('__settings:', settings, '\n');
    // const presets = settings.get('presets');
    // post('presets', presets, '\n');
    // post('data file', parsedDict.presets.dataFile, '\n');

}