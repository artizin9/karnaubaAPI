import { replaceInFile } from 'replace-in-file';

// 1️⃣ Adicionar .js nos imports relativos
await replaceInFile({
  files: 'dist/**/*.js',
  from: /from\s+['"](\.\.?\/[^'"]+?)(?<!\.js|\.cjs|\.mjs)['"]/g,
  to: "from '$1.js'",
}).then(results => {
  console.log(`✅ .js adicionado em ${results.length} arquivos`);
}).catch(error => {
  console.error('❌ Erro ao corrigir imports:', error);
  process.exit(1);
});

// 2️⃣ Trocar require("file-type") por import("file-type")
await replaceInFile({
  files: 'dist/**/*.js',
  from: /const\s+(\w+)\s*=\s*require\(['"]file-type['"]\);?/g,
  to: 'const $1 = await import("file-type");',
}).then(results => {
  console.log(`✅ Corrigido require("file-type") em ${results.length} arquivos`);
}).catch(error => {
  console.error('❌ Erro ao corrigir require("file-type"):', error);
  process.exit(1);
});
