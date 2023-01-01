import { writeFile, utils } from 'xlsx';

export const useExportExcel = () => {
    // dynamic merge cells based products length
    const exportExcel = (data) => {
        const modifiedData = data?.map((item, index) => {
            const {
                _id,
                customerName,
                products,
                user: { username },
                createdAt,
            } = item;
            return {
                id: index + 1,
                customerName,
                products,
                username,
                createdAt,
                orderId: _id,
            };
        });
        console.log(modifiedData);
        let currentRow = 1;
        const startCol = 0;
        // const data = [
        //     {
        //         id: 1,
        //         customerName: 'John Doe',
        //         products: [
        //             {
        //                 name: 'Product 1',
        //                 price: 100,
        //                 quantity: 1,
        //             },
        //             {
        //                 name: 'Product 2',
        //                 price: 100,
        //                 quantity: 1,
        //             },
        //         ],
        //     },
        //     {
        //         id: 2,
        //         customerName: 'Budi',
        //         products: [
        //             {
        //                 name: 'Product 3',
        //                 price: 100,
        //                 quantity: 1,
        //             },
        //             {
        //                 name: 'Product 4',
        //                 price: 100,
        //                 quantity: 1,
        //             },
        //             {
        //                 name: 'Product 5',
        //                 price: 100,
        //                 quantity: 1,
        //             },
        //         ],
        //     },
        //     {
        //         id: 3,
        //         customerName: 'Toni',
        //         products: [
        //             {
        //                 name: 'Product 6',
        //                 price: 100,
        //                 quantity: 1,
        //             },
        //         ],
        //     },
        // ];

        // Convert data into an array of arrays
        const aoa = modifiedData.reduce((acc, item) => {
            const { id, customerName, products, username, createdAt, orderId } =
                item;
            const productRows = products.map((product) => {
                const { name, price, quantity } = product;
                return [
                    id,
                    customerName,
                    name,
                    price,
                    quantity,
                    username,
                    createdAt,
                    orderId,
                ];
            });
            // const headerRow = [id, name, 'Product Name', 'Price', 'Quantity'];
            return [...acc, ...productRows];
        }, []);

        aoa.unshift([
            'ID',
            'Name',
            'Product Name',
            'Price',
            'Quantity',
            'Username',
            'Created At',
            'Order ID',
        ]);
        // Style the headers

        // Convert array of arrays into a worksheet
        const ws = utils.aoa_to_sheet(aoa);
        const mergeCells = [];
        ws['!merges'] = mergeCells;
        modifiedData.forEach((item, index) => {
            const { products } = item;
            const start = currentRow;
            const end = start + products.length - 1;
            mergeCells.push({
                s: { r: start, c: startCol },
                e: { r: end, c: startCol },
            });
            mergeCells.push({
                s: { r: start, c: startCol + 1 },
                e: { r: end, c: startCol + 1 },
            });
            mergeCells.push({
                s: { r: start, c: startCol + 4 },
                e: { r: end, c: startCol + 4 },
            });
            mergeCells.push({
                s: { r: start, c: startCol + 5 },
                e: { r: end, c: startCol + 5 },
            });
            mergeCells.push({
                s: { r: start, c: startCol + 6 },
                e: { r: end, c: startCol + 6 },
            });
            mergeCells.push({
                s: { r: start, c: startCol + 7 },
                e: { r: end, c: startCol + 7 },
            });
            currentRow = end + 1;
        });
        ws['!cols'] = [
            { wch: 8 }, // ID column
            { wch: 20 }, // Name column
            { wch: 20 }, // Product Name column
            { wch: 10 }, // Price column
            { wch: 10 }, // Quantity column
            { wch: 20 }, // Username column
            { wch: 20 }, // Created At column
            { wch: 30 }, // Order ID column
        ];
        ws['!rows'] = [
            { hpt: 24, hpx: 24 }, // Header row
        ];

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Sheet1');

        writeFile(wb, 'report.xlsx');
    };

    return { exportExcel };
};

// for (let i = 1; i <= 5; i++) {
//     const cell = ws[utils.encode_cell({ r: 0, c: i - 1 })];
//     cell.s = {
//         font: {
//             sz: 14,
//             bold: true,
//             color: { theme: 4 },
//         },
//         fill: {
//             patternType: 'solid',
//             fgColor: { theme: 6 },
//         },
//         border: {
//             top: { style: 'medium', color: { theme: 4 } },
//             bottom: { style: 'medium', color: { theme: 4 } },
//             left: { style: 'medium', color: { theme: 4 } },
//             right: { style: 'medium', color: { theme: 4 } },
//         },
//         alignment: {
//             horizontal: 'center',
//             vertical: 'center',
//         },
//     };
// }

// const mergeCells = [
//     {
//         s: { r: 0, c: 0 },
//         e: { r: 0, c: 2 },
//     },
// ];
// const header = [
//     { id: 'id', name: 'ID' },
//     { id: 'name', name: 'Name' },
//     { id: 'products', name: 'Products' },
// ];
// const headerStyle = {
//     font: {
//         bold: true,
//     },

//     alignment: {
//         horizontal: 'center',
//         vertical: 'center',
//     },

//     border: {
//         top: { style: 'thin' },
//         left: { style: 'thin' },
//         bottom: { style: 'thin' },
//         right: { style: 'thin' },
//     },

//     fill: {
//         fgColor: { rgb: 'FF0000' },
//     },
// };

// const cellStyle = {
//     alignment: {
//         horizontal: 'center',
//         vertical: 'center',
//     },

//     border: {
//         top: { style: 'thin' },
//         left: { style: 'thin' },
//         bottom: { style: 'thin' },
//         right: { style: 'thin' },
//     },

//     fill: {
//         fgColor: { rgb: 'FF0000' },
//     },

//     font: {
//         bold: false,
//     },

//     numFmt: '0.00',
// };

// const exportExcel = () => {
//     const ws = utils.json_to_sheet(data, {
//         header,
//         skipHeader: true,
//     });

//     // merge cells
//     ws['!merges'] = mergeCells;

//     // set header style
//     header.forEach((item) => {
//         ws[item.id] = headerStyle;
//     });

//     // set cell style
//     data.forEach((item, index) => {
//         Object.keys(item).forEach((key) => {
//             if (key === 'products') {
//                 item[key].forEach((product, productIndex) => {
//                     Object.keys(product).forEach((productKey) => {
//                         ws[`${productKey}${index + 2 + productIndex}`] =
//                             cellStyle;
//                     });
//                 });
//             } else {
//                 ws[`${key}${index + 2}`] = cellStyle;
//             }
//         });
//     });

//     // set width
//     ws['!cols'] = [
//         { wch: 10 },
//         { wch: 20 },
//         { wch: 20 },
//         { wch: 20 },
//         { wch: 20 },
//         { wch: 20 },
//     ];

//     const wb = utils.book_new();
//     utils.book_append_sheet(wb, ws, 'Orders');
//     writeFile(wb, 'orders.xlsx');
// };

// return {
//     exportExcel,
// };
