$(document).ready(function () {
    // event handlers to clear validation messages on input focus
    $('#employeeName').focus(function () {
        $('#validationEmployeeName').html('');
    });

    $('#employeePosition').focus(function () {
        $('#validationemployeePosition').html('');
    });

    $('#employeeDepartment').focus(function () {
        $('#validationemployeeDepartment').html('');
    });

    $('#dateOfJoining').focus(function () {
        $('#validationemployeedateOfJoining').html('');
    });

    $('#employeeSalary').focus(function () {
        $('#validationemployeeSalary').html('');
    });
});
$('#Salary').on('input', function () {
    var maxLength = 6;
    if ($(this).val().length > maxLength) {
        $(this).val($(this).val().slice(0, maxLength));
    }
});


function submitEmployeeForm() {
    // clear previous validation messages
    clearValidationMessages();

    // validation
    var name = $('#employeeName').val().trim();
    var position = $('#employeePosition').val().trim();
    var department = $('#employeeDepartment').val().trim();
    var dateOfJoining = $('#dateOfJoining').val().trim();
    var salary = $('#employeeSalary').val().trim();

    if (name === '' || position === '' || department === '' || dateOfJoining === '' || salary === '') {
        // display validation messages or handle errors as needed
        if (name === '') {
            $('#validationEmployeeName').html('Please enter the Name.');
        }

        if (position === '') {
            $('#validationemployeePosition').html('Please enter the Position.');
        }

        if (department === '') {
            $('#validationemployeeDepartment').html('Please enter the Department');
        }

        if (dateOfJoining === '') {
            $('#validationemployeedateOfJoining').html('Please enter the Date of Joining.');
        }

        if (salary === '') {
            $('#validationemployeeSalary').html('Please enter the Salary.');
        }
        return;
    }

    // get the selected date using the datepicker's date format
    var selectedDate = $('#dateOfJoining').datepicker('getDate');
    var formattedDate = $.datepicker.formatDate('yy-mm-dd', selectedDate);

    var formData = {
        Name: name,
        Position: position,
        Department: department,
        DateofJoining: formattedDate,
        Salary: salary
    };

    var token = localStorage.getItem("AccessToken");

    // check if the token is present
    if (token) {
        // use the token as needed
        console.log('Access Token:', token);
    } else {
        // handle the case where the token is not present
        console.error('Access Token not found in localStorage');
        return;
    }

    $.ajax({
        type: 'POST',
        url: 'https://localhost:44395/employee/createemployees',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function () {
            alert('Employee added successfully');
            // close the modal
            $('#exampleModal1').modal('hide');

            // refresh the table
            location.reload();
        },
        error: function (error) {
            console.error('Error adding employee:', error);
            // handle error displays error message
        }
    });
}

function clearValidationMessages() {
    // clear validation messages
    $('#validationEmployeeName').html('');
    $('#validationemployeePosition').html('');
    $('#validationemployeeDepartment').html('');
    $('#validationemployeedateOfJoining').html('');
    $('#validationemployeeSalary').html('');
}


// detailsEmployee click event handler
$(document).on("click", ".detailsEmployee", function () {
    var employeeId = $(this).data('id');
    var url = "https://localhost:44395/employee/getemployee/" + employeeId;

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("AccessToken")
        },
        success: function (employee) {
            // populate the details modal with employee data
            var formattedDate = new Date(employee.DateofJoining).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            // use the unique IDs for the details modal elements
            $('#DetailsName').val(employee.Name);
            $('#DetailsPosition').val(employee.Position);
            $('#DetailsDepartment').val(employee.Department);
            $('#DetailsDateofJoining').val(formattedDate);
            $('#DetailsSalary').val(employee.Salary);

            // show the details modal
            $('#details').modal();
        },
        error: function (xhr, status, error) {
            console.error('Error retrieving employee data:', error);
            // log or display the error details
        }
    });
});

// EditEmployee click event handler
$(document).on("click", ".editEmployee", function () {
    var employeeId = $(this).data('id');
    var url = "https://localhost:44395/employee/getemployee/" + employeeId;

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("AccessToken")
        },
        success: function (employee) {
            // populate the edit modal with employee data
            var formattedDate = new Date(employee.DateofJoining).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            $('#ID').val(employee.ID);
            $('#Name').val(employee.Name);
            $('#Position').val(employee.Position);
            $('#Department').val(employee.Department);
            $('#DateofJoining').val(formattedDate);
            $('#Salary').val(employee.Salary);

            // show the edit modal
            $('#edit').modal();
        },
        error: function (xhr, status, error) {
            console.error('Error retrieving employee data:', error);
            // log or display the error details
        }
    });
});


// add event handlers to clear validation messages on input
$('#Name').on('input', function () {
    $('#editvalidationEmployeeName').html('');
});

$('#Position').on('input', function () {
    $('#editvalidationEmployeePosition').html('');
});

$('#Department').on('input', function () {
    $('#editvalidationEmployeeDepartment').html('');
});

$('#DateofJoining').on('input', function () {
    $('#editvalidationDateofJoining').html('');
});

$('#Salary').on('input', function () {
    $('#editvalidationSalary').html('');
    // also, limit the max length as before
    var maxLength = 6;
    if ($(this).val().length > maxLength) {
        $(this).val($(this).val().slice(0, maxLength));
    }
});
function validateEditEmployeeForm() {
    // reset validation messages for all form fields
    clearValidationMessages();

    // get the values of the form fields
    var employeeName = $('#Name').val().trim();
    var employeePosition = $('#Position').val().trim();
    var employeeDepartment = $('#Department').val().trim();
    var dateOfJoining = $('#DateofJoining').val().trim();
    var employeeSalary = $('#Salary').val().trim();

    // validate each field
    var isValid = true;

    if (employeeName === '') {
        $('#editvalidationEmployeeName').html('Please enter the Name.');
        isValid = false;
    }
    if (employeePosition === '') {
        $('#editvalidationEmployeePosition').html('Please enter the Position.');
        isValid = false;
    }

    if (employeeDepartment === '') {
        $('#editvalidationEmployeeDepartment').html('Please enter the Department.');
        isValid = false;
    }

    if (dateOfJoining === '') {
        $('#editvalidationDateofJoining').html('Please enter the Date of Joining.');
        isValid = false;
    }

    if (employeeSalary === '') {
        $('#editvalidationSalary').html('Please enter the Salary.');
        isValid = false;
    }

    return isValid;
}

// clear validation messages
function clearValidationMessages() {
    $('.validation-message').html('');
}
function checkMaxLength(input) {
    var maxLength = 6;
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}


// save changes click event handler
$(document).on("click", "#saveChanges", function () {
    if (validateEditEmployeeForm()) {

        // get the selected date using the datepicker's date format
        var selectedDate = $('#DateofJoining').datepicker('getDate');

        // format the date as 'dd/mm/yy'
        var formattedDate = $.datepicker.formatDate('yy-mm-dd', selectedDate);

        var formData = {
            ID: $('#ID').val(),
            Name: $('#Name').val(),
            Position: $('#Position').val(),
            Department: $('#Department').val(),
            DateofJoining: formattedDate,
            Salary: $('#Salary').val()
        };

        var token = localStorage.getItem("AccessToken");
        console.log('Access Token:', token);
        // check if the token is present
        if (token) {
            // use the token as needed
            console.log('Access Token:', token);
        } else {
            // handle the case where the token is not present
            console.error('Access Token not found in localStorage');
        }

        $.ajax({
            type: 'PUT',
            url: 'https://localhost:44395/employee/editemployee',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            headers: {
                Authorization: 'Bearer ' + token
            },
            success: function () {
                alert('Employee updated successfully');
                // Close the modal
                $('#edit').modal('hide');
                // Refresh the table
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error('Error updating employee. Status:', status, 'Error:', error);
                console.log('Server response:', xhr.responseText);
                // Handle error, e.g., display an error message
            }

        });
    }
});


// add a click event handler to the "Delete" button
$(document).on("click", ".deleteEmployeeButton", function () {
    // set the employeeId in the modal input field
    $('#employeeId').val($(this).data('id'));
});

$(document).on("click", "#deleteEmployee", function () {
    var employeeId = $('#employeeId').val();

    // make an AJAX request to the delete API
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:44395/employee/deleteemployee/' + employeeId,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("AccessToken")
        },
        success: function () {
            // on success, close the modal and optionally perform additional actions
            alert('Employee deleted successfully');
            $('#delete').modal('hide');
            // refresh the table or perform other actions as needed
            location.reload();
        },
        error: function (xhr, status, error) {
            console.error('Error deleting employee:', error);

            // log the detailed error information in the console
            console.log('XHR:', xhr);
            console.log('Status:', status);

            // optionally display an error message to the user
            alert('Error deleting employee. Please check the console for details.');

            // handle error, e.g., display an error message
        }
    });
});