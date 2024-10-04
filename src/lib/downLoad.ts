import { uuid } from "uuidv4";

export function downloadFile(file: string, type: string) {
  const anchorElement = document.createElement("a");

  anchorElement.href = file;
  anchorElement.download = `${uuid()}.${type}`;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
}
