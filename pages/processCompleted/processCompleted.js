const exitButton = document.querySelector('.concludeContractForm__button_exit')

const tg = window.Telegram.WebApp

exitButton.addEventListener('click', event => {
  tg.close()
})