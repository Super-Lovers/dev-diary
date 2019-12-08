const showdown = require('showdown');
let jquery = require('jquery');
const fsExtra = require('fs-extra');
const cheerio = require('cheerio');

class Game {
    constructor(name, description, genre, path) {
        this.name = name;
        this.description = description;
        this.genre = genre;
        this.path = path;
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

                            $('.link').each(function (index) {
                                const currentHref = $(this).attr('href');
                                const currentSrc = $(this).attr('src');
                                $(this).attr('href', '../../../' + currentHref);
                                $(this).attr('src', '../../../' + currentSrc);
                            });

                            const currentHref = $('.archive-link').attr('href');
                            $('.archive-link').attr('href', currentHref.substring(3, currentHref.length));

                            $favicon = $('.favicon');
                            const currentIconHref = $favicon.attr('href');
                            $('.favicon').attr('href', '../../../' + currentIconHref);

                            $('.game').append('<div>' + postHtml + '</div>')

                            let newFilePath = filePath.substring(0, filePath.length - 3);
                            newFilePath += '.html';
                            fsExtra.writeFileSync(newFilePath, $('html'));

                            let game = new Game(
                                $('h3').text(),
                                $('p').text(),
                                $('h5').text().split(' ').join(''),
                                newFilePath
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

    let headerPreview = games[i].path.substring(0, games[i].path.length - games[i].name.length - 5) + 'images/preview.gif';
    
    newHtml += '<div class="col-12 col-md-6 game ' + games[i].genre + '">';
    newHtml +=      '<div class="card">';
    newHtml +=          '<div class="game_preview" style="background-image:url(' + headerPreview + ')"></div>';
    newHtml += '        <div class="card-body">';
    newHtml +=              '<h5 class="card-title">' + games[i].name + '</h5>';
    newHtml +=              '<p class="card-text">' + (games[i].description.substring(0, 120) + '...') + '</p>';
    newHtml +=              '<a href="' + games[i].path + '" class="btn btn-light"><i class="fas fa-info-circle"></i> Learn more</a>'
    newHtml +=          '</div>';
    newHtml +=      '</div>';
    newHtml += '</div>';
    genreSet.add(games[i].genre);
}
newHtml += '</div>';
// games[i].path.substring(0, games[i].path.length - games[i].name.length - 5) + 'images/intro.png'
gamesContainer.append(newHtml);

let genres = Array.from(genreSet);

let buttonGroup = $('.btn-group');
buttonGroup.empty();
for (let i = 0; i < genres.length; i++) {
    buttonGroup.append(
        '<button type="button" class="btn btn-light">' + genres[i] + '</button>'
    );
}

fsExtra.writeFileSync('portfolio.html', $('html'));
