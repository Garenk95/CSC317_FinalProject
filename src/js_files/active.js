//const e = require("express");

var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

function refreshData() {
    console.log("refreshing active session data...");
    displayActiveSessions();
    setTimeout(refreshData, 5000);
}
function displayActiveSessions() {
    fetch(`http://localhost:3000/getActiveSessions`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var obj = result;
            var session = JSON.parse(obj);
            let table = document.getElementById("active_session_table");
            for (let j = 1; j < table.rows.length; j++) {
                console.log('Deleteing row');
                document.getElementById('active_session_table').deleteRow(j);
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
                newCell.appendChild(createButton("Data Review"));
                newCell = newRow.insertCell(7);
                newCell.appendChild(createButton("Map"));
            }

        })
        .catch(error => console.log('error', error));
}
function createButton(button_inner_html) {
    let btn = document.createElement("BUTTON");
    btn.innerHTML = button_inner_html;
    return btn;
}
function sessionInTable(table, id) {
    var rows = table.rows.length;
    for (i = 0; i < rows; i++) {
        let cellVal = table.rows[i].cells[0].innerHTML;
        if (cellVal == id) {
            return true;
        }
    }
    return false;
}
