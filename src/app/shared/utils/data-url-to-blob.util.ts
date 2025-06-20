export type DataUrl = `data:${string}`;

export function isDataUrl(url: string): url is DataUrl {
  return url.startsWith('data:');
}

export default function dataUrlToBlob(dataUrl: DataUrl): Blob {
  const [meta, base64] = dataUrl.split(',');
  const mime = meta.match(/:(.*?);/)?.[1] || 'application/octet-stream';
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type: mime });
}
