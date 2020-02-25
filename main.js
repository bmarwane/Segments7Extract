var fs = require('fs');

var allLines = fs
  .readFileSync('test.txt')
  .toString()
  .split('\n');



const numberPatterns = {
  n_0: {
    top:    ' _',
    middle: '| |',
    bottom: '|_|',
  },
  n_1: {
    top:    '  ',
    middle: '  |',
    bottom: '  |',
  },
  n_2: {
    top:    ' _',
    middle: ' _|',
    bottom: '|_ ',
  },
  n_3: {
    top:    ' _',
    middle: ' _|',
    bottom: ' _|',
  },
  n_4: {
    top:    '  ',
    middle: '|_|',
    bottom: '  |',
  },
  n_5: {
    top:    ' _',
    middle: '|_ ',
    bottom: ' _|',
  },
  n_6: {
    top:    ' _',
    middle: '|_ ',
    bottom: '|_|',
  },
  n_7: {
    top:    ' _',
    middle: '  |',
    bottom: '  |',
  },
  n_8: {
    top:    ' _',
    middle: '|_|',
    bottom: '|_|',
  },
  n_9: {
    top:    ' _',
    middle: '|_|',
    bottom: ' _|',
  },
};

function extractBCDBlock(startLine = 0, startColumn = 0) {
  const topSection = allLines[startLine].slice(startColumn,startColumn + 2);
  const middleSection = allLines[startLine + 1].slice(startColumn,startColumn + 3);
  const bottomSection = allLines[startLine + 2].slice(startColumn,startColumn + 3);

  /*
  console.log(topSection)
  console.log(middleSection)
  console.log(bottomSection)
  //*/

  for (let i = 0; i <= 9; i++) {
    const patternToTest = numberPatterns['n_' + i];
    if (
      patternToTest.top === topSection &&
      patternToTest.middle === middleSection &&
      patternToTest.bottom === bottomSection
    ) {
      return i;
    }
  }

  // when no results return -1
  return -1;
}



function extractOneBCDLine(lineIndex) {
  let lastResult = -1;
  let i = 0;

  const extractedBlocks = [];

  do {
    lastResult = extractBCDBlock(lineIndex, i * 3);
    i++;
    if(lastResult !== -1) {
      extractedBlocks.push(lastResult);
    }
  }while(lastResult !== -1);

  return extractedBlocks;
}

function extractBCDLines() {
  let i = 0;
  let lastExtractedLineBlocks = []
  const extractedLines = []

  do {
    lastExtractedLineBlocks = extractOneBCDLine(i);
    i+=3;

    if(lastExtractedLineBlocks.length > 0) {
      extractedLines.push(lastExtractedLineBlocks)
    }

  } while(lastExtractedLineBlocks.length > 0);

  return extractedLines;
}


const result = extractBCDLines()


console.log('Result = ', result)