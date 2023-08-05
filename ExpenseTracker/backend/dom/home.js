let form = document.getElementById('addForm')
var table = document.getElementById('table')
document.addEventListener('submit', additem)

var editID;
var token = localStorage.getItem('token')

function createli(parsedData) {
    if (document.getElementById('formdata').value === "Save") {
        return saveUpdatedItem()
    } else {
        table.innerHTML = "";
        for (let i = 0; i < parsedData.length; i++) {
            var item = parsedData[i]

            //creating a li element
            var li = document.createElement('li')
            li.className = "list-group-item d-flex"

            //creating table element
            var tr = document.createElement('tr')
            var th = document.createElement('th');
            th.scope = "row"
            th.innerText = (i + 1)
            tr.appendChild(th)


            //creating td elements
            var td = document.createElement('td')
            var td2 = document.createElement('td')
            var td3 = document.createElement('td')


            td.appendChild(document.createTextNode(item.category))
            td2.appendChild(document.createTextNode(item.description))
            td3.appendChild(document.createTextNode(item.amount))

            tr.appendChild(td)
            tr.appendChild(td2)
            tr.appendChild(td3)

            //creating delelte button with className
            var deletebtn = document.createElement('button')
            var icon = document.createElement('i')
            icon.className = "fa-solid fa-trash"
            icon.style.color = "#000000"
            icon.style.height = '24px'
            icon.style.width = '24px'
            deletebtn.appendChild(icon)
            deletebtn.className = "btn delete"

            //function to delete item
            deletebtn.addEventListener('click', function (itemID) {
                return function () {
                    deleteItem(itemID)
                }
            }(item.id));

            //creating edit button with className
            var editbtn = document.createElement('button')
            editbtn.className = "btn"
            var icon2 = document.createElement('i')
            icon2.className = "fa-regular fa-pen-to-square"
            icon2.style.height = '24px'
            icon2.style.width = '24px'
            editbtn.appendChild(icon2)

            //edit button eventlistener
            editbtn.addEventListener('click', function (Item) {
                return function () {
                    editItem(Item)
                }
            }(item))

            //adding buttons to li element
            tr.appendChild(deletebtn)
            tr.appendChild(editbtn)

            //adding li to main list
            // items.appendChild(li)
            table.append(tr)
        };
    }
};

document.getElementById('rzp-button').onclick = async function (e) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:3000/purchase/purchaseMembership', {
            headers: {
                'Auth': token
            }
        });

        var options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function (response) {
                try {
                    await axios.post('http://localhost:3000/purchase/updateTransactionStatus', {
                        order_id: options.order_id,
                        paymentId: response.razorpay_payment_id,
                        status: true
                    }, {
                        headers: {
                            'Auth': token
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }

        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed', async function (response) {
            try {
                axios.post('http://localhost:3000/purchase/updateTransactionStatus', {
                    order_id: response.error.metadata.order_id,
                    paymentId: response.error.metadata.payment_id,
                    status: false
                }, {
                    headers: {
                        'Auth': token
                    }
                })
                alert(response.error.description);
            } catch (err) {
                console.log(err)
            }
        });
    } catch (error) {
        console.log(error);
    }
};


async function additem(a) {
    a.preventDefault()

    if (document.getElementById('formdata').value === 'Save') {
        return saveUpdatedItem()
    } else {
        //getting items to add
        console.log('hh')
        var amount = document.getElementById('amount').value + ' ';
        var description = document.getElementById('desc').value + ' ';
        var category = document.getElementById('category').options[document.getElementById('category').selectedIndex].textContent;

        //adding items to local storage
        let my_obj = {
            amnt: amount,
            desc: description,
            cate: category,
            token: token
        };
        try {
            await axios.post('http://localhost:3000/addExpense',
                my_obj)

            const data = await axios.get(`http://localhost:3000/getExpenses`, {
                headers: {
                    'Auth': token
                }
            })
            createli(data.data)
        } catch (err) {
            console.log(err)
        }


        //resetting form fields
        document.getElementById('amount').value = '';
        document.getElementById('desc').value = '';
        document.getElementById('category').options[document.getElementById('category').selectedIndex].textContent = 'Choose a Category';
    }
}

async function deleteItem(id) {
    if (confirm('Are You Sure You want to delete this item?')) {
        try {
            await axios.delete(`http://localhost:3000/deleteExpense/${id}`)

            const data = await axios.get(`http://localhost:3000/getExpenses`, {
                headers: {
                    'Auth': token
                }
            })
            createli(data.data)
        } catch (err) {
            console.log(err);
        }
    }
}


async function saveUpdatedItem() {
    let obj = {
        id: editID,
        amount: document.getElementById('amount').value,
        description: document.getElementById('desc').value,
        category: document.getElementById('category').options[document.getElementById('category').selectedIndex].textContent
    }
    const form = document.getElementById('addForm')
    form.children.innerHTML = ''
    try {
        await axios.put(`http://localhost:3000/updateExpense/${editID}`,
            obj)

        document.getElementById('formdata').value = "Add Expense"

        const data = await axios.get(`http://localhost:3000/getExpenses`, {
            headers: {
                'Auth': token
            }
        })
        createli(data.data)
    } catch (err) {
        console.log(err)
    }
}


function editItem(item) {
    document.getElementById('amount').value = item.amount;
    document.getElementById('desc').value = item.description;
    document.getElementById('category').options[document.getElementById('category').selectedIndex].textContent = item.category;
    document.getElementById('formdata').value = 'Save'
    editID = item.id
}

window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "http://localhost:3000/getExpenses", {
                headers: {
                    'Auth': token
                }
            }
        )
        .then((data) => {
            if (data.data.isPremium) {
                document.getElementById('rzp-button').style.display = 'none'
            } else {
                createli(data.data);
            }
        })
        .catch((err) => console.log(err));
});