
function convertToHTML() {
    const file = document.getElementById('csvFile').files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            const csvData = event.target.result;
            const htmlTable = createHTMLTable(csvData);
            document.getElementById('htmlOutput').innerHTML = htmlTable;
        } catch (error) {
            console.error("Error converting CSV:", error);
            alert("Error: Failed to convert CSV file. Please check the file format and try again.");
        }
    };

    reader.readAsText(file);
}

function createHTMLTable(csvData) {
    const lines = csvData.split(/\r?\n/); // Split by new line characters
    let tableContent = '<table>';

    // Process header row (optional)
    const headers = lines[0].split(',');
    tableContent += `<tr>`;
    for (const header of headers) {
        tableContent += `<th>${header.trim()}</th>`; // Trim whitespace in headers
    }
    tableContent += '</tr>';

    // Process data rows
    for (let i = 1; i < lines.length; i++) {
        const rowData = lines[i].split(',');
        tableContent += '<tr>';
        for (const data of rowData) {
            tableContent += `<td>${data.trim()}</td>`; // Trim whitespace in data
        }
        tableContent += '</tr>';
    }

    tableContent += '</table>';
    return tableContent;
}
