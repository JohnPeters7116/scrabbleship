# SCRABBLESHIP

A game that combines the finess of Scrabble and the whimsey of battleship all in one place.

#DESIGN

Player vs computer

Scrabble
Need a class of all the letters in scrabble to choose from
Random selection from the bag of letters
Once letter in a hand it must be removed from the class

Battleship
User sees where their ships are as game goes on but has no idea where
enemy ships are.

Components
-Scoreboard
-Users Letters
-Ships Left
-Title
-Grid

Application State
-User (name, total score, current score, currentLetters, currentShips)
-Computer (total score, current score, currentLetters, currentShips)
-GameBoard (Array of Tiles of A1 to O15)
-Tile (Ship, Letter)
-LetterBag (allLetters, shuffleBag)
-Letter (score, title, user, coordinate)
-Ship (shipPosition (0,1,2), user, coordinate)

API
-check whether submitted is an allowed word
-given letters make a word

#GAMEPLAY:

Like in Scrabble, each player must begin by drawing 7 letter tiles.

Each player has a sheet of graph paper where they must draw a 15 x 15 battle field to correspond with the 15 x 15 Scrabble board. Each player draws battleships on their respective grids:

— Four one unit ships, 4 x #

— Three two-unit-long ships, 3 x ##

— Two three-unit-long ships, 2 x ###

— One four-unit-long ship, 1 x ####

Carry on and play some Scrabble. As letter tiles are placed on the Scrabble board, the corresponding Battleship grid places are hit. Be sure not to put letters on your own ships’ corresponding places, and once a ship has been “sunk” by the opposing team’s letters, it can be placed on the Scrabble board (as seen in the cartoon above). The Scrabble word score is added to the Battleship score for each ship hit, and landing triple letter and triple word scores double the hit score on the respective battleship. Got it? Yeah, stare at that for a while. Lisa told us it didn’t make any sense.
```
