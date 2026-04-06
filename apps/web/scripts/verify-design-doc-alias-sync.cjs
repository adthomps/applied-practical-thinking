const { assertDesignDocAliasesInSync } = require('./copy-content-to-public.cjs');

function main() {
  assertDesignDocAliasesInSync();
  console.log('Design docs source has no manifest alias files. Aliases are publish-generated only.');
}

if (require.main === module) {
  main();
}
