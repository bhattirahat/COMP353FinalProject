$(document).ready(function () {
    var table = $('#employee_table').DataTable({
        stateSave: true,
        columnDefs: [
            {
                targets: 4,
                render: DataTable.render.date(),
            },
            {
                className: 'dt-left',
                targets: '_all',
            },
        ]
    });

    // highlighting the row on selected 
    $('#employee_table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $('#btnEdit').prop('disabled', true);
            $('#btnDelete').prop('disabled', true);
            $('#btnAdd').prop('disabled', false);
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#btnEdit').prop('disabled', false);
            $('#btnDelete').prop('disabled', false);
            $('#btnAdd').prop('disabled', true);
        }
    });


    // Add users
    $('#btnCreateEmp').click(function () {
        var firstName = $("#firstNameAdd").val();
        var lastName = $("#lastNameAdd").val();
        var email = $("#emailAdd").val();
        var medCardNum = $("#medCardNumAdd").val();
        var telephone = $("#telephoneAdd").val();
        var dob = $("#dobAdd").val();
        var occupationId = $("#occupationIdAdd").val();
        var address = $("#addressAdd").val();
        var postalCode = $("#postalCodeAdd").val();
        var citizenship = $("#citizenshipAdd").is(":checked");
        $.ajax({
            type: "POST",
            url: `/employee/create`,
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                medCardNum: medCardNum,
                telephone: telephone,
                dob: dob,
                occupationId: occupationId,
                address: address,
                postalCode: postalCode,
                citizenship: citizenship
            },
            success: function (response) {
                window.location.reload()
            },
            error: function (xhr, status, error) {
                console.error('POST request failed:', status, error);
            }
        });
    });

    $('#btnEdit').click(function () {
        var selectedRow = $('#employee_table tbody tr.selected');

        if (selectedRow.length) {
            var rowData = table.row(selectedRow).data();
            $("#empIdEdit").val(rowData[0]);
            $("#firstNameEdit").val(rowData[1]);
            $("#lastNameEdit").val(rowData[2]);
            $("#emailEdit").val(rowData[3]);
            $("#medCardNumEdit").val(rowData[5]);
            $("#telephoneEdit").val(rowData[10]);
            $("#addressEdit").val(rowData[8]);
            $("#postalCodeEdit").val(rowData[9]);
            if (rowData[6] == 1) {
                $('#citizenshipEdit').prop('checked', true);
            } else {
                $('#citizenshipEdit').prop('checked', false);
            }
            console.log(rowData);
        } else {
            console.log('No row is selected.');
        }
    });

    // save the row being edited 
    $('#btnSaveEdit').on('click', function () {
        var empId = $("#empIdEdit").val();
        var firstName = $("#firstNameEdit").val();
        var lastName = $("#lastNameEdit").val();
        var email = $("#emailEdit").val();
        var medCardNum = $("#medCardNumEdit").val();
        var telephone = $("#telephoneEdit").val();
        var dob = $("#dobEdit").val();
        var occupationId = $("#occupationIdEdit").val();
        var address = $("#addressEdit").val();
        var postalCode = $("#postalCodeEdit").val();
        var citizenship = $("#citizenshipEdit").is(":checked");
        console.log(empId)
        $.ajax({
            type: "PUT",
            url: `/employee/edit/${empId}`,
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                medCardNum: medCardNum,
                telephone: telephone,
                dob: dob,
                occupationId: occupationId,
                address: address,
                postalCode: postalCode,
                citizenship: citizenship
            },
            success: function (response) {
                window.location.reload()
            },
            error: function (xhr, status, error) {
                console.error('POST request failed:', status, error);
            }
        });
    });

    $('#btnDeleteConfirmation').click(function () {
        var selectedRow = $('#employee_table tbody tr.selected');

        if (selectedRow.length) {
            var rowData = table.row(selectedRow).data();
            var id = rowData[0];
            $.ajax({
                url: `/employee/delete/${id}`,
                type: 'DELETE',
                contentType: 'application/json',
                success: function (response) {
                    console.log('DELETE request succeeded:', response);
                    window.location.reload()
                },
                error: function (xhr, status, error) {
                    console.error('DELETE request failed:', status, error);
                }
            });
        } else {
            console.log('No row is selected.');
        }
    });
});



