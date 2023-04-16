const header = document.getElementById("main-header")
const item1 = document.getElementById("item1")
header.style.borderBottom = 'solid 3px black'
//item1.style.fontWeight = '900'
//item1.style.color = 'green'
const list = document.getElementsByClassName("list-group-item")
list[2].style.backgroundColor = 'green'
for(let i = 0; i<list.length; i++){
    list[i].style.fontWeight = '900'
}
const li = document.getElementsByTagName('li')
li[4].style.fontWeight = '900'
li[4].style.backgroundColor = 'grey'

list[1].style.backgroundColor = 'green'
list[2].style.display = "none";

const list2 = document.querySelectorAll('list-group-item')
list[1].style.color = 'darkgreen'

const odd = document.querySelectorAll('li:nth-child(odd')

for(let i = 0; i<odd.length; i++){
    odd[i].style.backgroundColor = 'green'
}
