/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer , gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
   
    //console.log(gamePlaying);
    if(gamePlaying){
        //1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
    
        //2. Display the result
        diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        //3. Update the Round score if the Roll Number was not 1
        if(dice !== 1){
            // Add Score
            roundScore+=dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;  
        }else{
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
  if(gamePlaying){
        //1. Add Current Score to global Score
        scores[activePlayer]+=roundScore;

        //2. Update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        //3. Chekc if player Won the Game
        if(scores[activePlayer]>=100){
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');       document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer();
        }
  }
});


function nextPlayer(){
    // Next Player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
        
};

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};
