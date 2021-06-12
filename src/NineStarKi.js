import { starMap } from "./stars.js";
import {starElement} from "./stars";

export function mainPersonality(year)       // Returns Nine Star Ki main personality from year
{
    let sum = 0;

    function modulus(a, n)                  // Mathematical modulus function
    {
        let result = a % n;
        if (((a < 0 && n > 0) || (a > 0 && n < 0)) && result !== 0)
            result += n;
        return result;
    }

    function sumOfDigits(integer)           // Returns the integral sum of digits in a two-digit integer
    {
        return Math.floor(integer / 10) + modulus(integer, 10);
    }

    for (let i = 0; i <= 3; i++)
        sum += modulus(Math.floor(Math.abs(year) / Math.pow(10, i)), 10);

    return sumOfDigits(11 - sumOfDigits(Math.sign(year) * sum));
}

export function personality(date)           // Returns Nine Star Ki numbers from date
{
    let year = date.getUTCFullYear();

    if (year < 1582) {              // Converts date from Julian to Gregorian
        let daysToAdd = Math.floor((year / 100) * 0.75 - 1.25);
        date = new Date(date.getTime() + daysToAdd*24*60*60*1000);
        year = date.getUTCFullYear();
    }

    let month = date.getUTCMonth() + 1,
        day = date.getUTCDate() + 1;

    function selfAndChallenge()         // Returns emotional self and life challenge from matrix
    {
        let c = mainPersonality(year);

        if (month === 2 & day >= 4 || month === 3 & day <= 5)
            return starMap[c][0];
        else if (month === 3 & day >= 6 || month === 4 & day <= 5)
            return starMap[c][1];
        else if (month === 4 & day >= 6 || month === 5 & day <= 5)
            return starMap[c][2];
        else if (month === 5 & day >= 6 || month === 6 & day <= 5)
            return starMap[c][3];
        else if (month === 6 & day >= 6 || month === 7 & day <= 7)
            return starMap[c][4];
        else if (month === 7 & day >= 8 || month === 8 & day <= 7)
            return starMap[c][5];
        else if (month === 8 & day >= 8 || month === 9 & day <= 7)
            return starMap[c][6];
        else if (month === 9 & day >= 8 || month === 10 & day <= 8)
            return starMap[c][7];
        else if (month === 10 & day >= 9 || month === 11 & day <= 7)
            return starMap[c][8];
        else if (month === 11 & day >= 8 || month === 12 & day <= 7)
            return starMap[c][0];
        else if (month === 12 & day >= 8 || month === 1 & day <= 5)
            return starMap[c][1];
        else if (month === 1 & day >= 6 || month === 2 & day <= 3)
            return starMap[c][2];
        else
            throw new Error("Date cannot be translated to Nine Star Ki number");
    }

    if (month === 1 & day >= 1 || month === 2 & day <= 3)
        year--;

    return mainPersonality(year).toString() + "." + selfAndChallenge().toString();
}

export function compareNumbers(a, b)
{
    const q = starElement[a] - starElement[b];

    if (a === b)
        return 'I';
    else if (q === 0)
        return 'i';
    else if (q === 1 || q === -4)
        return 's';
    else if (q === -1 || q === 4)
        return 't';
    else if (q === -2 || q === 3)
        return 'd';
    else if (q === 2 || q === -3)
        return 'c';
    else
        return 'n';
}

export function evaluate(r1, r2, r3)
{
    let x = 0;

    switch (r1)
    {
        case 's':
        case 't':
            x += 50;
            break;
        case 'I':
        case 'i':
            x += 30;
            break;
        default:
            break;
    }

    switch (r2)
    {
        case 's':
        case 't':
            x += 25;
            break;
        case 'I':
        case 'i':
            x += 15;
            break;
        default:
            break;
    }

    switch (r3)
    {
        case 's':
        case 't':
            x += 25;
            break;
        case 'I':
        case 'i':
            x += 15;
            break;
        default:
            break;
    }

    return x;
}

export function processNumbers(x, y)
{
    let x1 = x.substring(0, 1);
    let x2 = x.substring(2, 3);
    let x3 = x.substring(4);

    let y1 = y.substring(0, 1);
    let y2 = y.substring(2, 3);
    let y3 = y.substring(4);

    let r1 = compareNumbers(x1, y1);
    let r2 = compareNumbers(x2, y2);
    let r3 = compareNumbers(x3, y3);

    return evaluate(r1, r2, r3);
}

export function processNumber(x)
{
    let x1 = x.substring(0, 1);
    let x2 = x.substring(2, 3);
    let x3 = x.substring(4);
    let r = new Array(9);

    for ( let i = 0; i < 9; i++) {
        let y1 = (i + 1).toString();
        let r1 = compareNumbers(x1, y1);
        r[i] = new Array(9);

        for (let j = 0; j < 9; j++) {
            let k = starMap[y1][j];
            let y2 = k.substring(0, 1);
            let y3 = k.substring(2);
            let r2 = compareNumbers(x2, y2);
            let r3 = compareNumbers(x3, y3);

            r[i][j] = {
                n: `${y1}${y2}${y3}`,
                c: `${evaluate(r1, r2, r3)}%`
            }
        }
    }
    return r;
}
