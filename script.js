document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('numberInput');
    const convertBtn = document.getElementById('convertBtn');
    const resultTable = document.getElementById('result');
    const result = document.getElementById('finalResult');
    const baseStatement = document.getElementById('base');

    
    var divisor = 2;
    var base="Binary";
    const ul = document.getElementById('numberSystems')
    for(const child of ul.children){
        child.addEventListener('click',()=>{
            switch(child.id){
                case "Binary":
                    divisor = 2;
                    break;
                case "Octal":
                    divisor = 8
                    break;
                case "Decimal":
                    divisor = 10
                    break;
                case "Hexadecimal":
                    divisor = 16
                    break;
                default:
            }
            result.innerHTML=divisor;
            base = child.id;
            baseStatement.innerHTML = base;
            calculate();
        })
    }

    

    convertBtn.addEventListener('click', calculate);
    function calculate(){
        
        const number = parseInt(numberInput.value);
        if (!isNaN(number)) {
            const binarySteps = [];
            let quotient = number;

            while (quotient > 0) {
                var remainder = quotient % divisor;
                if (base == "Hexadecimal"){
                    if (remainder==10) {remainder="A"}
                    else if (remainder==11) {remainder="B"}
                    else if (remainder==12) {remainder="C"}
                    else if (remainder==13) {remainder="D"}
                    else if (remainder==14) {remainder="E"}
                    else if (remainder==15) {remainder="F"}
                }
                binarySteps.push({ quotient, remainder });
                quotient = Math.floor(quotient / divisor);
            }

            const binaryResult = binarySteps.reverse().map(step => step.remainder).join('');
            const binaryRows = binarySteps.reverse().map((step, index) => {
                return `<tr>
                            <td>${index+1}</td>
                            <td>${step.quotient} ÷ ${divisor} = ${Math.floor(step.quotient / divisor)}</td>
                            <td>${step.remainder}</td>
                            <td><box-icon name='up-arrow-alt'></box-icon></td>
                        </tr>`;
            });
            resultTable.innerHTML = binaryRows.join('');
            result.style.visibility = 'visible';
            result.innerHTML = base+" number:" + binaryResult;
        } else {
            resultTable.innerHTML = '<tr><td colspan="3">Please enter a valid number.</td></tr>';
        }
    }
});
