(function () {
  function addInputsEvent() {
    const $inputs = document.querySelectorAll('#cube-input-1, #cube-input-2');
    addInputListener($inputs[0]);
    addInputListener($inputs[1]);
  }

  function addInputListener(inputIndex) {
    $inputs[inputIndex].addEventListener('keyup', function () {
      $inputs[inputIndex === 0 ? 1 : 0].value = this.value;
    }, false);
  }

  function addFormEvent() {
    const $form = document.querySelector('form');
    const $resultInput = document.querySelector('#cube-result');

    $form.addEventListener(
      'submit', function (e) {
        e.preventDefault();
        const data = new FormData(this);
        $resultInput.value = calculateCombinations(data.get('cube-input-1'));
      }, false);
  }

  function calculateCombinations(cubeSize) {
    const firstPartTop = new BigNumber('24')
      .multipliedBy(new BigNumber(factorial(12)))
      .multipliedBy(new BigNumber('2').pow(new BigNumber('10')))
      .pow(new BigNumber(cubeSize).mod(new BigNumber(2)));

    const secondPartTopPow = new BigNumber(cubeSize)
      .pow(new BigNumber('2'))
      .minus(new BigNumber('2').multipliedBy(new BigNumber(cubeSize)))
      .minus(new BigNumber('3').multipliedBy(new BigNumber(cubeSize).mod(new BigNumber('2'))))
      .div(new BigNumber(4));

    const secondPartTop = new BigNumber(factorial(7))
      .multipliedBy(new BigNumber('3').pow(new BigNumber('6')))
      .multipliedBy(new BigNumber(factorial(24)).pow(secondPartTopPow));

    const firstPartBottom = new BigNumber(factorial(4)).pow(
      new BigNumber('6').multipliedBy(new BigNumber(cubeSize)
        .minus(new BigNumber('2'))
        .pow(new BigNumber('2'))
        .minus(new BigNumber(cubeSize).mod(new BigNumber('2')))
        .div(new BigNumber('4')))
    );

    return new BigNumber(firstPartTop)
      .multipliedBy(new BigNumber(secondPartTop))
      .div(new BigNumber(firstPartBottom))
      .toFixed();
  }

  function init() {
    addInputsEvent();
    addFormEvent();
  }

  init();
})();
