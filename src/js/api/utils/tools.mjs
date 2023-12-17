export function getParam(param) {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  return params.get(param);
}
