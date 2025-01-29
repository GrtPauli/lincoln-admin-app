export class FileUtility {
  static async uriToBlob(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }
}
