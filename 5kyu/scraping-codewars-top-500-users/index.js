// scraping-codewars-top-500-users

const cheerio = require('cheerio')
const request = require('request')
const URL = 'https://www.codewars.com/users/leaderboard';

function solution () {

    let leaderboard = {}
    return new Promise((resolve, reject) => {

        request(URL, function (err, resp, html) {
            if (err) {
                console.log(err)
                return
            }

            leaderboard.position = []

            const $ = cheerio.load(html, { decodeEntities: false })

            $('table > tr').each((i, e) => {
                let $tr = $(e)
                if (!$tr.attr('data-username')) return

                let user = {}
                user.name = $tr.attr('data-username')
                $tr.find('td').each((j, td) => {
                    if (j == 2) user.clan = $(td).html()
                    if (j == 3) user.honor = +$(td).html()
                })

                leaderboard.position[i] = user
            })
            resolve(leaderboard)
        })
    })
}