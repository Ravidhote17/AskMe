let prompt = document.querySelector("#prompt");
let container = document.querySelector(".container");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;

let Api_Url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD8yimXB9MUm6WE7F_UvdpsV5UVz3U6UIs'
function createChatBox(html, className){
    let div  = document.createElement("div");
    div.classList.add(className)
    div.innerHTML = html;
    return div;
}

async function getApiResponse(aiChatBox){

    let textElement = aiChatBox.querySelector(".text")

    try{
        let response = await fetch(Api_Url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contents:[
                    {"role": "user",
                     "parts":[{text:userMessage}]}]
            })
        })
        let data = await response.json();
        let apiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerText = apiResponse;
    }
    catch(e){
        console.error("Error: ", e);
    }
    finally{
        aiChatBox.querySelector("#loading").style.display = "none";
    }
}
function showLoading(){
    let html = `<div class="img">
                    <img src="https://cdn.pixabay.com/photo/2020/01/02/16/38/chatbot-4736275_960_720.png" alt="" width="50">
                </div>
                <p class="text"></p>
                <img id="loading" src="assets/dribbble-loader-green.gif" alt="loading" height="100">`
                let aiChatBox = createChatBox(html, "ai-chat-box")
                chatContainer.appendChild(aiChatBox)
                getApiResponse(aiChatBox)
}

btn.addEventListener("click", () => {
    userMessage = prompt.value;
    if(userMessage== ""){
        container.style.display = "flex"
    }
    {
        container.style.display = "none"

    }
    if (!userMessage) return;
    let html = `<div class="img">
                    <img src="https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_640.png" alt="" width="50">
                </div>
                <p class="text"></p>`
    let userChatBox = createChatBox(html, "user-chat-box")
    userChatBox.querySelector('.text').innerText = userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value = "";
    setTimeout(showLoading, 500)
});
