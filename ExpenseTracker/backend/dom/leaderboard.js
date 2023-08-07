const button = document.getElementById('leaderboardButton')

button.onclick = (async function (e) {
    const token = document.getElementById('token')
    try {
        const result = await axios.get('http://localhost:3000/leaderboard', {
            headers: {
                'Auth': token
            }
        })
        createleaderBoard(result.data)

    } catch (err) {
        console.log(err)
    }
})

function createleaderBoard(data) {
    const table = document.getElementById('leaderboardTable')
    table.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        var item = data[i]
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


        td.appendChild(document.createTextNode(item.name))
        td2.appendChild(document.createTextNode(item.totalAmount))

        tr.appendChild(td)
        tr.appendChild(td2)

        // items.appendChild(li)
        table.append(tr)
    };
};