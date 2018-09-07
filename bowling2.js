var game = function (scores) {
    this.frames = [];
    this.rolls = []
    this.rollNumberCounter = 0;
    this.scores = scores;
    this.scoreList = [];
    this.grandTotal = 0;
}

game.prototype.mapScoresToFrames = function () {
    this.scores.forEach((score, i) => {
        i++;
        var frame = {}
        // frame.total=score.split(' ').reduce((el1,el2)=>{
        //     return parseInt(el1)+parseInt(el2)
        // })
        frame.rolls = score.split(' ').map((el) => {
            return parseInt(el)
        })
        frame.total = frame.rolls.reduce((roll1, roll2) => {
            return roll1 + roll2
        })
        frame.index = i;
        frame.rolls.forEach((el, i) => {
            this.createRollsList(frame, el, i + 1);
        })

        this.frames.push(frame)
    })
    return this
}

game.prototype.createRollsList = function (frame, score, index) {
    var roll = {};

    this.rollNumberCounter++;
    roll.rollListIndex = this.rollNumberCounter;
    roll.frame = frame.index;
    roll.frameScoreIndex = index
    roll.value = score

    roll.bonus = this.defineBonusType(frame, roll)
    this.rolls.push(roll);
    return this
}

game.prototype.defineBonusType = function (frame, roll) {
    var STRIKE = 2
    var SPARE = 1
    var NONE = 0
    if (frame.index > 10) {
        return NONE
    } else if (roll.value === 10 && roll.frameScoreIndex===1) {
        return STRIKE
    } else if (frame.total === 10 && roll.frameScoreIndex === 2) {
        return SPARE
    } else {
        return NONE
    }

}

game.prototype.createScoreList = function () {
    var rollsLength = this.rolls.length;
    this.rolls.forEach((roll) => {

        if (roll.frame < 11) {

            switch (roll.bonus) {
                case 2:
                    if (rollsLength - roll.rollListIndex >= 2) {
                        var secondNextRoll = roll.rollListIndex + 1;
                        return this.scoreList.push(
                            roll.value,
                            this.rolls[roll.rollListIndex].value,
                            this.rolls[secondNextRoll].value
                        )
                    } else {
                        return this.scoreList.push(roll.value)
                    }
                case 1:
                    if (rollsLength - roll.rollListIndex >= 1) {
                        return this.scoreList.push(
                            roll.value,
                            this.rolls[roll.rollListIndex].value,
                        )
                    } else {
                        return this.scoreList.push(roll.value)
                    }
                case 0:
                    return this.scoreList.push(roll.value)
            }
        }
    })
    return this
}

game.prototype.calculateGrandTotal = function () {
    this.grandTotal = this.scoreList.reduce((score1, score2) => {
        return score1 + score2;
    })
}

//300
//var newGame = new game(["10", "10", "10", "10", "10", "10", "10", "10", "10", "10","10","10"])
//78
//var newGame = new game(["1 2","2 3","3 4","4 5","5 4", "6 3", "5 4", "7 2", "8 1", "9 0"])
//96
//var newGame = new game(["1 0", "2 2", "10", "3 3", "0 10", "1 9", "3 7", "10", "1 2", "9 0"])
//111
//var newGame = new game(["1 0","1 9","3 3","10","2 2","0 10","3 7","1 9","1 9","10","8 0"])
var newGame = new game(["1 0","1 9","3 3","10","2 2","0 10","3 7","1 9","1 9","10","8 0"])
newGame.mapScoresToFrames().createScoreList().calculateGrandTotal()

newGame.rolls.forEach((el) => {
    console.log(JSON.stringify(el))
})
console.log(newGame.scoreList, newGame.grandTotal);