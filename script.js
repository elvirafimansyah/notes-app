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
    const tools = document.createElement("div")
    const edit = document.createElement("button");
    const deleteButton = document.createElement('button');
    const fakeElement = document.createElement("div");
    const date = document.createElement("h3"); 
    const title = document.createElement("div");
    
    // styling
    content.classList.add("bg-glass")
    container.classList.add("w-72", "p-5", "bg-glass", "m-4", "rounded-r-md","rounded-l-sm", "notess", "border-l-2", "border-pink-600")
    title.classList.add("text-xl");
    tools.classList.add("flex", "justify-between")
    // text
    
    deleteButton.innerHTML = `
    <button type="button"
    class="p-2.5 text-sm font-medium text-white rounded-md border border-gray-800  focus:ring-1 focus:outline-none  hover:bg-glass focus:ring-gray-800 delete-btn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
    </button>`;
    edit.innerHTML = "Edit";
    content.innerHTML = `<textarea type="text" class="bg-transparent text-white border-none outline-none resize-none box-border w-full h-44 p-0 overflow-y-auto " readonly >${element.text}
    </textarea>`;
    date.innerHTML = `${element.createAt}`;
    title.innerHTML = `<h2 class="text-2xl">${element.title}</h2>`;

    // display => container
    tools.appendChild(fakeElement);
    tools.appendChild(deleteButton);
    container.appendChild(tools)
    container.appendChild(title);
    container.appendChild(content)
    container.appendChild(edit);
    container.appendChild(date)

    result.appendChild(container)

    const tombolHapus = tools.querySelector(".delete-btn");

    tombolHapus.addEventListener("click", (index) => {
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
