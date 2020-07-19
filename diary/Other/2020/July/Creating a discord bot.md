# Creating a discord bot

## Uploaded on 9th July, 2020

<span class="drop">M</span>y friend Kris and I wanted to make a <i class="fab fa-discord"></i> discord bot to log our cycling activity and share it with other people. I've had some experience with making a discord bot in the past when discord was riding in popularity. There is a dot NET wrapper to developing it, but I decided to go with the JavaScript alternative, being Discord.js since the documentation was more detailed.

The first thing I did was hooking the bot to a MongoDB instance in a cluster I had for free in order to store the logs of cycling activity there. I also used a second collection for storing each user's activity so that I can easily work with the bot when multiple people are communicating with it, otherwise I risk mixing their data or the bot's state up. I use MongoDB Compass to interact with the instance while developing with it, since a console or a webpage is not as convenient:

<img class="img-fluid" src="../../../../diary-imgcompressed/Web/2020/July/images/mongoCompass.png" alt="A picture of mongoDB compass's interface">

Before I start connecting with the instance, I make sure that I don't already have a connection going and after that the main function of the bot is initiated:

````javascript
if (db === undefined) {
	await clientMongo.connect(async () => {
		db = clientMongo.db('cycling-bot');
		main(message, command);
	});
} else {
    main(message, command);
}
````

Now that we are connected, we can start work. From my understanding, a simple bot only needs to work with one or two callbacks. Discord.js did so with the "message" callback and all my bot's implementation resides in it, aside from connecting to APIs. I access the callback's output, which is the user's message and its metadata and work with just that. After that, I have to breakdown the message of the user into separate parts to find out what command he gave the bot, if any, and the arguments it might have:

````javascript
clientDiscord.on('message', async (message) => {
	if (message.author.bot == true) {	// message.author and message.content
		return;							// are the most important properties
	}

	// Extracts the command part of the message
	// *****************
	let command = '';
	for (let i = 0; i < message.content.length; i++) {
		if (i == message.content.length ||
			message.content[i] == ' ') {
			break;
		}

		command += message.content[i];
	}
});
````

There is also the instance where you have to breakdown strings in the command message as they can be used as arguments for accessing specific sessions by title or name. That makes them harder to extract than just numbers one after the other:

````javascript
/**
 * Returns an object of items from inside a complex
 * command that includes strings and numbers.
 */
function getCommandBreakdown(message) {
	let indexOfFirstQuote = 0;
	let indexOfLastQuote = 0;

	let isFirstQuoteFound = false;

	const messageText = message.content;
	for (let i = 0; i < messageText.length; i++) {
		if (messageText[i] == '"' && isFirstQuoteFound == false) {
			indexOfFirstQuote = i;
			isFirstQuoteFound = true;
		}

		if (messageText[i] == '"' && isFirstQuoteFound == true) {
			indexOfLastQuote = i;
		}
	}

	const commandArguments = (messageText.substring(0, indexOfFirstQuote - 1) + messageText.substring(indexOfLastQuote + 1, messageText.length)).split(' ');

	const sessionTitle = messageText.substring(indexOfFirstQuote, indexOfLastQuote + 1);

	return {
		commandArguments,
		sessionTitle,
		indexOfFirstQuote,
		indexOfLastQuote
	};
}
````

<img class="img-fluid" src="../../../../diary-imgcompressed/Web/2020/July/images/getSession.png" alt="A picture of mongoDB compass's interface">

This code, however, only work with one string in a command, as more than that was not necessary for me to implement to complete the bot's purpose. Once I had the command and its arguments, It was just a matter of implementing each of the commands' functionality. Here is an example of how I made session deletion:

````javascript
if (command == '$deleteSession') {
	const commandBreakdown = getCommandBreakdown(message);
	const result = await sessions.deleteOne({
		'title': {
			$eq: commandBreakdown.sessionTitle
		}
	});

	if (result.deletedCount > 0) {
		message.reply(' **' + commandBreakdown.sessionTitle + '**' + ' was successfully removed ✅');
	}
}
````

<img class="img-fluid" src="../../../../diary-imgcompressed/Web/2020/July/images/deleteSession.png" alt="A picture of mongoDB compass's interface">

And of course, it is important that you give feedback to the user whether or not his command was carried out!