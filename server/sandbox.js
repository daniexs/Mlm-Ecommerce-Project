let data = [
  {
    id: 1,
    name: "Pulsa 20Katok",
    UserId: 1,
    code: "sMktSGGa",
    createdAt: "2024-03-27T08:51:12.250Z",
    updatedAt: "2024-03-27T08:51:12.250Z"
  },
  {
    id: 2,
    name: "Pulsa 20Katok",
    UserId: 1,
    code: "sMktSGGa",
    createdAt: "2024-03-27T08:51:12.250Z",
    updatedAt: "2024-03-27T08:51:12.250Z"
  },
  {
    id: 3,
    name: "Pulsa 10Katok",
    UserId: 2,
    code: "sMktSGGG",
    createdAt: "2024-03-27T08:51:12.250Z",
    updatedAt: "2024-03-27T08:51:12.250Z"
  },
  {
    id: 4,
    name: "Pulsa 10Katok",
    UserId: 2,
    code: "sMktSGGG",
    createdAt: "2024-03-27T08:51:12.250Z",
    updatedAt: "2024-03-27T08:51:12.250Z"
  },
];

let result = {};

data.forEach(element => {
  if (!result[element.name]) {
    result[element.name] = { name: element.name, count: 1 };
  } else {
    result[element.name].count++;
  }
});
const finalResult = Object.values(result);

console.log(finalResult);
