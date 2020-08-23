const listHelper = require('../utils/list_helper')

describe('Total likes', ()=>{
    const testiBlogs = [
        {
            title: "Testi Kirjoitus",
            author: "Erik",
            url: "huh",
            likes: 500,
        },
        {
            title: "Otsikko",
            author: "Erik",
            url: "uri uri uri",
            likes: 9462,
        }
    ]

    test('Tykkäyksiä yhteensä: ', () => {
        const result = listHelper.totalLikes(testiBlogs)
        expect(result).toBe(9962)
    })
})
