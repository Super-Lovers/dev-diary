# Cosmic Relay
## web all twine2
<span class="game-link">Game Page: <a href="https://back-body-hurts.itch.io/cosmic-relay">https://back-body-hurts.itch.io/cosmic-relay</a></span>

<p class="description"><span class="drop">A</span> short interactive pick your path game created for the I Can't Write But Want To Tell A Story Jam of 2020.In Cosmic Relay you play as an unfortunate traveler trying to pick the right choices to make it out alive. "Right" being a relative term. You have to help your character survive through the dangerous space filled with pirates and aliens waiting just around the corner using just your screen and console. I had a lot of fun working on this game because it was clear what we wanted and it was simple to develop. Twine is comfortable to collaborate with other people (in my case with Roger) and on top of that I got to practice some web development. I already talked about this game on one of my diary posts, so I'll touch on some aspects that I couldn't on it. Much of the game is centered around this screen:</p>

<img class="img-fluid" src="../../../games-imgcompressed/html5/cosmic-relay/images/screen.png" alt="A pictures of the game's main screen">

Since fiction games, in my opinion, should be complemented with a lot of visuals and effects, I focused on making twine adapt the interface as much as possible dialogue to dialogue. Firstly, I moved all the dialogue from twine's current passage container to one with my own design/markup, so that its easier to manipulate the DOM and add visuals:

````javascript
$passage_content = $('#console-screen>.passage-content');
// Cleaning up the DOM after rendering the passage
$passage_content.empty();

const $current_passage_elements = $('.passage').contents();
for (let i = index_of_children; i < $current_passage_elements.length; i++) {
    const element = $current_passage_elements[i];
    $passage_content.append(element);
}
````

So now all the passage's text is inside a different container with my own styles and scripts in it. With that in place, I have created interface templates that change the appearance of the interface whenever they are initialized for the new passage with a tag that points to the template:

````html
<<if tags().includes("broken-ui")>>
    <div id="console-screen" class="screen" style="background-image: url('./assets/UI/mainconsole_broken.png')">
        <div class="passage-content">\
            <<print "\\@@color:gray;>@@">> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus odio ut neque vulputate consectetur. Aenean ut urna nec neque ornare tristique. Aliquam varius consectetur vulputate. Mauris condimentum mauris ultricies, maximus ante quis, ornare velit. Curabitur eget massa pulvinar felis rutrum ultrices.
        </div>
        <div id="choices-screen" class="screen" style="background-image: url('./assets/UI/bottomconsole_broken.png')"></div>
    </div>

...
````

The code in the condition is then injected into the current passage if that passage is tagged as "broken-ui". And if we want to change the interface during a passage itself, then we add a script tag in the passage's content itself:

````javascript
⚠️ Pirate missiles incoming

<<script>>
    SimpleAudio.select("boom").volume(0.2).play();

    $('#console-screen').css('backgroundImage', 'url("./assets/UI/mainconsole_broken.png")');
    $('#choices-screen').css('backgroundImage', 'url("./assets/UI/bottomconsole_broken.png")');
<</script>>
````

This makes it really easy to add those effects to specific points in the passage to aid the immersion and connection of the dialogue with the web page itself.

<video src="../../../games/html5/cosmic-relay/images/console_effects.mp4" controls="" autoplay="" loop="" style="display: block;"></video>

This is how I was able to make the interactive story more "alive". Of course, if you played the game you'd have noticed the cool glitched text effects in the first few passages. They were really crucial to giving the user a good first impression and a sense of doom. They work like this, we write down the draft of the passage:

````markdown
:: 0.0.0. Emergency Protocol [broken-ui]

This choice will forcefully restart the repair system.

This choice will reset the system to the most recent backup and lose all data.
````

<img class="img-fluid" src="../../../games-imgcompressed/html5/cosmic-relay/images/no_effects.png" alt="A pictures of the game's main screen without any effects">

When we add the special effects defined by styles, scripts and twine built-in code, it turns out into this:

<video src="../../../games/html5/cosmic-relay/images/glitch_effects.mp4" controls="" autoplay="" loop="" style="display: block;"></video>

Its really easy to work like this, all we need is a draft. After that we can play with all sorts of effects either made by the developer or built-in for twine until we get the desired mood for the passage. This is the point where we add the character to character loading effect to imitate computer interaction:

<video src="../../../games/html5/cosmic-relay/images/text_effect.mp4" controls="" autoplay="" loop="" style="display: block;"></video>

````html
:: 0.1.0. Spaceship Fixed [fixed-ui]
<<type 40ms skipkey "Control">>\
    <h3>📑 REPORT</h3>\
----
<</type>>\
<<type 40ms skipkey "Control">>\
       > @@color:green;System restored and online@@ - 70% capacity
<</type>>\
<<type 40ms skipkey "Control">>\
    \@@color:gray;>@@ Critical errors [03]
<</type>>
<<type 40ms skipkey "Control">>\
    \@@color:gray;>@@ <b>@@color:red;Critical stop at rescue station is required.@@</b> Nearest station located at Pathos 125E.
<</type>>\
<<type 40ms skipkey "Control">>\
----
    \@@color:gray;>@@ ✔️ OBJECTIVE ACQUIRED - reach Pathos 125E

!!! ⚠️ Warning
----
@@color:orange;All routes to the rescue station are marked as dangerous on intergalactic databases. Assistance might be required to cross the territory.@@
<</type>>\
````

What made it the best feeling for me was that one user from the game jam's itch.io submission page didn't even realize the game was made in twine because of how dynamic it was:

> wow, I didn't even realize it was made with Twine! I used it once, but your game feels so so so dynamic, I had no idea Twine could be used to achieve what you did! Again, congratulations on an amazing work!
>
> <cite>-- AstroSocks</cite>