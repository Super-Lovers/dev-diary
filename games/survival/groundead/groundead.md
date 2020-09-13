# Groundead
## Uploaded on 13th September, 2020
## desktop survival all
<span class="game-link"><i class="fas fa-link"></i> Game Page: <a href="https://back-body-hurts.itch.io/groundead">https://back-body-hurts.itch.io/groundead</a></span>

<p class="description"><span class="drop">G</span>rounDead is a top-down zombie survival game, wherein the player takes control of a hunter/lumberjack/carpenter, who must survive waves of zombies coming towards him with the use of multiple weapons, such a  hunting rifle, a knife, an axe, and by crafting a variety of different defensive structures, such as barricades, platforms, and traps. To control the character, the player will use a traditional keyboard and mouse control scheme to perform actions, such as moving, attacking, building, destroying and healing.
</p>
GrounDead was a pleasure to make because at that stage I was learning aboout procedural generation methods and it was my opportunity to try out new things. The idea of the game is, the player character is stuck on an island with zombies swarming him wave by wave (yeah cliche whatever) and he has to fight and build to survive as long as possible. I'll discuss how the world is generated first, as its the most complex and intriguing aspect of the game (for me). The map or island is split in three. The middle of the map is the forest biome and it has a few ponds aside from most of it being trees. The left-most part is a mountain ground with rocks and ores and the right-most side is a beach with nothing but sand:

<video src="../../../games/survival/groundead/images/map.mp4" controls="" autoplay="" loop="" style="display: block;"></video>

Now, every time a new game starts, the forest, small ponds and rocky biome ores will generate anew. This makes the environment dynamic and forces the player to change strategies from game to game. If the player is running low on natural resources, the game will also randomly generate more, otherwise the game wouldn't last very long. Since the resources on the map are split up, generation for each works by giving coordinates from where to generate for each biome type:

````c#
RockyPlains.GenerateRockyPlains(20, 20, 5);

CurrentPositionX = 20;
ForestGenerator.GenerateForest(20, 20, 30);
CurrentPositionX = 40;
ForestGenerator.GenerateForest(20, 20, 20);
CurrentPositionX = 60;

CurrentPositionX = 20;
CurrentPositionY = 0;
RiverGenerator.GenerateRiver(20, 40, 40);
````

I don't know why I wrote the generation like this by moving the coordinates and giving a box to generate in. If I were to do it from start again I would definitely not write a single line like this ever. After the generators assigned each tile on the map, they're then instantiated from prefabs. The generation algorithm works by sending multiple agents that walk around in an array and assign empty elements to tiles. That's pretty much how the world generation works. The second topic that I find interesting to discuss is the building mechanic. You go in range of a tile or object like a tree or rock and you get to either destroy or build on top of it:

<video src="../../../games/survival/groundead/images/actions.mp4" controls="" autoplay="" loop="" style="display: block;"></video>

Destroying natural resources gives you back materials and buildings cost materials, simple. Structures have different properties, like durability or thorns, so that when zombies attack they'd have to go through your defences first. It is up to the player which structures he uses and how he uses them around other terrain:

<video src="../../../games/survival/groundead/images/actions.mp4" controls="" autoplay="" loop="" style="display: block;"></video>

The zombies AI is pretty simple as well and just looks for the player if he is close or within sight. Zombies also focus on destroying your structures whenever possible, so they prioritize based on which is the closest. Those are the main aspects of the game and how they work together.

<div class="credits">
  <p>... project created by</p>
</div>

<div class="card-deck">
  <div class="card">
    <div class="icon">
      <i class="profession-icon fas fa-code"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Nikolay Ivanov</h5>
      <p class="card-text">Lead programmer for the project.</p>
    </div>
  </div>
  <div class="card">
    <div class="icon">
      <i class="profession-icon fas fa-pencil-alt"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Petar Petrov</h5>
      <p class="card-text">Game designer and narrative writer together with Tatiana for the game, also organized playtesting.</p>
    </div>
  </div>
</div>
</div>

<div class="card-deck">
  <div class="card">
    <div class="icon">
      <i class="profession-icon fas fa-palette"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Demi Enzerink</h5>
      <p class="card-text">Responsible for the art, worked on the splash screen, concepts and animations for player character.</p>
    </div>
  </div>
  <div class="card">
    <div class="icon">
      <i class="profession-icon fas fa-palette"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Martin Jawahier</h5>
      <p class="card-text">Responsible for the art, concepting and animation of zombies, worked on the environment and structures.</p>
    </div>
  </div>
</div>
</div>

<div class="card-deck">
  <div class="card">
    <div class="icon">
      <i class="profession-icon fas fa-microphone-alt"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Luuk van Dort</h5>
      <p class="card-text">Focused on audio production, sound effects and music for the entire game. Helped with game design and with programming the splash screen backgrounds.</p>
    </div>
  </div>
  <div class="card">
    <div class="icon">
      <i class="profession-icon fas fa-pencil-alt"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Tatiana Mansur</h5>
      <p class="card-text">Helped with game design and organizing playtesting, worked on the narrative together with Petar.</p>
    </div>
  </div>
</div>
</div>