var table = document.getElementById("table");
const form = document.getElementById("form");
form.addEventListener("submit", saveDetails);
var submitButton = document.getElementById("submit");

function showdata(arr) {
  table.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    var items = arr[i];
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");

    td.appendChild(document.createTextNode(items.name));
    td2.appendChild(document.createTextNode(items.phone));
    td3.appendChild(document.createTextNode(items.email));

    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);

    //creating delelte button with className
    var deletebtn = document.createElement("button");
    var icon = document.createElement("img");
    icon.src = "delete.png";
    icon.style.height = "24px";
    icon.style.width = "24px";
    deletebtn.appendChild(icon);
    deletebtn.className = "btn delete";

    //function to delete item
    deletebtn.addEventListener("click", function(itemID) {
      return function deleteItem(){
        (itemID)}
    }(items.id));

    //creating edit button with className
    var editbtn = document.createElement("button");
    editbtn.className = "btn";
    var icon2 = document.createElement("img");
    icon2.src = "edit.png";
    icon2.style.height = "24px";
    icon2.style.width = "24px";
    editbtn.appendChild(icon2);

    //edit button eventlistener
    editbtn.addEventListener("click", function () {
      editItem(items);
    });

    //adding buttons to tr element
    tr.appendChild(deletebtn);
    tr.appendChild(editbtn);

    //adding tr to table
    table.append(tr);
  }
}

//saving data in crudcrud
function saveDetails(event) {
  event.preventDefault()
  if (submitButton.value == "Submit") {
    console.log('working')
    var username = document.getElementById("name").value;
    var useremail = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    let my_obj = {
      name: username,
      email: useremail,
      phone: phone,
    };
    axios
      .post(
        "http://localhost:3002/addUser",
        my_obj
      )
      .then(() => {
        axios
          .get(
            "http://localhost:3002/getUsers"
          )
          .then((data) => {
            showdata(data.data);
          })
          .catch((err) => console.log(err));
      });
  }
}

//delete function
function deleteItem(id) {
  console.log(id)
  axios
    .delete(
      `http://localhost:3002/deleteUser/${id}`
    )
    .then(() => {
      return axios
        .get(
          "http://localhost:3002/getUsers"
        )
        .then((data) => {
          showdata(data.data);
        })
        .catch((err) => console.log(err));
    });
}

//edit function
function editItem(obj) {
  submitButton.value = "Save";
  submitButton.id = "save";
  submitButton.classList.remove("btn-primary");
  submitButton.classList.add("btn-success");
  document.getElementById("name").value = obj.name;
  document.getElementById("phone").value = obj.phone;
  document.getElementById("email").value = obj.email;

  var saveButton = document.getElementById("save");
  saveButton.addEventListener("click", () => {
    axios
      .put(
        `http://localhost:3002/updateUser/${obj.id}`,
        {
          name: document.getElementById("name").value,
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
        }
      )
      .then(() => {
        return axios
          .get(
            "http://localhost:3002/getUsers"
          )
          .then((data) => {
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("email").value = "";
            saveButton.value = "Submit";
            saveButton.id = "submit";
            saveButton.classList.remove("btn-success");
            saveButton.classList.add("btn-primary");

            showdata(data.data);
          })
          .catch((err) => console.log(err));
      });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "http://localhost:3002/getUsers"
    )
    .then((data) => {
      showdata(data.data);
    })
    .catch((err) => console.log(err));
});
