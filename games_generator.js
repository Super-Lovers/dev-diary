const showdown = require('showdown');
let jquery = require('jquery');
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

let games = [];

const path = './games';
fsExtra.readdirSync(path)
    .forEach((file) => {
        let categoryPath = path + '/' + file;
        fsExtra.readdirSync(categoryPath)
            .forEach((file) => {
                let gamePath = categoryPath + '/' + file;
                fsExtra.readdirSync(gamePath)
                    .forEach((file) => {
                        let htmlFile = gamePath + '/' + file;
                        if (htmlFile.substring(htmlFile.length - 4, htmlFile.length) == 'html')
                        {
                            fsExtra.removeSync(htmlFile);
                        }
                    });
                fsExtra.readdirSync(gamePath)
                    .forEach((file) => {
                        let filePath = gamePath + '/' + file;
                        const fileStatus = fsExtra.statSync(filePath);
                        if (fileStatus.isDirectory() == false) {
                            let contents = fsExtra.readFileSync(filePath, 'utf8');

                            const converter = new showdown.Converter();
                            let postHtml = converter.makeHtml(contents);

                            // Creating the new html based on the base game html
                            contents = fsExtra.readFileSync('game_base.html', 'utf8');
                            $ = cheerio.load(contents);

                            $('.link').each(function () {
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
                                let currentHref = $(this).attr('href');
            
                                $(this).attr('href', encodeURI(currentHref.substring(0, currentHref.length)));
                            });

                            $favicon = $('.favicon');
                            const currentIconHref = $favicon.attr('href');
                            if (currentIconHref !== undefined) {
                                $('.favicon').attr('href', '../../../' + decodeURI(currentIconHref));
                            }

                            $('.game').append('<div>' + postHtml + '</div>');

                            $('.game>div>h1').after('<h3>' + $('.game>div>h1').text() + '</h3>').remove();
                            $('.game>div>h2').after('<h5>' + $('.game>div>h2').text() + '</h5>').remove();

                            let tags = $('.game>div>h5').text().split(' ');

                            let tagsText = $('.game>div>h5').text(); 
                            $('.game>div>h5').text('Tags: ' + tagsText.split(' ').join(', ').toUpperCase() + '.');

                            let newFilePath = filePath.substring(0, filePath.length - 3);
                            newFilePath += '.html';
                            fsExtra.writeFileSync(newFilePath, $.html());
                            
                            let game = new Game(
                                $('.game>div>h3').text(),
                                $('.game>div>.description').text(),
                                tags,
                                newFilePath,
                                file.substring(0, file.length - 3)
                            );
                            games.push(game);
                        }
                    });
            });
    });

let portfolioContents = fsExtra.readFileSync('portfolio.html', 'utf8');
$ = cheerio.load(portfolioContents);

let genreSet = new Set();

let currentRow = 0;
let colCount = 0;
let newHtml = '';
let gamesContainer = $('.games');
gamesContainer.empty();
for (let i = 0; i < games.length; i++) {
    colCount++;
    if (colCount == 1) {
         newHtml += '<div class="row">';
    }

    let headerPreview = games[i].path.substring(0, games[i].path.length - 5 - games[i].fileName.length) + 'images/preview.gif';

    newHtml += '<div class="col-12 col-md-6 game ';
    for (let j = 0; j < games[i].tags.length; j++) {
        newHtml += games[i].tags[j] + ' ';
    }
    newHtml += '">';
    newHtml +=      '<div class="card">';
	
    let platform = '<i class="platform-icon fas fa-';
    let platformTag = games[i].tags[0];
    
	if (platformTag == "desktop") { platform += 'desktop'; }
	else if (platformTag == "mobile") { platform += 'mobile-alt'; }
	else if (platformTag == "vr") { platform += 'vr-cardboard'; }
	else if (platformTag == "web") { platform += 'globe'; }
	platform += '"></i>';
	
	newHtml += 			'<div class="icon">' + platform + '</div>'
    newHtml +=          '<div class="game_preview" style="background-image:url(' + headerPreview + ')"></div>';
    newHtml += '        <div class="card-body">';
    newHtml +=              '<h5 class="card-title">' + games[i].name + '</h5>';
    newHtml +=              '<p class="card-text">' + (games[i].description.substring(0, 120) + '...') + '</p>';
    newHtml +=              '<a href="' + games[i].path + '" class="btn btn-light"><i class="fas fa-info-circle"></i> Learn more</a>'
    newHtml +=          '</div>';
    newHtml +=      '</div>';
    newHtml += '</div>';
	
    for (let j = 0; j < games[i].tags.length; j++) {
        genreSet.add(games[i].tags[j]);
    }
}
newHtml += '</div>';

gamesContainer.append(newHtml);

let genres = Array.from(genreSet).sort();

let buttonGroup = $('.btn-group');
buttonGroup.empty();
for (let i = 0; i < genres.length; i++) {
    buttonGroup.append(
        '<button type="button" class="col-6 col-md-2 btn btn-light">' + genres[i] + '</button>'
    );
}

fsExtra.writeFileSync('portfolio.html', $.html());
