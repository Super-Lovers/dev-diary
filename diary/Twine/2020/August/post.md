# How to work and create a game with Twine 2

## Uploaded on 11th August, 2020

<span class="drop">F</span>or the last two and a little weeks Roger and I have been learning to make a game using Twine, more specifically, the Sugarcube 2 story format. Our idea was to create a sci-fi game sort of based on "Star Lens", a previous game we created for the CGJ 2019 Jam. This time, however, the game is for the "[I Can't Write But Want To Tell A Story](https://itch.io/jam/i-cant-write-but-want-to-tell-a-story)" game jam. We wanted to create something fun and different in terms of aesthetic for Twine games. Our game, in short is:

> In **Cosmic Relay** you play as an unfortunate traveler trying to pick the right choices to make it out alive. "Right" being a relative term. You have to help your character survive through the dangerous space filled with pirates and aliens waiting just around the corner using just your screen and console
>
> -- <cite>[https://github.com/Super-Lovers/cosmic-relay](https://github.com/Super-Lovers/cosmic-relay)</cite>

<div class="centered-img">
	<img style="max-width:400px;width:100%;" src="../../../../diary-imgcompressed/Twine/2020/August/images/cosmic_relay_title.png" alt="logo of game" />
</div>


Every time we either went for a big idea or had little time to implement it, so for this jam we have over two weeks and thought of a basic concept to create. The downside is.. we suck at storytelling. We picked Twine because it allows for dynamic and complex content for a game compared to a strict visual novel or writing engine. Although, Twine has problems of its own, but has many tools to create unique interactive fiction. The first thing you notice immediately with Twine is that you have an html file as the story and any passages or changes you make to it using Twine's provided software application are compiled into that html file. Access to specific passages and story related code is all compiled into this single huge file. It is unreadable because all your passages have some injected code all over the place and its very difficult to navigate:

````html
&lt;&lt;nobr&gt;&gt;
&lt;!-- ************************************ --&gt;
&lt;!--       Bottom interface buttons       --&gt;
&lt;!-- ************************************ --&gt;
&lt;button
    class=&quot;link-internal macro-button choice-button&quot;
    type=&quot;button&quot;
    tabindex=&quot;0&quot;
    name=&quot;0.1.0. Spaceship Fixed&quot;&gt;
        Sy&lt;span class=&quot;glitch-text&quot;&gt;stem&lt;/span&gt; rest&lt;span class=&quot;glitch-text&quot;&gt;art&lt;/span&gt;
&lt;/button&gt;
&lt;&lt;/nobr&gt;&gt;</tw-passagedata><tw-passagedata pid="7" name="0.0.1. Damage Scan" tags="broken-ui" position="850,100" size="100,100">\@@color:gray;&gt;@@ Retri&lt;span class=&quot;glitch-text&quot;&gt;eving information on&lt;/span&gt; damage sustained . . .
&lt;&lt;timed 800ms&gt;&gt;
    \@@color:gray;&gt;@@ Retrieving information on possible causes . . .
\&lt;&lt;/timed&gt;&gt;
&lt;&lt;timed 1000ms&gt;&gt;
    \@@color:gray;&gt;@@ Backing up data . . .
\&lt;&lt;/timed&gt;&gt;
&lt;&lt;timed 1200ms&gt;&gt;
    \@@color:gray;&gt;@@ DONE
````


Aside from having one file to work with, all the code and passages in the Twin application have little to no code syntax highlighting. Not to mention plugins that can help you with the development process like linters, snippets, grammar checks for the writing and other things IDEs provide. For making a small game, most of this isn't necessary, but Cosmic Relay is more dynamic and relies on code a lot to make the experience more immersive, not just in the writing itself. After digging up more on the topic, I learned that in the past, Twine games were actually developed without the provided application we use nowadays, but by a programming language called Twee and a compiler called Tweego. That's basically what Twine stories are built on (Twee) and when you're done programming/writing, you compile the project using Tweego to get the html file. This setup gives you the advantage of using a version-control system to track the changes of specific passages and code in a human-readable environment. This is because every passage, style, script and asset is a separate file inside the project compared to all being mashed together in one html file and relying on a non-programmer friendly Twine application. It also allows you to easily reference external assets in the project, since the Twine application is really difficult or buggy in that aspect.

Twine uses different story formats that each have unique methods to build stories with. Harlowe with basic features for making a simple narrative game and friendly to non-programmers or Sugarcube/Snowman which are Harlowe but more flexible and dynamic, allowing for advanced applications.

<div class="centered-img" style="display:block;">
	<img style="margin-right:30px;" src="../../../../diary-imgcompressed/Twine/2020/August/images/sugarcube.png" alt="logo of sugarcube" width=80/>
    <img src="../../../../diary-imgcompressed/Twine/2020/August/images/harlowe.png" alt="logo of harlowe" width=80/>
</div>


Sugarcube's documentation is really informative and the community proves a lot of support on online forums, so with its flexibility and history, I decided to go with it. Now, I'm going to give you a run-down of how the project works and is structured. There are three main folders that we work with and one extra for online deployment:
* <i class="fas fa-folder-open"></i> root of project
    * <i class="fas fa-folder"></i> src/
      * <i class="fas fa-folder"></i> bases
      * <i class="fas fa-folder-open"></i> story
        * <i class="fas fa-folder"></i> "0. Start"
        * <i class="fas fa-folder"></i> "1. Transmissions"
        * <i class="fas fa-folder"></i> "2. Events"
        * <i class="fas fa-folder"></i> "3. Climax"
    * <i class="fas fa-folder"></i> dist/
    * <i class="fas fa-folder"></i> storyformats/
    * <i class="fas fa-folder"></i> .github/

First  three are used for the entire project's code and writing and the last one is the folder where we keep the configuration of the deployment for the project online. All the passages and code for the game are contained in the ``src`` folder, the assets and the html file used to test the game in the development environment are in the ``dist`` folder, and lastly, the story formats are necessary for Tweego to know which programming language our story uses so that it can compile our game for it. Roger and I wrote the story in the ``src`` folder where everything is broken down into numbered chapters that contain their passages. We couldn't think of a different system for numbering branching-out stories, so we just made one up.

<div class="centered-img">
	<img style="max-width:600px;width:100%;" src="../../../../diary-imgcompressed/Twine/2020/August/images/diagram.png" alt="diagram of passages numbering system" />
</div>

Roger created an outline of the whole story and I created all the passages and added code to make them traversable from start to finish. By the end of the jam, we had slowly written the story while also working on and polishing the aesthetic/functionality of the game. Ninety-percent of the passages follow the same structure: 

````html
:: 3.4. Trap [broken-ui] <!-- Name of the current passage -->

<<type 40ms skipkey "Control">>\
!!! ⚠️ Warning
----
    @@color:orange;CRITICAL SYSTEM FAILURE @@
<</type>>\
<<type 40ms skipkey "Control">>\
----
    \@@color:gray;>@@ DAMAGE TO THE PRESSURIZATION SYSTEM HAS EXCEEDED 80%
<</type>>\
<<type 40ms skipkey "Control">>
    \@@color:gray;>@@ ALL SYSTEMS AND LIFEFORMS DEPENDANT ON IT @@color:red;WILL CEASE@@ SHORTLY.
<</type>>\
<<type 40ms skipkey "Control">>
    \@@color:gray;>@@ CHANCE OF SURVIVAL: @@color:red;0@@%
<</type>>
<<type 40ms skipkey "Control">>\
    ...
<</type>>\

<<nobr>>
<!-- ************************************ -->
<!--       Bottom interface buttons       -->
<!-- ************************************ -->
<button
    class="link-internal macro-button choice-button"
    type="button"
    tabindex="0"
    name="3.4.0. Wreck (Ending)">
        Continue
</button>
<</nobr>>
````

These passages simply contain the text and buttons of choices you can make and the code changes their appearance, manipulates the DOM and extends their functionality. Thanks to Sugarcube, you can run code at different events during a web page's life-cycle. This is all done using JQuery, which is included in Sugarcube. Whenever a passage starts, all its content is moved around in the DOM to accommodate a template structure made for those ninety-percent passages I mentioned earlier which is the actual consoles in the game:

<div class="centered-img">
	<img style="max-width:500px;width:100%;" src="../../../../diary-imgcompressed/Twine/2020/August/images/passage.png" alt="A picture of a passage with the consoles" />
</div>

This structure is created before a passage is rendered and is contained in a header file. Header files load at the start of the page's life-cycle and execute the code in them (highlighting will be buggy because the site can't highlight this programming language):

````html
...
<<if tags().includes("broken-ui")>>
    <div id="console-screen" class="screen" style="background-image: url('./assets/UI/mainconsole_broken.png')">
        <div class="passage-content">\
            <<print "\\@@color:gray;>@@">> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus odio ut neque vulputate consectetur. Aenean ut urna nec neque ornare tristique. Aliquam varius consectetur vulputate. Mauris condimentum mauris ultricies, maximus ante quis, ornare velit. Curabitur eget massa pulvinar felis rutrum ultrices.
        </div>
        <div id="choices-screen" class="screen" style="background-image: url('./assets/UI/bottomconsole_broken.png')"></div>
    </div>

...
````

Depending on the type of passage, different html header code is injected in the page, like for cutscenes or uniquely designed passages. After we have modified the DOM, a folder of different stylesheets is automatically embedded in the page and take place. Those styles are included in the web page like a normal web site, but in Twee, all those different stylesheets are embedded in that html file when built, so they don't have to be referenced in the header. I call then **base styles** (from the bases folder) because they are used in ninety-percent of the passages. They dictate how every page looks and behaves. The last step is making it all dynamic. This is where the base scripts come in. They come at a later stage, after the DOM is modified, and assign audio or button events, change default Sugarcube behavior, add to the page's responsiveness and run code in the passages' life-cycle events themselves:

````javascript
function toggleChoiceButtons(boolean) {
    let choice_buttons = $('.choice-button');

    for (let i = 0; i < choice_buttons.length; i++) {
        if (boolean == true) {
            $(choice_buttons[i]).css('display', 'block');

            $(choice_buttons[i]).on('click', function() {
                SimpleAudio.select("button").volume(0.2).play();
            });
        } else if (boolean == false) {
            $(choice_buttons[i]).css('display', 'none');
        }
    }
}

$(document).on(':typingcomplete', function(ev) {
    $(document).ready(function() {
        toggleChoiceButtons(true);
    });
});

$(document).on(':typingstart', function(ev) {
    $(document).ready(function() {
        SimpleAudio.select("console_output")
            .volume(0.7)
            .loop(true)
            .play();
    });
});

$(document).on(':typingstop', function(ev) {
    $(document).ready(function() {
        SimpleAudio.select("console_output").stop();
    });
});
````

The base scripts are loaded in the footer files, which come after the page's DOM is loaded. Although the header files themselves can also contains some scripts, as mine do. Twine lets you separate all this into a scalable workflow, which is the main reason we didn't use Twine's application. Now that everything is organized and works well with my IDE, I am able to work more efficiently and make the game as complex as necessary. Tweego automatically compiles the game's ``src`` folder for you whenever you make a change in it, so that you can test it as soon as you change the source code. One bonus thing I did in order to test the latest version of the game with Roger is using GitHub Actions to build and deploy the game to Github Pages. This made it so that anyone open the game from online every time we commit a change (courtesy of Em Lazer-Walker [https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp](https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp)):

````yaml
name: Build

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1

      - name: Use Go 1.13
        uses: actions/setup-go@v1
        with:
          go-version: 1.13.x

      - name: Build game
        run: |
          go get github.com/tmedwards/tweego
          export PATH=$PATH:$(go env GOPATH)/bin
          tweego -o dist/index.html src/


      - name: Deploy
        uses: peaceiris/actions-gh-pages@v2
        env:
          PERSONAL_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: ./dist
````

This last step is important for sharing or playtesting your prototype as soon as possible, without having to worry about carrying a working version of the game everywhere with you.