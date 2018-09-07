var game= function (scores) {
    this.frames = [];
    this.rolls=[]
    this.rollNumberCounter=0;
    this.scores=scores;
    this.scoreList=[];
    this.grandTotal=0;
}

game.prototype.mapScoresToFrames=function(){
    this.scores.map((score,i)=>{
        i++;
        var frame={}
        // frame.total=score.split(' ').reduce((el1,el2)=>{
        //     return parseInt(el1)+parseInt(el2)
        // })
        frame.rolls=score.split(' ').map((el)=>{
            return parseInt(el)
        })
        frame.total=frame.rolls.reduce((roll1,roll2)=>{
            return roll1+roll2
        })
        frame.index=i;
        frame.rolls.forEach((el,i)=>{
            this.createRollsList(frame,el,i+1);
        })

        this.frames.push(frame)
    })
    return this
}

game.prototype.createRollsList=function(frame,score,index){
    var roll={};
    var properties={}
    this.rollNumberCounter++;
    var rollListIndex=this.rollNumberCounter;
    roll[rollListIndex]=properties;
    properties.frame=frame.index;
    properties.frameScoreIndex=index
    properties.value=score
    
    roll[rollListIndex].bonus=this.defineBonusType(frame,roll,rollListIndex)
    this.rolls.push(roll);
    return this
}

game.prototype.defineBonusType=function(frame,roll,rollListIndex){
    var STRIKE = 2
    var SPARE = 1
    var NONE = 0
    if (frame.index>10){
        return NONE
    } else if (roll[rollListIndex].value===10){
        return STRIKE
    } else if (frame.total===10 && roll[rollListIndex].frameScoreIndex===2){
        return SPARE
    } else {
        return NONE
    }
   
}

game.prototype,calculateGrandTotal=function(){
    this.rolls.forEach((roll,i)=>{
        var currentRoll=(i+1).toString();
        var nextRoll=(i+2).toString();
        var secondNextRoll=(i+3).toString();
        if (roll[currentRoll].frame<11){
            //console.log(roll[currentRoll])

            switch(roll[currentRoll].bonus){
                case 2:
                 this.scoreList.push(
                    roll[currentRoll].value,
                    rolls[nextRoll].value,
                    roll[secondNextRoll].value
                )
                case 1:
                this.scoreList.push(
                    roll[currentRoll].value,
                    rolls[nextRoll].value,
                )
                default:
                this.scoreList.push(roll[currentRoll].value)
            }
            

        } 
        return this
    })
  
}

var newGame=new game(["1 0","2 2","10","3 3","0 10","1 9","3 7","10","1 2","9 0"])
newGame.mapScoresToFrames().calculateGrandTotal();
//newGame.calculateGrandTotal();
// newGame.createRollsList();
// console.log(newGame.frames,newGame.rolls,newGame.rollNumberCounter);
// newGame.rolls.forEach((el)=>{
//     console.log(JSON.stringify(el))
// })
console.log(newGame.scoreList);