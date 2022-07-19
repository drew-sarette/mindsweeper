MindSweeper

This is a simple version of Minesweeper. It takes user input in the form of a number, and then generates a square minesweeper field based on that. When a square is clicked, it either shows red to represent a mine, or displays the number of mines in adjacent squares. Mines are placed randomly each time, and there can be any number of mines in the field. Since there is not much supporting information required for this page, links were avoided in favor of a button that simply displays a div showing instructions, contact info, etc...

This poject meets several of Code Louisville's Web Dev 1 project requirements:

1. CSS feature 1: Uses Flexbox for the mobile layout and switches to Grid for tablet and desktop.
2. CSS feature 2: Menu (accessible from the ? button) is displayed full screen on mobile and partial screen on desktop and tablet.
3. Javascript feature 1: Takes user input and calculates the square of that number.
4. Loops for the square of that number and dynamically creats a div each time.
5. Populates an array with random values to represent mines.
6. Dynamically adds event listeners to each generated div.
7. Uses JS to change CSS grid, color, add text content per requirements of the game.