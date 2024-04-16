// устанавливаем триггер для модального окна (название можно изменить)
const modalTrigger = document.getElementsByClassName("trigger")[0];

// получаем ширину отображенного содержимого и толщину ползунка прокрутки
const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);

// привязываем необходимые элементы
const bodyElementHTML = document.getElementsByTagName("body")[0];
const modalBackground = document.getElementsByClassName("modalBackground")[0];
const modalClose = document.getElementsByClassName("modalClose")[0];
const modalActive = document.getElementsByClassName("modalActive")[0];

function bodyMargin() {
  bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
}

// при длинной странице - корректируем сразу
bodyMargin();

modalTrigger.addEventListener("click", function () {
  // делаем модальное окно видимым
  modalBackground.style.display = "block";

  // если размер экрана больше 1366 пикселей (т.е. на мониторе может появиться ползунок)
  if (windowInnerWidth >= 1366) {
    bodyMargin();
  }

  // позиционируем наше окно по середине, где 175 - половина ширины модального окна
  // modalActive.style.left = "calc(50% - " + (175 - scrollbarWidth / 2) + "px)";
});

modalClose.addEventListener("click", function () {
  modalBackground.style.display = "none";
  if (windowInnerWidth >= 1366) {
    bodyMargin();
  }
});

// закрытие модального окна на зону вне окна, т.е. на фон
modalBackground.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    modalBackground.style.display = "none";
    if (windowInnerWidth >= 1366) {
      bodyMargin();
    }
  }
});

concludeContract()
async function concludeContract() {
  let inputList = Array.from(document.querySelectorAll('.input'))
  const concludeContractForm = document.querySelector('.concludeContractForm')
  const documentsList = concludeContractForm.querySelector('.documentsList')
  const submitButton = document.querySelector('.submitButton')
  const codeWord = document.getElementById('codeWord')
  const codeWordError = document.getElementById('codeWordError')
  toggleButton()
  let data = []

  document.body.addEventListener('click', e => {
    document.activeElement.blur();
  })

  inputList.forEach(inputElement => {
    inputElement.addEventListener('click', e => {
      e.stopPropagation()
    })
  })

  await fetch('https://66178253ed6b8fa43482d205.mockapi.io/user')
    .then(response => response.json())
    .then(json => {
      data = json
    })

  documentsList.innerHTML = data.map((element, id) => {
    return `<div class="checkboxInput">
      <input id="document-${id}" name="document-${id}" value="bankDelivery" type="checkbox" class="custom-checkbox input">
      <label for="document-${id}">Заявление-анкета на комплексное банковское обслуживание</label>
            </div>`
  }).join('')

  inputList = Array.from(document.querySelectorAll('.input'))

  concludeContractForm.addEventListener('submit', event => {
    event.preventDefault()
    if (!hasInvalidInput()) {
      inputList.forEach(inputElement => {
        sessionStorage.setItem(inputElement.name, inputElement.value)
      })
      window.location.href = submitButton.getAttribute('nextPage')
    }
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', e => {
      toggleButton()
    })
  })




  function hasInvalidInput() {
    return inputList.some((inputElement) => {
      if (inputElement.type === 'checkbox') {
        return inputElement.checked === false
      }
      return inputElement.value.length === 0
    })
  }

  function toggleButton() {
    if (hasInvalidInput()) {
      submitButton.classList.add('button-inactive')
    } else {
      submitButton.classList.remove('button-inactive')
    }
  }
}




