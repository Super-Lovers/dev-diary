const fs = require('fs');
const m2j = require('md-2-json');
const cheerio = require('cheerio');

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
        
        for (let i = 0; i < topicsInstances.length; i++) {
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

for (let i = 0; i < topicsInstances.length; i++)
{
    for (let j = 0; j < topicsInstances[i].years.length; j++)
    {
        const pathToMonths = path + '/' + topicsInstances[i].name + '/' + topicsInstances[i].years[j].name;
        fs.readdirSync(pathToMonths)
        .forEach(file => {
            let topic;
            for (let k = 0; k < topicsInstances.length; k++) {
                if (topicsInstances[k].name == topicsInstances[i].name) {
                    topic = topicsInstances[k];
                }
            }

            let year;
            for (let k = 0; k < topic.years.length; k++)
            {
                if (topic.years[k].name == topicsInstances[i].years[j].name) {
                    year = topicsInstances[i].years[j];
                }
            }
            
            year.months.push(new Month(file));
        });
    }
}

for (let topic = 0; topic < topicsInstances.length; topic++)
{
    for (let year = 0; year < topicsInstances[topic].years.length; year++)
    {
        for (let month = 0; month < topicsInstances[topic].years[year].months.length; month++)
        {
            const pathToposts = 
                path + '/' + 
                topicsInstances[topic].name + '/' + 
                topicsInstances[topic].years[year].name + '/' +
                topicsInstances[topic].years[year].months[month].name;

            fs.readdirSync(pathToposts)
            .forEach(file => {
                let newTopic;
                for (let i = 0; i < topicsInstances.length; i++) {
                    if (topicsInstances[i].name == topicsInstances[topic].name) {
                        newTopic = topicsInstances[i];
                    }
                }

                let newYear;
                for (let i = 0; i < newTopic.years.length; i++)
                {
                    if (newTopic.years[i].name == topicsInstances[topic].years[year].name) {
                        newYear = topicsInstances[topic].years[year];
                    }
                }

                let newMonth;
                for (let i = 0; i < newYear.months.length; i++)
                {
                    if (newYear.months[i].name == topicsInstances[topic].years[year].months[month].name) {
                        newMonth = topicsInstances[topic].years[year].months[month];
                    }
                }
                
                newMonth.posts.push(new Post(file));
            });
        }
    }
}


fs.readFile('index.html', 'utf8', function(err, contents) {
    const $ = cheerio.load(contents);
});