$(document).ready(function () {
    $('#query7_table').DataTable({
        stateSave: true,
        columnDefs: [
            {
                className: 'dt-left',
                targets: '_all',
            },
        ]
    });

    $('#query6_table').DataTable({
        stateSave: true,
        columnDefs: [
            {
                className: 'dt-left',
                targets: '_all',
            },
        ]
    });
    $('#query11_table').DataTable({
        stateSave: true,
        columnDefs: [
            {
                className: 'dt-left',
                targets: '_all',
            },
        ]
    });
    $('#query10_table').DataTable({
        stateSave: true,
        lengthMenu: [5, 10, 25, 50],
        pageLength: 5,
        columnDefs: [
            {
                className: 'dt-left',
                targets: '_all',
            },
            {
                targets: 5,
                render: function (data, type, row) {
                    // Replace newline characters with <br> tags
                    return data.replace(/\n/g, '<br>');
                }
            },
        ]
    });

    $('#vaccination_table').DataTable({
        stateSave: true,
        columnDefs: [
            {
                targets: 5,
                render: DataTable.render.date(),
            },
            {
                targets: 6,
                orderable: false
            },
            {
                targets: 7,
                orderable: false
            }, {
                className: 'dt-left',
                targets: '_all'
            },

        ]
    });
});

