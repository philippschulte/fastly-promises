## [1.18.2](https://github.com/adobe/fastly-native-promises/compare/v1.18.1...v1.18.2) (2020-12-17)


### Bug Fixes

* **conditions:** do not attempt to change condition type ([20db0a4](https://github.com/adobe/fastly-native-promises/commit/20db0a4f4b5a1435122fd5669c7fb03fb9a22d02))

## [1.18.1](https://github.com/adobe/fastly-native-promises/compare/v1.18.0...v1.18.1) (2020-12-16)


### Bug Fixes

* **healthcheck:** fix typo ([950781e](https://github.com/adobe/fastly-native-promises/commit/950781e751af9aa3deffbfaa73a5ea8a00cd4903))

# [1.18.0](https://github.com/adobe/fastly-native-promises/compare/v1.17.3...v1.18.0) (2020-12-15)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.9.2 ([b5e4781](https://github.com/adobe/fastly-native-promises/commit/b5e47814137c6b9d2b2e352f244a56b45276b93a))


### Features

* **healthcheck:** add writeHealthcheck method for upserts ([56bec96](https://github.com/adobe/fastly-native-promises/commit/56bec96dc5b9fa31166d1e7e72a167eabafc7c40))

## [1.17.3](https://github.com/adobe/fastly-native-promises/compare/v1.17.2...v1.17.3) (2020-08-10)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.9.1 ([c36f4a4](https://github.com/adobe/fastly-native-promises/commit/c36f4a4dc633d1df6ea1cba19196bfedd54b7628))

## [1.17.2](https://github.com/adobe/fastly-native-promises/compare/v1.17.1...v1.17.2) (2020-08-08)


### Performance Improvements

* remove serialization of API calls: too broad in scope ([09e2b5b](https://github.com/adobe/fastly-native-promises/commit/09e2b5b722842ce9f876abb133a090adc018ee67))

## [1.17.1](https://github.com/adobe/fastly-native-promises/compare/v1.17.0...v1.17.1) (2020-08-03)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.9.0 ([c44c793](https://github.com/adobe/fastly-native-promises/commit/c44c793b46e9017361fadd641808fd3e1977f225))

# [1.17.0](https://github.com/adobe/fastly-native-promises/compare/v1.16.4...v1.17.0) (2020-07-29)


### Bug Fixes

* **http:** prevent concurrent modification of the same service ([691d976](https://github.com/adobe/fastly-native-promises/commit/691d9769c017f6943713c823adf84fdf9cf5395d))


### Features

* **lock:** add a lock helper to control concurrency ([ad3c24c](https://github.com/adobe/fastly-native-promises/commit/ad3c24c669fae825a5870b469761d90bc7cf8444))

## [1.16.4](https://github.com/adobe/fastly-native-promises/compare/v1.16.3...v1.16.4) (2020-07-22)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.8.1 ([41cebee](https://github.com/adobe/fastly-native-promises/commit/41cebee857e48c2a5e7978b7248987f8fa363a1f))

## [1.16.3](https://github.com/adobe/fastly-native-promises/compare/v1.16.2...v1.16.3) (2020-07-20)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.8.0 ([216cb3c](https://github.com/adobe/fastly-native-promises/commit/216cb3c1c9cd3252a7a3fd404e1d176e49740c5a))

## [1.16.2](https://github.com/adobe/fastly-native-promises/compare/v1.16.1...v1.16.2) (2020-07-13)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.7.1 ([84314f5](https://github.com/adobe/fastly-native-promises/commit/84314f5552d98a9f0466c2f12aac4d41cb7f779d))

## [1.16.1](https://github.com/adobe/fastly-native-promises/compare/v1.16.0...v1.16.1) (2020-07-02)


### Bug Fixes

* disable cache ([9d8887f](https://github.com/adobe/fastly-native-promises/commit/9d8887ff14aede87a803f5d31c4065d006201875))
* **httpclient:** robust timing ([5b5d901](https://github.com/adobe/fastly-native-promises/commit/5b5d901227c783193ce776131b506d64d58c9a14))
* **httpclient:** use application/json for patch requests ([207476c](https://github.com/adobe/fastly-native-promises/commit/207476ce7cfadc675a0a07ee337da60caf3f75b9))
* **writevcl:** guard against missing name ([cd2afd4](https://github.com/adobe/fastly-native-promises/commit/cd2afd45b8274d5ceef3f90fb6903a7f28386863))

# [1.16.0](https://github.com/adobe/fastly-native-promises/compare/v1.15.1...v1.16.0) (2020-04-24)


### Features

* **logging:** add support for HTTPS log streaming API ([2e7af00](https://github.com/adobe/fastly-native-promises/commit/2e7af00565a6a05936b5a84fa8e9134d33e46dde)), closes [#205](https://github.com/adobe/fastly-native-promises/issues/205)

## [1.15.1](https://github.com/adobe/fastly-native-promises/compare/v1.15.0...v1.15.1) (2020-04-02)


### Bug Fixes

* **deps:** npm audit fix ([36c27ef](https://github.com/adobe/fastly-native-promises/commit/36c27efef1528052070150b7e2307898fbbda16b))
* **dicts:** urlencode dict keys ([97b8f2a](https://github.com/adobe/fastly-native-promises/commit/97b8f2afe5c6101ccdd1e4fc838428a01d726260)), closes [#199](https://github.com/adobe/fastly-native-promises/issues/199)

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
