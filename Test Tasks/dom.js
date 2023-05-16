var form = document.getElementById('addForm')
var items = document.getElementById('items')
var filter = document.getElementById('filter')
form.addEventListener('submit', additem)
items.addEventListener('click', deleteitem)
filter.addEventListener('keyup', search_ele)

//additem function
function additem(e){
    e.preventDefault();
    //create new li element
    var li = document.createElement('li');

    var details = document.getElementById('desc').value;

    //get input data
    var item = document.getElementById('item').value;
    //add class to li
    li.className = 'list-group-item'
    // add textnode to li element
    li.appendChild(document.createTextNode(details))
    li.appendChild(document.createTextNode(item))
    //create delete button
    var deletebtn = document.createElement('button')
    //set button class
    deletebtn.className = 'btn btn-danger btn-sm float-right delete' 
    //edit button
    var editbtn = document.createElement('button')
    //edit button class
    editbtn.className = 'btn btn-light btn-sm float-right edit'
    editbtn.appendChild(document.createTextNode('Edit'))
    deletebtn.appendChild(document.createTextNode('Del'))
    li.appendChild(deletebtn)
    li.appendChild(editbtn)
    //add item to list
    items.appendChild(li);
    console.log(li.children)

}
function deleteitem(a){
    if(a.target.classList.contains('delete')){
        if(confirm('Are You Sure You want to delete selected this item?')){
            var li = a.target.parentElement
            items.removeChild(li)
        };
    };
};

function search_ele(e){
    var text = e.target.value.toLowerCase();
    var itemList = items.getElementsByTagName('li')
    //convert to an array
    Array.from(itemList)
    .forEach(function(item){
        var itemname = item.childNodes[1].textContent;
        var itemDesc = item.childNodes[0].textContent;
        if(itemname.toLowerCase().indexOf(text) != -1 || itemDesc.toLowerCase().indexOf(text) !== -1){
            item.style.display = 'block'
        }else {
            item.style.display = 'none'
        }
    }); 
}