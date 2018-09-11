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

const addOrSubtract = function (numbersAndOperators) {
    return numbersAndOperators.reduce(function (result, element, index) {
        if (numbersAndOperators.length===1&& isNaN(element)===false){
            result.subTotal=element
            return result
        }
        if (isNaN(element)) {
            switch (element) {
                case 'ADD':
                    if (result.usedElementsIndex.indexOf(index - 1) < 0) {
                        result.usedElementsIndex.push(index - 1, index, index + 1)
                        result.subTotal = numbersAndOperators[index - 1] + numbersAndOperators[index + 1]
                        return result
                    } else {
                        result.usedElementsIndex.push(index, index + 1)
                        result.subTotal = result.subTotal + numbersAndOperators[index + 1]
                        return result
                    }

                case 'SUBTRACT':
                    if (result.usedElementsIndex.indexOf(index - 1) < 0) {
                        result.usedElementsIndex.push(index - 1, index,index + 1)
                        result.subTotal = numbersAndOperators[index - 1] - numbersAndOperators[index + 1]
                        return result
                    } else {
                        result.usedElementsIndex.push(index, index + 1)
                        result.subTotal = result.subTotal - numbersAndOperators[index + 1]
                        return result
                    }

                default:
                    return result
            }
        } else {
            return result
        }
    }, { usedElementsIndex: [], subTotal: 0 })
}

const multipleOrDivide = function (numbersAndOperators) {
    return numbersAndOperators.reduce(function (result, element, index) {
        if (numbersAndOperators.length===1&& isNaN(element)===false){
            result.subTotal=element
            return result
        }
        if (isNaN(element)) {
            switch (element) {
                case 'MULTIPILE':
                    if (result.usedElementsIndex.indexOf(index - 1) < 0) {
                        result.usedElementsIndex.push(index - 1, index, index + 1)
                        result.subTotal = numbersAndOperators[index - 1] * numbersAndOperators[index + 1]
                        return result
                    } else {
                        result.usedElementsIndex.push(index, index + 1)
                        result.subTotal = result.subTotal * numbersAndOperators[index + 1]
                        return result
                    }

                case 'DIVIDE':
                    if (result.usedElementsIndex.indexOf(index - 1) < 0) {
                        result.usedElementsIndex.push(index - 1, index, index + 1)
                        result.subTotal = numbersAndOperators[index - 1] / numbersAndOperators[index + 1]
                        return result
                    } else {
                        result.usedElementsIndex.push(index, index + 1)
                        result.subTotal = result.subTotal / numbersAndOperators[index + 1]
                        return result
                    }

                default:
                    return result
            }
        } else {
            return result
        }
    }, { usedElementsIndex: [], subTotal: 0 })
}

fomula.push(12);
fomula.push('MULTIPILE')
fomula.push(21)
fomula.push('DIVIDE')
fomula.push(21)
fomula.push('ADD')
fomula.push(21)
fomula.push('SUBTRACT')
fomula.push(21)
fomula.push('ADD')
fomula.push(27)
fomula.push('ADD')
fomula.push(21)
fomula.push('DIVIDE')
fomula.push(9)



console.log(fomula)

let addOrSubtractIndex = fomula.reduce(function (result, element, index) {

    if (result.usedElementsIndex.indexOf(index) < 0) {
        if ((element === 'ADD' || element === 'SUBTRACT')) {
            result.temp.operator = element;
           // result.temp.index = index;
            result.steps.push(result.temp);
            result.temp = { elements: [] }

        } else {

            result.temp.elements.push(element);

            result.usedElementsIndex.push(index)
        }
    } else {
        return result
    }
    if (index === fomula.length - 1) {
        result.steps.push(result.temp)
    }
    return result
}, { steps: [], usedElementsIndex: [], temp: { elements: [] } })



console.log(addOrSubtractIndex.steps, addOrSubtractIndex.temp)

let newStepsArray=addOrSubtractIndex.steps.reduce(function(result,el){
    let newStep={}
    newStep.operator=el.operator?el.operator:''
    newStep.subTotal=multipleOrDivide(el.elements).subTotal
    result.push(newStep.subTotal,newStep.operator)
    return result
},[])

// let subtotal = multipleOrDivide((addOrSubtractIndex.steps[1].elements))
// console.log(subtotal)
// console.log(newSteps)
console.log(newStepsArray)
let finalResult=addOrSubtract(newStepsArray)
console.log(finalResult)