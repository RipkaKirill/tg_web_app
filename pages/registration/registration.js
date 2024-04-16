const loginInput = document.getElementById('login')
const loginInputError = document.querySelector('.loginInputError')

const passwordInput = document.getElementById('password')
const passwordInputError = document.querySelector('.passwordInputError')

const repeatPasswordInput = document.getElementById('repeatPassword')
const repeatPasswordInputError = document.querySelector('.repeatPasswordInputError')

const inputList = Array.from(document.querySelectorAll('.input'))

const submitButton = document.querySelector('.submitButton')
const form = document.getElementById('form')

const loginRegExp = /[a-zA-Z0-9]|[@#\$%\^&+\*!\\-_\.,<>]/
const passwordRegExp = /[a-zA-Z0-9]|[@#$;%:^&+=*.!?\\\/|{}[\]>-_]/
const passwordRegExpArray = [/[a-z]/, /[A-Z]/, /[0-9]/, /[@#$;%:^&+=*\.!?\\\/|{}[\]>-_]/]

startValidation()

function startValidation() {
  toggleButton()

  document.body.addEventListener('click', e => {
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
  addEventListenerOnInput(loginInput, loginRegExp)
  addEventListenerOnInput(passwordInput, passwordRegExp)
  addEventListenerOnInput(repeatPasswordInput, passwordRegExp)

  loginInput.addEventListener('blur', async (event) => {
    let isRegistered = false

    if (event.target.value.length < 8) {
      loginInputError.innerHTML = "Логин должен содержать минимум 8 символов"
      loginInput.classList.add('inputError')
      loginInput.setAttribute('isvalid', false)
      return
    } else {
      loginInputError.innerHTML = ""
    }

    await fetch('https://66178253ed6b8fa43482d205.mockapi.io/number')
      .then(response => response.json())
      .then(json => {
        isRegistered = json[0].isRegistered
      })

    if (isRegistered) {
      loginInputError.innerHTML = 'Пользователь с данным логином уже сужествует'
      loginInput.classList.add('inputError')
      loginInput.setAttribute('isvalid', false)
      return
    }
    loginInput.setAttribute('isvalid', true)
    toggleButton()
  })

  passwordInput.addEventListener('blur', event => {
    let value = event.target.value

    if (event.target.value.length < 8) {
      passwordInputError.innerHTML = "Пароль должен содержать минимум 8 символов"
      passwordInput.classList.add('inputError')
      passwordInput.setAttribute('isvalid', false)
      return
    } else {
      passwordInputError.innerHTML = ""
    }

    for (let i = 0; i < passwordRegExpArray.length; i++) {
      if (value.search(passwordRegExpArray[i]) === -1) {
        passwordInputError.innerHTML = 'Пароль не соответсвует форме'
        passwordInput.classList.add('inputError')
        passwordInput.setAttribute('isvalid', false)
        return
      }
    }
    passwordInput.setAttribute('isvalid', true)
    toggleButton()
  })

  repeatPasswordInput.addEventListener('blur', event => {
    if (repeatPasswordInput.value !== passwordInput.value) {
      repeatPasswordInputError.innerHTML = 'Пароли не совпадают'
      repeatPasswordInput.classList.add('inputError')
      return
    } else {
      repeatPasswordInputError.innerHTML = ''
    }
    repeatPasswordInput.setAttribute('isvalid', true)
    toggleButton()
  })
}

function toggleButton() {
  if (hasInvalidInput()) {
    submitButton.classList.add('button-inactive')
  } else {
    submitButton.classList.remove('button-inactive')
  }
}

function hasInvalidInput() {
  return !inputList.every(inputElement => inputElement.getAttribute('isvalid') === 'true')
  // return inputList.some((inputElement) => {
  //   return inputElement.getAttribute('isvalid') !== true
  // })
}

function addEventListenerOnInput(input, regExp) {
  input.addEventListener('input', e => {
    let isValid = true
    let value = e.target.value

    for (let i = 0; i < value.length; i++) {
      if (!regExp.test(value[i])) {
        isValid = false
        e.target.value = e.target.value.slice(0, -1)
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