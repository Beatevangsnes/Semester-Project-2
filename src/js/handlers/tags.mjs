export function convertTags(tagsString) {
  // Split by comma and trim each tag
  return tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag);
}
