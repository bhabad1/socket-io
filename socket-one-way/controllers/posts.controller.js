

const posts = [{
    user: 'Two-Face',
    title: 'How to Flip a Coin'
}, {
    user: 'Joker',
    title: 'Top 5 Jokes of 2015'
}];

module.exports = (socket)=>{
    // for(let i = 0; i<posts.length;i++){
    //     socket.emit('post.add',posts[i]);
    //     socket.emit('posts.count',{count:i+1});
    // }

    // for pushing one post at a time
    var i = 0;
    var addingPosts = setInterval(function () {
        if (posts[i]) {
            socket.emit('post.add', posts[i]);
            socket.emit('posts.count', {
                count: i + 1
            });
 i++; } else {
            clearInterval(addingPosts);
        }
 }, 2000);
}