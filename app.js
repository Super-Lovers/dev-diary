const cheerio = require('cheerio');
const showdown = require('showdown');
let $ = require('jquery');
const dirTree = require('directory-tree');
const fsExtra = require('fs-extra');
const voca = require('voca');

const topicsString = [];
const topicsInstances = [];
let mostRecentPost;
let postDates = [];

class Topic {
    constructor(name) {
        this.name = name;
        this.years = [];
    }
}

class Year {
    constructor(name) {
        this.name = name;
        this.months = [];
    }
}

class Month {
    constructor(name) {
        this.name = name;
        this.posts = [];
    }
}

class Post {
    constructor(name, title, date) {
        this.name = name;
        this.title = title;
        this.date = date;
    }
}

const topicDirectories = [];
const yearDirectories = [];

const path = './diary';
fsExtra.readdirSync(path)
    .forEach((file) => {
        const filePath = path + '/' + file;
        const fileStatus = fsExtra.statSync(filePath);

        if (fileStatus.isDirectory()) {
            topicDirectories.push(filePath);

            const topic = topicsString.includes(file);
            if (topic == false) {
                const newTopic = new Topic(file);
                topicsInstances.push(newTopic);

                topicsString.push(file);
            }
        }
    });

topicsInstances.forEach((element) => {
    fsExtra.readdirSync(path + '/' + element.name)
        .forEach((file) => {
            yearDirectories.push(element + '/' + file);

            for (let i = 0; i < topicsInstances.length; i++) {
                if (topicsInstances[i].name == element.name) {
                    const topic = topicsInstances[i];
                    const newYear = new Year(file);
                    if (!topic.years.includes(newYear)) {
                        topic.years.push(newYear);
                    }
                }
            }
        });
});

for (let i = 0; i < topicsInstances.length; i++) {
    for (let j = 0; j < topicsInstances[i].years.length; j++) {
        const pathToMonths = path + '/' + topicsInstances[i].name + '/' + topicsInstances[i].years[j].name;
        fsExtra.readdirSync(pathToMonths)
            .forEach(file => {
                let topic;
                for (let k = 0; k < topicsInstances.length; k++) {
                    if (topicsInstances[k].name == topicsInstances[i].name) {
                        topic = topicsInstances[k];
                    }
                }

                let year;
                for (let k = 0; k < topic.years.length; k++) {
                    if (topic.years[k].name == topicsInstances[i].years[j].name) {
                        year = topicsInstances[i].years[j];
                    }
                }

                year.months.push(new Month(file));
            });
    }
}

for (let topic = 0; topic < topicsInstances.length; topic++) {
    for (let year = 0; year < topicsInstances[topic].years.length; year++) {
        for (let month = 0; month < topicsInstances[topic].years[year].months.length; month++) {
            const pathToPosts =
                path + '/' +
                topicsInstances[topic].name + '/' +
                topicsInstances[topic].years[year].name + '/' +
                topicsInstances[topic].years[year].months[month].name;

            fsExtra.readdirSync(pathToPosts)
                .forEach(file => {
                    if (file.substring(file.length - 2, file.length) == "md") {
                        let newTopic;
                        for (let i = 0; i < topicsInstances.length; i++) {
                            if (topicsInstances[i].name == topicsInstances[topic].name) {
                                newTopic = topicsInstances[i];
                            }
                        }

                        let newYear;
                        for (let i = 0; i < newTopic.years.length; i++) {
                            if (newTopic.years[i].name == topicsInstances[topic].years[year].name) {
                                newYear = topicsInstances[topic].years[year];
                            }
                        }

                        let newMonth;
                        for (let i = 0; i < newYear.months.length; i++) {
                            if (newYear.months[i].name == topicsInstances[topic].years[year].months[month].name) {
                                newMonth = topicsInstances[topic].years[year].months[month];
                            }
                        }

                        const postContents = fsExtra.readFileSync(pathToPosts + '/' + file, 'utf8');

                        const converter = new showdown.Converter();
                        let postHtml = converter.makeHtml(postContents);
                        $ = cheerio.load(postHtml);
                        $('.posts>div>h1').after('<h3>' + $('.posts>div>h1').text() + '</h3>').remove();
                        $('.posts>div>h2').after('<h5>' + $('.posts>div>h2').text() + '</h5>').remove();

                        let postName = $('h1').text();
                        let postDate = $('h2').text().substring(12);

                        let postDay = postDate.substring(0, 2);
                        let postYear = postDate.substring(postDate.length - 4, postDate.length);
                        postMonth = '';

                        let dateComponents = postDate.split(' ');
                        if (dateComponents.length > 1) {
                            postMonth = postDate.split(' ')[1].substring(0, postDate.split(' ')[1].length - 1);
                        }

                        postDate = new Date(postDay + ' ' + postMonth + ' ' + postYear + " EDT");

                        let newPost = new Post(file, postName, postDate);

                        postDates.push(postDate);
                        newMonth.posts.push(newPost);
                    }
                });
        }
    }
}

// Finding the most recent post
mostRecentPost = postDates[0];
for (let i = 0; i < postDates.length; i++) {
    if (postDates[i] > mostRecentPost) {
        mostRecentPost = postDates[i];
    }
}

for (let topicI = 0; topicI < topicsInstances.length; topicI++) {
    const topic = topicsInstances[topicI];

    if (fsExtra.exists('./dom/' + topic.name)) {
        fsExtra.removeSync('./dom/' + topic.name);
    }
    fsExtra.mkdirSync('./dom/' + topic.name);
    for (let yearI = 0; yearI < topic.years.length; yearI++) {
        const year = topic.years[yearI];
        fsExtra.mkdirSync('./dom/' + topic.name + '/' + year.name);

        for (let monthI = 0; monthI < year.months.length; monthI++) {
            const month = year.months[monthI];
            fsExtra.mkdirSync('./dom/' + topic.name + '/' + year.name + '/' + month.name);
            for (let postJ = 0; postJ < month.posts.length; postJ++) {
                const post = month.posts[postJ];

                const file = path + '/' + topic.name + '/' + year.name + '/' + month.name + '/' + post.name;
                const postContents = fsExtra.readFileSync(file, 'utf8');
                let contents = fsExtra.readFileSync('base.html', 'utf8');

                const converter = new showdown.Converter();
                let postHtml = converter.makeHtml(postContents);
                $ = cheerio.load(contents);

                const domTree = dirTree('./diary');

                let archiveNode = '';

                for (let topic = 0; topic < domTree.children.length; topic++) {
                    if (domTree.children.length <= 0) {
                        continue;
                    }

                    archiveNode += '<li>' + domTree.children[topic].name;
                    archiveNode += '<ul>';
                    for (let year = 0; year < domTree.children[topic].children.length; year++) {
                        archiveNode += '<li class="year">' + '<span class="yearLabel"><i class="fas fa-caret-right"></i> ' + domTree.children[topic].children[year].name + "</span>";
                        archiveNode += '    <ul>';
                        for (let month = 0; month < domTree.children[topic].children[year].children.length; month++) {
                            // archiveNode += '<li>' + domTree.children[topic].children[year].children[month].name;
                            // archiveNode += '<ul>';
                            for (let post = 0; post < domTree.children[topic].children[year].children[month].children.length; post++) {
                                const postName = domTree.children[topic].children[year].children[month].children[post].name;
                                if (postName.substring(postName.length - 2, postName.length) == "md") {
                                    archiveNode += '    <li><i class="fas fa-align-left"></i> ' + '<a class="archive-link" href="' + '../../../../dom/' + domTree.children[topic].name + '/' + domTree.children[topic].children[year].name + '/' + domTree.children[topic].children[year].children[month].name + '/' +
                                        domTree.children[topic].children[year].children[month].children[post].name.substring(0, domTree.children[topic].children[year].children[month].children[post].name.length - 3) + '.html"><b>' + domTree.children[topic].children[year].children[month].children[post].name.substring(0, domTree.children[topic].children[year].children[month].children[post].name.length - 3) + "</b></a>";
                                }
                            }
                            // archiveNode += '</ul>';
                            // archiveNode += '    </li>';
                        }
                        archiveNode += '    </ul>';
                        archiveNode += '</li>';
                    }
                    archiveNode += '</ul>';
                    archiveNode += '</li>';
                }

                $('.archive').append(archiveNode);
                $('.posts').append('<div>' + postHtml + '</div>');

                $('.link').each(function (index) {
                    const currentHref = $(this).attr('href');
                    const currentSrc = $(this).attr('src');

                    if (currentHref !== undefined && currentHref != false) {
                        $(this).attr('href', '../../../../' + encodeURI(decodeURI(currentHref)));
                    }
                    if (currentSrc !== undefined && currentSrc != false) {
                        $(this).attr('src', '../../../../' + encodeURI(decodeURI(currentSrc)));
                    }
                });

                $('.img-fluid').each(function (index) {
                    const currentHref = $(this).attr('href');
                    const currentSrc = $(this).attr('src');

                    if (currentHref !== undefined && currentHref != false) {
                        $(this).attr('href', decodeURI(currentHref));
                    }
                    if (currentSrc !== undefined && currentSrc != false) {
                        $(this).attr('src', decodeURI(currentSrc));
                    }
                });

                $favicon = $('.favicon');
                const currentIconHref = $favicon.attr('href');
                if (currentIconHref !== undefined) {
                    $('.favicon').attr('href', '../../../../' + encodeURI(currentIconHref));
                }

                const date = new Date();
                let hours = (date.getHours());
                let minutes = (date.getMinutes());
                let hoursString = hours > 9 ? hours : "0" + hours;
                let minutesString = minutes > 9 ? minutes : "0" + minutes;
                const dateString = "Last updated on " +
                    date.getUTCDate() + "/" +
                    (date.getUTCMonth() + 1) + "/" +
                    date.getUTCFullYear() + " " +
                    hoursString + ":" +
                    minutesString + ", " +
                    Intl.DateTimeFormat().resolvedOptions().timeZone;

                $('.update-status').text(dateString);

                $('pre').each(function (index) {
                    $(this).addClass('shadow-sm p-3 bg-light');
                });
                
                $('.posts>div>h1').after('<h3>' + $('.posts>div>h1').text() + '</h3>').remove();
                $('.posts>div>h2').after('<h5>' + $('.posts>div>h2').text() + '</h5>').remove();

                let newText = $('h5').text() + '. <em style="font-size:15px;color:lightslategray;"></i><i class="fas fa-hourglass-half"></i> Read time: ' +
                    estimateReadingTime(postHtml) + "m</em>";

                $('h5').html(newText);

                let postMain = $('main').html();

                fsExtra.writeFileSync(
                    './dom/' + topic.name + '/' + year.name + '/' + month.name + '/' +
                    post.name.substring(0, post.name.length - 3) + '.html', $.html());

                // This section updates the index page
                if (post.date == mostRecentPost) {
                    contents = fsExtra.readFileSync('index.html', 'utf8');

                    $ = cheerio.load(contents);

                    $('.update-status').text(dateString);
                    $('.archive').empty();
                    $('.archive').append(archiveNode);
                    $('main').empty().append(postMain);

                    $('.img-fluid').each(function () {
                        const currentHref = $(this).attr('href');
                        const currentSrc = $(this).attr('src');

                        if (currentHref !== undefined && currentHref != false) {
                            $(this).attr('href', encodeURI(currentHref));
                        }
                        if (currentSrc !== undefined && currentSrc != false) {
                            $(this).attr('src', encodeURI(currentSrc));
                        }
                    });

                    $('.archive-link').each(function () {
                        let currentHref = $(this).attr('href');

                        $(this).attr('href', encodeURI(currentHref.substring(10, currentHref.length)));
                    });

                    fsExtra.writeFileSync('index.html', $.html());

                    // This section updates the portfolio page
                    contents = fsExtra.readFileSync('portfolio.html', 'utf8');

                    $ = cheerio.load(contents);

                    $('.archive').empty();
                    $('.archive').append(archiveNode);

                    $('.archive-link').each(function () {
                        let currentHref = $(this).attr('href');

                        $(this).attr('href', encodeURI(currentHref.substring(10, currentHref.length)));
                    });

                    fsExtra.writeFileSync('portfolio.html', $.html());

                    // This section updates the game base page
                    contents = fsExtra.readFileSync('game_base.html', 'utf8');

                    $ = cheerio.load(contents);

                    $('.archive').empty();
                    $('.archive').append(archiveNode);

                    fsExtra.writeFileSync('game_base.html', $.html());
                }
            }
        }
    }
}

function estimateReadingTime(fileText) {
    wpm = 100;
    wordLength = 5;

    let newFileText = voca.stripTags(fileText);
    let wordcount = voca.countWords(newFileText);
    let result = Math.ceil(wordcount / wpm);
    return result;
}