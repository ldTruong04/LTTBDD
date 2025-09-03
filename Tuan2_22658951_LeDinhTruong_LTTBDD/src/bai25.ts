async function downloadFile(filename: string): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Downloaded file: ${filename}`);
      resolve();
    }, 3000);
  });
}
downloadFile('example.txt');
