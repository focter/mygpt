document.addEventListener('DOMContentLoaded', (event) => {
    // 将所有的脚本放在这里
    document.getElementById('sendButton').addEventListener('click', sendMessage);
    async function sendMessage() {
        var input = document.getElementById("user-input");
        var message = input.value.trim();

        if (message) {
            // 显示用户的消息
            displayUserMessage(message);

            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({message: message}),
                });

                if (response.ok) {
                    const data = await response.json();

                    // 使用逐字显示的方式展示GPT-4的消息
                    displayTextByChar(data.message, 100); // 逐字显示，每字间隔100毫秒
                } else {
                    console.error('Error from server');
                }
            } catch (error) {
                console.error('Failed to send message:', error);
            }

            input.value = ""; // 清空输入框
        }
    }

    function displayUserMessage(message) {
        let chatWindow = document.getElementById("chat-window");
        let userMessage = document.createElement("div");
        userMessage.textContent = message;
        userMessage.className = "user-message"; // 应用样式
        chatWindow.appendChild(userMessage);
    }

    function displayTextByChar(text, interval) {
        let index = 0;
        let chatWindow = document.getElementById("chat-window");

        let chatGPTMessage = document.createElement("div");
        chatGPTMessage.className = "gpt-message"; // 应用样式
        chatWindow.appendChild(chatGPTMessage);

        let timer = setInterval(() => {
            if (index < text.length) {
                chatGPTMessage.textContent += text[index++];
            } else {
                clearInterval(timer); // 文本显示完毕，清除定时器
            }
        }, interval);
    }

// 添加事件监听器，使得回车键也能发送消息
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // 阻止默认行为（例如换行）
            sendMessage(); // 调用发送消息的函数
        }
    });
});