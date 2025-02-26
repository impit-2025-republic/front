import { unlink } from 'node:fs/promises';

const main = async () => {
  try {
    await unlink('./swagger.yaml');
  } catch {
    // empty
  }
  const file = await fetch(
    'https://api.b8st.ru/docs/swagger.yaml?time=' + Date.now(),
  );
  await Bun.write('./swagger.yaml', await file.blob());
};

main();