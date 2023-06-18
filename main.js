const arr = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const tuning = ["E", "A", "D", "G", "B", "E"];

function GetNoteOffsetted(note, offset) {
    offset = offset % arr.length;
    index = arr.indexOf(note);
    return arr[(index + offset) % 12];
}

function GetChordSignatureMinor(rootNote) { return [rootNote, GetNoteOffsetted(rootNote, 3), GetNoteOffsetted(rootNote, 7)]; }
function GetChordSignatureMajor(rootNote) { return [rootNote, GetNoteOffsetted(rootNote, 4), GetNoteOffsetted(rootNote, 7)]; }
function GetChordSignature7th(rootNote) { return [rootNote, GetNoteOffsetted(rootNote, 4), GetNoteOffsetted(rootNote, 7), GetNoteOffsetted(rootNote, 10)]; }

function FindDistanceToNote(noteA, noteB) {
    let difference = arr.indexOf(noteB) - arr.indexOf(noteA);
    return difference < 0 ? difference + 12: difference;
}
function FindChordsOnGuitar(chordSignature) {
    let potentialChords = [];
    
    for (let i = 0; i < 6; ++i) {
        let currentNote = tuning[i];
        potentialChords.push([]);
        
        for (let j = 0; j < chordSignature.length; ++j) {
            let targetNote = chordSignature[j];
            let distance = FindDistanceToNote(currentNote, targetNote);
            potentialChords[i].push(distance);    
        }
    }
    
    return potentialChords;
}
function GetPlayEffortInChord(chord) {
    let differenceBetweenEachOtherTotal = 0;
    let basePoint = Math.min(...chord);
    for (let i = 0; i < chord.length; ++i) {
        let distanceToBase = chord[i] - basePoint;
        differenceBetweenEachOtherTotal += distanceToBase < 0 ? 1000: distanceToBase;
    }
    return differenceBetweenEachOtherTotal;
}
function FindAllChordCombinationsOfSignature(chordSignature) {
    let signatureIndexes = FindChordsOnGuitar(chordSignature);
    let possibleChords = [];
    
    for (let a0 = 0; a0 < signatureIndexes[0].length; ++a0) { 
        for (let a1 = 0; a1 < signatureIndexes[1].length; ++a1) {
            for (let a2 = 0; a2 < signatureIndexes[2].length; ++a2) {
                for (let a3 = 0; a3 < signatureIndexes[3].length; ++a3) {
                    for (let a4 = 0; a4 < signatureIndexes[4].length; ++a4) {
                        for (let a5 = 0; a5 < signatureIndexes[5].length; ++a5) {
                            possibleChords.push([signatureIndexes[0][a0],
                                                signatureIndexes[1][a1],
                                                signatureIndexes[2][a2],
                                                signatureIndexes[3][a3],
                                                signatureIndexes[4][a4],
                                                signatureIndexes[5][a5]]);
                        }
                    }
                }
            }
        }
    }

    possibleChords = possibleChords.filter(function(chord){
        let notes = ConvertIndexesToNames(chord);
        for (let i = 0; i < chordSignature.length; ++i) if (notes.indexOf(chordSignature[i]) == -1) return false;
        return true;
    });
    possibleChords = possibleChords.sort(function(a, b) { return GetPlayEffortInChord(a) - GetPlayEffortInChord(b); });
    return possibleChords;
}

function ConvertIndexesToNames(chord) {
        let notes = [];
        for (let i = 0; i < 6; ++i)
            notes.push(arr[arr.indexOf(GetNoteOffsetted(tuning[i],chord[i]))]);
        return notes;
}

console.log(FindAllChordCombinationsOfSignature(GetChordSignature7th("E")));
