const colour_inputs = document.querySelectorAll(`input[type="color"]`);
colour_inputs.forEach(function(input, index) {
    input.addEventListener("input", (e) => {
        document.querySelector(':root').style.setProperty(`--${input.id}`, e.target.value)
    })
})

function typewriter(text_el, speed, delay = 0) {
    const full_text = text_el.textContent;
    text_el.style.height = text_el.offsetHeight + "px";
    text_el.textContent = '';
    
    setTimeout(() => {
        let index = 0;
        text_el.style.opacity = "1";
        const interval_id = setInterval(() => {
            if (index < full_text.length) {
                text_el.textContent += full_text.charAt(index);
                index++;
            } else {
                clearInterval(interval_id);
            }
        }, speed);
    }, delay);
}

typewriter(document.querySelector("h1"), 100, 10000);

async function fetch_json(sheet_url, asdf = "AIzaSyAM07AIfBXXRU0Y8MbpzySSVtCAG3xjHr0") {
    try {
        const response = await fetch(`${sheet_url}?key=${asdf}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
        throw error; // Re-throw the error to allow handling by caller
    }
}

fetch_json('https://sheets.googleapis.com/v4/spreadsheets/1zjRNYIoJHSVrsQmtPnAIGiT7ER851TkQE9bgxqoL86Q/values/Birthday_Cards')
.then(response => {
    const code = window.location.href.split("?=")[1];
    response.values.forEach(arr => {
        if(arr.includes(code)) {
            document.querySelector("h2").textContent = `Dear ${arr[0]},`;
            document.querySelector("p").textContent = `${arr[1]}`;
        }
    })
})
.catch(error => {
    console.error('Fetch failed:', error);
});
