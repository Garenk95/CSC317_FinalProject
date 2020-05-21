var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};


function load_data() {
    console.log("worked");
    var queryString = decodeURIComponent(window.location.search);
    var test = queryString.split("?session=");

    fetch(`http://localhost:3000/getDataReview/${test[1]}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var obj = result;
            console.log(obj);
            var session = JSON.parse(obj);
            let table = document.getElementById("data_review_table");
            // for (let j = 1; j < table.rows.length; j++) {
            //     console.log('Deleteing row');
            //     document.getElementById('data_review_table').deleteRow(j);
            //     j--;
            // }
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
            }

        })
        .catch(error => console.log('error', error));
}

function filter(column, identifier) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(identifier);
    filter = input.value.toUpperCase();
    table = document.getElementById("data_review_table");
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
