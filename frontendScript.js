$(function() {


});

// Function to deepcopy arrays
const deepCopyFunction = (inObject) => {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value)
  }

  return outObject
}

function parseCompound(compound) {
  var result = compound.match(/[a-z]+|[^a-z]+/gi);
  if (!isNaN(parseFloat(result[0]))) {
      var coeff = result[0];
      var elements = deepCopyFunction(result).slice(1);

  } else {
    var coeff = 1;
    var elements = deepCopyFunction(result);

  }

  var newElements = [];
  var skip = false;
  for (j=0; j<elements.length; j++) {
    if (!skip){
      if (j===elements.length-1){
        newElements.push(deepCopyFunction([elements[j],1]));
      } else if (!isNaN(parseFloat(elements[j+1]))) {
        sub = elements[j+1];
        skip = true;
        newElements.push(deepCopyFunction([elements[j], sub]));
      } else {
        skip = false;
        newElements.push(deepCopyFunction([elements[j],1]));
      }
    } else {
      skip = false;
    }
  }
  return deepCopyFunction([coeff, newElements]);
}
function processEquation(pass_eq) {
  eq = String(pass_eq); // I have no idea why i need to do this but it fixes a problem
  // Although pass_eq is already supposed to be a string

  // Split the equation into left and right hand sides and strip off whitespace
  var strippedEq = eq.replace(/\s/g, '');
  var splitSides = strippedEq.split("->");
  var lhs = splitSides[0];
  var rhs = splitSides[1];

  // Split into individual terms
  var lhsTerms = lhs.split("+");
  var rhsTerms = rhs.split("+");

  // Split into coefficient and compound
  var lhsCompounds = []; // 5CrH2 + 6Cd = [[5,[[Cr,1],[H,2]]], [6,[[Cd,1]]]]
  var rhsCompounds = [];
  for(i=0; i<lhsTerms.length; i++) {
    var compoundProcessed = parseCompound(lhsTerms[i])
    lhsCompounds.push(compoundProcessed);
  }

  for(i=0; i<rhsTerms.length; i++) {
    var compoundProcessed = parseCompound(rhsTerms[i])
    rhsCompounds.push(compoundProcessed);
  }

  return [lhsCompounds, rhsCompounds];
}

function arrayEq(arr1, arr2) { // Sad but necessary
  console.log(arr1,arr2);
  if( arr1.length === arr2.length) {
    for (i=0; i<arr1.length; i++) {
      if (typeof arr1[i] == "object") {
        if (!arrayEq(arr1[i],arr2[i])) { return false;}  // Recursive badness; WHY IS JS LIKE THIS???
                                                        // I just want to compare two arrays
      } else if (arr1[i] != arr2[i]) {
        console.log("Failed");
        console.log(arr1[i],arr2[i]);
        return false;
      }
    }
  } else {
    return false;
  }
  return true;

}

function stoichSubmitted() {
  var balance = $('#equation');
  processedEq = processEquation(balance.val()); // See the above
  var molecule1 = $('#molecule1').val().replace(/\s/g, '');
  var molecule2 = $('#molecule2').val().replace(/\s/g, '');
  var processed1 = parseCompound(molecule1)[1];
  var processed2 = parseCompound(molecule2)[1];

  // Loop through to find the coefficients:
  var coeff1 = 1;
  var coeff2 = 1;
  for (i=0; i<processedEq[0].length; i++) { // First the left hand side
    var coeff = processedEq[0][i][0];
    var testCompound = processedEq[0][i][1];
    if (arrayEq(processed1, testCompound)) {
      coeff1 = coeff;
      break;
    } else if (i === processedEq[0].length-1) {
      console.log("Error: Compound not found!");
    }
  }
  for (j=0; j<processedEq[1].length; j++) { // Second the right hand side
    var coeff = processedEq[1][j][0];
    var testCompound = processedEq[1][j][1];

    if (arrayEq(processed2, testCompound)) {
      coeff2 = coeff;
      console.log("Secondary");
      console.log(testCompound);
      console.log(processed2);
      break;
    } else if (j === processedEq[1].length-1) {
      console.log("Error: Compound not found!");
    }
  }
  var moles = $('#moles1').val().replace(/\s/g, '');
  var answer = parseFloat(coeff2)/parseFloat(coeff1) * parseFloat(moles);
  $('#ans').html(answer);

}
