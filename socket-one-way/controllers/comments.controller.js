const Comment = require('../models/comment');
const comments = [{
    user: 'Batman',
    comment: 'Great post!'
}, {
    user: 'Robin',
    comment: 'Interesting ideas...'
}, {
    user: 'Joker',
    comment: 'Thanks, Batman!'
}, {
    user: 'Bruce Wayne',
    comment: 'I agree with Batman'
}];


module.exports = (socket)=>{
    const stream = Comment.find().cursor();
    stream.on('data', function (comment) {
        // console.log(comment)
        socket.emit('comment.add', comment);
    });

    //serving static data
    // for(let i=0;i<comments.length;i++){
    //     socket.emit('comment.add', comments[i]);
    //     socket.emit('comments.count',{count: i+1});
    // }
}