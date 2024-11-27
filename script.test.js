const calculateBuggyRespone = require('./script');

test('kind of hot',() => {
    for (let temp = 80; temp <=89; temp++ ) {
        expect(calculateBuggyRespone(temp, 1)).toBe('Kind of Hot for me! Maybe a short walk or laying down outside.')
    }
})

test('kind of cold',() => {
    expect(calculateBuggyRespone(32, 1)).toBe('Kind of Cold for me! Maybe a short walk.')
})

test('perfect walk',() => {
    expect(calculateBuggyRespone(60,2)).toBe('Perfect day for a long walk with lots of chicken bones!!! Hail chicken bone!')
})