// function compareChars(s1, s2) {
//     const d = minimumEditDistance(s1, s2);
//     // console.table(d);
// }

let res = compareSplitByDelim('xjw1263123', 'aef123111', '');
console.table(res);

function compareSplitByDelim(original, modified, delim) {
    delim = delim || '';
    let arr1 = original.split(delim);
    let arr2 = modified.split(delim);
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
    let sames = [];
    while (i >= 1 && j >= 1) {
        // console.log('track', i, j)
        if (matcheSingles[i][j]) {
            sames.unshift([i - 1, j - 1]);
        }
        let tmpI = backtrack[i][j][0];
        let tmpJ = backtrack[i][j][1];
        i = tmpI;
        j = tmpJ;
    }

    // console.table(distances);
    // console.table(matcheSingles);
    // console.table(backtrack);
    console.table(sames);

    let result = [
        // {
        //     same: false,
        //     o: ['a'],
        //     m: ['b'],
        // },
        // {
        //     same: true,
        //     o: ['a'],
        // },

    ];

    i = j = 0;
    let k = 0;
    let lastSame = true;
    let same = false;
    let done = false;
    while (!done) {
        let o = []; 
        let m = [];
        if (k == sames.length) break;
        let [nextI, nextJ] = sames[k];

        console.log('before', i, j);
        console.log('next', nextI, nextJ)
        while (i < nextI) {
            o.push(arr1[i]);
            i++;
        }
        while (j < nextJ) {
            m.push(arr2[j]);
            j++;
        }
        console.log('after', i, j);
        result.push({o, m});
        done = i == l1 && j == l2;
        k++;
    }
    console.log(arr1)
    console.log(arr2)

    return result;
}