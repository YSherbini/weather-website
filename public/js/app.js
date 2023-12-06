const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;

    msg1.textContent = ""
    msg2.textContent = "Loading..."
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.err) {
                return msg2.textContent = "Error"
            }
            msg1.textContent = data.forecast
            msg2.textContent = data.location
        });
    });
});
