# MINESWEEPER

### TASK: Creating a web version of the classic game Minesweeper

### GAME OVERVIEW

The (default) game consists of a 9x9 grid of squares, with 10 “mines” randomly
hidden in 10 of the squares.
The user clicks on a squares to uncover them. Each time:
● If the square contains a mine, the user loses and game is over!
● If the square is adjacent to a mine, the square displays the
total number of mines in the 8 squares around it
● If the square is neither a mine or adjacent to a mine, the
square displays a blank, and should behave as if the 8 adjacent
squares were also clicked (recursively applying this algorithm)
The user wins when they uncover all squares that don’t have mines.


### PROJECT AND CODE OVERVIEW:

Framework: React, Redux, ImmutableJS
Text editor: Atom, Sublime Text
Browser: Chrome, Safari
Other libraries: Chai, enzyme (for testing)

The project folder is 'create-react-app-like' and react redux-like structure
containing public, src, package.json.

react-redux is used to create stores and for reducers.
redux-thunk is a middleware that lets us write action creators to return a
function which receives two store methods: dispatch and get as parameters.

The project structure has been created in such a way to allow maintainability &
reusability of the code

- public
  -   index.html: is the page template
  -   manifest.json:
- src
  -   index.js: is the JavaScript entry point of the application.
  -   index.css
  -   components: describes how each component is rendered  
        - board
            - index.js
        - cell
            - index.js
            - styles.css
        - images (contains all the images required by the components)
            - attempting.svg
            - bomb.svg
            - flag.svg
            - gear.svg
            - resting.svg
        - modal (Component to render a Modal when Settings icon is clicked)
            - index.js
        - smiley (Component to reset/ restart the game )
            - index.js
            - styles.css
        - timer (Clock functionality in {minutes:seconds} to track the time )
            - index.js
            - index.test.js
        - toolbar (Allows to keep track of timer, mines along with
          settings and smiley icons )
            - index.js
            - styles.css
  -   container-components (Supplies props to components it renders)
        - app
            - index.js (entry point to render UI)
            - index.test.js
            - styles.css
        - board (board container to mapping states and binding actions to props)
            - index.js
        - settings (render UI for settings to map state and dispatch actions)    
            - index.js
            - styles.css
  -   lib (functions to implement a specific functionality )
        - create-board.js
        - plant-mines.js
        - reveal.js
  -   store
        - actions
            - app.js (Describes action to set the board configuration and
                        settings based on difficulty level)
            - app.test.js
            - board.js (various board actions defined such as isBoardComplete,
                          openCell)
            - board.test.js
        - constants
            - action-types.js (action types for the actions and reducers;
                                  declared as constants )
        - reducers
            - index.js ( state- action pair mapping to track previous, current
                            and next state in the game)
        - create-store.js


### FEATURES IMPLEMENTED

● Mine flagging : Right click on an unopened cell to flag the possible location
of mine
● Timer: Formatted in 0:00 (minutes and seconds).
● Animations:
  Heading (Minesweeper): Hover to see it zoom
  Cell: 1. See the transition when uncovering a cell (or an empty region)
        2. Hover on the cell to see the color change
  Smiley: 1. Hover to see it zoom
          2. Click on a cell to see the expressions change
  Settings: 1. Hover over it to see it rotate
            2. Opens a modal with transition effects
  Gameover: 1. Displays a red blinking message above the board when the player
            loses the game.
            2. The clicked mine cell turns black in the background
            3. Displays all the mines in other background color      
● Different numbered cells are represented by a different color (e.g. 1s are
  blue, 2s are orange, 3s are red. etc)
● Users can choose a difficulty level (e.g. board size and mine count)
  using Settings.
● Shows all the mines when the player loses and displays a blinking message to
  restart!

### FUTURE WORK 

Some of the drawbacks of the game that needs to be improved in Minesweeper
version 2.0 include:
- When the flag count reaches 0, it does not stop the counter. Adds flags to
the board even after reaching mines=0
- Indicating the wrong flags that user marked after the game is over.
- Clicking on the cells should be disabled after the game is over. (Currently, it 
  resets the game)
- Better UI
- Automated restart of the game after a set interval (in case the user does not
  restart)
- Score Board (Based on number of mines identified correctly and number of
  total cells opened before getting busted, negative score for identifying the
  incorrect mine place on the board)


# DESIGN DECISIONS

## Decision 1: Development Environment
I decided to go with create-react-app and react-redux as it provides a simple,
ready-to-use file structure

## Decision 2: Types
PropTypes is used. It is React's built-in typechecking utility.
I prefer prop-types over external extensions like TypeScript or Flow since it
provides sufficient type safety in React components with little friction.
To run typechecking on the props for a component, they have been imported within
the required file.

## Decision 3: State
I decided to go with Redux and ImmutableJS.

## Decision 4: Binding
I decided to do with constructor binding throughout the application for its
better performance, although it does interfere with better readability and
maintainence.

## Decision 5: File Structure
I decided to go with grouping by features. By this structure, I located CSS, JS
and tests together inside folders grouped by a feature/ component. This decision
helps to modify a specific feature/component with ease. Instead of looking for
an image inside a parent directory which contains a lot of other folders such as
components, container_components, store etc., it is easier to group all the
related files together in a folder for a convenient lookup and usage.

## Decision 6: Styling
Although there are tons of ways to style the components including Sass/ Less etc
I decided to go with both traditional CSS and React's inline styles for its
simplicity to render it.

## Other Decisions:
- .js extension instead of .jsx
- Each component in its own folder for reusability and easier to maintain.  


# RUNNING THE APPLICATION

To run the application, first of all, download the zip folder.
- Using Terminal, enter into project directory
- In the terminal, check the version of node & npm and yarn you have using:
node -v and yarn -v.
- If you don't have them installed, install node & npm. For yarn, you could do
'npm install -g yarn'
- once you have yarn installed, run the app using 'yarn && yarn start'
- With your server running, visit the site: http://localhost:5050
(The default port is set to 5050. To change it, go to package.json file and set
  another PORT.)

# TESTING THE APPLICATION

- 'yarn test'
Once you run this command in the terminal from the project directory, you will
find various tests logged to the console.
All are passing! Hurray!

## Tests that are implemented in this project
src/container-components/app/index.test.js:23
      - Contains one smiley
      - Contains one timer
      - Default board size is 9 x 9

src/components/timer/index.test.js
      - For seconds < 10, considers them zero
      - For seconds > 10, it is not 0
      - Correctly computes number of minutes
      - Correctly computes minutes and seconds

src/store/actions/board.test.js
      - Starts new game when cell is clicked or when game is over
      - Ends the game when a mined cell is clicked
      - Plants mine when first square clicked
      - Adds a flag!
      - Adds/ Removes flag when the game is over
      - Removes flag since flag already exists!

src/store/actions/app.test.js:14
      - Finished the game

## Tests that could be implemented (coming soon in version 2.0! :)
  - returns false if the game is not lost
  - sets an empty cell to visible
  - sets a bomb cell to visible
  - can access and read a cell at a given (x, y) position
  - get Neighbor Coordinates
  - can update an empty cell as a number at a given (x, y) position
  - can calculate all the numbers based on their adjacent bombs


            **************** THANK YOU! **********************
