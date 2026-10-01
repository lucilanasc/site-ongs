export function getAssetPath(fileName: string): string {
  return `${import.meta.env.BASE_URL}images/${fileName}`;
}

export function resolveImageUrl(imageUrl: string): string {
  if (/^(https?:|data:|blob:)/.test(imageUrl)) return imageUrl;
  return `${import.meta.env.BASE_URL}${imageUrl.replace(/^\/+/, '')}`;
}
