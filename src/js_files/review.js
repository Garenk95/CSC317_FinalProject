var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

function refreshData() {
    console.log("refreshing review session data...");
    displayAllSessions();
    setTimeout(refreshData, 5000);
}

function displayAllSessions() {
    fetch(`http://localhost:3000/getAllSessions`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var obj = result;
            console.log(obj);
            var session = JSON.parse(obj);
            let table = document.getElementById("review_session_table");
            for (let j = 1; j < table.rows.length; j++) {
                console.log('Deleteing row');
                document.getElementById('review_session_table').deleteRow(j);
                j--;
            }
            for (let object of session) {
                let i = 0;
                var newRow = table.insertRow();
                console.log('Printing new obj');
                for (let value of Object.keys(object)) {
                    var newCell = newRow.insertCell(i);
                    var newText = document.createTextNode(object[value]);
                    newCell.appendChild(newText);
                    i++;
                }
                newCell = newRow.insertCell(6);
                newCell.appendChild(createButton("Data Review", object.sessionID));
                newCell = newRow.insertCell(7);
                newCell.appendChild(createButton("Map"));
            }

        })
        .catch(error => console.log('error', error));
}
function createButton(button_inner_html, id) {
    let btn = document.createElement("BUTTON");
    btn.innerHTML = button_inner_html;
    btn.onclick = function () {
        window.location.href = `../client/datareview.html?session=${id}`;
    };
    return btn;
}
function filter(column, identifier) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(identifier);
    filter = input.value.toUpperCase();
    table = document.getElementById("review_session_table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[column];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}