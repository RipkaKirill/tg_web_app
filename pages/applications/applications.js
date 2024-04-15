applications()
async function applications() {
  const applicationsForm = document.querySelector('.applicationsForm')
  const submitButton = document.querySelector('.submitButton')
  submitButton.classList.add('button-inactive')
  let data = []
  let selectedApplicationId = null
  await fetch('https://66178253ed6b8fa43482d205.mockapi.io/user')
    .then(response => response.json())
    .then(json => {
      data = json
    })

  applicationsForm.addEventListener('submit', event => {
    event.preventDefault()
    if (selectedApplicationId) {
 
      sessionStorage.setItem('id', selectedApplicationId);
      window.location.href = submitButton.getAttribute('nextPage')     
    }
  })
  if (data.length) {
    submitButton.style.display = "block";
    for (let i = data.length - 1; i >= 0; i--) {
      let radioInput = document.createElement('div');
      radioInput.classList.add('radioInput')
      let customRadio = document.createElement('input');
      let label = document.createElement('label')
      customRadio.classList.add('custom-radio')
      customRadio.type = "radio"
      customRadio.id = `applications-${i}`
      customRadio.value = `applications-${i}`
      customRadio.name = 'applications'
      label.setAttribute('for', `applications-${i}`)
      label.innerHTML = '"номер" - "Дата регистрации" - "Наименование" - "Утверждённая сумма" - "Утверждённый срок" - "статус"'
      radioInput.append(customRadio)
      radioInput.append(label)
      applicationsForm.prepend(radioInput)
    }
  } else {
    //const noApplications = `<p>Предодобренных заявок нет</p>`
    let noApplications = document.createElement('p');
    noApplications.classList.add('noApplicationsText')
    noApplications.innerHTML = 'Предодобренных заявок нет'
    applicationsForm.prepend(noApplications)

  }

  const radioInputList = Array.from(document.querySelectorAll('input[type="radio"]'))

  radioInputList.forEach(radioButton => {
    radioButton.addEventListener('change', e => {
      if (e.target.checked === true) {
        selectedApplicationId = e.target.id
      }
      submitButton.classList.remove('button-inactive')
    })
  })

}


