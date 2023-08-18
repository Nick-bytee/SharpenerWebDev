const button = document.getElementById('button')
button.addEventListener('click', downloadReport)

async function downloadReport(event) {
    const token = localStorage.getItem('token')
    event.preventDefault()
    try{
        const report = await axios.get('http://localhost:3000/downloadReport', {headers : {'Auth' : token}})
        console.log(report)
        if(report.status === 200){
            const a = document.createElement('a')
            a.href = report.data.URL;
            a.download = 'myExpenses.csv';
            a.click()
        }else {
            throw new Error('An Error Occured')
        }
    }catch(err){
        console.log(err)
        document.getElementById('err').innerHTML = 'An Error Occured'
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token')
    try {
        const expenses = await axios.get('http://localhost:3000/getReport', {
            headers: {
                'Auth': token
            }
        })
        if(!expenses.data.isPremium){
            window.alert('You are not a premium user')
        }else {
            createReports(expenses.data.expenses)
        }
    } catch (err) {
        console.log(err)
    }
})

function createReports(data) {
    const table = document.getElementById('reportsTable')
    const total = document.getElementById('total')
    let totalExpense = 0 
    let td = document.createElement('td')
    table.innerHTML = "";
    for (let i = 0; i < data.length; i++){
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
    const date = document.createElement('td')
    const description = document.createElement('td')
    const category = document.createElement('td')
    const expense = document.createElement('td')  


    date.innerHTML = item.createdAt.split('T')[0]
    description.innerHTML = item.description
    category.innerHTML = item.category
    expense.innerHTML = item.amount

    tr.appendChild(date)
    tr.appendChild(description)
    tr.appendChild(category)
    tr.appendChild(expense)

    // items.appendChild(li)
    table.append(tr)
    totalExpense+=item.amount
    }
    total.innerHTML = totalExpense
};