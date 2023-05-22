const user = {
    name: "Nick",
    lastActivityTime: null
}
let posts = []
function updateLastUserActivityTime(user){
    return new Promise((resolve, reject) => {
        user.lastActivityTime = new Date().toString()
        })
}

const createPost= new Promise((resolve, reject) => {
    setTimeout(() => {
        posts.push({title: 'New Post'})
        posts.push({title: 'POST2'})
        updateLastUserActivityTime(user)
        console.log(posts)
        resolve(user.lastActivityTime)
    },1000)
})

const deletePost = new Promise((resolve,reject) =>{
    setTimeout(() => {
        if(posts.length>=1){
            posts.pop()
            resolve(posts)
        }else{
            reject('ERROR')
        }
    }, 1000);
    
})

promises = [createPost,deletePost]
Promise.all(promises).then((posts)=>{
    console.log(posts)
}).catch((err) =>{
    console.log(err)
})