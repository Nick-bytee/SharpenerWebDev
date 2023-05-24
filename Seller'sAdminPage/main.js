var items = document.getElementById("table");
form.addEventListener("submit", additems);
var total = document.getElementById('total')

var obj = {
  name: "phone",
  price: 500,
};

var totalPrice = 0;
total.innerHTML = 0

function additems(e) {
  e.preventDefault();

  //creating object of name and price
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;

  let obj = {
    name: name,
    price: price,
  };

  axios
    .post(
      "https://crudcrud.com/api/5e73261ca9b24d1ea83468eb29748c4f/productDetails",
      obj
    )
    .then(() => {
      axios
        .get(
          "https://crudcrud.com/api/5e73261ca9b24d1ea83468eb29748c4f/productDetails"
        )
        .then((values) => {
          showItems(values.data);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

}

function showItems(arr) {
  table.innerHTML = "";
  totalPrice = 0
  document.getElementById("total").value = totalPrice;

  for (let i = 0; i < arr.length; i++) {
    var item = arr[i];
    totalPrice += Number(item.price)

    let tr = document.createElement("tr");

    let th = document.createElement("th");
    th.scope = "row";
    th.innerHTML = i;

    tr.appendChild(th);

    let td = document.createElement("td");
    let td2 = document.createElement("td");

    td.innerHTML = item.name;
    td2.innerHTML = item.price;

    var deletebtn = document.createElement("button");
    deletebtn.className = "btn btn-outline-danger";
    deletebtn.innerHTML = "Del";

    //function to delete item
    deletebtn.addEventListener("click", function () {
      deleteItem(arr[i]);
    });

    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(deletebtn);

    items.appendChild(tr);
    total.innerHTML = totalPrice
  }
}

function deleteItem(obj) {
  totalPrice = 0
  axios
    .delete(
      `https://crudcrud.com/api/5e73261ca9b24d1ea83468eb29748c4f/productDetails/${obj._id}`
    )
    .then(() => {
      axios
        .get(
          "https://crudcrud.com/api/5e73261ca9b24d1ea83468eb29748c4f/productDetails"
        )
        .then((values) => {
          total.innerHTML = totalPrice
          showItems(values.data);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/5e73261ca9b24d1ea83468eb29748c4f/productDetails"
    )
    .then((values) => {
      showItems(values.data);
    })
    .catch((err) => console.log(err));
});

console.log(totalPrice)