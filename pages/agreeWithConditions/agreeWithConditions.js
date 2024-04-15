agreeWithConditions()
async function agreeWithConditions() {
  const applicationsForm = document.querySelector('.agreeWithConditionsForm')
  const submitButton = document.querySelector('.submitButton')
  submitButton.classList.add('button-inactive')

  let selectedDeliveryType = null
  await fetch('https://66178253ed6b8fa43482d205.mockapi.io/user')
    .then(response => response.json())
    .then(json => {
      data = json
    })

  applicationsForm.addEventListener('submit', event => {
    event.preventDefault()
    if (selectedDeliveryType) {
      sessionStorage.setItem('deliveryType', selectedDeliveryType)
      window.location.href =`../${selectedDeliveryType}/${selectedDeliveryType}.html`
    }
  })

  const radioInputList = Array.from(document.querySelectorAll('input[type="radio"]'))

  radioInputList.forEach(radioButton => {
    radioButton.addEventListener('change', e => {
      if (e.target.checked === true) {
        selectedDeliveryType = e.target.id
      }
      submitButton.classList.remove('button-inactive')
    })
  })

}


