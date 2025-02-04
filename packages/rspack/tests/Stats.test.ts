import * as util from "util";
import path from "path";
import { rspack, RspackOptions, Stats } from "../src";
import serializer from "jest-serializer-path";

expect.addSnapshotSerializer(serializer);

const compile = async (options: RspackOptions) => {
	return util.promisify(rspack)(options);
};

describe("Stats", () => {
	it("should have stats", async () => {
		const stats = await compile({
			context: __dirname,
			entry: {
				main: "./fixtures/a"
			}
		});
		const statsOptions = {
			all: true,
			timings: false,
			builtAt: false,
			version: false
		};
		expect(typeof stats?.hash).toBe("string");
		expect(stats?.toJson(statsOptions)).toMatchInlineSnapshot(`
		{
		  "assets": [
		    {
		      "chunkNames": [
		        "main",
		      ],
		      "chunks": [
		        "main",
		      ],
		      "emitted": true,
		      "info": {
		        "development": false,
		        "hotModuleReplacement": false,
		      },
		      "name": "main.js",
		      "size": 215,
		      "type": "asset",
		    },
		  ],
		  "assetsByChunkName": {
		    "main": [
		      "main.js",
		    ],
		  },
		  "chunks": [
		    {
		      "auxiliaryFiles": [],
		      "children": [],
		      "entry": true,
		      "files": [
		        "main.js",
		      ],
		      "id": "main",
		      "initial": true,
		      "modules": [
		        {
		          "assets": [],
		          "chunks": [
		            "main",
		          ],
		          "id": "876",
		          "identifier": "<PROJECT_ROOT>/tests/fixtures/a.js",
		          "issuerPath": [],
		          "moduleType": "javascript/auto",
		          "name": "./fixtures/a.js",
		          "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/a.js",
		          "reasons": [
		            {
		              "type": "entry",
		              "userRequest": "./fixtures/a",
		            },
		          ],
		          "size": 55,
		          "source": "module.exports = function a() {
			return "This is a";
		};",
		          "type": "module",
		        },
		      ],
		      "names": [
		        "main",
		      ],
		      "parents": [],
		      "siblings": [],
		      "size": 55,
		      "type": "chunk",
		    },
		  ],
		  "entrypoints": {
		    "main": {
		      "assets": [
		        {
		          "name": "main.js",
		          "size": 215,
		        },
		      ],
		      "assetsSize": 215,
		      "chunks": [
		        "main",
		      ],
		      "name": "main",
		    },
		  },
		  "errors": [],
		  "errorsCount": 0,
		  "filteredModules": undefined,
		  "hash": "b32fac08a5e8721cacff",
		  "logging": {},
		  "modules": [
		    {
		      "assets": [],
		      "chunks": [
		        "main",
		      ],
		      "id": "876",
		      "identifier": "<PROJECT_ROOT>/tests/fixtures/a.js",
		      "issuerPath": [],
		      "moduleType": "javascript/auto",
		      "name": "./fixtures/a.js",
		      "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/a.js",
		      "reasons": [
		        {
		          "type": "entry",
		          "userRequest": "./fixtures/a",
		        },
		      ],
		      "size": 55,
		      "source": "module.exports = function a() {
			return "This is a";
		};",
		      "type": "module",
		    },
		  ],
		  "namedChunkGroups": {
		    "main": {
		      "assets": [
		        {
		          "name": "main.js",
		          "size": 215,
		        },
		      ],
		      "assetsSize": 215,
		      "chunks": [
		        "main",
		      ],
		      "name": "main",
		    },
		  },
		  "outputPath": "<PROJECT_ROOT>/dist",
		  "publicPath": "auto",
		  "warnings": [],
		  "warningsCount": 0,
		}
	`);
		expect(stats?.toString(statsOptions)).toMatchInlineSnapshot(`
		"PublicPath: auto
		asset main.js 215 bytes {main} [emitted] (name: main)
		Entrypoint main 215 bytes = main.js
		chunk {main} main.js (main) [entry]
		  ./fixtures/a.js [876] {main}
		    entry ./fixtures/a
		./fixtures/a.js [876] {main}
		  entry ./fixtures/a
		rspack compiled successfully (b32fac08a5e8721cacff)"
	`);
	});

	it("should omit all properties with all false", async () => {
		const stats = await compile({
			context: __dirname,
			entry: "./fixtures/a"
		});
		expect(
			stats?.toJson({
				all: false
			})
		).toEqual({});
	});

	it("should look not bad for default stats toString", async () => {
		const stats = await compile({
			context: __dirname,
			entry: "./fixtures/abc"
		});
		expect(
			stats?.toString({ timings: false, version: false }).replace(/\\/g, "/")
		).toMatchInlineSnapshot(`
		"PublicPath: auto
		asset main.js 419 bytes {main} [emitted] (name: main)
		Entrypoint main 419 bytes = main.js
		./fixtures/a.js [876] {main}
		./fixtures/b.js [211] {main}
		./fixtures/c.js [537] {main}
		./fixtures/abc.js [222] {main}

		error[javascript]: JavaScript parsing error
		  ┌─ tests/fixtures/b.js:6:1
		  │
		2 │     return "This is b";
		3 │ };
		4 │ 
		5 │ // Test CJS top-level return
		6 │ return;
		  │ ^^^^^^^ Return statement is not allowed here
		7 │ 



		rspack compiled with 1 error (27ec1c09308b67dcfd6f)"
	`);
	});

	it("should output stats with query", async () => {
		const stats = await compile({
			context: __dirname,
			entry: "./fixtures/abc-query"
		});

		const statsOptions = {
			all: true,
			timings: false,
			builtAt: false,
			version: false
		};
		expect(stats?.toJson(statsOptions)).toMatchInlineSnapshot(`
		{
		  "assets": [
		    {
		      "chunkNames": [
		        "main",
		      ],
		      "chunks": [
		        "main",
		      ],
		      "emitted": true,
		      "info": {
		        "development": false,
		        "hotModuleReplacement": false,
		      },
		      "name": "main.js",
		      "size": 394,
		      "type": "asset",
		    },
		  ],
		  "assetsByChunkName": {
		    "main": [
		      "main.js",
		    ],
		  },
		  "chunks": [
		    {
		      "auxiliaryFiles": [],
		      "children": [],
		      "entry": true,
		      "files": [
		        "main.js",
		      ],
		      "id": "main",
		      "initial": true,
		      "modules": [
		        {
		          "assets": [],
		          "chunks": [
		            "main",
		          ],
		          "id": "876",
		          "identifier": "<PROJECT_ROOT>/tests/fixtures/a.js",
		          "issuer": "<PROJECT_ROOT>/tests/fixtures/c.js?c=3",
		          "issuerId": "970",
		          "issuerName": "./fixtures/c.js?c=3",
		          "issuerPath": [
		            {
		              "id": "661",
		              "identifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		              "name": "./fixtures/abc-query.js",
		            },
		            {
		              "id": "970",
		              "identifier": "<PROJECT_ROOT>/tests/fixtures/c.js?c=3",
		              "name": "./fixtures/c.js?c=3",
		            },
		          ],
		          "moduleType": "javascript/auto",
		          "name": "./fixtures/a.js",
		          "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/a.js",
		          "reasons": [
		            {
		              "moduleId": "970",
		              "moduleIdentifier": "<PROJECT_ROOT>/tests/fixtures/c.js?c=3",
		              "moduleName": "./fixtures/c.js?c=3",
		              "type": "cjs require",
		              "userRequest": "./a",
		            },
		          ],
		          "size": 55,
		          "source": "module.exports = function a() {
			return "This is a";
		};",
		          "type": "module",
		        },
		        {
		          "assets": [],
		          "chunks": [
		            "main",
		          ],
		          "id": "304",
		          "identifier": "<PROJECT_ROOT>/tests/fixtures/a.js?a=1",
		          "issuer": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		          "issuerId": "661",
		          "issuerName": "./fixtures/abc-query.js",
		          "issuerPath": [
		            {
		              "id": "661",
		              "identifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		              "name": "./fixtures/abc-query.js",
		            },
		          ],
		          "moduleType": "javascript/auto",
		          "name": "./fixtures/a.js?a=1",
		          "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/a.js",
		          "reasons": [
		            {
		              "moduleId": "661",
		              "moduleIdentifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		              "moduleName": "./fixtures/abc-query.js",
		              "type": "cjs require",
		              "userRequest": "./a?a=1",
		            },
		          ],
		          "size": 55,
		          "source": "module.exports = function a() {
			return "This is a";
		};",
		          "type": "module",
		        },
		        {
		          "assets": [],
		          "chunks": [
		            "main",
		          ],
		          "id": "970",
		          "identifier": "<PROJECT_ROOT>/tests/fixtures/c.js?c=3",
		          "issuer": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		          "issuerId": "661",
		          "issuerName": "./fixtures/abc-query.js",
		          "issuerPath": [
		            {
		              "id": "661",
		              "identifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		              "name": "./fixtures/abc-query.js",
		            },
		          ],
		          "moduleType": "javascript/auto",
		          "name": "./fixtures/c.js?c=3",
		          "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/c.js",
		          "reasons": [
		            {
		              "moduleId": "661",
		              "moduleIdentifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		              "moduleName": "./fixtures/abc-query.js",
		              "type": "cjs require",
		              "userRequest": "./c?c=3",
		            },
		          ],
		          "size": 72,
		          "source": "module.exports = function b() {
			require("./a");
			return "This is c";
		};",
		          "type": "module",
		        },
		        {
		          "assets": [],
		          "chunks": [
		            "main",
		          ],
		          "id": "661",
		          "identifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		          "issuerPath": [],
		          "moduleType": "javascript/auto",
		          "name": "./fixtures/abc-query.js",
		          "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		          "reasons": [
		            {
		              "type": "entry",
		              "userRequest": "./fixtures/abc-query",
		            },
		          ],
		          "size": 99,
		          "source": "exports.a = require("./a?a=1");
		// exports.b = require("./b?b=2");
		exports.c = require("./c?c=3");
		",
		          "type": "module",
		        },
		      ],
		      "names": [
		        "main",
		      ],
		      "parents": [],
		      "siblings": [],
		      "size": 281,
		      "type": "chunk",
		    },
		  ],
		  "entrypoints": {
		    "main": {
		      "assets": [
		        {
		          "name": "main.js",
		          "size": 394,
		        },
		      ],
		      "assetsSize": 394,
		      "chunks": [
		        "main",
		      ],
		      "name": "main",
		    },
		  },
		  "errors": [],
		  "errorsCount": 0,
		  "filteredModules": undefined,
		  "hash": "5eccb83e369e53af1313",
		  "logging": {},
		  "modules": [
		    {
		      "assets": [],
		      "chunks": [
		        "main",
		      ],
		      "id": "876",
		      "identifier": "<PROJECT_ROOT>/tests/fixtures/a.js",
		      "issuer": "<PROJECT_ROOT>/tests/fixtures/c.js?c=3",
		      "issuerId": "970",
		      "issuerName": "./fixtures/c.js?c=3",
		      "issuerPath": [
		        {
		          "id": "661",
		          "identifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		          "name": "./fixtures/abc-query.js",
		        },
		        {
		          "id": "970",
		          "identifier": "<PROJECT_ROOT>/tests/fixtures/c.js?c=3",
		          "name": "./fixtures/c.js?c=3",
		        },
		      ],
		      "moduleType": "javascript/auto",
		      "name": "./fixtures/a.js",
		      "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/a.js",
		      "reasons": [
		        {
		          "moduleId": "970",
		          "moduleIdentifier": "<PROJECT_ROOT>/tests/fixtures/c.js?c=3",
		          "moduleName": "./fixtures/c.js?c=3",
		          "type": "cjs require",
		          "userRequest": "./a",
		        },
		      ],
		      "size": 55,
		      "source": "module.exports = function a() {
			return "This is a";
		};",
		      "type": "module",
		    },
		    {
		      "assets": [],
		      "chunks": [
		        "main",
		      ],
		      "id": "304",
		      "identifier": "<PROJECT_ROOT>/tests/fixtures/a.js?a=1",
		      "issuer": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		      "issuerId": "661",
		      "issuerName": "./fixtures/abc-query.js",
		      "issuerPath": [
		        {
		          "id": "661",
		          "identifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		          "name": "./fixtures/abc-query.js",
		        },
		      ],
		      "moduleType": "javascript/auto",
		      "name": "./fixtures/a.js?a=1",
		      "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/a.js",
		      "reasons": [
		        {
		          "moduleId": "661",
		          "moduleIdentifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		          "moduleName": "./fixtures/abc-query.js",
		          "type": "cjs require",
		          "userRequest": "./a?a=1",
		        },
		      ],
		      "size": 55,
		      "source": "module.exports = function a() {
			return "This is a";
		};",
		      "type": "module",
		    },
		    {
		      "assets": [],
		      "chunks": [
		        "main",
		      ],
		      "id": "970",
		      "identifier": "<PROJECT_ROOT>/tests/fixtures/c.js?c=3",
		      "issuer": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		      "issuerId": "661",
		      "issuerName": "./fixtures/abc-query.js",
		      "issuerPath": [
		        {
		          "id": "661",
		          "identifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		          "name": "./fixtures/abc-query.js",
		        },
		      ],
		      "moduleType": "javascript/auto",
		      "name": "./fixtures/c.js?c=3",
		      "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/c.js",
		      "reasons": [
		        {
		          "moduleId": "661",
		          "moduleIdentifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		          "moduleName": "./fixtures/abc-query.js",
		          "type": "cjs require",
		          "userRequest": "./c?c=3",
		        },
		      ],
		      "size": 72,
		      "source": "module.exports = function b() {
			require("./a");
			return "This is c";
		};",
		      "type": "module",
		    },
		    {
		      "assets": [],
		      "chunks": [
		        "main",
		      ],
		      "id": "661",
		      "identifier": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		      "issuerPath": [],
		      "moduleType": "javascript/auto",
		      "name": "./fixtures/abc-query.js",
		      "nameForCondition": "<PROJECT_ROOT>/tests/fixtures/abc-query.js",
		      "reasons": [
		        {
		          "type": "entry",
		          "userRequest": "./fixtures/abc-query",
		        },
		      ],
		      "size": 99,
		      "source": "exports.a = require("./a?a=1");
		// exports.b = require("./b?b=2");
		exports.c = require("./c?c=3");
		",
		      "type": "module",
		    },
		  ],
		  "namedChunkGroups": {
		    "main": {
		      "assets": [
		        {
		          "name": "main.js",
		          "size": 394,
		        },
		      ],
		      "assetsSize": 394,
		      "chunks": [
		        "main",
		      ],
		      "name": "main",
		    },
		  },
		  "outputPath": "<PROJECT_ROOT>/dist",
		  "publicPath": "auto",
		  "warnings": [],
		  "warningsCount": 0,
		}
	`);
	});

	it("should output the specified number of modules when set stats.modulesSpace", async () => {
		const stats = await compile({
			context: __dirname,
			entry: "./fixtures/abc"
		});

		expect(
			stats?.toJson({
				all: true,
				timings: false,
				builtAt: false,
				version: false
			}).modules?.length
		).toBe(4);

		expect(
			stats?.toJson({
				all: true,
				timings: false,
				builtAt: false,
				version: false,
				modulesSpace: 3
			}).modules?.length
			// 2 = 3 - 1 = max - filteredChildrenLineReserved
		).toBe(2);
	});

	it("should have time log when logging verbose", async () => {
		const stats = await compile({
			context: __dirname,
			entry: "./fixtures/abc"
		});
		expect(
			stats
				?.toString({ all: false, logging: "verbose" })
				.replace(/\\/g, "/")
				.replace(/\d+ ms/g, "X ms")
		).toMatchInlineSnapshot(`
		"LOG from rspack.Compilation
		<t> make hook: X ms
		<t> module add task: X ms
		<t> module process dependencies task: X ms
		<t> module factorize task: X ms
		<t> module build task: X ms
		<t> finish modules: X ms
		<t> optimize dependencies: X ms
		<t> create chunks: X ms
		<t> optimize: X ms
		<t> module ids: X ms
		<t> chunk ids: X ms
		<t> code generation: X ms
		<t> runtime requirements.modules: X ms
		<t> runtime requirements.chunks: X ms
		<t> runtime requirements.entries: X ms
		<t> runtime requirements: X ms
		<t> hashing: hash chunks: X ms
		<t> hashing: hash runtime chunks: X ms
		<t> hashing: process full hash chunks: X ms
		<t> hashing: X ms
		<t> create chunk assets: X ms
		<t> process assets: X ms

		LOG from rspack.Compiler
		<t> make: X ms
		<t> finish make hook: X ms
		<t> finish compilation: X ms
		<t> seal compilation: X ms
		<t> afterCompile hook: X ms
		<t> emitAssets: X ms
		<t> done hook: X ms

		LOG from rspack.EnsureChunkConditionsPlugin
		<t> ensure chunk conditions: X ms

		LOG from rspack.RealContentHashPlugin
		<t> hash to asset names: X ms

		LOG from rspack.RemoveEmptyChunksPlugin
		<t> remove empty chunks: X ms

		LOG from rspack.SplitChunksPlugin
		<t> prepare module group map: X ms
		<t> ensure min size fit: X ms
		<t> process module group map: X ms
		<t> ensure max size fit: X ms

		LOG from rspack.buildChunkGraph
		<t> prepare entrypoints: X ms
		<t> process queue: X ms
		<t> extend chunkGroup runtime: X ms
		<t> remove parent modules: X ms
		"
	`);
	});

	it("should have module profile when profile is true", async () => {
		const stats = await compile({
			context: __dirname,
			entry: "./fixtures/abc",
			profile: true
		});
		expect(
			stats
				?.toString({ all: false, modules: true })
				.replace(/\\/g, "/")
				.replace(/\d+ ms/g, "X ms")
		).toMatchInlineSnapshot(`
		"./fixtures/a.js [876] {main}
		  [222] ->
		  X ms (resolving: X ms, integration: X ms, building: X ms)
		./fixtures/b.js [211] {main}
		  [222] ->
		  X ms (resolving: X ms, integration: X ms, building: X ms)
		./fixtures/c.js [537] {main}
		  [222] ->
		  X ms (resolving: X ms, integration: X ms, building: X ms)
		./fixtures/abc.js [222] {main}
		  X ms (resolving: X ms, integration: X ms, building: X ms)"
	`);
	});

	it("should have cache hits log when logging verbose and cache is enabled", async () => {
		const compiler = rspack({
			context: __dirname,
			entry: "./fixtures/abc",
			cache: true,
			experiments: {
				incrementalRebuild: false
			}
		});
		await new Promise<void>((resolve, reject) => {
			compiler.build(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
		const stats = await new Promise<string>((resolve, reject) => {
			compiler.rebuild(
				new Set([path.join(__dirname, "./fixtures/a")]),
				new Set(),
				err => {
					if (err) {
						return reject(err);
					}
					const stats = new Stats(compiler.compilation).toString({
						all: false,
						logging: "verbose"
					});
					resolve(stats);
				}
			);
		});
		expect(stats).toContain("module build cache: 100.0% (4/4)");
		expect(stats).toContain("module factorize cache: 100.0% (5/5)");
		expect(stats).toContain("module code generation cache: 100.0% (4/4)");
	});

	it("should not have any cache hits log when cache is disabled", async () => {
		const compiler = rspack({
			context: __dirname,
			entry: "./fixtures/abc",
			cache: false,
			experiments: {
				incrementalRebuild: false
			}
		});
		await new Promise<void>((resolve, reject) => {
			compiler.build(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
		const stats = await new Promise<string>((resolve, reject) => {
			compiler.rebuild(
				new Set([path.join(__dirname, "./fixtures/a")]),
				new Set(),
				err => {
					if (err) {
						return reject(err);
					}
					const stats = new Stats(compiler.compilation).toString({
						all: false,
						logging: "verbose"
					});
					resolve(stats);
				}
			);
		});
		expect(stats).not.toContain("module build cache");
		expect(stats).not.toContain("module factorize cache");
		expect(stats).not.toContain("module code generation cache");
	});

	it("should have any cache hits log of modules in incremental rebuild mode", async () => {
		const compiler = rspack({
			context: __dirname,
			entry: "./fixtures/abc",
			cache: true,
			experiments: {
				incrementalRebuild: true
			}
		});
		await new Promise<void>((resolve, reject) => {
			compiler.build(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
		const stats = await new Promise<string>((resolve, reject) => {
			compiler.rebuild(
				new Set([path.join(__dirname, "./fixtures/a")]),
				new Set(),
				err => {
					if (err) {
						return reject(err);
					}
					const stats = new Stats(compiler.compilation).toString({
						all: false,
						logging: "verbose"
					});
					resolve(stats);
				}
			);
		});
		expect(stats).toContain("module build cache: 100.0% (1/1)");
		expect(stats).toContain("module factorize cache: 100.0% (1/1)");
		expect(stats).toContain("module code generation cache: 100.0% (4/4)");
	});
});
