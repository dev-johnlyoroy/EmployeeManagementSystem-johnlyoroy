

@section scripts {
    <script>
        // Function to initialize datepicker
            function initializeDatepicker() {
                $('.datepicker').datepicker({
                    format: 'mm/dd/yyyy',
                    startDate: '-3d'
                });
               
        }

        // Call the initializeDatepicker function when the document is ready
        $(document).ready(function () {
            initializeDatepicker();
        });
    </script>

    <script>
        // Search functionality
        $(document).on("input", "#employeeSearchInput", function () {
            var searchQuery = $(this).val().toLowerCase();

            // Filter table rows based on the search query
            $("#employeeTableBody tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(searchQuery) > -1);
            });
        });
    </script>

    <script>
        // Sort by option menu change event handler
        $(document).on("change", "#sortOption", function () {
            var sortBy = $(this).val();
            sortTable(sortBy);
        });

        // Function to sort the table based on the selected option
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

        // Function to get the column index based on the selected option
        function getColumnIndex(sortBy) {
            switch (sortBy) {
                case 'Name':
                    return 0;
                case 'Position':
                    return 1;
                default:
                    return 0; // Default to sorting by Name if no valid option is selected
            }
        }
    </script>


    <script>
        // Function to fetch and populate the employee table
        function populateEmployeeTable() {
            var token = localStorage.getItem("AccessToken");

            // Check if the token is present
            if (!token) {
                // Handle the case where the token is not present
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
                    // Clear existing table rows
                    $('#employeeTableBody').empty();

                    if (employeeList.Employees.length > 0) {
                        // Populate the table with the fetched data
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
                    // Handle error, e.g., display an error message
                }
            });
        }

        // Call the function to populate the table when the document is ready
        $(document).ready(function () {
            populateEmployeeTable();
        });
    </script>


    <script>
        $(document).ready(function () {
            // Attach event handlers to clear validation messages on input focus
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
            // Clear previous validation messages
            clearValidationMessages();

            // Validation
            var name = $('#employeeName').val().trim();
            var position = $('#employeePosition').val().trim();
            var department = $('#employeeDepartment').val().trim();
            var dateOfJoining = $('#dateOfJoining').val().trim();
            var salary = $('#employeeSalary').val().trim();

            if (name === '' || position === '' || department === '' || dateOfJoining === '' || salary === '') {
                // Display validation messages or handle errors as needed
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

            // Get the selected date using the datepicker's date format
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

            // Check if the token is present
            if (token) {
                // Use the token as needed
                console.log('Access Token:', token);
            } else {
                // Handle the case where the token is not present
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
                    // Close the modal
                    $('#exampleModal1').modal('hide');

                    // Refresh the table
                    location.reload();
                },
                error: function (error) {
                    console.error('Error adding employee:', error);
                    // Handle error, e.g., display an error message
                }
            });
        }

        function clearValidationMessages() {
            // Clear validation messages
            $('#validationEmployeeName').html('');
            $('#validationemployeePosition').html('');
            $('#validationemployeeDepartment').html('');
            $('#validationemployeedateOfJoining').html('');
            $('#validationemployeeSalary').html('');
        }
    </script>


    <script>
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
                    // Populate the details modal with employee data
                    var formattedDate = new Date(employee.DateofJoining).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });

                    // Use the unique IDs for the details modal elements
                    $('#DetailsName').val(employee.Name);
                    $('#DetailsPosition').val(employee.Position);
                    $('#DetailsDepartment').val(employee.Department);
                    $('#DetailsDateofJoining').val(formattedDate);
                    $('#DetailsSalary').val(employee.Salary);

                    // Show the details modal
                    $('#details').modal();
                },
                error: function (xhr, status, error) {
                    console.error('Error retrieving employee data:', error);
                    // Log or display the error details
                }
            });
        });
    </script>


    <script>
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
                    // Populate the edit modal with employee data
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

                    // Show the edit modal
                    $('#edit').modal();
                },
                error: function (xhr, status, error) {
                    console.error('Error retrieving employee data:', error);
                    // Log or display the error details
                }
            });
        });


    </script>

    <script>
        // Add event handlers to clear validation messages on input
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
            // Also, limit the max length as before
            var maxLength = 6;
            if ($(this).val().length > maxLength) {
                $(this).val($(this).val().slice(0, maxLength));
            }
        });
        function validateEditEmployeeForm() {
            // Reset validation messages for all form fields
            clearValidationMessages();

            // Get the values of the form fields
            var employeeName = $('#Name').val().trim();
            var employeePosition = $('#Position').val().trim();
            var employeeDepartment = $('#Department').val().trim();
            var dateOfJoining = $('#DateofJoining').val().trim();
            var employeeSalary = $('#Salary').val().trim();

            // Validate each field
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

        // Clear validation messages
        function clearValidationMessages() {
            $('.validation-message').html('');
        }
        function checkMaxLength(input) {
            var maxLength = 6;
            if (input.value.length > maxLength) {
                input.value = input.value.slice(0, maxLength);
            }
        }


        // Save changes click event handler
        $(document).on("click", "#saveChanges", function () {
            if (validateEditEmployeeForm()) {

                // Get the selected date using the datepicker's date format
                var selectedDate = $('#DateofJoining').datepicker('getDate');

                // Format the date as 'dd/mm/yy'
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
                // Check if the token is present
                if (token) {
                    // Use the token as needed
                    console.log('Access Token:', token);
                } else {
                    // Handle the case where the token is not present
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
    </script>

    <script>
        // Add a click event handler to the "Delete" button
        $(document).on("click", ".deleteEmployeeButton", function () {
            // Set the employeeId in the modal input field
            $('#employeeId').val($(this).data('id'));
        });

        $(document).on("click", "#deleteEmployee", function () {
            var employeeId = $('#employeeId').val();

            // Make an AJAX request to the delete API
            $.ajax({
                type: 'DELETE',
                url: 'https://localhost:44395/employee/deleteemployee/' + employeeId,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("AccessToken")
                },
                success: function () {
                    // On success, close the modal and optionally perform additional actions
                    alert('Employee deleted successfully');
                    $('#delete').modal('hide');
                    // Refresh the table or perform other actions as needed
                    location.reload();
                },
                error: function (xhr, status, error) {
                    console.error('Error deleting employee:', error);

                    // Log the detailed error information in the console
                    console.log('XHR:', xhr);
                    console.log('Status:', status);

                    // Optionally display an error message to the user
                    alert('Error deleting employee. Please check the console for details.');

                    // Handle error, e.g., display an error message
                }
            });
        });
    </script>


}
