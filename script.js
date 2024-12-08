document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display data from the CSV file
    fetch("DataBase.csv")
        .then((response) => response.text())
        .then((data) => {
            populateTable(data);
        })
        .catch((error) => console.error("Error loading CSV:", error));
});

function populateTable(csvData) {
    const rows = csvData.split("\n").filter((row) => row.trim() !== ""); // Remove empty rows
    const tableBody = document.getElementById("table-body");

    // Get the number of columns based on the header row
    const headerCols = rows[0].split(",");
    const numCols = headerCols.length;

    rows.forEach((row, index) => {
        if (index === 0) return; // Skip the header row

        // Split row into columns and ensure all columns are filled
        const cols = row.split(",");
        while (cols.length < numCols) {
            cols.push(""); // Add empty strings for missing columns
        }

        const tr = document.createElement("tr");

        // Create table cells for each column
        cols.forEach((col) => {
            const td = document.createElement("td");
            td.textContent = col.trim(); // Trim and add column data
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}

function searchTable() {
    const input = document.getElementById("search-input").value.toLowerCase();
    const rows = document.querySelectorAll("#family-table tbody tr");

    rows.forEach((row) => {
        const cells = Array.from(row.getElementsByTagName("td"));
        const match = cells.some((cell) => cell.textContent.toLowerCase().includes(input));
        row.style.display = match ? "" : "none";
    });
}
