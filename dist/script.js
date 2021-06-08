const modal = document.getElementById("modal");
const form = document.querySelector(".modal__form");
const title = document.querySelector(".modal__title");
const description = document.querySelector(".modal__description");
const btnClean = document.querySelector(".modal__cta--clean");
const btnSaveNote = document.querySelector(".modal__cta--add");
const noteContainer = document.querySelector(".note__list");
// inner component
const template = document.querySelector("template").content;
const fragmentNote = document.createDocumentFragment();

// Variables
let noteList = [
  {
    id: "1609665055491",
    title: "titulo de prueba 1",
    description: "Descripttion de prueba numero 1"
  },
  {
    id: "1609665055526",
    title: "titulo de prueba 2",
    description: "Descripttion de prueba numero 2"
  },
  {
    id: "1609665055865",
    title: "titulo de prueba 3",
    description: "Descripttion de prueba numero 3"
  },
  {
    id: "1609665055130",
    title: "titulo de prueba 4",
    description: "Descripttion de prueba numero 4"
  }
];

// OPEN MODAL
function openModal() {
  modal.setAttribute("open", true);
  title.focus();
}

// CLOSE MODAL
function closeModal() {
  modal.removeAttribute("open");
}

// CLEAN FORMULARIO
function cleanForm() {
  form.reset(); // alternativa con even listener
  btnClean.disabled = true;
  btnSaveNote.disabled = true;
  title.focus();
}

// LOGIC ENABLED/DISABLED BUTTONS
modal.addEventListener("keyup", (event) => {
  // catch keyup in modal and abilitate clear button
  btnClean.disabled =
    title.value !== "" || description.value !== "" ? false : true;

  // abilitate addtask button
  btnSaveNote.disabled = title.value !== "" ? false : true;
});

// SAVE NOTE
function saveNote(e) {
  e.preventDefault();
  let newNote = {};
  newNote.id = JSON.stringify(+new Date());
  newNote.title = title.value.trim() !== "" ? title.value : "NO TITLE";
  newNote.description =
    description.value.trim() !== "" ? description.value : "NO DESCRIPTION";

  noteList.push(newNote);
  console.log(noteList);
  renderNote();
  cleanForm();
  closeModal();
}

// DELETE NOTE
function deleteNote(el) {
  let temp = noteList.findIndex(
    (element) => element.id === el.attributes.name.value
  );
  noteList.splice(temp, 1);
  renderNote();
}

// EDIT NOTE
function editNote(el) {
  let temp = noteList.findIndex(
    (element) => element.id === el.attributes.name.value
  );
  openModal();
  console.log(title, noteList[temp].title);
  title.value = noteList[temp].title; // mofify throw modal
  description.value = noteList[temp].description;
  noteList.splice(temp, 1);
  // renderNote();
}

// RENDER NOTES
function renderNote() {
  noteContainer.innerHTML = "";
  for (let i in noteList) {
    fragmentNote.appendChild(paintNote(noteList[i]));
  }
  noteContainer.appendChild(fragmentNote);
}

function paintNote(el) {
  const clone = template.cloneNode(true);
  let noteItem = ``;
  clone.querySelector(".note__item").setAttribute("id", el.id); // set id each note
  clone.querySelector(".note__title").textContent = el.title;
  clone.querySelector(".note__body p").textContent = el.description;
  clone.querySelector(".note__delete").setAttribute("name", el.id);
  clone.querySelector(".note__edit").setAttribute("name", el.id);

  return clone;
}

// LIKE INIT
renderNote();