const data = [
  {
    name: "Orders",
    id: "orders",
    columns: [
      {
        id: "customerName",
        name: "Customer Name",
      },
      {
        id: "orderId",
        name: "Order Id",
      },
      {
        id: "product",
        name: "Product",
        expanded: false,
        columns: [
          {
            id: "productName",
            name: "Product Name",
          },
          {
            id: "cat",
            name: "Category",
          },
        ],
      },
    ],
    expanded: true,
  },
  {
    id: "people",
    name: "People",
    columns: [
      {
        id: "personName",
        name: "Person Name",
      },
      {
        id: "org",
        name: "Organization",
      },
    ],
    expanded: false,
  },
];
function fetchTables() {
  return new Promise((resolve) => setTimeout(() => resolve({ data }), 500));
}
const api = { fetchTables };
export default api;
