
var rolls=["10","10","10","10","10","10","10","10","10","10","10","10"]
// var rolls=["1 2","2 3","3 4","4 5","5 4","6 3","5 4","7 2","8 1","9 0"]
// var rolls=["1 0","2 2","10","3 3","0 10","1 9","3 7","10","1 2","9 0"]
// var rolls=["1 0","1 9","3 3","10","2 2","0 10","3 7","1 9","1 9","10","8 0"]
// var rolls=["1 0","1 9","2 2","1 9","10","3 3","10","8 2","3 7","1 9","1"]
// var rolls=["1 0","1 9","3 3","10","2 2","0 10","3 7","1 9","1 9","10","10","10"]

var games=[
//  ["10","10","10","10","10","10","10","10","10","10","10","10"]
// ,["1 2","2 3","3 4","4 5","5 4","6 3","5 4","7 2","8 1","9 0"]
// ,
["1 0","2 2","10","3 3","0 10","1 9","3 7","10","1 2","9 0"]
// ,["1 0","1 9","3 3","10","2 2","0 10","3 7","1 9","1 9","10","8 0"]
// ,["1 0","1 9","2 2","1 9","10","3 3","10","8 2","3 7","1 9","1"]
// ,["1 0","1 9","3 3","10","2 2","0 10","3 7","1 9","1 9","10","10","10"]

]


var mapGameToframes = function (game) {
    var frames = [];
    var rolls=[]
    var rollNumber=1;
    game.forEach((play, i) => {
        // let roll={"score":0,
        //             "frame":0,
        //             "bonus":0};
        let frame=play.split(' ').map((el)=>parseInt(el))
        //let bonus=getBonusType(frame)
        frame.forEach((roll,i)=>{

        })
        // let rolls = g.split(' ').map((el) => parseInt(el));
        // total = rolls.reduce((s1, s2) => s1 + s2);
        // bonus = getBonusType(rolls);

        // let frame = {}
        // frame[i] = {
        //     "rolls": rolls,
        //     "total": total,
        //     "bonus": bonus
        // }
        // frames.push(frame)
    })

    return rolls;
}

var getBonusType = function (frame) {
    let STRIKE = 2
    let SPARE = 1
    let NONE = 0

    switch (frame.length) {
        case 1:
            if ((frame[0]) === 10) {
                return STRIKE
            } else {
                return NONE
            }

        case 2:
            if ((frame[0]) + (frame[1]) === 10) {
                return SPARE
            } else {
                return NONE
            }
        default:
            return NONE
    }
}

var createScoreList = function (frames) {
    var scoreList = [];
    frames.forEach((frame, i, frames) => {
        i++;
        var numberOfFrames = frames.length
        if(i>10){
            return 0
        }
        scoreList.push(frame[i].total)
        switch (frame[i].bonus) {
            case 0:
                return 0
            case 1:
                if ((numberOfFrames - i) >= 1) {
                    return scoreList.push(frames[i][i + 1].rolls[0])
                } else {
                    return 0
                }
            case 2:
                if ((numberOfFrames - i) >= 2) {
                    switch(frames[i][i+1].rolls.length){
                        case 2:
                        return scoreList.push(frames[i][i + 1].total);
                        case 1:
                        return scoreList.push(frames[i][i+1].to)    
                    }
                    
                } else if ((numberOfFrames - i) >= 1 && i < 10) {
                    return scoreList.push(frames[i][i + 1].total)
                }
            default:
                return 0
        }


    })
    return scoreList
}

// mapRollsToframes(rolls).forEach((frame)=>{
//     console.log(frame)
// })

var calculateGrandTotal = function (scoreList) {
    return scoreList.reduce((score1, score2) => {
        return score1 + score2
    })
}

// games.forEach((game)=>{console.log(calculateGrandTotal(createScoreList(mapGameToframes(game))))})
// games.forEach((game)=>{console.log(createScoreList(mapGameToframes(game)))})
games.forEach((game)=>{
    
    console.log((mapGameToframes(game)))})


