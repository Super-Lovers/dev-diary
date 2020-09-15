# Asteroids in CreateJS

## Uploaded on 11th September, 2020
## web all
<span class="game-link"><i class="fas fa-link"></i> Game Page: <a href="https://github.com/Super-Lovers/asteroids-createjs">https://github.com/Super-Lovers/asteroids-createjs</a></span>

<p class="description"><span class="drop">A</span>steroids in CreateJS is a small arcade game that I recreated to learn how to use the CreateJS suite of tools such as EaselJS, PreloadJS, AudioJS and TweenJS. Development of the project was a little more than three days and sometimes It felt a bit like programming with PhaserJS. The game loop is simple to program and is a quick way learn, on a beginner level, how to use all CreateJS tools. I think that I might be wrong about PhaserJS being similar though, depending on the scale of the project. The game goes like this:</p>

````markdown
if the player is alive
	create asteroids
	push asteroids
if the player is hit
	end game
	prompt restart
````

There are four asteroid spawners outside the game's view (boundaries) and each border of the screen has one spawner, so that they can attack the player from all sides. Their point of instantiation is somewhere between each border's start and end points and when an asteroid is spawned, it is pushed with a constant force in the player's direction and if they leave the screen, they are removed from the game to save performance:

<video src="../../../games/html5/asteroids-createjs/images/asteroids.mp4" controls="" autoplay="" loop="" style="display: block;"></video>

````javascript
function createRockSpawners() {
    createRockSpawner(0, stage.canvas.width, 'top');
    createRockSpawner(0, stage.canvas.height, 'left');
    createRockSpawner(0, stage.canvas.height, 'right');
    createRockSpawner(0, stage.canvas.width, 'bottom');
}

function createRockSpawner(min, max, side) {
    let point = min + ((Math.random() * (max - min)));
    let x, y;
    
    switch (side) {
        case 'left':
            x = min - padding;
            y = point;
            break;
        case 'right':
            x = stage.canvas.width + padding;
            y = point;
            break;
        case 'top':
            x = point;
            y = min - padding;
            break;
        case 'bottom':
            x = point;
            y = stage.canvas.height + padding;
            break;
	}
}
````

This and all rocks are constantly being checked for collision with the ship or its blasts (lasers):

````javascript
if (((globalCoordsOfShip.x >= rock.x - rock.getBounds().width / 2 &&
      globalCoordsOfShip.x <= rock.x + rock.getBounds().width / 2) &&
     (globalCoordsOfShip.y >= rock.y - rock.getBounds().height / 2 &&
      globalCoordsOfShip.y <= rock.y + rock.getBounds().height / 2))) {
    
    stage.removeChild(rockObj.rock);
    stage.clear();
}
````

This collision code is the same for any simple rectangle collisions with the only difference being the boundaries or origin point making a difference in the calculations of the edges. We also have to rotate the asteroids, otherwise it looks wonky:

````javascript
function turnRocks() {
    allRocksInGame.forEach(rock => {
         rock.rock.rotation +=
             Math.random() * (MAX_ROCK_TURN_SPEED - MIN_ROCK_TURN_SPEED) + MIN_ROCK_TURN_SPEED;
    });
}
````


<div class="credits">
  <p>... project created by</p>

<div class="card-deck">
  <div class="card">
    <div class="icon">
      <i class="profession-icon fas fa-code"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Nikolay Ivanov</h5>
      <p class="card-text">Programmer for the project, solo project that took a few days.</p>
    </div>
  </div>
  <div class="card hidden-card">
  </div>
</div>
</div>