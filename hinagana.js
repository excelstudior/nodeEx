let cha=[{vowel:'a',consonant:'h',hinagara:'は',katakana:'ハ',shown:true},
{vowel:'i',consonant:'h',hinagara:'ひ',katakana:'ヒ',shown:true},
{vowel:'u',consonant:'h',hinagara:'ふ',katakana:'フ',shown:true},
{vowel:'e',consonant:'h',hinagara:'へ',katakana:'ヘ',shown:true},
{vowel:'o',consonant:'h',hinagara:'ほ',katakana:'ホ',shown:true},

{vowel:'a',consonant:'a',hinagara:'あ',katakana:'ア',shown:true},
{vowel:'i',consonant:'a',hinagara:'い',katakana:'イ',shown:true},
{vowel:'u',consonant:'a',hinagara:'う',katakana:'ウ',shown:true},
{vowel:'e',consonant:'a',hinagara:'え',katakana:'エ',shown:true},
{vowel:'o',consonant:'a',hinagara:'お',katakana:'オ',shown:true},

{vowel:'a',consonant:'k',hinagara:'か',katakana:'カ',shown:false},
{vowel:'i',consonant:'k',hinagara:'き',katakana:'キ',shown:true},
{vowel:'u',consonant:'k',hinagara:'く',katakana:'ク',shown:true},
{vowel:'e',consonant:'k',hinagara:'け',katakana:'ケ',shown:true},
{vowel:'o',consonant:'k',hinagara:'こ',katakana:'コ',shown:true},

{vowel:'a',consonant:'s',hinagara:'さ',katakana:'サ',shown:false},
{vowel:'i',consonant:'s',hinagara:'し',katakana:'シ',shown:true},
{vowel:'u',consonant:'s',hinagara:'す',katakana:'ス',shown:true},
{vowel:'e',consonant:'s',hinagara:'せ',katakana:'セ',shown:true},
{vowel:'o',consonant:'s',hinagara:'そ',katakana:'ソ',shown:true},

{vowel:'a',consonant:'t',hinagara:'た',katakana:'タ',shown:false},
{vowel:'i',consonant:'t',hinagara:'ち',katakana:'チ',shown:true},
{vowel:'u',consonant:'t',hinagara:'つ',katakana:'ツ',shown:true},
{vowel:'e',consonant:'t',hinagara:'て',katakana:'テ',shown:true},
{vowel:'o',consonant:'t',hinagara:'と',katakana:'ト',shown:true},

{vowel:'a',consonant:'n',hinagara:'な',katakana:'ナ',shown:false},
{vowel:'i',consonant:'n',hinagara:'に',katakana:'ニ',shown:true},
{vowel:'u',consonant:'n',hinagara:'ぬ',katakana:'ヌ',shown:true},
{vowel:'e',consonant:'n',hinagara:'ね',katakana:'ネ',shown:true},
{vowel:'o',consonant:'n',hinagara:'の',katakana:'ノ',shown:true},

{vowel:'a',consonant:'m',hinagara:'ま',katakana:'マ',shown:false},
{vowel:'i',consonant:'m',hinagara:'み',katakana:'ミ',shown:true},
{vowel:'u',consonant:'m',hinagara:'む',katakana:'ム',shown:true},
{vowel:'e',consonant:'m',hinagara:'め',katakana:'メ',shown:true},
{vowel:'o',consonant:'m',hinagara:'も',katakana:'モ',shown:true},

{vowel:'a',consonant:'y',hinagara:'や',katakana:'ヤ',shown:false},
{vowel:'i',consonant:'y',hinagara:'い',katakana:'イ',shown:true},
{vowel:'u',consonant:'y',hinagara:'ゆ',katakana:'ユ',shown:true},
{vowel:'e',consonant:'y',hinagara:'え',katakana:'エ',shown:true},
{vowel:'o',consonant:'y',hinagara:'よ',katakana:'ヨ',shown:true},

{vowel:'a',consonant:'r',hinagara:'ら',katakana:'ラ',shown:false},
{vowel:'i',consonant:'r',hinagara:'り',katakana:'リ',shown:true},
{vowel:'u',consonant:'r',hinagara:'る',katakana:'ル',shown:true},
{vowel:'e',consonant:'r',hinagara:'れ',katakana:'レ',shown:true},
{vowel:'o',consonant:'r',hinagara:'ろ',katakana:'ロ',shown:true},

{vowel:'a',consonant:'w',hinagara:'わ',katakana:'ワ',shown:false},
{vowel:'i',consonant:'w',hinagara:'い',katakana:'イ',shown:true},
{vowel:'u',consonant:'w',hinagara:'う',katakana:'ウ',shown:true},
{vowel:'e',consonant:'w',hinagara:'え',katakana:'エ',shown:true},
{vowel:'o',consonant:'w',hinagara:'を',katakana:'ヲ',shown:true},

]
let displayOrders=[0,1,2,3,4,5,6,7,8,9]

// group an array by one of its property
function groupBy(objArray,property){
    return objArray.reduce(function(acc,currentObj){
        //generate a random boolean value to define if a character should be shown or not
        let shown=Math.random()>0.5
        currentObj.shown=shown;
        let key=currentObj[property];
        if (!acc[key]){
            acc[key]=[];
        }
        acc[key].push(currentObj);
        console.log(currentObj)
        return acc
    },{})
}

// map the grouped object to and array, which with a random order of each of its property (from the groupBy method)
function mapObjToArray(obj){
    let arr=[];
    let usedNumbers=[];

    Object.keys(obj).map((el)=>{
        
        let randomOrder=Math.floor(Math.random()*9)
        while (usedNumbers.indexOf(randomOrder)>-1){
            randomOrder=Math.floor(Math.random()*10)
        }
        usedNumbers.push(randomOrder)
        let element={}
        let elementValue={}
        elementValue[el]=obj[el]
        element[randomOrder]=elementValue
        arr.push(element)
      
    })
    return arr
}

//create an array of lines. each element of the array is the line of character that gonna to be displayed
function createLinesToDisplay(arr){
   let sortedArr=arr.sort((eleA,eleB)=>{
       let keyA=Object.keys(eleA)[0]
       let keyB=Object.keys(eleB)[0]
       return keyA-keyB
   })

   let charArr=sortedArr.map((el)=>{
        let key=el[Object.keys(el)[0]];
       // console.log(key)
        return key
   })
   return charArr
}


let newObj=groupBy(cha,'consonant')
let mappedObj=mapObjToArray(newObj)

//console.log(sortByObjKeys(newObj))
//console.log(mapObjToArray(newObj))
console.log(createLinesToDisplay(mappedObj))
//console.log(cha)
//console.log(newObj)

