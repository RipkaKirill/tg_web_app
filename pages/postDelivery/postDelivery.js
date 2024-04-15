postDelivery()
async function postDelivery() {
  const inputList = Array.from(document.querySelectorAll('.input'))
  const postDeliveryForm = document.querySelector('.postDeliveryForm')
  const submitButton = document.querySelector('.submitButton')
  toggleButton()

  await fetch('https://66178253ed6b8fa43482d205.mockapi.io/user')
    .then(response => response.json())
    .then(json => {
      data = json
    })

  postDeliveryForm.addEventListener('submit', event => {
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


