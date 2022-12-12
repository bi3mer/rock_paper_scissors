let firstAttempt = true;
let wins = 0;
let draws = 0;
let total = 0;

const sequence = [];
const maxN = 15;
const ngram = {}

const unigram = {}
unigram['Rock'] = 1;
unigram['Paper'] = 1;
unigram['Scissors'] = 1;


function setResult(playerChoice, computerChoice,) {
  let result = 0; // 0 if player won, 1 if draw, 2 if computer won
  if (playerChoice === 'Rock' && computerChoice == 'Scissors') {
    result = 0;
    ++wins;
    ++total;
  } else if (playerChoice === 'Scissors' && computerChoice == 'Rock') {
    result = 2;
    ++total;
  } else if (playerChoice == 'Paper' && computerChoice == 'Rock') {
    result = 0;
    ++wins;
    ++total;
  } else if (playerChoice == 'Rock' && computerChoice == 'Paper') {
    result = 2;
    ++total;
  } else if (playerChoice == 'Scissors' && computerChoice == 'Paper') {
    result = 0;
    ++wins;
    ++total;
  } else if (playerChoice == 'Paper' && computerChoice == 'Scissors') {
    result = 2;
    ++total;
  } else {
    result = 1;
    ++draws;
  }

  if (result === 0) {
    $('#response').text(`I went with ${computerChoice}. You won!`);
  } else if (result === 1) {
    $('#response').text(`We both went with ${computerChoice}. It's a draw.`);
  } else {
    $('#response').text(`I went with ${computerChoice}. You lose.`);
  }

  $('#score').text(`${wins} / ${total}, draws=${draws}`);
}

function getChoice(u) {
  let total = 0;
  for(let key in u) {
    total += u[key];
  }

  let randomNumber = Math.random();
  let accumulator = 0;
  let result = 'Rock';

  for(let key in u) {
    accumulator += u[key];
    if (accumulator / total >= randomNumber) {
      result = key;
      break;
    }
  }

  return result;
}

function updateNGram(playerChoice) {
  ++unigram[playerChoice];

  for(let i = 0; i < maxN; ++i) {
    const currentSequence = sequence.slice(i, sequence.length);
    if(currentSequence.length === 0) {
      break;
    }
    
    const key = currentSequence.join();
    if(key in ngram) {
      if (playerChoice in ngram[key]) {
        ++ngram[key][playerChoice];
      } else {
        ngram[key][playerChoice] = 1;
      }
    } else {
      ngram[key] = {};
      ngram[key][playerChoice] = 1;
    }
  }

  if(sequence.length == maxN) {
    sequence.shift();
  }
  sequence.push(playerChoice);
}

function getNGramChoice() {
  let result = null;
  for(let i = 0; i < sequence.length; ++i) {
    const key = sequence.slice(i, sequence.length);
    if(key in ngram) {
      result = getChoice(ngram[key]);
      break;
    }
  }


  if (result === null) {
    result = getChoice(unigram)
  }

  return result;
}

function getComputerChoice() {
  const computerChoice = getNGramChoice();

  if(computerChoice === 'Rock') {
    return 'Paper';
  } else if (computerChoice === 'Paper') {
    return 'Scissors';
  } else {
    return 'Rock';
  }
}

function run(playerChoice) {
  $('#rock').prop("disabled",true);
  $('#paper').prop("disabled",true);
  $('#scissors').prop("disabled",true);

  setResult(playerChoice, getComputerChoice());
  updateNGram(playerChoice);

  $('#rock').prop("disabled",false);
  $('#paper').prop("disabled",false);
  $('#scissors').prop("disabled",false);
}

$('#rock').click(() => {
  run('Rock');
});

$('#paper').click(() => {
  run('Paper');
});

$('#scissors').click(() => {
  run('Scissors');
});

window.addEventListener('keyup', function (e) {
  if (e.key === '1') {
    run('Rock');
  } else if (e.key === '2') {
    run('Paper');
  } else if (e.key === '3') {
    run('Scissors');
  }
}, false);