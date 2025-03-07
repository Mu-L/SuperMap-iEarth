if (typeof WebAssembly !== 'undefined') {
	var Module = typeof Module !== "undefined" ? Module : {};
	var moduleOverrides = {};
	var key;
	for (key in Module) {
		if (Module.hasOwnProperty(key)) {
			moduleOverrides[key] = Module[key]
		}
	}
	var arguments_ = [];
	var thisProgram = "./this.program";
	var quit_ = function (status, toThrow) {
		throw toThrow
	};
	var ENVIRONMENT_IS_WEB = false;
	var ENVIRONMENT_IS_WORKER = false;
	var ENVIRONMENT_IS_NODE = false;
	var ENVIRONMENT_HAS_NODE = false;
	var ENVIRONMENT_IS_SHELL = false;
	ENVIRONMENT_IS_WEB = typeof window === "object";
	ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
	ENVIRONMENT_HAS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
	ENVIRONMENT_IS_NODE = ENVIRONMENT_HAS_NODE && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
	ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
	var scriptDirectory = "";
	function locateFile(path) {
		if (Module["locateFile"]) {
			return Module["locateFile"](path, scriptDirectory)
		}
		return scriptDirectory + path
	}
	var read_, readAsync, readBinary, setWindowTitle;
	var nodeFS;
	var nodePath;
	if (ENVIRONMENT_IS_NODE) {
		scriptDirectory = __dirname + "/";
		read_ = function shell_read(filename, binary) {
			if (!nodeFS)nodeFS = require("fs");
			if (!nodePath)nodePath = require("path");
			filename = nodePath["normalize"](filename);
			return nodeFS["readFileSync"](filename, binary ? null : "utf8")
		};
		readBinary = function readBinary(filename) {
			var ret = read_(filename, true);
			if (!ret.buffer) {
				ret = new Uint8Array(ret)
			}
			assert(ret.buffer);
			return ret
		};
		if (process["argv"].length > 1) {
			thisProgram = process["argv"][1].replace(/\\/g, "/")
		}
		arguments_ = process["argv"].slice(2);
		if (typeof module !== "undefined") {
			module["exports"] = Module
		}
		process["on"]("uncaughtException", function (ex) {
			if (!(ex instanceof ExitStatus)) {
				throw ex
			}
		});
		process["on"]("unhandledRejection", abort);
		quit_ = function (status) {
			process["exit"](status)
		};
		Module["inspect"] = function () {
			return"[Emscripten Module object]"
		}
	} else if (ENVIRONMENT_IS_SHELL) {
		if (typeof read != "undefined") {
			read_ = function shell_read(f) {
				return read(f)
			}
		}
		readBinary = function readBinary(f) {
			var data;
			if (typeof readbuffer === "function") {
				return new Uint8Array(readbuffer(f))
			}
			data = read(f, "binary");
			assert(typeof data === "object");
			return data
		};
		if (typeof scriptArgs != "undefined") {
			arguments_ = scriptArgs
		} else if (typeof arguments != "undefined") {
			arguments_ = arguments
		}
		if (typeof quit === "function") {
			quit_ = function (status) {
				quit(status)
			}
		}
		if (typeof print !== "undefined") {
			if (typeof console === "undefined")console = {};
			console.log = print;
			console.warn = console.error = typeof printErr !== "undefined" ? printErr : print
		}
	} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
		if (ENVIRONMENT_IS_WORKER) {
			scriptDirectory = self.location.href
		} else if (document.currentScript) {
			scriptDirectory = document.currentScript.src
		}
		if (scriptDirectory.indexOf("blob:") !== 0) {
			scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1)
		} else {
			scriptDirectory = ""
		}
		{
			read_ = function shell_read(url) {
				var xhr = new XMLHttpRequest;
				xhr.open("GET", url, false);
				xhr.send(null);
				return xhr.responseText
			};
			if (ENVIRONMENT_IS_WORKER) {
				readBinary = function readBinary(url) {
					var xhr = new XMLHttpRequest;
					xhr.open("GET", url, false);
					xhr.responseType = "arraybuffer";
					xhr.send(null);
					return new Uint8Array(xhr.response)
				}
			}
			readAsync = function readAsync(url, onload, onerror) {
				var xhr = new XMLHttpRequest;
				xhr.open("GET", url, true);
				xhr.responseType = "arraybuffer";
				xhr.onload = function xhr_onload() {
					if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
						onload(xhr.response);
						return
					}
					onerror()
				};
				xhr.onerror = onerror;
				xhr.send(null)
			}
		}
		setWindowTitle = function (title) {
			document.title = title
		}
	} else {
	}
	var out = Module["print"] || console.log.bind(console);
	var err = Module["printErr"] || console.warn.bind(console);
	for (key in moduleOverrides) {
		if (moduleOverrides.hasOwnProperty(key)) {
			Module[key] = moduleOverrides[key]
		}
	}
	moduleOverrides = null;
	if (Module["arguments"])arguments_ = Module["arguments"];
	if (Module["thisProgram"])thisProgram = Module["thisProgram"];
	if (Module["quit"])quit_ = Module["quit"];
	var wasmBinary;
	if (Module["wasmBinary"])wasmBinary = Module["wasmBinary"];
	var noExitRuntime;
	if (Module["noExitRuntime"])noExitRuntime = Module["noExitRuntime"];
	if (typeof WebAssembly !== "object") {
		err("no native wasm support detected")
	}
	var wasmMemory;
	var wasmTable = new WebAssembly.Table({"initial": 6, "maximum": 6 + 0, "element": "anyfunc"});
	var ABORT = false;
	var EXITSTATUS = 0;
	function assert(condition, text) {
		if (!condition) {
			abort("Assertion failed: " + text)
		}
	}
	var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
	function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
		var endIdx = idx + maxBytesToRead;
		var endPtr = idx;
		while (u8Array[endPtr] && !(endPtr >= endIdx))++endPtr;
		if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
			return UTF8Decoder.decode(u8Array.subarray(idx, endPtr))
		} else {
			var str = "";
			while (idx < endPtr) {
				var u0 = u8Array[idx++];
				if (!(u0 & 128)) {
					str += String.fromCharCode(u0);
					continue
				}
				var u1 = u8Array[idx++] & 63;
				if ((u0 & 224) == 192) {
					str += String.fromCharCode((u0 & 31) << 6 | u1);
					continue
				}
				var u2 = u8Array[idx++] & 63;
				if ((u0 & 240) == 224) {
					u0 = (u0 & 15) << 12 | u1 << 6 | u2
				} else {
					u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63
				}
				if (u0 < 65536) {
					str += String.fromCharCode(u0)
				} else {
					var ch = u0 - 65536;
					str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
				}
			}
		}
		return str
	}
	function UTF8ToString(ptr, maxBytesToRead) {
		return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
	}
	var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
	var WASM_PAGE_SIZE = 65536;
	function alignUp(x, multiple) {
		if (x % multiple > 0) {
			x += multiple - x % multiple
		}
		return x
	}
	var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
	function updateGlobalBufferAndViews(buf) {
		buffer = buf;
		Module["HEAP8"] = HEAP8 = new Int8Array(buf);
		Module["HEAP16"] = HEAP16 = new Int16Array(buf);
		Module["HEAP32"] = HEAP32 = new Int32Array(buf);
		Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
		Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
		Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
		Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
		Module["HEAPF64"] = HEAPF64 = new Float64Array(buf)
	}
	var DYNAMIC_BASE = 5247584, DYNAMICTOP_PTR = 4544;
	var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 16777216;
	if (Module["wasmMemory"]) {
		wasmMemory = Module["wasmMemory"]
	} else {
		wasmMemory = new WebAssembly.Memory({"initial": INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE})
	}
	if (wasmMemory) {
		buffer = wasmMemory.buffer
	}
	INITIAL_TOTAL_MEMORY = buffer.byteLength;
	updateGlobalBufferAndViews(buffer);
	HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
	function callRuntimeCallbacks(callbacks) {
		while (callbacks.length > 0) {
			var callback = callbacks.shift();
			if (typeof callback == "function") {
				callback();
				continue
			}
			var func = callback.func;
			if (typeof func === "number") {
				if (callback.arg === undefined) {
					Module["dynCall_v"](func)
				} else {
					Module["dynCall_vi"](func, callback.arg)
				}
			} else {
				func(callback.arg === undefined ? null : callback.arg)
			}
		}
	}
	var __ATPRERUN__ = [];
	var __ATINIT__ = [];
	var __ATMAIN__ = [];
	var __ATPOSTRUN__ = [];
	var runtimeInitialized = false;
	function preRun() {
		if (Module["preRun"]) {
			if (typeof Module["preRun"] == "function")Module["preRun"] = [Module["preRun"]];
			while (Module["preRun"].length) {
				addOnPreRun(Module["preRun"].shift())
			}
		}
		callRuntimeCallbacks(__ATPRERUN__)
	}
	function initRuntime() {
		runtimeInitialized = true;
		callRuntimeCallbacks(__ATINIT__)
	}
	function preMain() {
		callRuntimeCallbacks(__ATMAIN__)
	}
	function postRun() {
		if (Module["postRun"]) {
			if (typeof Module["postRun"] == "function")Module["postRun"] = [Module["postRun"]];
			while (Module["postRun"].length) {
				addOnPostRun(Module["postRun"].shift())
			}
		}
		callRuntimeCallbacks(__ATPOSTRUN__)
	}
	function addOnPreRun(cb) {
		__ATPRERUN__.unshift(cb)
	}
	function addOnPostRun(cb) {
		__ATPOSTRUN__.unshift(cb)
	}
	var runDependencies = 0;
	var runDependencyWatcher = null;
	var dependenciesFulfilled = null;
	function addRunDependency(id) {
		runDependencies++;
		if (Module["monitorRunDependencies"]) {
			Module["monitorRunDependencies"](runDependencies)
		}
	}
	function removeRunDependency(id) {
		runDependencies--;
		if (Module["monitorRunDependencies"]) {
			Module["monitorRunDependencies"](runDependencies)
		}
		if (runDependencies == 0) {
			if (runDependencyWatcher !== null) {
				clearInterval(runDependencyWatcher);
				runDependencyWatcher = null
			}
			if (dependenciesFulfilled) {
				var callback = dependenciesFulfilled;
				dependenciesFulfilled = null;
				callback()
			}
		}
	}
	Module["preloadedImages"] = {};
	Module["preloadedAudios"] = {};
	function abort(what) {
		if (Module["onAbort"]) {
			Module["onAbort"](what)
		}
		what += "";
		out(what);
		err(what);
		ABORT = true;
		EXITSTATUS = 1;
		what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
		throw new WebAssembly.RuntimeError(what)
	}
	var dataURIPrefix = "data:application/octet-stream;base64,";
	function isDataURI(filename) {
		return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0
	}
	var wasmBinaryFile = "crunch.wasm";
	if (!isDataURI(wasmBinaryFile)) {
		//wasmBinaryFile = locateFile(wasmBinaryFile);
		wasmBinaryFile = self.SUPERMAP3D_BASE_URL + 'ThirdParty/crunch.wasm';
	}
	function getBinary() {
		try {
			if (wasmBinary) {
				return new Uint8Array(wasmBinary)
			}
			if (readBinary) {
				return readBinary(wasmBinaryFile)
			} else {
				throw"both async and sync fetching of the wasm failed"
			}
		} catch (err) {
			abort(err)
		}
	}
	function getBinaryPromise() {
		if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
			return fetch(wasmBinaryFile, {credentials: "same-origin"}).then(function (response) {
				if (!response["ok"]) {
					throw"failed to load wasm binary file at '" + wasmBinaryFile + "'"
				}
				return response["arrayBuffer"]()
			}).catch(function () {
				return getBinary()
			})
		}
		return new Promise(function (resolve, reject) {
			resolve(getBinary())
		})
	}
	function createWasm() {
		if(!wasmBinary){
			return {};
		}
		var info = {"env": asmLibraryArg, "wasi_unstable": asmLibraryArg};

		function receiveInstance(instance, module) {
			var exports = instance.exports;
			Module["asm"] = exports;
			removeRunDependency("wasm-instantiate")
		}

		addRunDependency("wasm-instantiate");
		function receiveInstantiatedSource(output) {
			receiveInstance(output["instance"])
		}

		function instantiateArrayBuffer(receiver) {
			return getBinaryPromise().then(function (binary) {
				return WebAssembly.instantiate(binary, info)
			}).then(receiver, function (reason) {
				err("failed to asynchronously prepare wasm: " + reason);
				abort(reason)
			})
		}

		function instantiateAsync() {
			if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
				fetch(wasmBinaryFile, {credentials: "same-origin"}).then(function (response) {
					var result = WebAssembly.instantiateStreaming(response, info);
					return result.then(receiveInstantiatedSource, function (reason) {
						err("wasm streaming compile failed: " + reason);
						err("falling back to ArrayBuffer instantiation");
						instantiateArrayBuffer(receiveInstantiatedSource)
					})
				})
			} else {
				return instantiateArrayBuffer(receiveInstantiatedSource)
			}
		}

		if (Module["instantiateWasm"]) {
			try {
				var exports = Module["instantiateWasm"](info, receiveInstance);
				return exports
			} catch (e) {
				err("Module.instantiateWasm callback failed with error: " + e);
				return false
			}
		}
		instantiateAsync();
		return{}
	}
	__ATINIT__.push({func: function () {
		___wasm_call_ctors()
	}});
	function _emscripten_get_heap_size() {
		return HEAP8.length
	}
	function _emscripten_memcpy_big(dest, src, num) {
		HEAPU8.set(HEAPU8.subarray(src, src + num), dest)
	}
	function emscripten_realloc_buffer(size) {
		try {
			wasmMemory.grow(size - buffer.byteLength + 65535 >> 16);
			updateGlobalBufferAndViews(wasmMemory.buffer);
			return 1
		} catch (e) {
		}
	}
	function _emscripten_resize_heap(requestedSize) {
		var oldSize = _emscripten_get_heap_size();
		var PAGE_MULTIPLE = 65536;
		var LIMIT = 2147483648 - PAGE_MULTIPLE;
		if (requestedSize > LIMIT) {
			return false
		}
		var MIN_TOTAL_MEMORY = 16777216;
		var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
		while (newSize < requestedSize) {
			if (newSize <= 536870912) {
				newSize = alignUp(2 * newSize, PAGE_MULTIPLE)
			} else {
				newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT)
			}
		}
		var replacement = emscripten_realloc_buffer(newSize);
		if (!replacement) {
			return false
		}
		return true
	}
	var PATH = {splitPath: function (filename) {
		var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
		return splitPathRe.exec(filename).slice(1)
	}, normalizeArray: function (parts, allowAboveRoot) {
		var up = 0;
		for (var i = parts.length - 1; i >= 0; i--) {
			var last = parts[i];
			if (last === ".") {
				parts.splice(i, 1)
			} else if (last === "..") {
				parts.splice(i, 1);
				up++
			} else if (up) {
				parts.splice(i, 1);
				up--
			}
		}
		if (allowAboveRoot) {
			for (; up; up--) {
				parts.unshift("..")
			}
		}
		return parts
	}, normalize: function (path) {
		var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
		path = PATH.normalizeArray(path.split("/").filter(function (p) {
			return!!p
		}), !isAbsolute).join("/");
		if (!path && !isAbsolute) {
			path = "."
		}
		if (path && trailingSlash) {
			path += "/"
		}
		return(isAbsolute ? "/" : "") + path
	}, dirname: function (path) {
		var result = PATH.splitPath(path), root = result[0], dir = result[1];
		if (!root && !dir) {
			return"."
		}
		if (dir) {
			dir = dir.substr(0, dir.length - 1)
		}
		return root + dir
	}, basename: function (path) {
		if (path === "/")return"/";
		var lastSlash = path.lastIndexOf("/");
		if (lastSlash === -1)return path;
		return path.substr(lastSlash + 1)
	}, extname: function (path) {
		return PATH.splitPath(path)[3]
	}, join: function () {
		var paths = Array.prototype.slice.call(arguments, 0);
		return PATH.normalize(paths.join("/"))
	}, join2: function (l, r) {
		return PATH.normalize(l + "/" + r)
	}};
	var SYSCALLS = {buffers: [null, [], []], printChar: function (stream, curr) {
		var buffer = SYSCALLS.buffers[stream];
		if (curr === 0 || curr === 10) {
			(stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
			buffer.length = 0
		} else {
			buffer.push(curr)
		}
	}, varargs: 0, get: function (varargs) {
		SYSCALLS.varargs += 4;
		var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
		return ret
	}, getStr: function () {
		var ret = UTF8ToString(SYSCALLS.get());
		return ret
	}, get64: function () {
		var low = SYSCALLS.get(), high = SYSCALLS.get();
		return low
	}, getZero: function () {
		SYSCALLS.get()
	}};
	function _fd_write(fd, iov, iovcnt, pnum) {
		try {
			var num = 0;
			for (var i = 0; i < iovcnt; i++) {
				var ptr = HEAP32[iov + i * 8 >> 2];
				var len = HEAP32[iov + (i * 8 + 4) >> 2];
				for (var j = 0; j < len; j++) {
					SYSCALLS.printChar(fd, HEAPU8[ptr + j])
				}
				num += len
			}
			HEAP32[pnum >> 2] = num;
			return 0
		} catch (e) {
			if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))abort(e);
			return e.errno
		}
	}
	var asmLibraryArg = {"a": _emscripten_memcpy_big, "b": _emscripten_resize_heap, "c": _fd_write, "memory": wasmMemory, "table": wasmTable};
	var asm = createWasm();
	Module["asm"] = asm;
	var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function () {
		return Module["asm"]["d"].apply(null, arguments)
	};
	var _malloc = Module["_malloc"] = function () {
		return Module["asm"]["e"].apply(null, arguments)
	};
	var _free = Module["_free"] = function () {
		return Module["asm"]["f"].apply(null, arguments)
	};
	var _crn_get_width = Module["_crn_get_width"] = function () {
		return Module["asm"]["g"].apply(null, arguments)
	};
	var _crn_get_height = Module["_crn_get_height"] = function () {
		return Module["asm"]["h"].apply(null, arguments)
	};
	var _crn_get_levels = Module["_crn_get_levels"] = function () {
		return Module["asm"]["i"].apply(null, arguments)
	};
	var _crn_get_dxt_format = Module["_crn_get_dxt_format"] = function () {
		return Module["asm"]["j"].apply(null, arguments)
	};
	var _crn_get_bytes_per_block = Module["_crn_get_bytes_per_block"] = function () {
		return Module["asm"]["k"].apply(null, arguments)
	};
	var _crn_get_uncompressed_size = Module["_crn_get_uncompressed_size"] = function () {
		return Module["asm"]["l"].apply(null, arguments)
	};
	var _crn_decompress = Module["_crn_decompress"] = function () {
		return Module["asm"]["m"].apply(null, arguments)
	};
	Module["asm"] = asm;
	var calledRun;
	function ExitStatus(status) {
		this.name = "ExitStatus";
		this.message = "Program terminated with exit(" + status + ")";
		this.status = status
	}
	dependenciesFulfilled = function runCaller() {
		if (!calledRun)run();
		if (!calledRun)dependenciesFulfilled = runCaller
	};
	function run(args) {
		args = args || arguments_;
		if (runDependencies > 0) {
			return
		}
		preRun();
		if (runDependencies > 0)return;
		function doRun() {
			if (calledRun)return;
			calledRun = true;
			if (ABORT)return;
			initRuntime();
			preMain();
			if (Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();
			postRun()
		}

		if (Module["setStatus"]) {
			Module["setStatus"]("Running...");
			setTimeout(function () {
				setTimeout(function () {
					Module["setStatus"]("")
				}, 1);
				doRun()
			}, 1)
		} else {
			doRun()
		}
	}
	Module["run"] = run;
	if (Module["preInit"]) {
		if (typeof Module["preInit"] == "function")Module["preInit"] = [Module["preInit"]];
		while (Module["preInit"].length > 0) {
			Module["preInit"].pop()()
		}
	}
	noExitRuntime = true;
	//run();
	Module["init"] = function(wasm) {
		wasmBinary = wasm;
		Module["asm"] = createWasm();
		run();
	};
}

export default Module;