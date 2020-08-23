const dummy = (blogs)=>{
    return 1
}

const totalLikes = (testiBlogs) =>{
    let plus = 0
    for(let i = 0; i< testiBlogs.length; i++){
        plus = testiBlogs[i].likes + plus
    }
    return plus
}

module.exports ={
    dummy,
    totalLikes
}