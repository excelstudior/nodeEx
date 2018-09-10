const {game}=require('./game');

const games=[
    ["10", "10", "10", "10", "10", "10", "10", "10", "10", "10","10","10","10"],
    ["10", "10", "10", "10", "10", "10", "10", "10", "10", "10","10","10"],
    ["1 2","2 3","3 4","4 5","5 4", "6 3", "5 4", "7 2", "8 1", "9 0"],
    ["1 0", "2 2", "10", "3  A3", "0 10", "1 9", "3 7", "10", "1 2", "9 0"],
    ["1 0", "2 2", "10", "3 3", "0 10", "1 9", "3 7", "10", "1 2", "9 0"],
    ["1 0","1 9","3 3","10","2 2","0 10","3 7","1 9","1 9","10","8 0"],
    ["1 0","1 9","2 2","1 9","10","3 3","10","8 2","3 7","1 9","1"],
    ["1 0","1 9","3 3","10","2 2","0 10","3 7","1 9","1 9","10","10","10"]
]

games.forEach((g,i)=>{
    let newGame=new game(g)
    newGame.mapScoresToFrames().createScoreList().calculateGrandTotal();

    if (newGame.errors.length===0){
        console.log('Game '+(i+1)+' grand totals are '+newGame.grandTotal);
    } else {
        console.log('Game '+(i+1)+' has error(s)')
        newGame.errors.forEach((el)=>{
            console.log(el)
        })
    }
    
})