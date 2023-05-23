var table = document.getElementById('table')
const form = document.getElementById('form');
form.addEventListener('submit', saveDetails);


function showdata(arr) {
    table.innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        var items = arr[i]
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')

        td.appendChild(document.createTextNode(items.name))
        td2.appendChild(document.createTextNode(items.phone))
        td3.appendChild(document.createTextNode(items.email))

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

        // //function to delete item
        // deletebtn.addEventListener('click', function(){
        //     deleteItem(i)
        // }
        // );

        //creating edit button with className
        var editbtn = document.createElement('button')
        editbtn.className = "btn"
        var icon2 = document.createElement('img')
        icon2.src = "edit.png"
        icon2.style.height = '24px'
        icon2.style.width = '24px'
        editbtn.appendChild(icon2)

        // //edit button eventlistener
        // editbtn.addEventListener('click',function(){
        //     editItem(i)
        // })

        //adding buttons to tr element
        tr.appendChild(deletebtn)
        tr.appendChild(editbtn)

        //adding tr to table
        table.append(tr)
    }
};


//saving data in crudcrud
function saveDetails(event) {
    // Prevent the form from submitting and reloading the page
    event.preventDefault();
    var username = document.getElementById('name').value;
    var useremail = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    let my_obj = {
        name: username,
        email: useremail,
        phone: phone
    }
    axios.post('https://crudcrud.com/api/2ded9151aff94996aaaa1ab58e60cffd/userDetails', my_obj)
        .then((data => {
            showdata(data.data)
        }))
        .catch(err => console.log(err))

}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/2ded9151aff94996aaaa1ab58e60cffd/userDetails')
    .then(data => {
            showdata(data.data)
    })
    .catch(err => console.log(err))
})
