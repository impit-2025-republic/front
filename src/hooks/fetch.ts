import {unlink, writeFile} from 'node:fs/promises';
const main = async () => {
  try {
    await unlink('./api.yaml');
  } catch {}
  const file = await fetch(
    `https://api.b8st.ru/swagger/swagger.yaml`,
  );
  const blob = await file.blob();
  const buffer = Buffer.from( await blob.arrayBuffer() );
  writeFile('./api.yaml', buffer);
};

main();