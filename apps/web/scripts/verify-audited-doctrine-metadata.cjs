const { assertAuditedDoctrineMetadataContract } = require('./copy-content-to-public.cjs');

function main() {
  assertAuditedDoctrineMetadataContract();
  console.log('Audited doctrine metadata contract passed.');
}

if (require.main === module) {
  main();
}
