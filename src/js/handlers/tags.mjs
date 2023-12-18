export function convertTags(tagsString) {
  return tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag);
}
