### Narrative-development tooling

##### Uploaded on 30th November, 2019

I've had the pleasure of developing two story-based games in Unity3D, the challenges that I have faced consisted mostly of creating a user-friendly system to integrate the story of the game into its plot devices. In order to do this, together, with other people proved to be harder than I thought, especially given the fact we had to work in the same project.

Collaboration and tweaking in any story-based game would likely require that the narrative writers tweak things a lot, so even in a VCS environment, it will become very chaotic when we have to work within the same scene files. A Unity3D package I found that lets you write for multiple languages in a structured manner is Polyglot. Using Google excel sheets, it was easier to adapt the storyline in the second game I started developing: Fish Soup. By extracting the STRING_ID of the excel sheet, I was able to start constructing both a quest line and dialogue structure for plot actors.

<img class="img-fluid" src="../../../../diary/Unity3D/2019/November/no.1 images/quest-line.png" />

By working on the story externally, we were able to separate our workflows without causing conflicts within the project. The quests and their objectives, as well as the individual dialogue of plot actors can be extracted easily by using this excel document. By downloading it as TSV or CSV and converting it to JSON, you can then use Litjson to convert it to a JSON data object and access every quest and objective to create as your class object hierarchy:

```c#
    string polyglotFile = 
    	Resources.Load<TextAsset>("Polyglot Story/PolyglotStoryline").text;

    JsonData polyglotTojsonData = JsonMapper.ToObject(polyglotFile);
```

And you can then loop through every quest STRING_ID to create the class object hierarchy based on the entries in that JSON file.

```json
{
      "STRING ID": "QUEST_1_OBJECTIVE_1",
      "DESCRIPTION": "",
      "ENGLISH": "I'm sorry, I didn't know. He told me you were in the past",
      "FRENCH / FRANÇAIS": "",
      "SPANISH / ESPAÑOL": "",
      "GERMAN / DEUTSCH": "",
      "ITALIAN / ITALIANO": ""
      ...
}
```

In the same manner you set-up the questline, you can build a Unity editor tool that would let you auto-complete the desired dialogue line from the JSON by taking the set STRING_ID to said dialogue box and updating its text field to match the current language of the settings of a ScriptableObject or file for the game.

EOF