const axios = require('axios').default;
const cheerio = require('cheerio');
const Book = require('../models/Book');
async function getBooksHTML() {
    return await axios.get(`https://book.douban.com/latest`).then(r=>r.data);
}

async function getBooksLinks() {
     const html = await getBooksHTML();
     const $ = cheerio.load(html);
     const anchorElements = $('#content .grid-12-12 li a.cover');
     return Array.from(anchorElements).map((ele,i)=>$(ele).attr('href'));
}
async function getBookInfo(detailUrl) {
    const html = await axios.get(detailUrl).then(r=>r.data);
    const $ = cheerio.load(html);
    const name = $('h1').text().trim();
    const imgUrl = $('#mainpic .nbg img').attr('src');
    const spans = $('#info span.pl');
    const author = spans.filter((i,ele)=>$(ele).text().includes("作者")).next('a').text();
    const publishDate = spans.filter((i,ele)=>$(ele).text().includes("出版年"))[0].nextSibling.nodeValue.trim();
    return{
        name,
        imgUrl,
        publishDate,
        author
    }
}



async function fetchAll() {
    const links = await getBooksLinks();
    const pros = links.map((link)=>{
        return getBookInfo(link);
    });
    return Promise.all(pros);
}

async function saveToDB() {
    const result = await fetchAll();
    console.log(result);
    await Book.bulkCreate(result);
    console.log('数据抓取完毕，并保存成功！');
}

saveToDB();


