document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('numberInput');
    const convertBtn = document.getElementById('convertBtn');
    const resultTable = document.getElementById('result');
    const result = document.getElementById('finalResult');

    
    convertBtn.addEventListener('click', () => {
        const number = parseInt(numberInput.value);
        if (!isNaN(number)) {
            const binarySteps = [];
            let quotient = number;

            while (quotient > 0) {
                const remainder = quotient % 2;
                binarySteps.push({ quotient, remainder });
                quotient = Math.floor(quotient / 2);
            }

            const binaryResult = binarySteps.reverse().map(step => step.remainder).join('');
            const binaryRows = binarySteps.reverse().map((step, index) => {
                return `<tr>
                            <td>${index+1}</td>
                            <td>${step.quotient} ÷ 2 = ${Math.floor(step.quotient / 2)}</td>
                            <td>${step.remainder}</td>
                            <td><box-icon name='up-arrow-alt'></box-icon></td>
                        </tr>`;
            });
            resultTable.innerHTML = binaryRows.join('');
            result.style.visibility = 'visible';
            result.innerHTML = "binary number:" + binaryResult;
        } else {
            resultTable.innerHTML = '<tr><td colspan="3">Please enter a valid number.</td></tr>';
        }
    });
});
