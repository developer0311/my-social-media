let like = document.querySelectorAll(".like")

like.forEach((elem)=>{
    elem.addEventListener("click", (e)=>{
        elem.classList.toggle('bx-heart')
        elem.classList.toggle('bxs-heart')
        elem.style.color = elem.classList.contains('bxs-heart') ? "#ed0000" : "black";
    })
})



let comment = document.querySelectorAll(".comment")

comment.forEach(elem => {
    elem.addEventListener("click", () => {
        const commentSection = elem.closest('.block').querySelector('.comment-section');
        commentSection.style.display = commentSection.style.display === 'block' ? 'none' : 'block';
    });
});

document.querySelectorAll(".send-comment").forEach(button => {
    button.addEventListener("click", () => {
        const block = button.closest('.block');
        const input = block.querySelector('.comment-section input');
        const commentsDiv = block.querySelector('.comments');
        const commentText = input.value.trim();
        if (commentText) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.textContent = commentText;
            commentsDiv.appendChild(commentDiv);
            input.value = '';
        }
    });
});


document.querySelectorAll(".share").forEach(button => {
    button.addEventListener("click", () => {
        const block = button.closest('.block');
        const imageUrl = block.querySelector('.block-image img').src; // Select the image within the block
        const title = 'Beautiful Caption';
        const text = 'Check out this awesome content!';
        
        // Fetch the image blob
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], 'image.jpg', { type: blob.type });

                if (navigator.share) {
                    navigator.share({
                        title: title,
                        text: text,
                        url: window.location.href,
                        files: [file]
                    }).then(() => {
                        console.log('Thanks for sharing!');
                    }).catch(console.error);
                } else {
                    alert('Web Share API is not supported in your browser.');
                }
            })
            .catch(console.error);
    });
});

let year = document.querySelector(".year")

year.innerText = new Date().getFullYear()