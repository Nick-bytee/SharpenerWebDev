var items = document.getElementById("table");
form.addEventListener("submit", additems);
var total = document.getElementById('total')

var obj = {
  name: "phone",
  price: 500,
};

var totalPrice = 0;
total.innerHTML = 0

async function additems(e) {
  e.preventDefault();

  //creating object of name and price
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;

  let obj = {
    name: name,
    price: price,
  };

  try {
    await axios.post(
      "https://crudcrud.com/api/a70b37b42d054fd18a9fc1d1f0c84a20/productDetails",
      obj
    );

    const values = await axios.get(
      "https://crudcrud.com/api/a70b37b42d054fd18a9fc1d1f0c84a20/productDetails"
    );

    showItems(values.data);
  } catch (err) {
    console.log(err);
  }

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

async function deleteItem(obj) {
  totalPrice = 0
  try {
    await axios
      .delete(
        `https://crudcrud.com/api/a70b37b42d054fd18a9fc1d1f0c84a20/productDetails/${obj._id}`
      )
    const values = await axios.get(
      "https://crudcrud.com/api/a70b37b42d054fd18a9fc1d1f0c84a20/productDetails"
    )

    total.innerHTML = totalPrice
    showItems(values.data);
  } catch (err) {
    console.log(err)
  };
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/a70b37b42d054fd18a9fc1d1f0c84a20/productDetails"
    );

    const values = response.data;
    showItems(values);
  } catch (err) {
    console.log(err);
  }
});

console.log(totalPrice)