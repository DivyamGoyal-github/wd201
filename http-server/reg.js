const email = document.getElementById('email');
email.addEventListener('input', () => validate(email));
function validate(element) {
    const currentVal = element.value;
    if (element.validity.typeMismatch) {
        element.setCustomValidity("Please include an '@'in the email address. '" + currentVal + "' is missing an '@'");
        element.reportValidity();
    } else {
        element.setCustomValidity('');
    }
}

const dobInput = document.getElementById('dob');
const currentDate = new Date();
const minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
const maxDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());

let setDateLimits = () => {
    const minDateString = minDate.toISOString().split('T')[0];
    const maxDateString = maxDate.toISOString().split('T')[0];
    dobInput.setAttribute('min', maxDateString);
    dobInput.setAttribute('max', minDateString);
}
setDateLimits();
// eslint-disable-next-line no-undef
dob.addEventListener('input', function (event) {
    const dobValue = new Date(dobInput.value);
    if (dobValue > minDate || dobValue < maxDate) {
        dobInput.setCustomValidity("Value must be " + minDate.getDate() + "/" + minDate.getMonth() + "/" + minDate.getFullYear() + " or later.");
        dobInput.reportValidity();
        event.preventDefault();
    } else {
        dobInput.setCustomValidity('');
    }
});

let userForm = document.getElementById('user-form');
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};
const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry)=>{
        const nameCell = `<td class = 'border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class = 'border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class = 'border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class = 'border px-4 py-2'>${entry.dob}</td>`;
        const acceptedTermsCell = `<td class = 'border px-4 py-2'>${entry.acceptedTerms}</td>`;
        
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptedTermsCell} </tr>`;
        return row;
    }).join("\n");

    // const table = `<table class = "table-auto w-full"><tr>
    // <th class = "px-4 py-2">Name</th>
    // <th class = "px-4 py-2">Email</th>
    // <th class = "px-4 py-2">Password</th>
    // <th class = "px-4 py-2">DOB</th>
    // <th class = "px-4 py-2">Accepted Terms?</th>
    // </tr>${tableEntries} </table>`;
    const table = `<table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #dddddd; padding: 8px;">Name</th>
            <th style="border: 1px solid #dddddd; padding: 8px;">Email</th>
            <th style="border: 1px solid #dddddd; padding: 8px;">Password</th>
            <th style="border: 1px solid #dddddd; padding: 8px;">DOB</th>
            <th style="border: 1px solid #dddddd; padding: 8px;">Accepted Terms?</th>
        </tr>
    </thead>
    <tbody>
        ${tableEntries}
    </tbody>
</table>`;
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}

let userEntries = retrieveEntries();
const saveUserForm = (event) =>{
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('password').value;

    const acceptedTerms = document.getElementById('accept terms').checked;
    const entry = {
        name,
        email,
        dob,
        password,
        acceptedTerms
    };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}
userForm.addEventListener("submit",saveUserForm);
displayEntries();
localStorage.clear();