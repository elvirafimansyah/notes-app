const titleInput = document.getElementById("my-title")
const notesInput = document.getElementById("my-notes");
const btnAdd = document.querySelector("#btn-add");
const result = document.getElementById("result");
const btnModal = document.getElementById("btn-modal");
const searchInput = document.getElementById("search-navbar");

btnModal.addEventListener("click", () => {
  btnModal.parentElement.classList.remove("fixed");
  btnModal.parentElement.classList.add("absolute") 
})

let data_result = JSON.parse(localStorage.getItem("text")) || [];
data_result.sort((a, b) => {
  return new Date(a.updated) > new Date(b.updated) ? -1 : 1
})

btnAdd.addEventListener("click", () => {
  const notesValue = notesInput.value;
  const titleValue = titleInput.value;
  if (notesValue !== "" && titleValue !== "") {
    const textObject = {
      title: titleValue,
      text: notesValue,
      createAt: new Date().toLocaleString(undefined, {dateStyle: "full", timeStyle: "short"})
    }
    data_result.push(textObject)
    localStorage.setItem("text", JSON.stringify(data_result))
    
    displayNotes()
  } else {
    notesInput.focus()
  }

  btnModal.parentElement.classList.remove("absolute");
  btnModal.parentElement.classList.add("fixed")
})

var notes = ""

function displayNotes() {
  result.innerHTML = "";
  data_result.forEach(element => {
    // create Element
    const container = document.createElement("div");
    const content = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement('button');
    const date = document.createElement("h3"); 
    const title = document.createElement("div");

    // styling
    content.classList.add("bg-glass")
    container.classList.add("w-72", "p-5", "bg-glass", "m-4", "rounded-md", "notess")
    edit.classList.add("float-right", "edit")
    title.classList.add("text-xl");

    // text
    edit.innerHTML = "edit";
    deleteButton.innerHTML = "delete";
    content.innerHTML = `<textarea type="text" class="bg-transparent text-white border-none outline-none resize-none box-border w-full h-44 p-0 overflow-y-auto " readonly >${element.text}</textarea>`;
    date.innerHTML = `${element.createAt}`;
    title.innerHTML = `<h2>${element.title}</h2>`;

    // display => container
    container.appendChild(edit);
    container.appendChild(deleteButton);
    container.appendChild(date)
    container.appendChild(title);
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

  // Search Filter
  const notesData = document.querySelectorAll(".notess");
  searchInput.addEventListener("keyup", function (event) {
    const keyword = event.target.value.toLowerCase();
  
    notesData.forEach((row) => {
      const title = row.querySelector("h2");
      const status = title.textContent.toLowerCase().startsWith(keyword);
      if (status) {
        row.style.display = "block";
      } else {
        row.style.display = "none"
      }
    })
  });
}

if (localStorage.getItem("text")) {
  displayNotes()
}
