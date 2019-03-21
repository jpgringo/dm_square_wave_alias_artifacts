const maxApi = require('max-api');
const fs = require('fs');
// const parser = require('note-parser');
// const RootConnection = require('./connections/root-connection');

let currentScoreData = undefined;

// const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// const rootConnection = RootConnection.createRootConnection();

// rootConnection.createConnection();
// // rootConnection.on('newGameCreated', newGameHandler);
// // rootConnection.on('gameStateUpdated', gameStateUpdateHandler);

maxApi.addHandler('readScore', filename => {
  currentScoreData = JSON.parse(fs.readFileSync(`../data/${filename}`));
  if(currentScoreData !== undefined) {
    maxApi.setDict('score', currentScoreData);   
    // const sections = currentScoreData.sections;
    // maxApi.outlet(sections, 2);
    maxApi.outlet('scoreLoaded');
  }
  maxApi.post(`loaded score from '${filename}'`);
});

maxApi.addHandler('getSections', () => {
  if(currentScoreData !== undefined) {
    const sections = currentScoreData.sections;
    maxApi.post('that worked');
    maxApi.outlet(sections, 2);
    maxApi.setDict('sections', sections);
  }
})

maxApi.addHandler('hello', () => {
  maxApi.post(`hello handler`);
  maxApi.post('this.patcher', this.patcher);
  // rootConnection.hello();
});

// function getNoteName(key) {
//   const degree = noteNames[key % noteNames.length];
//   const octave = Math.floor(key / 12) - 1;
//   return `${degree}${octave}`;
// }

// maxApi.addHandler('midiNote', (key) => {
//   const note = parser.parse(getNoteName(key));
//   maxApi.post(`received a midi note:`, note);
//   rootConnection.sendNote(note);
// });


maxApi.post('index.js script loaded');
