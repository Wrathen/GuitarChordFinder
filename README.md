# GuitarChordFinder

<h1>Description:</h1>
Finds all chord combinations of a given root note and signature and sorts by ease-of-playability.

<h1>How To:</h1>
Basically, if you are new to JS, you could copy-paste everything inside main.js into your browser console and play with it. Or if you are advanced, you know how to use the code, main.js includes a few static functions.
<br></br>

- Open main.js
- Copy everything
- Open browser (any modern browser: Opera, Chrome, Firefox and so on...)
- Open a blank page (not mandatory)
- Open browser console (usually CTRL+Shift+J)
- Paste everything
- By default, it automatically calls the function `FindAllChordCombinationsOfSignature(GetChordSignature7th("E"))` and prints out the results.

<h1>Basic Documentation:</h1>

- Use `GetChordSignatureMinor(rootNote)` to retrieve a root note's minor chord signature. </br>For example, `GetChordSignatureMinor("E")` will return you `['E', 'G', 'B']`.
- Use `GetChordSignatureMajor(rootNote)` to retrieve a root note's major chord signature. </br>For example, `GetChordSignatureMajor("F#")` will return you `['F#', 'A#', 'C#']`.
- Use `GetChordSignature7th(rootNote)` to retrieve a root note's seventh chord signature. </br>For example, `GetChordSignature7th("C#")` will return you `['C#', 'F', 'G#', 'B']`.

- Use `FindAllChordCombinationsOfSignature(chordSignature)` to retrieve all the chord combinations of a given chord signature on guitar up to the 12th fret, sorted by ease-of-playability (relative opinion). </br>For example, `FindAllChordCombinationsOfSignature(GetChordSignatureMinor("E"))` will return you an array of 540 combinations of the chord Em on guitar string up to 12th fret, with the first combination on the array being the usual way of playing it (0, 2, 2, 0, 0, 0).

<h1>Beware:</h1>

- Uses standard (EADGBE) tuning by default. 
- Chords are calculated up to the 12th fret. You can change the code for further considerations.
- Chords are calculated for 6-string guitars.
- Do not judge the code quality. It executes in milliseconds and optimization is not (and never will be) needed in such small computations. I just wanted to make the product, not quality code.
- Chords' notation is different than tabs online. The first index gives you the thickest E (the top string on your guitar).
- On any chord you get by using these functions will always be a chord that uses all the 6 strings. There is no 'x's in the codebase, there is no skipping a string entirely. 

  For example, you'd expect on an input "D minor" chord to give you (x, x, x, 2, 3, 1), which is not the case here. You'll get (5, 5, 7, 7, 6, 5) instead. Which I often use the barro-version more than the usual one, personally.
- More signatures can be easily added into the code. </br>For example for sus4 signatures, you'd add the function `function GetChordSignatureSus4(rootNote) { return [rootNote, GetNoteOffsetted(rootNote, 5), GetNoteOffsetted(rootNote, 7)]; }` and use it in the function `FindAllChordCombinationsOfSignature(chordSignature)`.
![image](https://github.com/Wrathen/GuitarChordFinder/assets/36766122/ab11d69b-43fd-484d-acb7-ff3f7105f026)

For more information check out this [wikipedia page](https://en.wikipedia.org/wiki/Interval_(music)#:~:text=In%20music%20theory%2C%20an%20interval,such%20as%20in%20a%20chord)!
