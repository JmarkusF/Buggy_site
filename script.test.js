const calculateBuggyResponse = require('./script');

test('way too hot',() => {
    for (let temp = 86; temp <= 100; temp++ ) {
        expect(calculateBuggyResponse(temp, 1)).toStrictEqual(['It is too hot for me. My paws would get burnt by the pavement, and I might get heat stroke if I am out for too long. Water and shade help.',"Buggy Too Hot.JPEG"])
    }
})
test('kind of hot',() => {
    for (let temp = 76; temp <= 85; temp++ ) {
        expect(calculateBuggyResponse(temp, 1)).toStrictEqual(['Kind of hot for me! Maybe a short walk or laying down outside.',"Buggy Hot.jpeg"])
    }
})

test('hot',() => {
    for (let temp = 66; temp <= 75; temp++) {
    expect(calculateBuggyResponse(temp,2)).toStrictEqual(["It is nice, but I sure don't want it to get any warmer! Maybe a rest break in 15 to 20.","Kind of Hot.JPEG"])
    }
})

test('perfect walk',() => {
    for (let temp = 50; temp <= 65; temp++) {
    expect(calculateBuggyResponse(temp,2)).toStrictEqual(['Perfect day for a long walk with lots of smells, pets, and treats!!!', "Buggy Perfect Day.JPEG"])
    }
})

test('kind of cold',() => {
    for (let temp = 30; temp <= 49; temp++) {
    expect(calculateBuggyResponse(temp, 1)).toStrictEqual(['Kind of cold for me! Maybe a medium walk, or a jacket for a longer walk. But we should definitely go get coffee!', "Kind of Cold.JPEG"])
    }
})

test('too cold',() => {
    for (let temp = 15; temp <= 29; temp++) {
    expect(calculateBuggyResponse(temp, 1)).toStrictEqual(["If it isn't wet out, and with a jacket, I should be okay for a medium walk. But if it is wet out, my paws won't last more than 5 to 10 minutes.","Buggy Cold.JPEG"])
    }
})

test('way too cold',() => {
    for (let temp = 0; temp <= 14; temp++) {
    expect(calculateBuggyResponse(temp, 1)).toStrictEqual(["I would love to just use the bathroom.","Buggy Too Cold.PNG"])
    }
})
test('way too rainy',() => {
    for (let temp = 0; temp <= 14; temp++) {
    expect(calculateBuggyResponse(temp, 63)).toStrictEqual(["I would love to just use the bathroom. Seems to be some percipitation as well, so probably a shorter than normal walk, unfortunately.","Weather Code.JPEG"])
    }
})