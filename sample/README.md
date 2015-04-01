# Sample analysis

This folder contains several examples of the graph analysis.

* [dependencies](https://github.com/anvaka/npmrank/blob/master/sample/dependencies.md) -
npm graph inlcudes only dependencies listed in `dependencies` field of `package.json`
* [devDependencies](https://github.com/anvaka/npmrank/blob/master/sample/devdependencies.md) -
npm graph includes only dependencies listed in `devDependencies` field of `package.json`
* [alldependencies](https://github.com/anvaka/npmrank/blob/master/sample/alldependencies.md) -
npm graph includes both `devDependencies` and regular `dependencies`.

These files were generated by running:

```
node computeStats.js ./data/dependenciesGraph.out.graph 100 > sample/dependencies.md
node computeStats.js ./data/devDependencies.out.graph 100 > sample/devdependencies.md
node computeStats.js ./data/allDependencies.out.graph 100 > sample/alldependencies.md
```