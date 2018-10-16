//'Front Loading' Variable Assignment
// Pulled from here https://github.com/gregberns/LearningFunctionalProgramming/blob/master/FunctionalRefactor/FrontLoadVariableAssignment.md

// Refactor
function urlToString(url) {
  let result = url.base + url.path;

  if (url.queryParams) {
    result += queryParamsToString(url.queryParams);
  }
  if (url.fragment) {
    result += `#${url.fragment}`;
  }

  return result;
}

// Potential Solution
function urlToStringRefactored(url) {
  let { base, path } = url;
  let queryParams = queryParamsToString(url.queryParams);
  let fragment = url.fragment ? `#${url.fragment}` : '';

  return `${base}${path}${queryParams}${fragment}`;
}
