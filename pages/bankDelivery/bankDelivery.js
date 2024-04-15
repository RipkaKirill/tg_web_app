applications()
async function applications() {
  const bankDeliveryForm = document.querySelector('.bankDeliveryForm')
  const submitButton = document.querySelector('.submitButton')
  submitButton.classList.add('button-inactive')

  let selectedRegion = null
  let selectedDepartment = null
  const regions = [
    {
      id: 1,
      title: 'Брестская'
    },
    {
      id: 2,
      title: 'Витебская'
    },
    {
      id: 3,
      title: 'Гомельская'
    },
    {
      id: 4,
      title: 'Гродненская'
    },
    {
      id: 5,
      title: 'Минская'
    },
    {
      id: 6,
      title: 'Могилёвская'
    }
  ]
  const departments = [
    {
      id: 1,
      title: 'ул. Московская, 14'
    },
    {
      id: 2,
      title: 'ул. Притыцкого, 91'
    },
    {
      id: 3,
      title: 'пр-т Независимости, 168/2'
    },
    {
      id: 4,
      title: 'пр-т Дзержинского, 119'
    },
    {
      id: 5,
      title: 'ул. Гикало, 3'
    },
    {
      id: 6,
      title: 'пр-т Независимости, 93-24.'
    }
  ]
  // await fetch('https://66178253ed6b8fa43482d205.mockapi.io/user')
  //   .then(response => response.json())
  //   .then(json => {
  //     data = json
  //   })
  renderList(regions, 'region')
  bankDeliveryForm.addEventListener('submit', event => {
    event.preventDefault()
    if (selectedRegion && !selectedDepartment) {
      sessionStorage.setItem('region', selectedRegion);
      document.querySelector('.region').remove()
      renderList(departments, 'department')

      submitButton.classList.add('button-inactive')
      checkRadioButtons('department')
    } else if (selectedRegion && selectedDepartment) {

      sessionStorage.setItem('department', selectedDepartment);
      window.location.href = submitButton.getAttribute('nextPage')   
    }
  })

  checkRadioButtons('region')


  function renderList(data, name) {
    let wrapper = document.createElement('div');
    wrapper.classList.add(name)
    for (let i = data.length - 1; i >= 0; i--) {
      let radioInput = document.createElement('div');
      radioInput.classList.add('radioInput')
      let customRadio = document.createElement('input');
      let label = document.createElement('label')
      customRadio.classList.add('custom-radio')
      customRadio.type = "radio"
      customRadio.id = data[i].id
      customRadio.value = data[i].title
      customRadio.name = name
      label.setAttribute('for', data[i].id)
      label.innerHTML = data[i].title
      radioInput.append(customRadio)
      radioInput.append(label)
      wrapper.prepend(radioInput)
    }
    bankDeliveryForm.prepend(wrapper)
  }

  function checkRadioButtons(type) {
    const radioInputList = Array.from(document.querySelectorAll('input[type="radio"]'))
    radioInputList.forEach(radioButton => {
      radioButton.addEventListener('change', e => {
        if (e.target.checked === true) {

          if (type === 'region') {
            selectedRegion = e.target.id
          }
          if (type === 'department') {
            selectedDepartment = e.target.value
          }

        }

        submitButton.classList.remove('button-inactive')
      })
    })
  }

}






