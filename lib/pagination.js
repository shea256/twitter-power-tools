export function isPositiveInteger(str) {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n > 0;
}

export function getPaginationVariables(pageSize, query) {
  // Set the defaults
  let skip = 0
  let first = pageSize
  let page = 1;

  // Get the page param from query
  const pageParam = query.page
  if (!pageParam) {
    // If there isn't a page param,
    // do nothing
  } else if (isPositiveInteger(pageParam)) {
    // If there is a valid page param,
    // set the page number and calculate the skip value
    page = parseInt(pageParam, 10)
    skip = first * (page - 1)
  } else {
    // If the page param is invalid,
    // return no results
    first = 0
  }
  return { first, skip, page }
}
