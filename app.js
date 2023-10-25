const form = document.querySelector(".number-form");
const numbers = document.querySelector(".thingies");
const numInput = document.querySelector("input[name='num']");

function getNums() {
    fetch("/numbers")
      .then((response) => response.json())
      .then((numbers) => {
        numbers.innerText = "";
        for (let number of numbers) {
          const element = createThingElement(number);
          numbers.append(element);
        }
      });
  }

  getNums();

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
      getNums();
      // figure out what to do here
    });