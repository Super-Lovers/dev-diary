const showdown = require('showdown');
require('jquery');
const fsExtra = require('fs-extra');
const cheerio = require('cheerio');

class Game {
	constructor(name, description, tags, path, fileName) {
		this.name = name;
		this.description = description;
		this.tags = tags;
		this.path = path;
		this.fileName = fileName;
	}
}

const games = [];

const path = './games';
fsExtra.readdirSync(path)
	.forEach((file) => {
		const categoryPath = path + '/' + file;
		fsExtra.readdirSync(categoryPath)
			.forEach((categoryFile) => {
				const gamePath = categoryPath + '/' + categoryFile;
				fsExtra.readdirSync(gamePath)
					.forEach((gameFile) => {
						const htmlFile = gamePath + '/' + gameFile;
						if (htmlFile.substring(htmlFile.length - 4, htmlFile.length) == 'html') {
							fsExtra.removeSync(htmlFile);
						}
					});
				fsExtra.readdirSync(gamePath)
					.forEach((gameFile) => {
						const filePath = gamePath + '/' + gameFile;
						const fileStatus = fsExtra.statSync(filePath);
						if (fileStatus.isDirectory() == false) {
							let contents = fsExtra.readFileSync(filePath, 'utf8');

							const converter = new showdown.Converter();
							const postHtml = converter.makeHtml(contents);

							// Creating the new html based on the base game html
							contents = fsExtra.readFileSync('game_base.html', 'utf8');
							const $ = cheerio.load(contents);

							$('.link').each(function() {
								const currentHref = $(this).attr('href');
								const currentSrc = $(this).attr('src');

								if (currentHref !== undefined && currentHref != false) {
									$(this).attr('href', '../../../' + encodeURI(currentHref));
								}
								if (currentSrc !== undefined && currentSrc != false) {
									$(this).attr('src', '../../../' + encodeURI(currentSrc));
								}
							});

							$('.archive-link').each(function() {
								const currentHref = $(this).attr('href');

								$(this).attr('href', encodeURI(currentHref.substring(0, currentHref.length)));
							});

							const $favicon = $('.favicon');
							const currentIconHref = $favicon.attr('href');
							if (currentIconHref !== undefined) {
								$('.favicon').attr('href', '../../../' + decodeURI(currentIconHref));
							}

							$('.game').append('<div>' + postHtml + '</div>');

							$('.game>div>h1').after('<h3>' + $('.game>div>h1').text() + '</h3>').remove();
							$('.game>div>h2').after('<h5>' + $('.game>div>h2').text() + '</h5>').remove();

							const tags = $('.game>div>h5').text().split(' ');

							const tagsText = $('.game>div>h5').text();
							$('.game>div>h5').text('Tags: ' + tagsText.split(' ').join(', ').toLowerCase() + '.');

							$('pre').each(function() {
								$(this).addClass('shadow-sm code-block');
							});

							$('p').each(function() {
								if ($(this).find('img').length > 0) {
									$(this).css('text-align', 'center');
								}
							});

							let newFilePath = filePath.substring(0, filePath.length - 3);
							newFilePath += '.html';
							fsExtra.writeFileSync(newFilePath, $.html());

							const game = new Game(
								$('.game>div>h3').text(),
								$('.game>div>.description').text(),
								tags,
								newFilePath,
								gameFile.substring(0, gameFile.length - 3)
							);
							games.push(game);
						}
					});
			});
	});

const portfolioContents = fsExtra.readFileSync('portfolio.html', 'utf8');
const $ = cheerio.load(portfolioContents);

const genreSet = new Set();

let colCount = 0;
let newHtml = '';
const gamesContainer = $('.games');
gamesContainer.empty();
for (let i = 0; i < games.length; i++) {
	colCount++;
	if (colCount == 1) {
		newHtml += '<div class="row">';
	}

	const headerPreview = games[i].path.substring(0, games[i].path.length - 5 - games[i].fileName.length) + 'images/preview.gif';

	newHtml += '<div class="col-12 col-md-6 game ';
	for (let j = 0; j < games[i].tags.length; j++) {
		newHtml += games[i].tags[j] + ' ';
	}
	newHtml += '">';
	newHtml += '<div class="card">';

	let platform = '<i class="platform-icon fas fa-';
	const platformTag = games[i].tags[0];

	if (platformTag == 'desktop') {
		platform += 'desktop';
	} else if (platformTag == 'mobile') {
		platform += 'mobile-alt';
	} else if (platformTag == 'vr') {
		platform += 'vr-cardboard';
	} else if (platformTag == 'web') {
		platform += 'globe';
	}
	platform += '"></i>';

	newHtml += '<div class="icon">' + platform + '</div>';
	newHtml += '<div class="game_preview" style="background-image:url(' + headerPreview + ')"></div>';
	newHtml += '        <div class="card-body">';
	newHtml += '<h5 class="card-title">' + games[i].name + '</h5>';
	newHtml += '<p class="card-text">' + (games[i].description.substring(0, 120) + '...') + '</p>';
	newHtml += '<a href="' + games[i].path + '" class="btn btn-light"><i class="fas fa-info-circle"></i> Learn more</a>';
	newHtml += '</div>';
	newHtml += '</div>';
	newHtml += '</div>';

	for (let j = 0; j < games[i].tags.length; j++) {
		genreSet.add(games[i].tags[j]);
	}
}
newHtml += '</div>';

gamesContainer.append(newHtml);

const genres = Array.from(genreSet).sort();

const buttonGroup = $('.btn-group');
buttonGroup.empty();
for (let i = 0; i < genres.length; i++) {
	buttonGroup.append(
		'<button type="button" class="col-6 col-md-2 btn btn-light">' + genres[i] + '</button>'
	);
}

fsExtra.writeFileSync('portfolio.html', $.html());
