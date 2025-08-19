import { replaceInFile } from 'replace-in-file';

const options = {
  files: 'dist/**/*.js',
  from: /from\s+['"](\.\.?\/[^'"]+?)(?<!\.js|\.cjs|\.mjs)['"]/g,
  to: (match, p1) => `from '${p1}.js'`,
};

try {
  const results = await replaceInFile(options);
  console.log(`Importações corrigidas em ${results.length} arquivos`);
} catch (error) {
  console.error('Erro ao corrigir imports:', error);
  process.exit(1);
}
