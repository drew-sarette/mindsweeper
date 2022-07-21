# MindSweeper
---

This is a simple version of Minesweeper. It takes user input in the form of a number, and then generates a square minesweeper field based on that. When a square is clicked, it either shows red to represent a mine, or displays the number of mines in adjacent squares. Mines are placed randomly each time, and there can be any number of mines in the field. Since there is not much supporting information required for this page, links were avoided in favor of a button that simply displays a div showing instructions, contact info, etc...

## Note:
This began as a side-project, to learn event listeners. Because I thought it was much more interesting than my original project idea (studio website for violin teacher), I got permission to make this my project. So, the wireframe will not match.

I started this on codepen.io, and then started my repository when I decided to make it my project. Here is a link to the [original codepen](https://codepen.io/blergermeistermeisterblerger/pen/PoRNNgO).

## Project Requirements
---
- CSS feature 1: Uses Flexbox for the mobile layout and switches to Grid for tablet and desktop.
- CSS feature 2: Menu (accessible from the ? button) is displayed full screen on mobile and partial screen on desktop and tablet.
- Javascript feature 1: Takes user input and calculates the square of that number.
- Loops for the square of that number and dynamically creats a div each time.
- Populates an array with random values to represent mines.
- Dynamically adds event listeners to each generated div.
- Uses JS to change CSS grid, color, add text content per requirements of the game.