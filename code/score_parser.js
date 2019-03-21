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

function outputSectionValues(section, path) {
    if(path === undefined) { 
        path = [];
    } else if(typeof path === 'string') {
        path = [path];
    }
    const objectKeys = Object.keys(section);
    for (var i = 0; i < objectKeys.length; i++) {
        const key = objectKeys[i];
        const subsection = section[objectKeys[i]];
        if(subsection instanceof Array) {
            outlet(0, [path.concat(key).join(' '), subsection.join(' ')]);
         }
        else if (subsection instanceof Object) {
            outputSectionValues(subsection, path.concat(key));
        } else {
            post('key \'' + key + '\': ' + subsection + ' (' + (typeof subsection) + ')\n');
            if(typeof subsection === 'string') {
                subsection = '"' + subsection + '"';
            }
            outlet(0, [path.concat(key).join(' '), subsection].join(' '));
        }
    }
}

function getSection(sectionName) {
    if (score !== undefined && score.sections !== undefined && score.sections[sectionName] !== undefined) {
        post('will parse and return section ' + sectionName + '\n');
        const currentSectionDict = new Dict('current_section');
        post('currentSectionDict', JSON.stringify(score.sections[sectionName]), '\n');
        // currentSectionDict.parse(score.sections[sectionName]);
        currentSectionDict.parse(JSON.stringify(score.sections[sectionName]));
        outputSectionValues(score.sections[sectionName], 'section');
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