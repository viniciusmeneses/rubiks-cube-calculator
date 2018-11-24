importScripts('./vendor/bignumber.min.js', './vendor/factorial.js')

onmessage = function(e) {
  const firstPartTop = new BigNumber('24')
  .multipliedBy(new BigNumber(factorial(12)))
  .multipliedBy(new BigNumber('2').pow(new BigNumber('10')))
  .pow(new BigNumber(e.data).mod(new BigNumber(2)));

  const secondPartTopPow = new BigNumber(e.data)
    .pow(new BigNumber('2'))
    .minus(new BigNumber('2').multipliedBy(new BigNumber(e.data)))
    .minus(new BigNumber('3').multipliedBy(new BigNumber(e.data).mod(new BigNumber('2'))))
    .div(new BigNumber(4));

  const secondPartTop = new BigNumber(factorial(7))
    .multipliedBy(new BigNumber('3').pow(new BigNumber('6')))
    .multipliedBy(new BigNumber(factorial(24)).pow(secondPartTopPow));

  const firstPartBottom = new BigNumber(factorial(4)).pow(
    new BigNumber('6').multipliedBy(new BigNumber(e.data)
      .minus(new BigNumber('2'))
      .pow(new BigNumber('2'))
      .minus(new BigNumber(e.data).mod(new BigNumber('2')))
      .div(new BigNumber('4')))
  );

  postMessage(new BigNumber(firstPartTop)
    .multipliedBy(new BigNumber(secondPartTop))
    .div(new BigNumber(firstPartBottom))
    .toFixed());
}
