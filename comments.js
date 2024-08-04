// const comments = {
//     "1": ["Hello", "Great work"],
//     "2": ["Nice photo"]
// };

// // Function to add a comment
// function addComment(blockId, commentText) {
//     if (!comments[blockId]) {
//         comments[blockId] = [];
//     }
//     comments[blockId].push(commentText);
// }

// // Expose the comments object and addComment function globally
// window.comments = comments;
// window.addComment = addComment;


const LOCAL_STORAGE_KEY = 'comments';

// Load comments from localStorage
function loadComments() {
    const savedComments = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedComments ? JSON.parse(savedComments) : {};
}

// Save comments to localStorage
function saveComments(comments) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(comments));
}

// Function to add a comment
function addComment(blockId, commentText) {
    const comments = loadComments();
    if (!comments[blockId]) {
        comments[blockId] = [];
    }
    comments[blockId].push(commentText);
    saveComments(comments);
}

// Expose the functions globally
window.addComment = addComment;
window.loadComments = loadComments;
window.saveComments = saveComments;
