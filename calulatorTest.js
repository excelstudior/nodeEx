// let add='+'
// let a=2
// let b=3

// let total=a+add+b
// console.log(total)

// let c='5'
// let d='46'
// let cd=parseFloat(c+d)
// console.log(cd,isNaN(cd))

let fomula = []
//let usedElement=[]

const ADD = function (a, b) {
    return a + b
}
const SUBTRCT = function (a, b) {
    if (a > b) {
        return a - b
    } else {
        return b - a
    }
}
const MULTIPILE = function (a, b) {
    return a * b
}
const DIVIDE = function (a, b) {
    return a / b
}

fomula.push(12);
fomula.push('MULTIPILE')
fomula.push(21)
fomula.push('ADD')
fomula.push(21)
fomula.push('ADD')
fomula.push(27)
fomula.push('DIVIDE')
fomula.push(9)



console.log(fomula)
// let result = fomula.reduce(function (newObject, element, index) {
//     if (newObject.usedElement.indexOf(element) < 0) {
//         if (isNaN(element)&&(element==='ADD'||element==='SUBTRCT')) {
//             if(newObject.usedElement.indexOf(fomula[index-1])<0){
//                 newObject.usedElement.push(fomula[index - 1], element, fomula[index + 1])
//                 if (element==='ADD'||element==='SUBTRCT'){
//                     element(fomula[index-1],fomula[index+1])
//                 }
//             } else {
//                 newObject.usedElement.push(element, fomula[index + 1])
//             }
            
//         } else {
//             newObject.numericElement.push(element)
//         }
//     } else {
//         newObject.numericElement.push(element)
//     }

//     return newObject
// }, {  "addOrSubtractIndex": [] })
//console.log(result)

let addOrSubtractIndex=fomula.reduce(function(result,element,index){

    if (result.usedElements.indexOf(element)<0){
        if (isNaN(element)&&(element==='ADD'||element==='SUBTRCT')) {
            let node={}
            node.operator=element
            node.index=index
            let newLength=result.steps.push(node);
            if (result.steps.length>1){
             let partial=fomula.slice((result.steps[newLength-2].index)+1,index)
               result.steps[newLength-1].elements=partial
               result.usedElements.concat(partial)
            } else {
                let partial=fomula.slice(0,index)
                result.steps[0].elements=partial
                result.usedElements.concat(partial)
            }
    }} 
    return result
},{steps:[],usedElements:[]})

console.log(addOrSubtractIndex.steps)