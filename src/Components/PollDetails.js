class PollDetails {
    constructor(id, title, author, start, end, count, optionText, voteCount) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.start = start;
        this.end = end;
        this.count = count;
        this.optionText = optionText;
        this.voteCount = voteCount;
    }
    toString() {
        return this.title + " " + this.author;
    }
};

var PollDetailsConverter = {
    toFirestore: function (newPoll) {
        return {
            id: newPoll.id,
            title: newPoll.title,
            author: newPoll.author,
            start: newPoll.start,
            end: newPoll.end,
            optionCount: newPoll.optionCount,
            options: newPoll.options,
            voteCount: newPoll.voteCount,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new PollDetails(data.id, data.title, data.author, data.start, data.end, data.optionCount, data.options, data.voteCount);
    }
};