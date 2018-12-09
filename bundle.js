/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b9795f2ea138421852c5";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(18)(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// Module
exports.push([module.i, ".mdl-layout__container,\n.mdl-layout__header,\n.mdl-layout__drawer,\n.mdl-navigation {\n  background: #212121 !important;\n  color: white !important; }\n\n.mdl-layout__container, .mdl-layout-title {\n  font-family: \"Raleway\", sans-serif; }\n\n.mdl-navigation__link.is-active {\n  color: #00e871 !important;\n  border-bottom: 2px solid #00e871; }\n  .mdl-layout__drawer .mdl-navigation__link.is-active {\n    border-bottom: 0;\n    border-right: 2px solid #00e871; }\n\n.mdl-layout__drawer {\n  border-right: 1px solid rgba(255, 255, 255, 0.6); }\n\n.mdl-layout__content {\n  display: flex;\n  justify-content: center;\n  overflow: hidden; }\n\n.mdl-card {\n  min-height: 0; }\n\nform {\n  padding-left: 24px;\n  height: 60px; }\n\n.mdl-textfield__label,\n.mdl-textfield__input {\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: .02em; }\n\n@media (max-width: 839px) and (min-width: 480px) {\n  .mdl-cell--3-col, .mdl-cell--3-col-tablet.mdl-cell--3-col-tablet {\n    width: calc(50% - 16px); } }\n\n@media (max-width: 479px) {\n  .mdl-cell--3-col, .mdl-cell--3-col-phone.mdl-cell--3-col-phone {\n    width: calc(100% - 16px); } }\n\n.loader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  text-align: center;\n  background: rgba(0, 0, 0, 0.5);\n  width: 100%;\n  z-index: 1;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  transition: all 0.1s ease;\n  opacity: 1;\n  visibility: hidden; }\n  .loader svg path,\n  .loader svg rect {\n    fill: #00e871; }\n\n.movie-card {\n  position: relative;\n  height: 450px;\n  background: url(\"http://image.tmdb.org/t/p/w300/gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg\") center/cover;\n  margin: 8px;\n  cursor: pointer;\n  display: none;\n  color: #fff;\n  font-size: 1rem;\n  font-weight: 500;\n  transition: all 0.6s ease;\n  z-index: 1;\n  overflow: visible; }\n  @media (max-width: 479px) {\n    .movie-card {\n      cursor: default; } }\n  .movie-card > .mdl-card__actions {\n    height: 150px;\n    padding: 16px;\n    background: rgba(0, 0, 0, 0.8);\n    display: flex;\n    flex-direction: column; }\n  .movie-card__title {\n    font-size: 1.3rem;\n    font-weight: 600;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .movie-card__meta {\n    font-size: 1rem; }\n    .movie-card__meta__rating {\n      color: #00e871;\n      font-weight: 500;\n      padding-left: 16px; }\n  .movie-card__genres {\n    font-size: 1rem;\n    color: rgba(255, 255, 255, 0.6);\n    width: 100%;\n    padding: 4px 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .movie-card__overview {\n    padding-top: 4px;\n    font-size: 0.9rem;\n    overflow: hidden;\n    max-height: 45px; }\n  .movie-card__arrow {\n    width: 115px;\n    height: 115px;\n    position: absolute;\n    bottom: -3px;\n    left: calc(50% - 60px);\n    clip: rect(auto, 180px, auto, 100px);\n    transform: rotate(90deg);\n    opacity: 0; }\n    .movie-card__arrow:after {\n      content: \"\";\n      position: absolute;\n      top: 10px;\n      bottom: 10px;\n      left: 10px;\n      right: 10px;\n      background: linear-gradient(45deg, transparent 0%, rgba(0, 232, 113, 0.1) 87%, #00e871 100%);\n      transform: rotate(45deg); }\n\n.movie-card.is-active .movie-card__arrow {\n  opacity: 1; }\n\n.mdl-textfield__input {\n  font-family: \"Raleway\", sans-serif; }\n\n.mdl-textfield__label {\n  color: white; }\n  .mdl-textfield__label:after {\n    background-color: white; }\n\n.jawbone {\n  font-family: \"Raleway\", sans-serif;\n  color: white;\n  position: relative;\n  max-height: 520px;\n  flex-direction: column;\n  justify-content: flex-start;\n  z-index: 1;\n  width: calc(100% - 16px);\n  margin: 8px;\n  overflow: hidden;\n  background-position: right;\n  background-size: contain;\n  display: flex;\n  height: 0;\n  visibility: hidden;\n  opacity: 0;\n  transition: height 0.3s ease; }\n  @media (min-width: 480px) and (max-width: 840px) {\n    .jawbone {\n      background-size: cover; } }\n  .jawbone.is-open {\n    height: 450px;\n    visibility: visible;\n    opacity: 1; }\n  .jawbone:before {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: linear-gradient(to right, black 38%, rgba(0, 0, 0, 0.7) 45%, transparent 70%);\n    z-index: -1; }\n  .jawbone__close {\n    position: absolute;\n    right: 0;\n    top: 0;\n    font-size: 3rem;\n    padding: 24px 8px;\n    cursor: pointer;\n    z-index: 1; }\n    .jawbone__close span {\n      display: block;\n      border-bottom: 2px solid white;\n      width: 32px; }\n    .jawbone__close span:first-of-type {\n      transform: rotate(45deg) translateX(1px); }\n    .jawbone__close span:last-of-type {\n      transform: rotate(-45deg) translateX(1px); }\n  .jawbone__tabs-nav {\n    position: absolute;\n    bottom: 0;\n    display: flex;\n    align-self: center;\n    height: 42px;\n    z-index: 1; }\n    @media (min-width: 480px) and (max-width: 840px) {\n      .jawbone__tabs-nav {\n        align-self: start; } }\n    .jawbone__tabs-nav span {\n      color: rgba(255, 255, 255, 0.6);\n      font-size: 1.2rem;\n      height: 24px;\n      padding: 8px 16px;\n      background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 100%);\n      cursor: pointer;\n      border-bottom: 2px solid rgba(0, 0, 0, 0.6); }\n      .jawbone__tabs-nav span:hover {\n        color: #FFFFFF; }\n      .jawbone__tabs-nav span.is-active, .jawbone__tabs-nav span:active, .jawbone__tabs-nav span:focus, .jawbone__tabs-nav span:visited {\n        color: #FFFFFF;\n        border-bottom: 2px solid #00e871; }\n  .jawbone__overview, .jawbone__trailers, .jawbone__reviews, .jawbone__similar {\n    display: flex;\n    flex-direction: column;\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 90%;\n    width: 100%;\n    transform: translateX(-100vw);\n    transition: transform 0.3s ease;\n    z-index: 0;\n    visibility: hidden;\n    opacity: 0;\n    flex: 1 0 auto; }\n    .jawbone__overview.is-active, .jawbone__trailers.is-active, .jawbone__reviews.is-active, .jawbone__similar.is-active {\n      transform: translateX(0px);\n      visibility: visible;\n      opacity: 1; }\n  .jawbone__overview {\n    width: 40%;\n    padding: 24px;\n    overflow: hidden; }\n    .jawbone__overview__title {\n      font-size: 3rem;\n      padding: 16px;\n      line-height: 1; }\n    .jawbone__overview__meta {\n      padding: 8px; }\n      .jawbone__overview__meta span {\n        font-size: 1.5rem;\n        padding: 0 8px; }\n      .jawbone__overview__meta__rating {\n        color: #00e871; }\n    .jawbone__overview__genres {\n      padding: 8px 16px; }\n    .jawbone__overview__description {\n      color: rgba(255, 255, 255, 0.6);\n      padding: 8px 16px;\n      max-height: 115px;\n      overflow-y: scroll;\n      width: calc(100% + 10px); }\n  .jawbone__trailers {\n    flex-direction: row;\n    justify-content: center;\n    align-items: center; }\n    .jawbone__trailers__no-trailer {\n      display: none;\n      font-size: 1.2rem;\n      text-align: center;\n      line-height: 1.2; }\n    .jawbone__trailers__trailer {\n      width: 20vw;\n      margin: 16px;\n      cursor: pointer;\n      display: none; }\n      .jawbone__trailers__trailer__img img {\n        width: 100%;\n        height: auto; }\n      .jawbone__trailers__trailer__title {\n        font-size: 1rem;\n        font-weight: lighter;\n        color: rgba(255, 255, 255, 0.6);\n        padding: 8px;\n        background-color: rgba(0, 0, 0, 0.6); }\n  .jawbone__reviews {\n    flex-direction: row;\n    justify-content: center;\n    align-items: center; }\n    .jawbone__reviews__no-review {\n      display: none;\n      font-size: 1.2rem;\n      text-align: center;\n      line-height: 1.2; }\n    .jawbone__reviews__review {\n      width: 40%;\n      height: 70%;\n      background-color: rgba(0, 0, 0, 0.6);\n      overflow: hidden;\n      cursor: pointer;\n      color: rgba(255, 255, 255, 0.6);\n      margin: 0 8px;\n      display: none; }\n      .jawbone__reviews__review__container {\n        width: calc(100% + 18px);\n        overflow-y: scroll;\n        height: 100%; }\n      .jawbone__reviews__review__author {\n        font-size: 1.2rem;\n        color: #FFFFFF;\n        padding: 8px; }\n      .jawbone__reviews__review__text {\n        font-size: 0.9rem;\n        padding: 8px 8px 24px 8px; }\n  .jawbone__similar {\n    flex-direction: row;\n    justify-content: center;\n    align-items: center; }\n    .jawbone__similar__no-similar {\n      display: none;\n      font-size: 1.2rem;\n      text-align: center;\n      line-height: 1.2; }\n    .jawbone__similar__movie {\n      position: relative;\n      width: 15%;\n      height: 70%;\n      margin: 8px 16px;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      background-size: cover;\n      -webkit-backface-visibility: hidden;\n      -webkit-font-smoothing: antialiased;\n      display: none;\n      overflow: hidden; }\n      .jawbone__similar__movie:before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: black;\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        transition: all 0.2s ease; }\n      .jawbone__similar__movie:hover {\n        transform: scale(1.2); }\n        .jawbone__similar__movie:hover:before, .jawbone__similar__movie:hover .jawbone__similar__movie__title, .jawbone__similar__movie:hover .jawbone__similar__movie__meta, .jawbone__similar__movie:hover .jawbone__similar__movie__overview {\n          opacity: 1;\n          background: black; }\n      @media (min-width: 480px) and (max-width: 839px) {\n        .jawbone__similar__movie:hover {\n          transform: scale(1); }\n          .jawbone__similar__movie:hover:before {\n            opacity: 0; } }\n      .jawbone__similar__movie__title {\n        opacity: 0;\n        position: relative;\n        padding: 8px;\n        font-size: 1.2rem;\n        background: black; }\n        @media (min-width: 480px) and (max-width: 839px) {\n          .jawbone__similar__movie__title {\n            font-size: 1rem;\n            align-self: center;\n            opacity: 1; } }\n      .jawbone__similar__movie__meta {\n        opacity: 0;\n        padding: 0 8px;\n        background: black; }\n        @media (min-width: 480px) and (max-width: 839px) {\n          .jawbone__similar__movie__meta {\n            opacity: 1; } }\n        .jawbone__similar__movie__meta span {\n          position: relative;\n          font-size: 1.1rem;\n          padding-right: 8px; }\n        .jawbone__similar__movie__meta__year {\n          color: rgba(255, 255, 255, 0.6); }\n        .jawbone__similar__movie__meta__rating {\n          color: #00e871; }\n      .jawbone__similar__movie__overview {\n        opacity: 0;\n        position: relative;\n        font-size: 0.9rem;\n        padding: 8px;\n        -webkit-font-smoothing: antialiased;\n        -webkit-backface-visibility: hidden;\n        transition: all 0.2s ease; }\n        @media (min-width: 480px) and (max-width: 839px) {\n          .jawbone__similar__movie__overview {\n            display: none; } }\n\n.input {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border: var(--border);\n  border-radius: var(--radius);\n  height: 36px;\n  width: 280px;\n  margin-top: 250px;\n  padding: var(--gutter);\n  background-color: white; }\n\n.input__active {\n  border-color: var(--colorAccent);\n  border-bottom-left-radius: 0px !important;\n  border-bottom-right-radius: 0px !important; }\n\n.input__placeholder {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center; }\n\n.input:hover {\n  cursor: pointer; }\n\n.placeholder {\n  color: var(--colorPlaceholder); }\n\n.input__selected {\n  color: var(--colorPrimaryDark); }\n\n/* Dropdown styling */\n.structure {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 200px;\n  width: 280px;\n  overflow: scroll;\n  background-color: white;\n  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);\n  padding: 10px 0; }\n\n.structure > div {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 16px; }\n\n.structure > div:hover {\n  background-color: var(--colorAccent);\n  color: white;\n  cursor: pointer; }\n\n.structure > div > h5 {\n  font-weight: 600;\n  margin-right: 4px; }\n\n.structure > div > p {\n  font-weight: 400;\n  font-size: 13px;\n  color: var(--colorPlaceholder); }\n\n.hide {\n  display: none; }\n\nbody, html {\n  height: 100%;\n  font-family: \"Raleway\", sans-serif;\n  font-size: 14px; }\n\n.now-playing__header {\n  font-family: \"Raleway\", sans-serif;\n  margin-left: 24px; }\n\nsection {\n  color: white !important; }\n\nsection {\n  width: 100%;\n  max-width: 1312px;\n  padding-left: 16px;\n  padding-right: 16px;\n  display: none;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  overflow-y: scroll; }\n  section::-webkit-scrollbar {\n    display: none; }\n  @media (max-width: 1312px) {\n    section {\n      padding-left: 3vw !important;\n      padding-right: 3vw !important; } }\n\n@supports (-moz-appearance: none) {\n  section {\n    width: 100%;\n    padding: 0 16vw !important;\n    display: none;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n    overflow-y: scroll;\n    margin: 0 -27px 0 0px !important; }\n    @media (max-width: 1312px) {\n      section {\n        padding: 0 10px !important;\n        margin: 0 -27px 0 -10px !important; } } }\n\n.header-container {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n", ""]);



/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(10);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(0);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(6)(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(0, function() {
		var newContent = __webpack_require__(0);

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1),
    now = __webpack_require__(9),
    toNumber = __webpack_require__(12);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1),
    isSymbol = __webpack_require__(13);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(14),
    isObjectLike = __webpack_require__(17);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(3),
    getRawTag = __webpack_require__(15),
    objectToString = __webpack_require__(16);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(3);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/scripts/services/Dataservices.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';
var DataService = function DataService() {
  _classCallCheck(this, DataService);

  _defineProperty(this, "getLatestMovies", function (page, sort) {
    page = page || 1;
    var url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + '&page=' + page + '&sort_by=' + sort;
    return fetch(url).then(function (response) {
      return response.json();
    });
  });

  _defineProperty(this, "getSearchResults", function (searchText, page) {
    page = page || 1;
    var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + searchText + '&page=' + page;
    return fetch(url).then(function (response) {
      return response.json();
    });
  });

  _defineProperty(this, "getMovieDetails", function (movieId) {
    var url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + API_KEY + '&append_to_response=trailers,reviews,similar';
    return fetch(url).then(function (response) {
      return response.json();
    });
  });

  _defineProperty(this, "getGenres", function () {
    var url = 'https://api.themoviedb.org/3/genre/movie/list' + '?api_key=' + API_KEY;
    return fetch(url).then(function (response) {
      return response.json();
    });
  });
};
// CONCATENATED MODULE: ./src/scripts/common/Jawbone.js
function Jawbone_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Jawbone_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Jawbone = function Jawbone() {
  var _this = this;

  Jawbone_classCallCheck(this, Jawbone);

  Jawbone_defineProperty(this, "create", function (state, movie, e) {
    var section, jawbone, clone, trailers, reviews, similarMovies, navbar, nodesInBetween, nodeToAppendTo; // Create jawbone from template

    section = document.getElementById(state);
    jawbone = section.getElementsByClassName('jawbone')[0]; // Determine the position of the jawbone in the page
    // How many nodes (movie cards) before it is inserted?

    nodesInBetween = Math.floor((Math.min(1600, window.innerWidth) - e.target.getBoundingClientRect().right) / e.target.getBoundingClientRect().width); //https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling

    nodeToAppendTo = e.target.closest('.movie-card'); // Skip to the desired element and then insert the cloned jawbone

    while (nodesInBetween > 0) {
      nodeToAppendTo = nodeToAppendTo.nextElementSibling;
      --nodesInBetween;
    }

    clone = _this.insertAfter(jawbone.cloneNode(true), nodeToAppendTo); // From our newly created clone, let's get elements that we will use later

    navbar = clone.querySelector('.js-jtabs-nav'); // Bottom navigation bar

    trailers = clone.querySelectorAll('.js-trailer'); // Get trailers

    reviews = clone.querySelectorAll('.js-review'); // Get reviews

    similarMovies = clone.querySelectorAll('.js-similar'); // Get similar movies
    // If a jawbone already exists, remove it

    if (section.querySelector('.js-jawbone.is-open')) {
      section.querySelector('.js-jawbone.is-open').parentNode.removeChild(section.querySelector('.js-jawbone.is-open'));
    } // Use YouTube thumbnail as jawbone's background. If none, use movie's poster
    // As a last resort, use a random image from lorempixel


    if (movie.trailers.youtube[0]) {
      clone.style.backgroundImage = 'url(http://img.youtube.com/vi/' + movie.trailers.youtube[0].source + '/maxresdefault.jpg)';
    } else {
      clone.style.backgroundImage = movie.poster_path ? 'url(http://image.tmdb.org/t/p/w300' + movie.poster_path + ')' : 'url(http://lorempixel.com/300/450/nightlife/)';
      clone.style.backgroundSize = 'cover';
    } // Movie overview
    /////////////////


    clone.querySelector('.js-title').textContent = movie.original_title;
    clone.querySelector('.js-description').textContent = movie.overview;
    clone.querySelector('.js-genres').textContent = _this.getGenres(movie.genres);
    clone.querySelector('.js-year').textContent = movie.release_date.substring(0, 4);
    clone.querySelector('.js-rating').textContent = movie.vote_average + '/10'; // Trailers
    ///////////
    // If no trailers, prompt user to add one

    if (movie.trailers.youtube.length === 0) {
      clone.querySelector('.js-no-trailer').style.display = 'block';
      clone.querySelector('.js-no-trailer a').href = 'http://www.imdb.com/title/' + movie.imdb_id;
    } else {
      // Load up to 4 trailers
      Array.from(trailers).map(function (trailer, i) {
        if (movie.trailers.youtube[i]) {
          trailer.href = 'https://www.youtube.com/watch?v=' + movie.trailers.youtube[i].source;
          trailer.querySelector('img').src = 'http://img.youtube.com/vi/' + movie.trailers.youtube[i].source + '/sddefault.jpg';
          trailer.style.display = 'block';
          trailer.querySelector('.jawbone__trailers__trailer__title').textContent = movie.trailers.youtube[i].name;
        }
      });
    } // Reviews
    //////////
    // If no review, prompt user to add one


    if (movie.reviews.results.length === 0) {
      clone.querySelector('.js-no-review a').href = 'http://www.imdb.com/title/' + movie.imdb_id;
      clone.querySelector('.js-no-review').style.display = 'block';
    } else {
      // Load up tp 2 reviews
      Array.from(reviews).map(function (review, i) {
        if (movie.reviews.results[i]) {
          review.style.display = 'block';
          review.querySelector('.js-review-author').textContent = ' ' + movie.reviews.results[i].author;
          review.querySelector('.js-review-text').textContent = movie.reviews.results[i].content;
        }
      });
    } // Similar movies
    /////////////////
    // If no similar movie, let the user know


    if (movie.similar.results.length === 0) {
      clone.querySelector('.js-no-similar').style.display = 'block';
    } else {
      // Load up tp 4 similar movies
      Array.from(similarMovies).map(function (similar, i) {
        if (movie.similar.results[i]) {
          similar.style.display = 'block';
          similar.style.backgroundImage = 'url(http://image.tmdb.org/t/p/w300' + movie.similar.results[i].poster_path + ')';
          similar.querySelector('.js-similar-title').textContent = movie.similar.results[i].original_title;
          similar.querySelector('.js-similar-year').textContent = movie.similar.results[i].release_date.substring(0, 4);
          similar.querySelector('.js-similar-rating').textContent = movie.similar.results[i].vote_average + '/10';
          similar.querySelector('.js-similar-overview').textContent = movie.similar.results[i].overview;
        }
      });
    } // Enable navigation interaction and show relevant tab on user's click


    Array.from(navbar.querySelectorAll('span')).map(function (navItem) {
      navItem.addEventListener('click', function (e) {
        _this.showTab(clone, navbar, e);
      });
    }); // Close button and remove active states from jawbone and parent movie card

    clone.querySelector('.js-jawbone-close').addEventListener('click', function () {
      clone.classList.remove('is-open');
      clone.closest('section').querySelector('.movie-card.is-active').classList.remove('is-active');
      setTimeout(function () {
        clone.remove();
      }, 300);
    }); // Unleash the clone!

    clone.classList.add('is-open');
    return clone;
  });

  Jawbone_defineProperty(this, "showTab", function (clone, navbar, e) {
    var navItem = e.target; // Remove active classes

    navbar.querySelector('.is-active').classList.remove('is-active');
    clone.querySelector('.is-active').classList.remove('is-active'); // Add active classes to corresponding elements

    navItem.classList.add('is-active');
    clone.querySelector('.js-' + navItem.getAttribute('data-target')).classList.add('is-active');
  });

  Jawbone_defineProperty(this, "insertAfter", function (newElement, targetElement) {
    debugger; // target is what you want it to go after. Look for this elements parent.

    var parent = targetElement.parentNode; // if the parents lastchild is the targetElement...

    if (parent.lastChild == targetElement) {
      // add the newElement after the target element.
      parent.appendChild(newElement);
    } else {
      // else the target has siblings, insert the new element between the target and it's next sibling.
      parent.insertBefore(newElement, targetElement.nextSibling);
    }

    return newElement;
  });

  Jawbone_defineProperty(this, "getGenres", function (genresArr) {
    return genresArr.map(function (genre) {
      return ' ' + genre.name;
    });
  });
} // var section, jawbone, clone,
//     trailers, reviews, similarMovies, navbar,
//     nodesInBetween, nodeToAppendTo
//     ;
;
// CONCATENATED MODULE: ./src/scripts/common/Moviecard.js
function Moviecard_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Moviecard_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MovieCard = function MovieCard() {
  var _this = this;

  Moviecard_classCallCheck(this, MovieCard);

  Moviecard_defineProperty(this, "create", function (state, movie, index) {
    var section, movieCard, clone;
    section = document.getElementById(state);
    movieCard = section.getElementsByClassName('movie-card')[0];
    clone = section.appendChild(movieCard.cloneNode(true)); // clone.setAttribute('data-id', movie.id); //TODO: Do I need this?

    clone.querySelector('.movie-card__title').textContent = movie.title;
    clone.querySelector('.movie-card__overview').textContent = movie.overview;
    clone.querySelector('.movie-card__genres').textContent = _this.getGenres(movie.genre_ids);
    clone.querySelector('.movie-card__meta__year').textContent = movie.release_date.substring(0, 4);
    clone.querySelector('.movie-card__meta__rating').textContent = movie.vote_average + '/10';
    clone.style.backgroundImage = movie.poster_path ? 'url(http://image.tmdb.org/t/p/w300' + movie.poster_path + ')' : 'url(http://lorempixel.com/300/450/nightlife/)';
    clone.style.display = 'flex';
    return clone;
  });

  Moviecard_defineProperty(this, "getGenres", function (genresArr) {
    return genresArr.map(function (genreId) {
      return ' ' + localStorage[genreId];
    });
  });
};
// EXTERNAL MODULE: ./src/styles/main.scss
var main = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__(8);

// CONCATENATED MODULE: ./src/scripts/App.js
function App_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function App_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var App_App =
/*#__PURE__*/
function () {
  function App() {
    var _this = this;

    App_classCallCheck(this, App);

    App_defineProperty(this, "init", function () {
      _this.settings = {
        section: document.getElementsByTagName('section'),
        searchSection: document.getElementById('search'),
        //sortOption: document.getElementById('sort-option'),
        nowPlayingSection: document.getElementById('now-playing'),
        navLinks: document.querySelectorAll('nav a'),
        content: document.getElementsByClassName('mdl-layout__content')[0],
        searchInput: document.getElementById('search-input'),
        loader: document.getElementsByClassName('loader')[0],
        drawer: document.querySelector('.mdl-layout__drawer'),
        sortOption: document.getElementById("sort_option"),
        obfuscator: ''
      };

      _this.dataService.getLatestMovies();

      _this.storeGenresLocally();

      _this.bindUIActions();

      console.log(_this);
    });

    App_defineProperty(this, "bindUIActions", function () {
      window.addEventListener('load', _this.router());
      window.addEventListener('hashchange', _this.router()); // We choose to close all open jawbones on window resize

      window.addEventListener('resize', function () {
        _this.closeJawbone(_this.state);
      }); // Infinite scrolling

      Array.from(_this.settings.section, function (section) {
        section.addEventListener('scroll', function () {
          var reachedBottom = section.scrollHeight - section.scrollTop === section.clientHeight;

          if (reachedBottom && !_this.polling && section.scrollTop > section.clientHeight) {
            if (_this.state === 'now-playing') {
              _this.page++;

              _this.getLatestMovies(_this.page);
            } else if (_this.state === 'search') {
              _this.searchPage++;

              _this.searchMovies(_this.settings.searchInput.value, _this.searchPage);
            }
          }
        });
      });

      _this.settings.searchInput.addEventListener('keyup', function (e) {
        _this.clearSearchResults();

        if (_this.settings.searchInput.value.length > 0 && !_this.polling) {
          _this.searchMovies(_this.settings.searchInput.value);
        }
      }); // Close drawer on selecting a menu item


      Array.from(_this.settings.navLinks, function (navLink) {
        navLink.addEventListener('click', function () {
          debugger; // Obfuscator is lazy loaded by Material Lite, so we can only catch it here

          var obfuscator = document.querySelector('.mdl-layout__obfuscator');

          _this.settings.drawer.classList.remove('is-visible');

          obfuscator.classList.remove('is-visible');

          _this.router();
        });
      });
    });

    App_defineProperty(this, "storeGenresLocally", function () {
      _this.dataService.getGenres().then(function (data) {
        data.genres.map(function (genreObj) {
          localStorage.setItem(genreObj.id, genreObj.name);
        });
      });
    });

    App_defineProperty(this, "dropdown", function () {
      var sortOptions = [{
        id: 1,
        displayName: 'Release date',
        option: 'release_date.desc'
      }, {
        id: 2,
        displayName: 'Title',
        option: 'original_title.asc'
      }];
      sortOptions.forEach(function (sort) {
        var displayName = sort.displayName,
            option = sort.option;
        var optionDiv = document.createElement("li");
        optionDiv.addEventListener("click", function () {
          return _this.selectOption(sort);
        });
        optionDiv.appendChild(document.createTextNode(sort.displayName));
        optionDiv.classList.add("mdl-menu__item");

        _this.settings.sortOption.appendChild(optionDiv);

        return optionDiv;
      });
    });

    App_defineProperty(this, "selectOption", function (sort) {
      console.log(sort);

      _this.getLatestMovies(_this.page, sort.option);
    });

    App_defineProperty(this, "router", function () {
      _this.state = location.hash.slice(1) || '/'; // Hide all sections

      Array.from(_this.settings.section, function (el) {
        el.style.display = 'none';
      }); // Remove 'is-active' class from all navigation links

      Array.from(_this.settings.navLinks, function (navLink) {
        navLink.classList.remove('is-active');
      }); // Manage states

      switch (_this.state) {
        case 'now-playing':
          if (_this.settings.nowPlayingSection.querySelectorAll('.movie-card').length === 1) {
            _this.getLatestMovies();
          }

        // Intentional fallthrough

        case 'search':
          document.getElementById(_this.state).style.display = 'flex';
          Array.from(document.querySelectorAll('nav a[href="#' + _this.state + '"]'), function (navLink) {
            navLink.classList.add('is-active');
          });
          break;

        default:
          window.location.hash = '#now-playing';
      }
    });

    App_defineProperty(this, "closeJawbone", function (state) {
      Array.from(_this.settings.section, function (section) {
        // If a jawbone already exists, remove it
        if (section.querySelector('.js-jawbone.is-open')) {
          section.querySelector('.js-jawbone.is-open').parentNode.removeChild(section.querySelector('.js-jawbone.is-open'));
        }
      });
    });

    App_defineProperty(this, "clearSearchResults", function () {
      var movieCards = _this.settings.searchSection.getElementsByClassName('movie-card');

      var jawbones = _this.settings.searchSection.getElementsByClassName('jawbone');

      Array.from(movieCards).map(function (card, i) {
        if (i > 0) {
          _this.settings.searchSection.removeChild(card);
        }
      });
      Array.from(jawbones).map(function (jawbone, i) {
        if (i > 0) {
          _this.settings.searchSection.removeChild(jawbone);
        }
      });
    });

    App_defineProperty(this, "getLatestMovies", function (page, sort) {
      _this.toggleLoader();

      _this.dataService.getLatestMovies(page, sort).then(function (data) {
        _this.toggleLoader();

        _this.loadMovies(data);
      }).catch(function (err) {
        console.log('Error:' + err);
      });
    });

    App_defineProperty(this, "loadMovies", function (data) {
      data.results.map(function (movie) {
        _this.moviecard.create(_this.state, movie).addEventListener('click', function (e) {
          if (window.innerWidth > 479) {
            _this.toggleActiveCard(_this.state, e);

            _this.showJawbone(movie.id, e);
          }
        });
      });
    });

    App_defineProperty(this, "searchMovies", function (searchText, page) {
      _this.toggleLoader();

      _this.dataService.getSearchResults(searchText, page).then(function (data) {
        _this.loadMovies(data);

        _this.toggleLoader();
      }).catch(function (err) {
        console.log('Error:' + err);
      });
    });

    App_defineProperty(this, "showJawbone", function (movieId, e) {
      _this.toggleLoader();

      _this.dataService.getMovieDetails(movieId).then(function (data) {
        _this.toggleLoader();

        _this.jawbone.create(_this.state, data, e);

        e.target.scrollIntoView({
          behavior: 'smooth'
        });
      }).catch(function (err) {
        console.log('Error:' + err);
      });
    });

    App_defineProperty(this, "closeJawbone", function (state) {
      Array.from(_this.settings.section, function (section) {
        // If a jawbone already exists, remove it
        if (section.querySelector('.js-jawbone.is-open')) {
          section.querySelector('.js-jawbone.is-open').parentNode.removeChild(section.querySelector('.js-jawbone.is-open'));
        }
      });
    });

    App_defineProperty(this, "toggleLoader", function () {
      _this.polling = !_this.polling;
      _this.settings.loader.style.visibility = _this.polling ? 'visible' : 'hidden';
    });

    this.dataService = new DataService();
    this.jawbone = new Jawbone();
    this.moviecard = new MovieCard();
    this.page = 1, this.searchPage = 1, this.state, this.polling = false, this.sort_by = '';
  }

  _createClass(App, [{
    key: "toggleActiveCard",
    // Toggle active card:
    // Remove .is-active class from current active card and added to the one just clicked
    value: function toggleActiveCard(state, e) {
      //Toggle active state for movie cards
      var activeCard = document.getElementById(this.state).querySelector('.movie-card.is-active');

      if (activeCard) {
        activeCard.classList.remove('is-active');
      }

      e.target.closest('.movie-card').classList.add('is-active');
    }
  }]);

  return App;
}();

var app = new App_App();
window.addEventListener('load', function () {
  return app.init();
});

/***/ })
/******/ ]);