let grades = {}
let maturite = []
let cfc = []
let finalGrade = []

window.addEventListener('load', () => {
    console.log('Page is fully loaded :3');

    if (localStorage.getItem('my_grades') === null) {
        getGradesValues()
    } else {
        grades = JSON.parse(localStorage.getItem('my_grades'))
        for (let myGrades in grades) {
            document.getElementById(myGrades).value = grades[myGrades]
        }
    }
    gradesTable()
    registerChangeEventsListenerOnInputs()
    //console.log(localStorage)

});

function calculateAverage(gradesArray) {
    let sum = 0
    let divider = 0

    for (let i = 0; i < gradesArray.length; i++) {
        if (!isNaN(gradesArray[i]) ? gradesArray[i] !== null : false) {
            sum += gradesArray[i]
            divider++
        }
    }//console.log(gradesArray.length)
    return sum / divider
}

function roundNumber(number, multiple) {
    return (Math.round(number / multiple) * multiple)
}

function getGradesValues() {
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        //console.log(parseFloat(input.value))
        grades[input.id] = parseFloat(input.value)
    }
    //console.log("Grades :", grades)
    gradesTable()
}

function gradesTable () {
    //console.log(grades)
    maturite = [
        grades.alle,
        grades.ang,
        grades.eco,
        grades.frch,
        grades.hist,
        grades.math1,
        grades.math2,
        grades.science,
        grades.tib,
        grades.tip_grade,
    ]
    //console.log(maturite)
    let maturiteAvg = roundNumber(calculateAverage(maturite), 0.5)

    cfc = [
        grades.mod,
        grades.cie,
    ]
    let cfcAvg = roundNumber(calculateAverage(cfc), 0.5)

    finalGrade = [
        maturiteAvg,
        cfcAvg,
        grades.tpi,
    ]
    let avgGeneral = roundNumber(calculateAverage(finalGrade), 0.5)

    writeAverageToHTML(maturiteAvg, cfcAvg, avgGeneral)

    function gradesStatus() {
        if (avgGeneral >= 4) {
            document.getElementById('echecoureussi').innerText = "réussi"
            //console.log("réussi")
        } else {
            document.getElementById('echecoureussi').innerText = "échec"
            //console.log("échec")
        }
    }
    gradesStatus()

    function byeNan () {
        if (isNaN(avgGeneral)){
            document.getElementById('notefinal').innerText = "Moyenne..."
            //console.log('non')
        } /*else {
            console.log('oui')
        }*/
        if (isNaN(maturiteAvg)) {
            document.getElementById('matu_grade').innerText = "Moyenne..."
        }
        if (isNaN(cfcAvg)) {
            document.getElementById('cfc_grade').innerText = "Moyenne..."
        }
    }
    byeNan()
}

function registerChangeEventsListenerOnInputs() {
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        input.addEventListener("change", getGradesValues)
        input.addEventListener("change", stock)
    }
}

function writeAverageToHTML(maturiteAvg, cfcAvg, avgGeneral) {
    document.getElementById('matu_grade').innerText = maturiteAvg.toFixed(1)
    document.getElementById('cfc_grade').innerText = cfcAvg.toFixed(1)
    document.getElementById('notefinal').innerText = avgGeneral.toFixed(1)
}

function stock() {
    //console.log('Stock')
    localStorage.setItem('my_grades', JSON.stringify(grades))
}