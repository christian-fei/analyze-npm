var fs = require('fs');
// 277000: First module is at 277026
// 8010766: last full sync
const STARTING_SEQ = 8010766;

function loadFile() {
  return JSON.parse(fs.readFileSync("./analysis/found-modules.json"));
}

function saveFile(contents) {
  fs.writeFileSync(
    "./analysis/found-modules.json",
    JSON.stringify(contents, null, "  ")
  );
}

const results = loadFile();
const registry = require('package-stream')({since: STARTING_SEQ});
let count = 0;
console.time(count);
registry
  .on('package', (pkg, seq) => {
    count++;
    // console.log(seq);
    if (count % 1000 === 0) {
      console.timeEnd(count);
      console.log('Saving...', seq);
      saveFile(results);
      console.log('Saved.', Object.keys(results).length);
      console.time(count + 1000);
    }
    if(!pkg.module) {
      return;
    }
    // console.log(seq);
    if (!results[pkg.name]) {
      console.log('NEW!', pkg.name);
    }
    results[pkg.name] = {
      deps: pkg.dependencies ? Object.keys(pkg.dependencies).length : 0,
      se: pkg.sideEffects,
    };
    if(pkg.typings || pkg.types) {
      results[pkg.name].ts = true;
    }
    // if(pkg['umd:main'] || pkg['umd']) {
    //   results[pkg.name].umd = true;
    // }
  })
  .on('up-to-date', function (seq) {
    console.log(`[${seq}] Done! Found ${Object.keys(results).length} modules.`);
    saveFile(results);
    // The stream will remain open and continue receiving package
    // updates from the registry as they occur in real time.
  })
  .on('error', (err) => {
    console.log(err);
  })