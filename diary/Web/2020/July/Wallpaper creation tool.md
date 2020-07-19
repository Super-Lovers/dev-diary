# Online wallpaper creation tool

## Uploaded on 19th July, 2020

<span class="drop">W</span>hile I was looking for a cool new sleek wallpaper and after browsing like a quadrillion number of pixels I noticed that there is a lot of wallpapers of some random cute or funny code in them. I thought, wait, I wanna make my own wallpaper with my own shit code I wrote, for the giggles. Realizing I would have to push the boundaries of what is possible to create a wallpaper using an image editor and watch YouTube videos or read some book, I decided to make a tool that you can just plug your code in and play around with it.

<img class="img-fluid" src="../../../../diary-imgcompressed/Web/2020/July/images/wallpapers-app/ui.png" alt="A picture showing how the interface of the wallpaper creator application looks like">

> "This application lets you create a wallpaper based on code you give it and by manipulating different parameters that change how the text and background looks. You can pick from all sorts of themes and fonts for your code and tweak the wallpaper until you're satisfied."
>
> -- <cite>From the [Github page](https://github.com/Super-Lovers/wallpaper-code-generator/)</cite>

Thanks to a few sources related to styling programming environments by changing fonts and themes, I tried to bring them all together into this application, to make the idea of creating wallpapers with code in them flexible and efficient. It is really just a long list of themes and fonts into a file each that you can choose from. The application works by using your entire screen which your browser currently occupies as a canvas for creating your wallpaper. If you want to make the wallpaper for a different screen if you have multiple of them, you just move the window to the other screen and the code will be re-positioned accordingly. The page of the app encourages you to use full-screen because you would be able to see clearly how the code looks, otherwise the browser's navigation UI and the operating system's UI will make it look like something is off. You can see the actual wallpaper behind the interface just by hovering over it, the focus will shift:

<img class="img-fluid" src="../../../../diary-imgcompressed/Web/2020/July/images/wallpapers-app/focus.gif" alt="An animated picture showing how focus between panels in the app shifts depending on where you hover with the mouse">

I really don't know why anything like this didn't exist until now lol, or maybe I couldn't find anything like it. Unfortunately, I spent most of my time creating a wallpaper using profound fortunes and quotes, since I have a liking to them:

<img class="img-fluid img-border" src="../../../../diary-imgcompressed/Web/2020/July/images/wallpapers-app/wallpaper-one.png" alt="An example of a wallpaper">

I used html2canvas in order to capture the DOM element that contains the wallpaper's content. Basically theres two divs, one for the interface and one for the wallpaper. The Interface allows you to manipulate the content inside the wallpaper div or itself. When the user is done with designing a wallpaper, he clicks the download button and an image is generated:

````javascript
downloadButton.addEventListener('click', () => {
	wallpaper.style.opacity = focusedValue;

	html2canvas(wallpaper, {
		width: window.screen.width,
		height: window.screen.height,
	})
		.then(canvas => {
			document.body.appendChild(canvas);
		})
		.then(() => {
			const canvas = document.getElementsByTagName('canvas')[0];
			canvas.style.display = 'none';
			const image = canvas.toDataURL('image/png');

			const a = document.createElement('a');
			a.setAttribute('download', 'wallpaper.png');
			a.setAttribute('href', image);
			a.click();
			canvas.remove();

			wallpaper.style.opacity = notFocusedValue;
		});
});
````

... and voila! You have a wallpaper.

