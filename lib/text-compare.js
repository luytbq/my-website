// function compareChars(s1, s2) {
//     const d = minimumEditDistance(s1, s2);
//     // console.table(d);
// }

// compareChars('1263123', '123111', '');
function compareChars(s1, s2, delim) {
    delim = delim || '';
    let arr1 = s1.split(delim);
    let arr2 = s2.split(delim);
    const l1 = arr1.length;
    const l2 = arr2.length;
    // console.log('length', l1, l2);
    const distances = new Array(l1 + 1).fill(null).map(e => new Array(l2 + 1));
    const backtrack = new Array(l1 + 1).fill(null).map(e => new Array(l2 + 1))
    const matcheSingles = new Array(l1 + 1).fill(null).map(e => new Array(l2 + 1))

    for (let i = 0; i <= l1; i++) {
        distances[i][0] = i;
    }
    for (let j = 0; j <= l2; j++) {
        distances[0][j] = j;
    }

    for (let i = 1; i <= l1; i++) {
        for (let j = 1; j <= l2; j++) {
            if (arr1[i - 1] == arr2[j - 1]) {
                distances[i][j] = distances[i - 1][j - 1];
                backtrack[i][j] = [i - 1, j - 1];
                matcheSingles[i][j] = true;
            } else if (distances[i][j - 1] <= distances[i - 1][j]) {
                distances[i][j] = distances[i][j - 1] + 1;
                backtrack[i][j] = [i, j - 1];
            } else {
                distances[i][j] = distances[i - 1][j] + 1;
                backtrack[i][j] = [i - 1, j];
            }
        }
    }

    let i = l1;
    let j = l2;
    let result = {
        s1: [],
        s2: []
    };
    let sames = [];
    while (i >= 1 && j >= 1) {
        // console.log('track', i, j)
        if (matcheSingles[i][j]) {
            sames.push([i, j]);
        }
        let tmpI = backtrack[i][j][0];
        let tmpJ = backtrack[i][j][1];
        i = tmpI;
        j = tmpJ;
    }

    console.table(distances);
    console.table(matcheSingles);
    console.table(backtrack);
    console.table(sames);

    let k = sames.length - 1;
    for (let i = 0; i <= l1; i++) {
        if (k < 0) {
            result.s1.push(false) // insert/delete
        } else if (i + 1 == sames[k][0]) {
            result.s1.push(true) // match;
            k--;
        } else {
            result.s1.push(false) // insert/delete
        }
    }
    k = sames.length - 1;
    for (let j = 0; j <= l2; j++) {
        if (k < 0) {
            result.s2.push(false) // insert/delete
        } else if (j +1 == sames[k][1]) {
            result.s2.push(true) // match;
            k--;
        } else {
            result.s2.push(false) // insert/delete
        }
    }

    console.table(result);
    return result;
}