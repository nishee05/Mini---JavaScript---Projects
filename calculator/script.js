let string = "";
let buttons = document.querySelectorAll('.button');

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerHTML;

        if (value === '=') {
            try {
                // Safely evaluate the expression
                if (string.trim() === "") return;
                string = eval(string).toString(); // Convert result to string
                document.querySelector('input').value = string;
            } catch (error) {
                document.querySelector('input').value = "Error";
                string = "";
            }
        } else if (value === 'C') {
            // Clear the display
            string = "";
            document.querySelector('input').value = string;
        } else {
            // Prevent multiple operators or invalid sequences
            const lastChar = string.slice(-1);
            if (
                ["+", "-", "*", "/"].includes(value) &&
                ["+", "-", "*", "/"].includes(lastChar)
            ) {
                return;
            }
            string += value;
            document.querySelector('input').value = string;
        }
    });
});
