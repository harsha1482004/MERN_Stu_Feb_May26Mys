const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const message = document.getElementById("message");
const container = document.getElementById("Container");
const emptyMsg = document.getElementById("emptyMsg");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addFAQ);

function addFAQ() {

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    message.textContent = "";

    if (question.length < 5) {
        message.textContent = "Question must be at least 5 characters";
        return;
    }

    if (answer.length < 15) {
        message.textContent = "Answer must be at least 15 characters";
        return;
    }
    emptyMsg.style.display = "none";

    const faqBlock = document.createElement("div");
    faqBlock.className = "bg-white p-4 rounded shadow mb-3";

    const q = document.createElement("h3");
    q.textContent = question;
    q.className = "font-bold text-lg";

    const a = document.createElement("p");
    a.textContent = answer;
    a.className = "mt-2";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "mt-3 bg-red-500 text-white px-3 py-1 rounded";

    deleteBtn.addEventListener("click", function () {
        faqBlock.remove();

        if (container.children.length === 1) {
            emptyMsg.style.display = "block";
        }
    });

    faqBlock.appendChild(q);
    faqBlock.appendChild(a);

    faqBlock.insertAdjacentHTML(
        "beforeend",
        '<span class="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded ml-2">FAQ</span>'
    );

    faqBlock.appendChild(deleteBtn);

    container.appendChild(faqBlock);

    questionInput.value = "";
    answerInput.value = "";
}