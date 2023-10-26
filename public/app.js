const form = document.querySelector(".number-form");
const numberInput = document.querySelector(".numberInput");
const numInput = document.querySelector("input[name='num']");

function createNumberElement(number) {
  const p = document.createElement("p");
  p.addEventListener("click", () => {
    fetch(`/numbers/${number.id}`, {
      method: "DELETE",
    }).then(() => {
      p.remove();
      console.log(`Removed id number ${number.id} and content value ${number.num}`)
    });
  });
  p.innerText = number.num;

  return p;
}

function getnumbers() {
  fetch("/numbers")
    .then((response) => response.json())
    .then((numbers) => {
      numberInput.innerText = "";
      for (let number of numbers) {
        const element = createNumberElement(number);
        numberInput.append(element);
      }
    });
}

getnumbers();

form.addEventListener("submit", (event) => {
  // Prevent form from trying to auto-submit.
  event.preventDefault();

  // Get data in the form.
  const formData = new FormData(event.target);
  const num = formData.get("num");

  fetch("/numbers", {
    method: "POST",
    // We must stringify the body, because fetch won't do it for us.
    body: JSON.stringify({ num }),
    headers: {
      // We must include this, or express doesn't know how to parse the body.
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((number) => {
      numInput.value = "";
      console.log(numInput, number)
      getnumbers();
      // figure out what to do here
    });
});