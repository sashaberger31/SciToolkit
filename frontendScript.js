$(function() {


});

function processEquation(eq) {
  var continue = true;
  var leftOfEq = true;
  var in_element = true;
  var compounds = []; // Compound and coefficient

  for (counter = 0; counter<eq.length; counter++) {
    if !in_element && !isNaN(parseFloat(eq.charAt(counter))) {
      // We've encountered a coefficient
      var current_coeff = eq.charAt(counter);
    } else if {

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
