var form = document.getElementById('addForm')
var items = document.getElementById('items')

form.addEventListener('submit', additem)

items.addEventListener('click', deleteitem)

//additem function
function additem(e){
    e.preventDefault();
    console.log('Test')
    //create new li element
    var li = document.createElement('li');

    //get input data
    var item = document.getElementById('item').value;

    //add class to li
    li.className = 'list-group-item'

    // add textnode to li element
    li.appendChild(document.createTextNode(item))

    //create delete button
    var deletebtn = document.createElement('button')

    //set button class
    deletebtn.className = 'btn btn-danger btn-sm float-right delete' 

    //edit button
    var editbtn = document.createElement('button')

    //edit button class
    editbtn.className = 'btn btn-danger btn-sm float-right edit'
    editbtn.appendChild(document.createTextNode('Edit'))

    deletebtn.appendChild(document.createTextNode('Delete'))

    li.appendChild(editbtn)
    li.appendChild(deletebtn)

    //add item to list
    items.appendChild(li);

    
}
function deleteitem(a){
    if(a.target.classList.contains('delete')){
        if(confirm('Are You Sure You want to delete selected this item?')){
            var li = a.target.parentElement
            items.removeChild(li)
        };
    };
};