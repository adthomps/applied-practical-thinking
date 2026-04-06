const { syncDesignDocAliasesFromManifest, assertDesignDocAliasesInSync } = require('./copy-content-to-public.cjs');

function main() {
  syncDesignDocAliasesFromManifest();
  assertDesignDocAliasesInSync();
  console.log('No source aliases to sync. Source 2-zone model verified.');
}

if (require.main === module) {
  main();
}
