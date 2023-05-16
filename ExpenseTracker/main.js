let form = document.getElementById('addForm')
const arr = JSON.parse(localStorage.getItem("data")) || [];
var table = document.getElementById('table')
document.addEventListener('submit', additem)

function createli() {
    table.innerHTML = "";
    //showing items from local storage
    var storedData = localStorage.getItem("data")
    var parsedData = JSON.parse(storedData)
    for (let i = 0; i < parsedData.length; i++) {
        var item = parsedData[i]

        //creating a li element
        var li = document.createElement('li')
        li.className = "list-group-item d-flex"

        //creating table element
        var tr = document.createElement('tr')
        var th = document.createElement('th');
        th.scope = "row"
        th.innerText = (i+1)
        tr.appendChild(th)


        //creating td elements
        var td = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')

        td.appendChild(document.createTextNode(item['desc']))
        td2.appendChild(document.createTextNode(item['amnt']))
        td3.appendChild(document.createTextNode(item['cate']))

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
        deletebtn.addEventListener('click', function(){
            deleteItem(i)
        }
        );

        //creating edit button with className
        var editbtn = document.createElement('button')
        editbtn.className = "btn"
        var icon2 = document.createElement('img')
        icon2.src = "edit.png"
        icon2.style.height = '24px'
        icon2.style.width = '24px'
        editbtn.appendChild(icon2)

        //edit button eventlistener
        editbtn.addEventListener('click',function(){
            editItem(i)
        })

        //adding buttons to li element
        tr.appendChild(deletebtn)
        tr.appendChild(editbtn)

        //adding li to main list
        // items.appendChild(li)
        table.append(tr)
    };
};



function additem(a) {
    a.preventDefault()

    //getting items to add
    var amount = document.getElementById('amount').value +' ';
    var description = document.getElementById('desc').value + ' ';
    var category = document.getElementById('category').options[document.getElementById('category').selectedIndex].textContent;

    //adding items to local storage
    let my_obj = {
        amnt: amount,
        desc: description,
        cate: category
    };
    arr.push(my_obj)
    localStorage.setItem("data", JSON.stringify(arr));

    //resetting form fields
    document.getElementById('amount').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('category').options[document.getElementById('category').selectedIndex].textContent = 'Choose a Category';
    createli()
}   

function deleteItem(index) {
    if(confirm('Are You Sure You want to delete this item?')){
        arr.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(arr));
        createli();
    }
}

function editItem(index){
    var item = arr[index];
    console.log(item)
    document.getElementById('amount').value = item['amnt'];
    document.getElementById('desc').value = item['desc'];
    document.getElementById('category').options[document.getElementById('category').selectedIndex].textContent = item['cate'];
    arr.splice(index,1)
}


createli()