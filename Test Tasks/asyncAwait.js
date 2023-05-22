console.log('Person 1: Shows Ticket')
console.log('Person 2: Shows Ticket')

const premovie = async () =>{
    const promiseWifiBringingTickets = new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve('ticket')
        }, 3000)
    });

    const getPopcorn = new Promise((resolve, reject) => resolve('Popcorn'));

    const getButter = new Promise((resolve, reject) =>  resolve('butter'));

    const getColdrink = new Promise((resolve,reject) => resolve('Coldrink'))

    let ticket = await promiseWifiBringingTickets;
    console.log(`wife: i have the ${ticket}`)
    console.log('wife: I need some popcorn First')

    let popcorn = await getPopcorn;
    console.log(`Husband: I got the ${popcorn}`)
    console.log(`wife: I need butter on my popcorn`)

    let butter = await getButter;
    console.log(`Husband : I got the ${butter}`)
    console.log(`wife: I need a coldrink too`)

    let coldDrinks = await getColdrink
    console.log('husband: I got the coldrink')
    console.log('Wife: Lets go in then')

    return ticket
    
 }
 premovie().then((m) => console.log(m))
 console.log('Person 4: Shows Ticket')