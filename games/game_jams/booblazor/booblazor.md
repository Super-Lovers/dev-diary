# Booblazor
## Uploaded on 11th September, 2020
## desktop gamejam all
<span class="game-link"><i class="fas fa-link"></i> Game Page: <a href="https://github.com/Super-Lovers/boobjam-submission-2020">https://github.com/Super-Lovers/boobjam-submission-2020</a></span>

<p class="description"><span class="drop">B</span>oobLazor was created for the 42 hour 2020 boob jam meant to support the prevention of breast cancer. You play as a robot injected into the breast of a patient with the goal of destroying the cancer cells using a lazer gun before they replicate and manifest it. The game was further developped completed after the initial 42 hours since I wanted to create the game in Love2D, with which I had no prior experience and I was learning in the go. Because of this, much of the code is experimentation or improvisation due to time limitations. I worked on the project even after the game jam in order to thoroughly complete the game from start to finish. Since Love2D doesn't have a lot of the nice things game engines like Unity3D do, I spent more time programming and testing them (drawing menus that scale, collisions, camera/world offset, animations and so on). I'll focus on the topic of gameplay, since drawing UI and dialogue isn't as much fun. In order to generate the world and store all the objects' information in it, I used one global world object. This world object is really useful for making all sorts of functionality like testing collision, detection of nearby entities, boundaries and so on:</p>

````lua
world.map = {}
world.mapWidth = 32 -- width of map in tiles
world.mapHeight = 32 -- height of map in tiles

world.tileSizeX = 128 -- Manually calculated, 8x8 tiles on screen
world.tileSizeY = 128 -- Manually calculated, 8x8 tiles on screen

-- List of all the entities in the world
world.entities = {}
world.spawners = {}

-- Setting the number of rows in the map table
for x = 1, world.mapWidth do
    world.map[x] = {}
end

-- Setting the default map tile
for x = 1, world.mapWidth do
    for y = 1, world.mapHeight do
        -- 0 = safe
        -- 1 = corrupted
        -- 2 = transitioning
        local tile = Tile(x, y, "safe")
        tile.worldX = x * world.tileSizeX
        tile.worldY = y * world.tileSizeY
        world.map[x][y] = tile
    end
end
````

Then, when we have all the tiles on the map, we have to generate all the evil cancer cell spawners that are responsible for creating new cancer cells for the player to fight. They spawn on the first corrupted cells on the map and the job of cancer cells is to corrupt safe cells and replicate to increase the speed of the corruption process:

````lua
-- This makes sure the spawners dont spawn
-- on the edge of the screen.
local paddingTiles = 1

for x = 1, world.mapWidth do
    for y = 1, world.mapHeight do
        if x < world.mapWidth - paddingTiles and
            y < world.mapHeight - paddingTiles then
            local choice = lume.weightedchoice({
                    ["corrupted"] = 3,
                    ["safe"] = 97
                })

            if choice == "corrupted" then
                local tile = Tile(x, y, "safe")
                world.map[x][y] = tile

                local spawner = Spawner(#world.spawners + 1, x, y)
                spawner.worldX = x * world.tileSizeX
                spawner.worldY = y * world.tileSizeY
                table.insert(world.spawners, spawner)
            end
        end
    end
end
````

Finally, each tile on the map is dynamic, meaning that depending on the entity sitting on top of it or not, the tile will change. Every second, all the tiles on the map tick in order to slowly decay the corruption as if the human's system is fighting the cancer. Tiles which cancer cells haven't reached will be clean while the rest are corrupted:

<img class="img-fluid" src="../../../games-imgcompressed/game_jams/booblazor/images/tiles.png" alt="A pictures of how the tiles look with the entities on them">

````lua
function Tile:new(x, y, type)
    self.x = x or 0
    self.y = y or 0
    self.worldX = 0
    self.worldY = 0
    
    self.type = type
    
    self.totalCorruptionDecayDelay = math.random(20) + 30
    self.currentCorruptionDecay = self.totalCorruptionDecayDelay
end

function Tile:tickCorruption()
    if self.type == "corrupted" then
        if self.currentCorruptionDecay <= 0 then
            self.type = "safe"
            self.currentCorruptionDecay = self.totalCorruptionDecayDelay - 1
        elseif self.currentCorruptionDecay > 0 then
            self.currentCorruptionDecay = self.currentCorruptionDecay - 1
        end
    end
end
````

Obviously, this decay is really slow and won't help much otherwise the player won't really have a challenge in the game. That's all there is to the world generation. We stuck to a simpler game for this game jam since we were not sure if 42 hours were good enough for anything more complex. All entities on the map inherit from the Entity object/class which contains all the base characteristics for each entity and each entity has its own class which extends or defines new characteristics:

````lua
-- Role is the type of entity it is (Player, Cancer cell)
function Entity:new(x, y, role)
    self.x = x or 0
    self.y = y or 0
    self.worldX = 0 -- Used for getting a more accurate position on the world
    self.worldY = 0 -- ^ useful for collisions and such
    
    self.role = role
    self.hitpoints = 10
    
    self.movementSpeed = 1000
    self.speedMultiplier = 0.01
end
````

All entities on the game take damage when hit, so they share the same method, but each entity has some modifications to it for screen shake or playing a "hurt" sound or for adding a hit shield delay so that you don't take damage thousands of times at a time:

<video src="../../../games/game_jams/booblazor/images/player_taking_damage.mp4" controls="" autoplay="" loop="" style="display: block;"></video>

````lua
function Player:takeDamage(damage)
    if self.currentTakeDamageRate <= 0 then
        Player.super.takeDamage(self, damage)

        screen:setShake(20)
        
        hitPlayer:play();
        self.currentTakeDamageRate = self.takeDamageRate
    end
end
````

Since we only had 42 hours and I had little experience with Lua and Love2D, I resorted to using some third-party libraries for screen shake, dialogue, classes, switching between scenes and so on. Whenever an entity is killed, it creates a "death animation" object of itself on the same position it died and it plays that animation, then destroys it when its finished. That was kind of the easiest way I thought of having death animations show up. Otherwise the entity code would have become huge and separating them made it easier for me to manage:

````lua
function DeathAnimation:new(id, worldX, worldY)
    self.id = id
    self.worldX = worldX or 0
    self.worldY = worldY or 0

    self.currentSprite = bloodFrames[1]
    self.currentSpriteIndex = 1
    self.atlas = enemyBloodAnimationAtlas

    self.fps = 0.05
    self.currentFps = self.fps
    self.scheduleToKill = false
end
````

Compared to some game engines that use an interface and its own filesystem, Love2D needs you to manually load all graphics, quads and audio files when the game starts. This makes organization of your files really important because if you're not vigilant, you or other people working on the game can get lost in search of specific files. The way you load files is in objects with all related sprites inside, so that you can access each sprite by key names, or if its an animation sprite sheet then you load all the quads in one array:

````lua
spawnerSprites = {}
spawnerSprites[1] = love.graphics.newQuad(0, 0, 256, 256, enemyBig2Atlas:getDimensions())
spawnerSprites[2] = love.graphics.newQuad(257, 0, 256, 256, enemyBig2Atlas:getDimensions())
````

That's mostly what the gameplay is about, collisions or boundary checks aren't as interesting to discuss so I'm skipping those parts, but if you want to see all the code, look it up on my GitHub!

<div class="credits">
  <p>... project created by</p>

<div class="card-deck">
  <div class="card">
    <div class="icon">
      <i class="profession-icon fas fa-code"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Nikolay Ivanov</h5>
      <p class="card-text">Programmer for the whole project and also helped design it.</p>
    </div>
  </div>
  <div class="card">
    <div class="icon">
      <i class="profession-icon fas fa-palette"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Roger Recaldini</h5>
      <p class="card-text">Responsible for all of the visual assets of the game and also worked on the design.</p>
    </div>
  </div>
</div>
</div>