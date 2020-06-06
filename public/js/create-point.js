function pupulateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`;
      }
    });
}

pupulateUfs();

function getCities(event) {
  const citysSelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citysSelect.disabled = true;
  citysSelect.innerHTML = "<option value>Selecione a Cidade</option>";

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {
        citysSelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`;
      }

      citysSelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//itens de coleta
const itensToCollect = document.querySelectorAll(".itens-grid li");

for (const item of itensToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

let selectedItems = [];

const collectedItem = document.querySelector("input[name=items]");

function handleSelectedItem(event) {
  const itemLi = event.target;

  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;
  const alreadySelected = selectedItems.findIndex(item => item == itemId);

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => item != itemId);
    selectedItems = filteredItems;
  } else selectedItems.push(itemId);

  collectedItem.value = selectedItems;
}
