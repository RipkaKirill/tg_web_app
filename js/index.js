const identificationInput = document.getElementById('identificationNumber')
const seriesNumberPassportInput = document.getElementById('seriesNumberPassport')
const OTPcode = document.getElementById('OTPcode')

const inputList = Array.from(document.querySelectorAll('.input'))
const submitButton = document.querySelector('.submitButton')
const form = document.getElementById('form')

const regExpIdentificationInput = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /[A|B|C|K|E|M|H]/i, /\d/, /\d/, /\d/, /[P|B]/i, /[B|A|I]/i, /\d/]
const regExpSeriesNumberPassportInput = [/[a-z]/i, /[a-z]/i, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]

startValidation()

function startValidation() {
  toggleButton()
  document.body.addEventListener('click', e => {
    e.stopPropagation()
    document.activeElement.blur();
  })

  inputList.forEach(inputElement => {
    inputElement.addEventListener('click', e => {
      e.stopPropagation()
    }
    )
  }) 

  form.addEventListener('submit', async event => {
    event.preventDefault()
    if (!hasInvalidInput()) {
      let data = {}
      inputList.forEach(inputElement => {
        data[inputElement.name] = inputElement.value
      })
      console.log(data);
      await fetch('https://66178253ed6b8fa43482d205.mockapi.io/user', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      }).then(task => {
        // do something with the new task
      }).catch(error => {
        // handle error
      })
      window.location.href = submitButton.getAttribute('nextPage')
    }
  })

  identificationInput && addEventListenerOnInput(identificationInput, regExpIdentificationInput)
  seriesNumberPassportInput && addEventListenerOnInput(seriesNumberPassportInput, regExpSeriesNumberPassportInput)
  OTPcode && addEventListenerOnInput(OTPcode)
}

function toggleButton() {
  if (hasInvalidInput()) {
    submitButton.classList.add('button-inactive')
  } else {
    submitButton.classList.remove('button-inactive')
  }
}

function hasInvalidInput() {
  return inputList.some((inputElement) => {
    return inputElement.value.length !== +inputElement.getAttribute('maxlength')
  })
}

function addEventListenerOnInput(input, regExpArray) {
  input.addEventListener('input', e => {
    let isValid = true
    let value = e.target.value

    if (regExpArray) {
      for (let i = 0; i < value.length; i++) {
        if (!regExpArray[i].test(value[i])) {
          isValid = false
          e.target.value = e.target.value.slice(0, -1)
        }
      }
    }

    if (isValid) {
      input.classList.remove('inputError')
    } else {
      input.classList.add('inputError')
    }

    toggleButton()
  })
}