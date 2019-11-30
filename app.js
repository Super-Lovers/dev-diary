const m2j = require('md-2-json');
const cheerio = require('cheerio');
const showdown = require('showdown');
let $ = require('jquery');
const dirTree = require('directory-tree');
const fsExtra = require('fs-extra');
const url = require('url');

const topicsString = [];
const topicsInstances = [];

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
    constructor(name) {
        this.name = name;
        this.title = '';
        this.date = '';
        this.content = '';
    }
}

const topicDirectories = [];
const yearDirectories = [];

const path = './blog';
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

topicsInstances.forEach(element => {
    fsExtra.readdirSync(path + '/' + element.name)
        .forEach(file => {
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
    
                        // console.log(newTopic.substring(newTopic.length - 2, newTopic.length));
                        
                        newMonth.posts.push(new Post(file));
                    }
                });
        }
    }
}

topicsInstances.forEach(topic => {
    if (fsExtra.exists('./dom/' + topic.name)) {
        fsExtra.removeSync('./dom/' + topic.name);
    }
    fsExtra.mkdirSync('./dom/' + topic.name);
    topic.years.forEach(year => {
        fsExtra.mkdirSync('./dom/' + topic.name + '/' + year.name);
        year.months.forEach(month => {
            fsExtra.mkdirSync('./dom/' + topic.name + '/' + year.name + '/' + month.name);
            month.posts.forEach(post => {
                const file = path + '/' + topic.name + '/' + year.name + '/' + month.name + '/' + post.name;
                fsExtra.readFileSync(file, 'utf8', function (err, contents) {
                    const converter = new showdown.Converter();
                    let postHtml = converter.makeHtml(contents);

                    fsExtra.readFileSync('base.html', 'utf8', function (err, contents) {
                        $ = cheerio.load(contents);

                        $('.link').each(function (index) {
                            const currentHref = $(this).attr('href');
                            const currentSrc = $(this).attr('src');
                            $(this).attr('href', '../../../../' + currentHref);
                            $(this).attr('src', '../../../../' + currentSrc);
                        });

                        const date = new Date();
                        const dateString = "Last updated on " + 
                        date.getUTCDate() + "/" + 
                        (date.getUTCMonth() + 1) + "/" + 
                        date.getUTCFullYear() + " " + 
                        (date.getUTCHours() + 1) + ":" +
                        date.getUTCMinutes() + ", " +
                        Intl.DateTimeFormat().resolvedOptions().timeZone;
                
                        $('.update-status').text(dateString);

                        // $('.posts').append('<div>' + postHtml + '</div>');

                        fsExtra.writeFileSync(
                            './dom/' + topic.name + '/' + year.name + '/' + month.name + '/' +
                            post.name.substring(0, post.name.length - 3) + '.html', $('html'));
                    });
                });
            })
        })
    })
});

let rootPath = './blog';
const domTree = dirTree(rootPath);

let archiveNode = '';

for (let topic = 0; topic < domTree.children.length; topic++) {
    if (domTree.children.length <= 0) {
        continue;
    }

    archiveNode += '<li>' + domTree.children[topic].name;
    archiveNode += '<ul>';
    for (let year = 0; year < domTree.children[topic].children.length; year++) {
        archiveNode += '<li>' + domTree.children[topic].children[year].name;
        archiveNode += '    <ul>';
        for (let month = 0; month < domTree.children[topic].children[year].children.length; month++) {
            archiveNode += '<li>' + domTree.children[topic].children[year].children[month].name;
            archiveNode += '<ul>';
            for (let post = 0; post < domTree.children[topic].children[year].children[month].children.length; post++) {
                const postName = domTree.children[topic].children[year].children[month].children[post].name;
                if (postName.substring(postName.length - 2, postName.length) == "md") {
                    archiveNode += '    <li>' + '<a href="../../../../dom/' + domTree.children[topic].name + '/' + domTree.children[topic].children[year].name + '/' + domTree.children[topic].children[year].children[month].name + '/' +
                    domTree.children[topic].children[year].children[month].children[post].name.substring(0, domTree.children[topic].children[year].children[month].children[post].name.length - 3) + '.html"><b>' + domTree.children[topic].children[year].children[month].children[post].name.substring(0, domTree.children[topic].children[year].children[month].children[post].name.length - 3) + "</b></a>";
                }
            }
            archiveNode += '</ul>';
            archiveNode += '    </li>';
        }
        archiveNode += '    </ul>';
        archiveNode += '</li>';
    }
    archiveNode += '</ul>';
    archiveNode += '</li>';
}

topicsInstances.forEach(topic => {
    topic.years.forEach(year => {
        year.months.forEach(month => {
            month.posts.forEach(post => {
                const file = path + '/' + topic.name + '/' + year.name + '/' + month.name + '/' + post.name;
                fsExtra.readFile(file, 'utf8', function (err, contents) {
                    const converter = new showdown.Converter();
                    let postHtml = converter.makeHtml(contents);

                    fsExtra.readFile('base.html', 'utf8', function (err, contents) {
                        $ = cheerio.load(contents);

                        $('.link').each(function (index) {
                            const currentHref = $(this).attr('href');
                            const currentSrc = $(this).attr('src');
                            $(this).attr('href', '../../../../' + currentHref);
                            $(this).attr('src', '../../../../' + currentSrc);
                        });

                        $('.posts').append('<div>' + postHtml + '</div>');

                        $('.archive').empty();
                        $('.archive').append(archiveNode);

                        const date = new Date();
                        const dateString = "Last updated on " + 
                        date.getUTCDate() + "/" + 
                        (date.getUTCMonth() + 1) + "/" + 
                        date.getUTCFullYear() + " " + 
                        (date.getUTCHours() + 1) + ":" +
                        date.getUTCMinutes() + ", " +
                        Intl.DateTimeFormat().resolvedOptions().timeZone;
                
                        $('.update-status').text(dateString);

                        fsExtra.writeFileSync(
                            './dom/' + topic.name + '/' + year.name + '/' + month.name + '/' +
                            post.name.substring(0, post.name.length - 3) + '.html', $('html'));
                    });
                });
            })
        })
    })
});

setTimeout(() => {
    archiveNode = '';

    for (let topic = 0; topic < domTree.children.length; topic++) {
        if (domTree.children.length <= 0) {
            continue;
        }

        archiveNode += '<li>' + domTree.children[topic].name;
        archiveNode += '<ul>';
        for (let year = 0; year < domTree.children[topic].children.length; year++) {
            archiveNode += '<li>' + domTree.children[topic].children[year].name;
            archiveNode += '    <ul>';
            for (let month = 0; month < domTree.children[topic].children[year].children.length; month++) {
                archiveNode += '<li>' + domTree.children[topic].children[year].children[month].name;
                archiveNode += '<ul>';
                for (let post = 0; post < domTree.children[topic].children[year].children[month].children.length; post++) {
                    const postName = domTree.children[topic].children[year].children[month].children[post].name;
                    if (postName.substring(postName.length - 2, postName.length) == "md") {
                        archiveNode += '    <li>' + '<a href="./dom/' + domTree.children[topic].name + '/' + domTree.children[topic].children[year].name + '/' + domTree.children[topic].children[year].children[month].name + '/' +
                        domTree.children[topic].children[year].children[month].children[post].name.substring(0, domTree.children[topic].children[year].children[month].children[post].name.length - 3) + '.html"><b>' + domTree.children[topic].children[year].children[month].children[post].name.substring(0, domTree.children[topic].children[year].children[month].children[post].name.length - 3) + "</b></a>";
                    }
                }

                archiveNode += '</ul>';
                archiveNode += '    </li>';
            }
            archiveNode += '    </ul>';
            archiveNode += '</li>';
        }
        archiveNode += '</ul>';
        archiveNode += '</li>';
    }

    fsExtra.readFile('base.html', 'utf8', function (err, contents) {
        $ = cheerio.load(contents);

        $('.archive').empty();
        $('.archive').append(archiveNode);

        const date = new Date();
        const dateString = "Last updated on " + 
        date.getUTCDate() + "/" + 
        (date.getUTCMonth() + 1) + "/" + 
        date.getUTCFullYear() + " " + 
        (date.getUTCHours() + 1) + ":" +
        date.getUTCMinutes() + ", " +
        Intl.DateTimeFormat().resolvedOptions().timeZone;

        $('.update-status').text(dateString);

        fsExtra.writeFileSync(
            'index.html', $('html'));
    });
}, 6000)