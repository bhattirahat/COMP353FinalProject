$(document).ready(function () {
    $('#query7_table').DataTable({
        stateSave: true,
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
            }
        ]
    });
});