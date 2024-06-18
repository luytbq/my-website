let s1 = 'sabdiref';
let s2 = 'asebacddef';

compare(s1, s2);

function compare(s1, s2) {
    let l1 = s1.length;
    let l2 = s2.length;
    console.log('l1:', l1, 'l2:', l2);

    let dp = new Array(l1 + 1).fill(0).map(() => new Array(l2 + 1).fill(0));
    let st = new Array();

    for (let i = 1; i <= l1; i++) {
        for (let j = 1; j <= l2; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                st.push([i, j], dp[i][j]);
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    for (let i = 0; i < l1; i++) {
        dp[i+1][0] = s1.charAt(i);
    }

    for (let i = 0; i < l2; i++) {
        dp[0][i+1] = s2.charAt(i);
    }

    const res = backtrack(dp, s1, s2, l1, l2);
    console.log('res:', res);
}

function backtrack(dp, s1, s2, i, j) {
    // let p = '';
    // console.log('this', this);
    if (i === 0 || j === 0) {
        return [];
    }

    if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
        console.log(i, j, s1.charAt(i - 1));
        return [...backtrack(dp, s1, s2, i - 1, j - 1), [i-1, j-1]];
    }

    if (dp[i][j - 1] > dp[i - 1][j]) {
        return backtrack(dp, s1, s2, i, j - 1);
    } else {
        return backtrack(dp, s1, s2, i - 1, j);
    }
}

function print2DArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        print1DArray(arr[i]);
    }
}

function print1DArray(arr) {
    console.log(arr.reduce((acc, cur) => acc + ' ' + cur, ''));
}