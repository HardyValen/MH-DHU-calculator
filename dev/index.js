document.addEventListener("keydown", function (event) {
  if (event.code === "Tab") {
    event.preventDefault();
    console.log(event.code)
  }
})  