// Introduction to Computer Organization 
// SECTION 05 
// SEMESTER 2 2023/2024
// Made by Group K:
// - MIOR MUHAMMAD ADIB BIN AHMAD ZAHA (2319909)
// - AIMAN BIN AHMAD ZAINULKAMAL (2311929)
// - ESMA DENNIS BIN MOHD ADAM (2316821)
// - NUR HABRIYAH BINTI MOHD IBRAHIM (2318544)
document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('numberInput');
    const convertBtn = document.getElementById('convertBtn');
    const resultTable = document.getElementById('result');
    const fractionalResultTable = document.getElementById('fractionalResult');
    const result = document.getElementById('finalResult');
    const baseStatement = document.getElementById('base');
    
    let divisor = 2;
    let base = "Binary";
    const ul = document.getElementById('numberSystems');
    
    for (const child of ul.children) {
        child.addEventListener('click', () => {
            switch (child.id) {
                case "Binary":
                    divisor = 2;
                    break;
                case "Octal":
                    divisor = 8;
                    break;
                case "Decimal":
                    divisor = 10;
                    break;
                case "Hexadecimal":
                    divisor = 16;
                    break;
                default:
            }
            result.innerHTML = divisor;
            base = child.id;
            baseStatement.innerHTML = base;
            calculate();
        });
    }

    convertBtn.addEventListener('click', calculate);

    function calculate() {
        const number = parseFloat(numberInput.value);
        if (!isNaN(number)) {
            const integerPart = Math.floor(number);
            const fractionalPart = number - integerPart;
            const integerResult = convertIntegerPart(integerPart);
            const fractionalResult = convertFractionalPart(fractionalPart);
            const finalResult = fractionalResult 
                ? `${integerResult}.${fractionalResult}` 
                : integerResult;

            result.style.visibility = 'visible';
            result.innerHTML = `${base} number: ${finalResult}`;
        } else {
            resultTable.innerHTML = '<tr><td colspan="3">Please enter a valid number.</td></tr>';
        }
    }
    function convertIntegerPart(number) {
        const steps = [];
        let quotient = number;
    
        while (quotient > 0) {
            let remainder = quotient % divisor;
            if (base === "Hexadecimal") {
                remainder = remainder.toString(16).toUpperCase();
            }
            steps.push({ quotient, remainder });
            quotient = Math.floor(quotient / divisor);
        }
    
        const binaryResult = steps.reverse().map(step => step.remainder).join('');
        const binaryRows = steps.reverse().map((step, index) => {
            return `<tr>
                        <td class="steps">${index + 1}</td>
                        <td class="operation">${step.quotient} ÷ ${divisor} = ${Math.floor(step.quotient / divisor)}</td>
                        <td class="remainder">${step.remainder}</td>
                        <td class="arrow"><box-icon name='up-arrow-alt'></box-icon></td>
                    </tr>`;
        });
    
        resultTable.innerHTML = binaryRows.join('');
        return binaryResult;
    }
    function convertFractionalPart(number) {
    fractionalResultTable.innerHTML = ''; // Clear previous content

    if (number === 0) return '';

    const steps = [];
    const seenRemainders = {};
    let repeatingStartIndex = -1;
    let fraction = Math.round(number * 1e8) / 1e8; // Limit precision to 8 digits and round to avoid tiny floating-point errors
    let index = 0;
    while (fraction !== 0 && index < 50) { // Limit iterations to avoid infinite loop
        if (seenRemainders[fraction] !== undefined) {
            repeatingStartIndex = seenRemainders[fraction];
            break;
        }
    
        seenRemainders[fraction] = index;
    
        let originalFraction = fraction;
        let result = originalFraction * divisor;
        let integerPart = Math.floor(result);
        fraction = result - integerPart;
        if (base === "Hexadecimal") {
            integerPart = integerPart.toString(16).toUpperCase();
        }
        fraction = Math.round(fraction * 1e8) / 1e8; // Limit precision to 8 digits and round the result after the subtraction
    
        steps.push({ originalFraction, divisor, result, integerPart, fraction });
    
        index++;
    }

    const fractionalRows = steps.map((step, index) => {
        return `<tr>
                    <td class="steps">${index + 1}</td>
                    <td class="operation">${step.originalFraction} × ${step.divisor} = ${step.result}</td>
                    <td class="integer-part">${step.integerPart}</td>
                    <td class="fractional-part">${step.fraction}</td>
                </tr>`;
    });

    fractionalResultTable.innerHTML = fractionalRows.join('');

    if (repeatingStartIndex !== -1) {
        const nonRepeatingPart = steps.slice(0, repeatingStartIndex).map(step => step.integerPart).join('');
        const repeatingPart = steps.slice(repeatingStartIndex).map(step => step.integerPart).join('');
        return `${nonRepeatingPart}${repeatingPart}... (repeated on ${repeatingPart})`;
    }

    return steps.map(step => step.integerPart).join('');
}
    
});
