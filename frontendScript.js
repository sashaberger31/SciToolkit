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
    var result = lhsTerms[i].match(/[a-z]+|[^a-z]+/gi);
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
    lhsCompounds.push(deepCopyFunction([coeff,newElements]));
  }


  for(i=0; i<rhsTerms.length; i++) {
    var result = rhsTerms[i].match(/[a-z]+|[^a-z]+/gi);
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
    rhsCompounds.push(deepCopyFunction([coeff,newElements]));
  }
  console.log("Final");
  console.log(lhsCompounds);
  console.log(rhsCompounds);
}
