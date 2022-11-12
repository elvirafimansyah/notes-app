const titleInput = document.getElementById("my-title")
const notesInput = document.getElementById("my-notes");
const btnAdd = document.querySelector("#btn-add");
const result = document.getElementById("result");

let data_result = JSON.parse(localStorage.getItem("text")) || []
btnAdd.addEventListener("click", () => {
  const notesValue = notesInput.value;
  const titleValue = titleInput.value;
  if (notesValue !== "" && titleValue !== "") {
    const textObject = {
      title: titleValue,
      text: notesValue,
      createAt: new Date()
    }
    data_result.push(textObject)
    localStorage.setItem("text", JSON.stringify(data_result))

    displayNotes()
  } else {
    notesInput.focus()
  }
})


function displayNotes() {
  result.innerHTML = ""
  data_result.forEach(element => {
    // create Element
    const container = document.createElement("div");
    const content = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement('button');
    const date = document.createElement("h3"); 

    // styling
    content.classList.add("bg-glass")
    container.classList.add("w-72", "p-5", "bg-glass", "m-4", "rounded-md")
    edit.classList.add("float-right", "edit")

    // text
    edit.innerHTML = "edit";
    deleteButton.innerHTML = "delete"
    content.innerHTML = `<textarea type="text" class="bg-transparent text-white border-none outline-none resize-none box-border w-full h-44 p-0 overflow-y-auto " readonly >${element.text}</textarea>`
    date.innerHTML = `${element.createAt}`
    
    // display => container
    container.appendChild(edit);
    container.appendChild(deleteButton);
    container.appendChild(date)
    container.appendChild(content)
    result.appendChild(container)

    deleteButton.addEventListener("click", (index) => {
      data_result = data_result.filter(e => {
        if (e != element) {
          return index;
        }
      });
      localStorage.setItem('text', JSON.stringify(data_result));
      displayNotes()
    })

    edit.addEventListener("click", () => {
      const input = content.querySelector("textarea");
      input.removeAttribute("readonly")
      input.focus()
      input.classList.remove("pointer-events-none")
      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true);
        element.text = e.target.value
        localStorage.setItem("text", JSON.stringify(data_result))
        displayNotes()
      })
    })

  });
}


if (localStorage.getItem("text")) {
  displayNotes()
}
