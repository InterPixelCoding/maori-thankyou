const colour_inputs = document.querySelectorAll(`input[type="color"]`);
colour_inputs.forEach(function(input, index) {
    input.addEventListener("input", (e) => {
        console.log(e.target.value)
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

typewriter(document.querySelector("h1"), 100, 10000)