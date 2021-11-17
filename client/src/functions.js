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
