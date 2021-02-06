$(function() {


});

function processEquation(eq) {
  var continue = true;
  var leftOfEq = true;
  var in_element = true;
  var compounds = []; // Compound and coefficient

  var strippedEq = eq.replace(/\s/g, '');
  var splitEq = eq.split('+');
  for (counter = 0; counter<splitEq.length; counter++) {
    var coefficient = 1;
    var toParse = splitEq[counter];
    if !isNaN(parseFloat(splitEq[counter][0])) {
      coefficient = splitEq[counter][0];
      toParse = splitEq.slice(1,splitEq[counter].length)
    }
    for(inElementCounter = 0; inElementCounter<)
  }

  for (counter = 0; counter<eq.length; counter++) {
    if (!in_element && !isNaN(parseFloat(eq.charAt(counter)))) {
      // We've encountered a coefficient
      var current_coeff = eq.charAt(counter);
    } else if (in_element){

    }
  }
function stoichSubmitted() {
  var stoichInp1 = $('#stoichDiv.equation'); // Get input object for equation
  var stoichInp2 = $('#stoichDiv.stoich'); // Get input object for stoich
  var eq = stoichInp1.val()
  var moleBase = stoichInp2.val()

  // PROCESS INPUT:

}

function balanceSubmitted() {
  var balance = $('#balanceDiv');
}

function wavelengthSubmitted() {
  var wavelength = $('#wavelengthDiv');
}
