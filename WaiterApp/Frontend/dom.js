const table1 = document.getElementById("table1");
const table2 = document.getElementById("table2");
const table3 = document.getElementById("table3");
const form = document.getElementById("addForm");
document.addEventListener("submit", addOrder);

//function to add Order
async function addOrder(e) {
    e.preventDefault()
    const price = document.getElementById('price').value
    var category = document.getElementById('category').options[document.getElementById('category').selectedIndex].textContent;
    const item = document.getElementById('item').value

    let myObj = {
        price: price,
        table: category,
        item: item
    }
    try {
        await axios.post('http://localhost:4000/addOrder', myObj)

        const data = await axios.get('http://localhost:4000/getOrders')
        showOrders(data.data)

    } catch (err) {
        console.log(err)
    }

}

function showOrders(parsedData) {
    table1.innerHTML = "";
    table2.innerHTML = "";
    table3.innerHTML = "";
    for (let i = 0; i < parsedData.length; i++) {
        var item = parsedData[i]

        const table = item.table

        //creating a li element
        var li = document.createElement('li')
        li.className = "list-group-item d-flex"

        //creating table element
        var tr = document.createElement('tr')

        //creating td elements
        var td = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')


        td.appendChild(document.createTextNode(item.itemName))
        td2.appendChild(document.createTextNode(item.price))

        tr.appendChild(td)
        tr.appendChild(td2)
        tr.appendChild(td3)

        //creating delelte button with className
        var deletebtn = document.createElement('button')
        var icon = document.createElement('img')
        icon.src = "delete.png"
        icon.style.height = '24px'
        icon.style.width = '24px'
        deletebtn.appendChild(icon)
        deletebtn.className = "btn delete"

        //function to delete item
        deletebtn.addEventListener('click', function (itemID) {
            return function () {
                deleteOrder(itemID)
            }
        }(item.id));


        //adding buttons to li element
        tr.appendChild(deletebtn)

        //adding li to main list
        if (table === 'Table 1') {
            table1.append(tr)
        } else if (table === 'Table 2') {
            table2.append(tr)
        } else {
            table3.append(tr)
        }
    }
};


async function deleteOrder(id) {
    try {
        await axios.delete(`http://localhost:4000/delete-order/${id}`)

        const data = await (axios.get('http://localhost:4000/getOrders'))
        showOrders(data.data)

    } catch (err) {
        console.log(err)
    }
}

async function getData() {
    try {
        const data = await axios.get('http://localhost:4000/getOrders')
        showOrders(data)

    } catch (err) {
        console.log(err)
    }
}


window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "http://localhost:4000/getOrders"
        )
        .then((data) => {
            showOrders(data.data);
        })
        .catch((err) => console.log(err));
});