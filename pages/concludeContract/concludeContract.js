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


