let firstAttempt = true;
let wins = 0;
let total = 0;

function setResult(text, computerWon) {
  $('#rock').prop("disabled",true);
  $('#paper').prop("disabled",true);
  $('#scissors').prop("disabled",true);

  $('#response').text('One second, I\'m thinking...');
  setTimeout(() => {
    if(computerWon) {
      $('#response').text(`I went with ${text}. You lose.`);
    } else {
      ++wins;
      $('#response').text(`I went with ${text}. You Won!`);
    }
    ++total;
    $('#score').text(`${wins} / ${total}`);

    $('#rock').prop("disabled",false);
    $('#paper').prop("disabled",false);
    $('#scissors').prop("disabled",false);
  }, 600);
}

$('#rock').click(() => {
  if(firstAttempt) {
    firstAttempt = false;
    setResult('Scissors', false);
  } else {
    setResult('Paper', true);
  }
});

$('#paper').click(() => {
  if(firstAttempt) {
    firstAttempt = false;
    setResult('Rock', false);
  } else {
    setResult('Scissors', true);
  }
});

$('#scissors').click(() => {
  if(firstAttempt) {
    firstAttempt = false;
    setResult('Paper', false);
  } else {
    setResult('Rock', true);
  }
});