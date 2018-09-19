//Below is a series of refactorings

let contractIds = [];
if (opts.contractIds) {
  if (opts.contractIds.indexOf(';') === -1) {
    contractIds = [opts.contractIds];
  } else {
    contractIds = opts.contractIds.split(';');
  }
}
return contractIds;

//--------------------

let contractIds = [];
if (opts.contractIds) {
  //switch to a ternary
  return opts.contractIds.indexOf(';') === -1
          ? [opts.contractIds]
          : opts.contractIds.split(';'); 
}
return contractIds;

//--------------------

if (opts.contractIds) {
  return opts.contractIds.indexOf(';') === -1
          ? [opts.contractIds]
          : opts.contractIds.split(';'); 
} else {
  //pull the null case into the else
  return [];
}

//--------------------

if (opts.contractIds) {
        //use contains
  return contains(';', opts.contractIds) 
          ? [opts.contractIds]
          : opts.contractIds.split(';'); 
} else {
  return [];
}

const contains = (delimiter: string, str: string) =>
  (str === null || str === undefined)
    ? false 
    : str.indexOf(delimiter) !== -1

//--------------------

//Use isNothing and invert `if`
if (isNothing(opts.contractIds)) {
  return [];
} else {
  return contains(';', opts.contractIds) 
          ? [opts.contractIds]
          : opts.contractIds.split(';'); 
}

//add nothing
const isNothing = (str: string) =>
  (str === null || str === undefined)

const contains = (delimiter: string, str: string) =>
  isNothing
    ? false 
    : str.indexOf(delimiter) !== -1

//--------------------

//Use another ternary
return isNothing(opts.contractIds) ? []
  : contains(';', opts.contractIds) ? [opts.contractIds]
  : opts.contractIds.split(';'); 

const isNothing = (str: string) =>
  (str === null || str === undefined)

const contains = (delimiter: string, str: string) =>
  isNothing
    ? false 
    : str.indexOf(delimiter) !== -1

//--------------------

const str = opts.contractIds
return isNothing(str) ? []
  : contains(';', str) ? [str]
  : str.split(';'); 

const isNothing = (str: string) =>
  (str === null || str === undefined)

const contains = (delimiter: string, str: string) =>
  isNothing
    ? false 
    : str.indexOf(delimiter) !== -1

//taken from some other code... helps split strings properly
function split(string: string, separator: string): string[] {
  if (isNothing(str)) {
    return [];
  }
  let arr = string.split(separator);

  // without the following check, `"".split(';')` returns `['']`
  return arr.length === 1 && arr[0] === '' ? [] : arr;
}

//--------------------

//watch closely to our main function...

// before
return isNothing(str) ? []
  : contains(';', str) ? [str]
  : str.split(';'); 

// after
const str = opts.contractIds
return split(';', str); 

//...

function split(separator: string, string: string): string[] {
  if (str === null || str === undefined) {
    return [];
  }
  let arr = str.split(separator);

  return arr.length === 1 && arr[0] === '' ? [] : arr;
}

//--------------------

//Final answer

return split(';', opts.contractIds); 

//With heavy unit testing on the new `split` function
