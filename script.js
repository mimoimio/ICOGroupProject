document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('numberInput');
    const convertBtn = document.getElementById('convertBtn');
    const resultTable = document.querySelector('.binary-table tbody');

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

            const binaryResult = binarySteps.map(step => step.remainder).join('');
            const binaryRows = binarySteps.map((step, index) => {
                return `<tr>
                            <td>${index+1}</td>
                            <td>${step.quotient} ÷ 2 = ${Math.floor(step.quotient / 2)}</td>
                            <td>${step.remainder}</td>
                        </tr>`;
            });

            resultTable.innerHTML = binaryRows.join('');
        } else {
            resultTable.innerHTML = '<tr><td colspan="3">Please enter a valid number.</td></tr>';
        }
    });
});
