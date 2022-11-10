const charactersAPI = new APIHandler("http://localhost:8000");
const characterContainer = document.querySelector(".characters-container");
const deleteButton = document.getElementById("delete-one");
const createButton = document.getElementById("send-data");
const updateButton = document.getElementById("update-data");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
      characterContainer.innerHTML = "";
      const fullList = await charactersAPI.getFullList();
      fullList.forEach((character) => {
        renderCharcaterCard(character);
      });
      console.log(fullList);
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
      characterContainer.innerHTML = "";
      const characterId = document.querySelector(
        "input[name='character-id']"
      ).value;
      const fetchedCharacter = await charactersAPI.getOneRegister(characterId);
      renderCharcaterCard(fetchedCharacter);
      console.log(fetchedCharacter);
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      try {
        deleteButton.classList.remove("active");
        deleteButton.classList.remove("error");
        const characterId = document.querySelector(
          "input[name='character-id-delete']"
        ).value;
        const deletedCharacter = await charactersAPI.deleteOneRegister(
          characterId
        );
        deleteButton.classList.add("active");
      } catch (error) {
        console.log(error);
        deleteButton.classList.add("error");
      }
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      try {
        updateButton.classList.remove("active", "error");
        event.preventDefault();
        const editCharacterForm = document.getElementById(
          "edit-character-form"
        );
        const id = editCharacterForm.querySelector(
          "input[name='chr-id']"
        ).value;
        const name =
          editCharacterForm.querySelector("input[name='name']").value;
        const occupation = editCharacterForm.querySelector(
          "input[name='occupation']"
        ).value;
        const weapon = editCharacterForm.querySelector(
          "input[name='weapon']"
        ).value;
        const cartoon = editCharacterForm.querySelector(
          "input[name='cartoon']"
        ).checked;
        const updatedCharacter = await charactersAPI.updateOneRegister(
          id,
          name,
          occupation,
          weapon,
          cartoon
        );
        updateButton.classList.add("active");
        console.log(updatedCharacter);
      } catch (error) {
        updateButton.classList.add("error");
        console.log(error);
      }
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      try {
        createButton.classList.remove("active");
        createButton.classList.remove("error");
        event.preventDefault();
        const newCharacterForm = document.getElementById("new-character-form");
        const name = newCharacterForm.querySelector("input[name='name']").value;
        const occupation = newCharacterForm.querySelector(
          "input[name='occupation']"
        ).value;
        const weapon = newCharacterForm.querySelector(
          "input[name='weapon']"
        ).value;
        const cartoon = newCharacterForm.querySelector(
          "input[name='cartoon']"
        ).checked;
        const newCharacter = await charactersAPI.createOneRegister(
          name,
          occupation,
          weapon,
          cartoon
        );
        if (newCharacter) {
          document.reload();
          createButton.classList.add("active");
        } else {
          createButton.classList.add("error");
        }
      } catch (error) {
        console.log(error);
      }
    });
});

function renderCharcaterCard(character) {
  const { name, occupation, weapon, cartoon } = character;
  const template = document.querySelector(".character-card");
  const clone = template.content.cloneNode(true);
  let characterName = clone.querySelector(".name");
  let characterOccupation = clone.querySelector(".occupation");
  let characterWeapon = clone.querySelector(".weapon");
  let characterCartoon = clone.querySelector(".cartoon");

  characterName.innerHTML += `<span> ${name}</span>`;
  characterOccupation.innerHTML += `<span> ${occupation}</span>`;
  characterWeapon.innerHTML += `<span> ${weapon}</span>`;
  characterCartoon.innerHTML += `<span> ${cartoon}</span>`;

  characterContainer.appendChild(clone);
}
