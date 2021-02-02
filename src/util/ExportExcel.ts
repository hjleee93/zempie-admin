
function exportExcel( columns : string[], data: any, title: string ) {
    let tabText = `
        <html xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
            <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
            <xml>
                <x:ExcelWorkbook>
                    <x:ExcelWorksheets>
                        <x:ExcelWorksheet>
                            <x:Name>Sheet</x:Name>
                            <x:WorksheetOptions>
                                <x:Panes></x:Panes>
                            </x:WorksheetOptions>
                        </x:ExcelWorksheet>
                    </x:ExcelWorksheets>
                </x:ExcelWorkbook>
            </xml>
        </head>
        <body>
            <table border='1px'>`;

    for( let i = 0 ; i < columns.length; i++ ) {
        tabText += `<th>${ columns[i] }</th>`;    
    }

    for( let i = 0 ; i < data.length; i++ ) {
        tabText += `<tr>`;
        for( let j = 0; j < data[i].length; j++ ) {
            tabText += `    <td>${ data[i][j] }</td>`;
        }
        tabText += `</tr>`;
    }
    
    tabText += `
            </table>
        </body>
    </html>`;

    const fileName = title + '.xls';

    let blob2 = new Blob([tabText], {
        type: "application/csv;charset=utf-8;"
    });
    let elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob2);
    elem.download = fileName;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

export default exportExcel;