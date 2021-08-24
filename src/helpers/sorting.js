export function sortByStatus(arr) {
  if (arr.length === 0) return arr;
  return [...arr].sort((a, b) => {
    if (a.status > b.status) return 1;
    if (a.status < b.status) return -1;
    return 0;
  })
}
