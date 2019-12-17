# [1.15.0](https://github.com/adobe/fastly-native-promises/compare/v1.14.2...v1.15.0) (2019-12-17)


### Features

* **snippets:** add readSnippets method ([9550a14](https://github.com/adobe/fastly-native-promises/commit/9550a142b102b73481d58cf80b549b36f0f56a80)), closes [#172](https://github.com/adobe/fastly-native-promises/issues/172)

## [1.14.2](https://github.com/adobe/fastly-native-promises/compare/v1.14.1...v1.14.2) (2019-11-20)


### Bug Fixes

* **deps:** update dependencies ([#169](https://github.com/adobe/fastly-native-promises/issues/169)) ([4931d79](https://github.com/adobe/fastly-native-promises/commit/4931d79eb1a999fd59035587d3a584ab21e52152))

## [1.14.1](https://github.com/adobe/fastly-native-promises/compare/v1.14.0...v1.14.1) (2019-10-29)


### Bug Fixes

* **ci:** try semantic-release w/o writing .npmrc ([859dee1](https://github.com/adobe/fastly-native-promises/commit/859dee1e1773cbad306beaf371fb188e06699b02))

# [1.14.0](https://github.com/adobe/fastly-native-promises/compare/v1.13.0...v1.14.0) (2019-10-07)


### Features

* add healthcheck methods ([6c97b56](https://github.com/adobe/fastly-native-promises/commit/6c97b56))

# [1.13.0](https://github.com/adobe/fastly-native-promises/compare/v1.12.0...v1.13.0) (2019-09-02)


### Features

* **domain:** add more domain functions ([06d6fd6](https://github.com/adobe/fastly-native-promises/commit/06d6fd6))

# [1.12.0](https://github.com/adobe/fastly-native-promises/compare/v1.11.0...v1.12.0) (2019-08-20)


### Bug Fixes

* **clone:** if no active version can be found during clone fall back to current, latest, or initial ([fbd0c60](https://github.com/adobe/fastly-native-promises/commit/fbd0c60)), closes [#106](https://github.com/adobe/fastly-native-promises/issues/106)


### Features

* **versions:** allow specifying multiple fallbacks for getVersion ([f884cb8](https://github.com/adobe/fastly-native-promises/commit/f884cb8))

# [1.11.0](https://github.com/adobe/fastly-native-promises/compare/v1.10.0...v1.11.0) (2019-07-30)


### Bug Fixes

* **purge:** purgeKeys should send correct content-type ([47535f6](https://github.com/adobe/fastly-native-promises/commit/47535f6)), closes [#100](https://github.com/adobe/fastly-native-promises/issues/100)


### Features

* **purge:** add softPurgeKeys() ([61bf5b2](https://github.com/adobe/fastly-native-promises/commit/61bf5b2))

# [1.10.0](https://github.com/adobe/fastly-native-promises/compare/v1.9.1...v1.10.0) (2019-06-14)


### Features

* **client:** Add more user management functions ([3acd8d9](https://github.com/adobe/fastly-native-promises/commit/3acd8d9)), closes [#10](https://github.com/adobe/fastly-native-promises/issues/10)

## [1.9.1](https://github.com/adobe/fastly-native-promises/compare/v1.9.0...v1.9.1) (2019-05-02)


### Bug Fixes

* **httpclient:** do not memoize failing requests ([6e3726c](https://github.com/adobe/fastly-native-promises/commit/6e3726c)), closes [#61](https://github.com/adobe/fastly-native-promises/issues/61)

# [1.9.0](https://github.com/adobe/fastly-native-promises/compare/v1.8.1...v1.9.0) (2019-03-22)


### Features

* **fastly:** Fail fast on transactions that will exceed the rate limit ([6d30ed2](https://github.com/adobe/fastly-native-promises/commit/6d30ed2)), closes [adobe/helix-publish#35](https://github.com/adobe/helix-publish/issues/35)
* **http:** Add HTTP request monitor for getting request statistics ([2e91b11](https://github.com/adobe/fastly-native-promises/commit/2e91b11)), closes [#30](https://github.com/adobe/fastly-native-promises/issues/30)

## [1.8.1](https://github.com/adobe/fastly-native-promises/compare/v1.8.0...v1.8.1) (2019-03-13)


### Bug Fixes

* **dictionaries:** Fix invalid dictionary updates ([9e0a239](https://github.com/adobe/fastly-native-promises/commit/9e0a239)), closes [#50](https://github.com/adobe/fastly-native-promises/issues/50)

# [1.8.0](https://github.com/adobe/fastly-native-promises/compare/v1.7.0...v1.8.0) (2019-03-08)


### Features

* **fastly:** Add CRUD for headers ([c00f867](https://github.com/adobe/fastly-native-promises/commit/c00f867)), closes [#35](https://github.com/adobe/fastly-native-promises/issues/35)
* **headers:** Add high-level functions for header management ([e6b4779](https://github.com/adobe/fastly-native-promises/commit/e6b4779)), closes [#35](https://github.com/adobe/fastly-native-promises/issues/35)

# [1.7.0](https://github.com/adobe/fastly-native-promises/compare/v1.6.1...v1.7.0) (2019-03-07)


### Features

* **conditions:** Introduce helper for condition updates ([e70c7d6](https://github.com/adobe/fastly-native-promises/commit/e70c7d6)), closes [#38](https://github.com/adobe/fastly-native-promises/issues/38)
* **fastly:** Support CRUD operations on conditions ([03eceea](https://github.com/adobe/fastly-native-promises/commit/03eceea)), closes [#34](https://github.com/adobe/fastly-native-promises/issues/34)

## [1.6.1](https://github.com/adobe/fastly-native-promises/compare/v1.6.0...v1.6.1) (2019-03-05)


### Bug Fixes

* **fastly:** Increase default timeout to 15 seconds ([984c133](https://github.com/adobe/fastly-native-promises/commit/984c133)), closes [#41](https://github.com/adobe/fastly-native-promises/issues/41)

# [1.6.0](https://github.com/adobe/fastly-native-promises/compare/v1.5.0...v1.6.0) (2019-03-05)


### Bug Fixes

* **http:** Make PATCH requests use application/json ([46c0fa9](https://github.com/adobe/fastly-native-promises/commit/46c0fa9))


### Features

* **fastly:** Implement Dictionary Bulk Updates ([78481c6](https://github.com/adobe/fastly-native-promises/commit/78481c6)), closes [#38](https://github.com/adobe/fastly-native-promises/issues/38)

# [1.5.0](https://github.com/adobe/fastly-native-promises/compare/v1.4.0...v1.5.0) (2019-03-05)


### Bug Fixes

* **http:** Repeat failed GET requests twice ([1ae8a51](https://github.com/adobe/fastly-native-promises/commit/1ae8a51))


### Features

* **http:** Memoize GET requests ([bc722f5](https://github.com/adobe/fastly-native-promises/commit/bc722f5)), closes [#36](https://github.com/adobe/fastly-native-promises/issues/36)

# [1.4.0](https://github.com/adobe/fastly-native-promises/compare/v1.3.2...v1.4.0) (2019-03-01)


### Features

* **http:** Add support for PATCH ([105d38d](https://github.com/adobe/fastly-native-promises/commit/105d38d)), closes [#38](https://github.com/adobe/fastly-native-promises/issues/38)

## [1.3.2](https://github.com/adobe/fastly-native-promises/compare/v1.3.1...v1.3.2) (2019-01-22)


### Bug Fixes

* **fastly:** Return undefined for dict values of write-only edge dicts ([ab5972a](https://github.com/adobe/fastly-native-promises/commit/ab5972a)), closes [#27](https://github.com/adobe/fastly-native-promises/issues/27)

## [1.3.1](https://github.com/adobe/fastly-native-promises/compare/v1.3.0...v1.3.1) (2019-01-22)


### Bug Fixes

* **index:** Fix broken upsertFn for careful operations ([7696a92](https://github.com/adobe/fastly-native-promises/commit/7696a92))

# [1.3.0](https://github.com/adobe/fastly-native-promises/compare/v1.2.0...v1.3.0) (2019-01-18)


### Features

* **fastly:** Add CRUD support for Dictionary Items ([f9769ec](https://github.com/adobe/fastly-native-promises/commit/f9769ec)), closes [#6](https://github.com/adobe/fastly-native-promises/issues/6)
* **fastly:** Add CRUD support for edge dictionaries ([8458107](https://github.com/adobe/fastly-native-promises/commit/8458107)), closes [#6](https://github.com/adobe/fastly-native-promises/issues/6)

# [1.2.0](https://github.com/adobe/fastly-native-promises/compare/v1.1.2...v1.2.0) (2019-01-15)


### Features

* **backends:** Enable creation of backends ([3f61343](https://github.com/adobe/fastly-native-promises/commit/3f61343)), closes [#5](https://github.com/adobe/fastly-native-promises/issues/5)

## [1.1.2](https://github.com/adobe/fastly-native-promises/compare/v1.1.1...v1.1.2) (2019-01-14)


### Bug Fixes

* **index:** Fix arity of createFn in writeFn ([e5be90e](https://github.com/adobe/fastly-native-promises/commit/e5be90e))

## [1.1.1](https://github.com/adobe/fastly-native-promises/compare/v1.1.0...v1.1.1) (2019-01-14)


### Performance Improvements

* **httpclient:** Increase default timeout to 5 seconds ([115da20](https://github.com/adobe/fastly-native-promises/commit/115da20))

# [1.1.0](https://github.com/adobe/fastly-native-promises/compare/v1.0.3...v1.1.0) (2019-01-14)


### Features

* **fastly:** Add basic transaction support ([15a4f29](https://github.com/adobe/fastly-native-promises/commit/15a4f29)), closes [#21](https://github.com/adobe/fastly-native-promises/issues/21)

## [1.0.3](https://github.com/adobe/fastly-native-promises/compare/v1.0.2...v1.0.3) (2019-01-14)


### Bug Fixes

* **httpclient:** Fix headers and authentication ([fa30c84](https://github.com/adobe/fastly-native-promises/commit/fa30c84)), closes [#20](https://github.com/adobe/fastly-native-promises/issues/20)

## [1.0.2](https://github.com/adobe/fastly-native-promises/compare/v1.0.1...v1.0.2) (2019-01-11)


### Bug Fixes

* **docs:** Fix installation instructions ([7d8f387](https://github.com/adobe/fastly-native-promises/commit/7d8f387))

## [1.0.1](https://github.com/adobe/fastly-native-promises/compare/v1.0.0...v1.0.1) (2019-01-11)


### Bug Fixes

* **dependencies:** Updated outdated dependencies ([004e077](https://github.com/adobe/fastly-native-promises/commit/004e077))
