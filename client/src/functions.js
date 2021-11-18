// Parses url string
// NASA%20Missions -> NASA Missions
export const parse = (url) => {
    var parsed = "";
    for (var i = 0; i < url.length; i++) {
        // interpret %20 as a space character
        if (url[i] == '%') {
            parsed += ' ';
            i += 2;
        }
        else
            parsed += url[i];
    }
    return parsed
}

// get Date from objectID
export const dateFromObjectId = function (objectId) {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

// Sort quiz leaderboard in descending order
export const getQuizLeaderboard = function (quiz) {
    var dict = {}
    // Get data from quiz object
    for(var player in quiz.leaderboard) {
        const score = quiz.leaderboard[player]
        dict[player] = score
    }
    // Convert to list
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
    // Sort list by values
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    items = items.slice(0, 5);
    // Create leaderboard dictionary object
    const leaderboard = {}
    for (var i in items) {
        leaderboard[items[i][0]] = items[i][1];
    }
    return leaderboard
}