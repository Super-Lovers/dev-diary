const fs = require('fs');
const m2j = require('md-2-json');

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
        this.articles = [];
    }
}

class Article {
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
fs.readdirSync(path)
.forEach((file) => {
    const filePath = path + '/' + file;
    const fileStatus = fs.statSync(filePath);

    if (fileStatus.isDirectory()) {
        topicDirectories.push(filePath);
        // console.log(file.substring(8, file.length));
        
        const topic = topicsString.includes(file);
        if (topic == false) {
            const newTopic = new Topic(file);
            topicsInstances.push(newTopic);

            topicsString.push(file);
        }
    }
});

topicsInstances.forEach(element => {
    fs.readdirSync(path + '/' + element.name)
    .forEach(file => {
        yearDirectories.push(element + '/' + file);
        
        for (var i = 0; i < topicsInstances.length; i++) {
            if (topicsInstances[i].name == element.name) {
                const topic = topicsInstances[i];
                const newYear = new Year(file);
                if (!topic.years.includes(newYear))
                {
                    topic.years.push(newYear);
                }
            }
        }
    });
});

for (var i = 0; i < topicsInstances.length; i++)
{
    for (var j = 0; j < topicsInstances[i].years.length; j++)
    {
        const pathToMonths = path + '/' + topicsInstances[i].name + '/' + topicsInstances[i].years[j].name;
        fs.readdirSync(pathToMonths)
        .forEach(file => {
            var topic;
            for (var k = 0; k < topicsInstances.length; k++) {
                if (topicsInstances[k].name == topicsInstances[i].name) {
                    topic = topicsInstances[k];
                }
            }

            var year;
            for (var k = 0; k < topic.years.length; k++)
            {
                if (topic.years[k].name == topicsInstances[i].years[j].name) {
                    year = topicsInstances[i].years[j];
                }
            }
            
            year.months.push(new Month(file));
        });
    }
}

for (var topic = 0; topic < topicsInstances.length; topic++)
{
    for (var year = 0; year < topicsInstances[topic].years.length; year++)
    {
        for (var month = 0; month < topicsInstances[topic].years[year].months.length; month++)
        {
            const pathToArticles = 
                path + '/' + 
                topicsInstances[topic].name + '/' + 
                topicsInstances[topic].years[year].name + '/' +
                topicsInstances[topic].years[year].months[month].name;

            fs.readdirSync(pathToArticles)
            .forEach(file => {
                var newTopic;
                for (var i = 0; i < topicsInstances.length; i++) {
                    if (topicsInstances[i].name == topicsInstances[topic].name) {
                        newTopic = topicsInstances[i];
                    }
                }

                var newYear;
                for (var i = 0; i < newTopic.years.length; i++)
                {
                    if (newTopic.years[i].name == topicsInstances[topic].years[year].name) {
                        newYear = topicsInstances[topic].years[year];
                    }
                }

                var newMonth;
                for (var i = 0; i < newYear.months.length; i++)
                {
                    if (newYear.months[i].name == topicsInstances[topic].years[year].months[month].name) {
                        newMonth = topicsInstances[topic].years[year].months[month];
                    }
                }
                
                newMonth.articles.push(new Article(file));
            });
        }
    }
}

topicsInstances.forEach(topic => {
    topic.years.forEach(year => {
        year.months.forEach(month => {
            month.articles.forEach(article => {
                const file = path + '/' + topic.name + '/' + year.name + '/' + month.name + '/' + article.name;
                var json;

                fs.readFile(file, 'utf8', function(err, contents) {
                    json = m2j.parse(contents);
                    console.log(json);
                });
            })
        })
    })
});



// m2j.parse();