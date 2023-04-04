$(document).ready(function () {
    var table = $('#employee_table').DataTable({
        stateSave: true,
        columnDefs: [
            {
                targets: 4,
                render: DataTable.render.date(),
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

    $('#btnEdit').click(function () {
        var selectedRow = $('#employee_table tbody tr.selected');

        if (selectedRow.length) {
            var rowData = table.row(selectedRow).data();
            console.log(rowData);
        } else {
            console.log('No row is selected.');
        }
    });


    // save the row being edited 
    $('#btnSave').on('click', function () {
        var selectedRows = {};

        table.rows().nodes().to$().each(function (index, element) {
            var checkbox = $(element).find('.select-checkbox');
            if (checkbox.is(':checked')) {
                var rowData = table.row($(element)).data();
                // selectedRows.push(rowData);
                console.log(rowData);
                selectedRows[index] = {
                    emp_id: rowData[1],
                    first_name: rowData[2],
                    last_name: rowData[3],
                };
            }
        });

        console.log(selectedRows);

        $.ajax({
            url: '/employee/edit',
            type: 'PUT',
            data: JSON.stringify(selectedRows),
            contentType: 'application/json',
            success: function (response) {
                console.log('PUT request succeeded:', response);
            },
            error: function (xhr, status, error) {
                console.error('PUT request failed:', status, error);
            }
        });
    });
});



