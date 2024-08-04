document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");
    
    // Use global variables from data.js
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const blockData = data[key];
            const block = document.createElement("div");
            block.classList.add("block");

            block.innerHTML = `
                <div class="block-image">
                    <img src="${blockData.image}" alt="${blockData.name}">
                </div>
                <div class="interaction">
                    <div class="like-container">
                        <i class='bx bx-heart like'></i>
                        <span class="like-count">9M+</span>
                    </div>
                    <i class="fa-regular fa-comment comment" style="color: #000000;"></i>
                    <i class='bx bx-share share'></i>
                </div>
                <p>${blockData.caption}</p>
                <div class="comment-section">
                    <input type="text" placeholder="Add a comment...">
                    <button class="send-comment"><i class='bx bxs-send' style='color:#ffffff'></i></button>
                </div>
                <div class="comments"></div>
            `;
            mainContent.appendChild(block);
        }
    }

    displayComments();
    addInteractionListeners();

    let year = document.querySelector(".year");
    if (year) {
        year.innerText = new Date().getFullYear();
    }
});

function displayComments() {
    const comments = window.loadComments();
    document.querySelectorAll('.block').forEach((block, index) => {
        const blockIndex = (index + 1).toString(); // Convert index to string
        const commentsDiv = block.querySelector('.comments');

        if (comments[blockIndex]) {
            comments[blockIndex].forEach(commentText => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.textContent = commentText;
                commentsDiv.appendChild(commentDiv);
            });
        }
    });
}

function addInteractionListeners() {
    let like = document.querySelectorAll(".like");

    like.forEach((elem) => {
        elem.addEventListener("click", (e) => {
            elem.classList.toggle("bx-heart");
            elem.classList.toggle("bxs-heart");
            elem.style.color = elem.classList.contains("bxs-heart")
                ? "#ed0000"
                : "black";
        });
    });

    let comment = document.querySelectorAll(".comment");

    comment.forEach((elem) => {
        elem.addEventListener("click", () => {
            const commentSection = elem
                .closest(".block")
                .querySelector(".comment-section");
            commentSection.style.display =
                commentSection.style.display === "block" ? "none" : "block";
        });
    });

    document.querySelectorAll(".send-comment").forEach((button) => {
        button.addEventListener("click", () => {
            const block = button.closest(".block");
            const input = block.querySelector(".comment-section input");
            const commentsDiv = block.querySelector(".comments");
            const commentText = input.value.trim();
            if (commentText) {
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");
                commentDiv.textContent = commentText;
                commentsDiv.appendChild(commentDiv);
                input.value = "";

                // Simulate saving comment
                const blockIndex = Array.from(block.parentElement.children).indexOf(block) + 1; // Assuming block index starts at 1
                const blockIndexStr = blockIndex.toString();

                // Use the global addComment function
                window.addComment(blockIndexStr, commentText);

                console.log('Comment saved:', window.loadComments());
            }
        });
    });

    document.querySelectorAll(".share").forEach((button) => {
        button.addEventListener("click", () => {
            const block = button.closest(".block");
            const imageUrl = block.querySelector(".block-image img").src; // Select the image within the block
            const title = "Beautiful Caption";
            const text = "Check out this awesome content!";

            // Fetch the image blob
            fetch(imageUrl)
                .then((response) => response.blob())
                .then((blob) => {
                    const file = new File([blob], "image.jpg", { type: blob.type });

                    if (navigator.share) {
                        navigator
                            .share({
                                title: title,
                                text: text,
                                url: window.location.href,
                                files: [file],
                            })
                            .then(() => {
                                console.log("Thanks for sharing!");
                            })
                            .catch(console.error);
                    } else {
                        alert("Web Share API is not supported in your browser.");
                    }
                })
                .catch(console.error);
        });
    });
}
