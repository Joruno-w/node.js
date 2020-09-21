const Book = require('../models/Book');
exports.addBook = async function (BookObj) {
    const ins = await Book.create(BookObj);
    return ins.toJSON();
}
exports.deleteBook = async function (BookId) {
    // const ins = await Book.findByPk(BookId);
    // if (ins){
    //     await ins.destroy();
    // }
    await Book.destroy({
        where: {
            id: BookId
        }
    });
}
exports.updateBook = async function (id,BookObj) {
    // const ins = await Book.findByPk(id);
    // ins.loginId = BookObj.loginId;
    // await ins.save();
    await Book.update(BookObj,{
        where: {
            id
        }
    });
}
