detailedApplication()
async function detailedApplication() {
  const list = document.querySelector('.detailedApplicationForm___list')
  const agreeButton = document.querySelector('.agreeButton')
  const refuseButton = document.querySelector('.refuseButton')

  let data = []

  await fetch('https://66178253ed6b8fa43482d205.mockapi.io/user')
    .then(response => response.json())
    .then(json => {
      data = json
    })

  for (let i = data.length - 1; i >= 0; i--) {
    let listItem = document.createElement('div');
    listItem.classList.add('detailedInformation')
    listItem.innerHTML = `---- текст - ${i}`
    list.prepend(listItem)
  }

}


