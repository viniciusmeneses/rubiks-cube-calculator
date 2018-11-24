(function () {
  const $inputs = document.querySelectorAll('#cube-input-1, #cube-input-2');
  const worker = new Worker('js/calculatorWorker.js');

  function addInputsEvent() {
    addInputListener($inputs[0]);
    addInputListener($inputs[1]);
  }

  function addInputListener(input) {
    input.onkeyup = duplicateValue;
    input.onchange = duplicateValue;
    console.dir(input)
  }

  function duplicateValue() {
    if (this.value <= 0) {
      this.value = 1
    }
    $inputs[Array.from($inputs).indexOf(this) === 0 ? 1 : 0].value = this.value;
  }

  function addFormEvent() {
    const $form = document.querySelector('form');
    $form.onsubmit = handleFormSubmit;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const data = new FormData(this);
    const inputValue = data.get('cube-input-1');

    if (inputValue) {
      worker.postMessage(inputValue);
      document.querySelector('.cube-send').classList.add('loading');
      removeFormEvent(this)
    }
  }

  function removeFormEvent(form) {
    this.onsubmit = (e) => e.preventDefault();
  }

  function setWorkerOnMessage() {
    const $resultInput = document.querySelector('#cube-result');
    worker.onmessage = function(e) {
      $resultInput.value = e.data;
      document.querySelector('.cube-send').classList.remove('loading')
      addFormEvent();
    };
  }

  function init() {
    addInputsEvent();
    addFormEvent();
    setWorkerOnMessage();
  }

  init();
})();
