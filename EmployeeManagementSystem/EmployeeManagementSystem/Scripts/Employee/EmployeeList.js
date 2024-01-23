// function to initialize datepicker
function initializeDatepicker() {
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
    });

}

// call the initializeDatepicker function when the document is ready
$(document).ready(function () {
    initializeDatepicker();
});

// search functionality
$(document).on("input", "#employeeSearchInput", function () {
    var searchQuery = $(this).val().toLowerCase();

    // filter table rows based on the search query
    $("#employeeTableBody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(searchQuery) > -1);
    });
});


// sort by option menu change event handler
$(document).on("change", "#sortOption", function () {
    var sortBy = $(this).val();
    sortTable(sortBy);
});

// function to sort the table based on the selected option
function sortTable(sortBy) {
    var rows = $('#employeeTableBody tr').get();

    rows.sort(function (a, b) {
        var A = $(a).children('td').eq(getColumnIndex(sortBy)).text().toUpperCase();
        var B = $(b).children('td').eq(getColumnIndex(sortBy)).text().toUpperCase();

        if (A < B) {
            return -1;
        }

        if (A > B) {
            return 1;
        }

        return 0;
    });

    $.each(rows, function (index, row) {
        $('#employeeTableBody').append(row);
    });
}

// function to get the column index based on the selected option
function getColumnIndex(sortBy) {
    switch (sortBy) {
        case 'Name':
            return 0;
        case 'Position':
            return 1;
        default:
            return 0; // default to sorting by Name if no valid option is selected
    }
}


// function to fetch and populate the employee table
function populateEmployeeTable() {
    var token = localStorage.getItem("AccessToken");

    // check if the token is present
    if (!token) {
        // handle the case where the token is not present
        console.error('Access Token not found in localStorage');
        return;
    }

    $.ajax({
        type: 'GET',
        url: 'https://localhost:44395/employee/getemployees',
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function (employeeList) {
            // clear existing table rows
            $('#employeeTableBody').empty();

            if (employeeList.Employees.length > 0) {
                // populate the table with the fetched data
                $.each(employeeList.Employees, function (index, item) {
                    var formattedDate = new Date(item.DateofJoining).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });

                    var row = '<tr>' +
                        '<td>' + item.Name + '</td>' +
                        '<td>' + item.Position + '</td>' +
                        '<td class="text-right">' +
                        '<span data-title="Edit" data-toggle="tooltip">' +
                        '<a href="#" class="btn btn-outline-primary btn-sm editEmployee" data-id="' + item.ID + '">' +
                        '<i class="os-icon os-icon-ui-49"></i>' +
                        '</a>' +
                        '</span>' +
                        '<span data-title="Details" data-toggle="tooltip">' +
                        '<a href="#" class="btn btn-outline-info btn-sm detailsEmployee" data-id="' + item.ID + '">' +
                        '<i class="os-icon os-icon-eye"></i>' +
                        '</a>' +
                        '</span>' +
                        '<span data-title="Delete" data-toggle="tooltip">' +
                        '<a href="" class="btn btn-outline-danger btn-sm deleteEmployeeButton" data-toggle="modal" data-target="#delete" data-id="' + item.ID + '">' +
                        '<i class="os-icon os-icon-ui-15"></i>' +
                        '</a>' +
                        '</span>' +
                        '</td>' +
                        '</tr>';

                    // Append the row to the table
                    $('#employeeTableBody').append(row);
                });
            } else {
                // Display a message if there are no records
                var noRecordsRow = '<tr>' +
                    '<td colspan="3" class="text-center">No records to show</td>' +
                    '</tr>';
                $('#employeeTableBody').append(noRecordsRow);
            }
        },
        error: function (error) {
            console.error('Error fetching employees:', error);
            // handle error, e.g., display an error message
        }
    });
}

// call the function to populate the table when the document is ready
$(document).ready(function () {
    populateEmployeeTable();
});
