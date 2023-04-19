// const header = document.getElementById("main-header")
// const item1 = document.getElementById("item1")
// header.style.borderBottom = 'solid 3px black'
// //item1.style.fontWeight = '900'
// //item1.style.color = 'green'
// const list = document.getElementsByClassName("list-group-item")
// list[2].style.backgroundColor = 'green'
// for(let i = 0; i<list.length; i++){
//     list[i].style.fontWeight = '900'
// }
// const li = document.getElementsByTagName('li')
// li[4].style.fontWeight = '900'
// li[4].style.backgroundColor = 'grey'

// list[1].style.backgroundColor = 'green'
// list[2].style.display = "none";

// const list2 = document.querySelectorAll('list-group-item')
// list[1].style.color = 'darkgreen'

// const odd = document.querySelectorAll('li:nth-child(odd')

// for(let i = 0; i<odd.length; i++){
//     odd[i].style.backgroundColor = 'green'
// }

var itemlist = document.querySelector('#items')
//parentNode
//itemlist.parentNode.style.backgroundColor = '#f4f4f4'
//parentElement
itemlist.parentElement.style.backgroundColor = '#f4f4f4'

//lastelementchild
itemlist.lastElementChild.style.color = 'green'

//lastchild
//console.log(itemlist.lastChild) //pointing to text which is a linebreak

//create a div
var newdiv = document.createElement('div');
//add a class
newdiv.className = 'Hello';
//add id
newdiv.id = 'newdiv'
//add attribute
newdiv.setAttribute('title', 'Hello Div')

//create text node
textdiv = document.createTextNode('hello world')

//add text to div
newdiv.appendChild(textdiv); 

//adding to dom
var container = document.querySelector('.container');
var h1 = document.querySelector('header h1')

container.insertBefore(newdiv,  h1)

newdiv.style.fontSize = '30px'
//creating element
var newcontainer = document.querySelector('div .list-group')
var h2 = document.querySelector('div li')

var text = document.createElement('div')
text.className = 'title'
text.setAttribute('title', 'Hello World')
t = document.createTextNode('Hello World')
text.append(t)
text.style.fontSize = '20px'

newcontainer.insertBefore(text, h2)


console.log(h2)