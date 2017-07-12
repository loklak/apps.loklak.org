import iso3166 from 'iso-3166-2';

export function containsObject(obj, list)
{
    let x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
        }
    }
    return false;
}

let countryReverseIndex = {};

for (let code in iso3166.codes) {
    let codeAlpha3 = iso3166.codes[code];
    countryReverseIndex[codeAlpha3] = code;
}

export function countryCodeConverter(code)
{
    let alpha3 = countryReverseIndex[code.toUpperCase()];
    if (alpha3) {
        return alpha3;
    }
    return code;
}
