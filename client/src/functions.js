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

// export const dateFrom

// Helper function for getQuizLeaderboard() and getPlatformLeaderboard()
// Takes leaderboard, returns dict of top X players sorted by descending score
const getTopX = function(dict, x) {
    // Convert to list
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
    // Sort list by values
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    // Get top 5
    items = items.slice(0, x);
    // Create leaderboard dictionary object
    const leaderboard = {}
    for (var i in items) {
        leaderboard[items[i][0]] = items[i][1];
    }
    return leaderboard
}

// Sort quiz leaderboard in descending order
export const getQuizLeaderboard = function (quiz) {
    var dict = {}
    // Get data from quiz object
    for(var player in quiz.leaderboard) {
        const score = quiz.leaderboard[player]
        dict[player] = score
    }
    return getTopX(dict, 5);
}

export const getPlatformLeaderboard = function (quizLeaderboard) {
    // Add scores from all quiz leaderboards
    var lb = {};
    for (const quiz of quizLeaderboard) {
        if (quiz.leaderboard) {
            for (const player in quiz.leaderboard) {
                if (player in lb)
                    lb[player] += parseInt(quiz.leaderboard[player]);
                else
                    lb[player] = parseInt(quiz.leaderboard[player]);
            }
        }
    }
    return getTopX(lb, 5);
}

export const formatTime = (stopwatch) => {
    var time = new Date(stopwatch * 1000).toISOString().substr(14, 5);
    return time;
}