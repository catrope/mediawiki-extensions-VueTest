"use strict";

var exports = module.exports;
exports.callWithAsyncErrorHandling = callWithAsyncErrorHandling;
exports.callWithErrorHandling = callWithErrorHandling;
exports.cloneVNode = cloneVNode;
exports.compile = compileToFunction;
exports.computed = computed$1;
exports.createBlock = createBlock;
exports.createCommentVNode = createCommentVNode;
exports.createHydrationRenderer = createHydrationRenderer;
exports.createRenderer = createRenderer;
exports.createSlots = createSlots;
exports.createStaticVNode = createStaticVNode;
exports.createTextVNode = createTextVNode;
exports.createVNode = createVNode;
exports.defineComponent = defineComponent;
exports.h = h;
exports.handleError = handleError;
exports.inject = inject;
exports.isReactive = isReactive;
exports.isReadonly = isReadonly;
exports.isRef = isRef;
exports.markNonReactive = markNonReactive;
exports.markReadonly = markReadonly;
exports.mergeProps = mergeProps;
exports.nextTick = nextTick;
exports.onActivated = onActivated;
exports.onDeactivated = onDeactivated;
exports.openBlock = openBlock;
exports.popScopeId = popScopeId;
exports.provide = provide;
exports.pushScopeId = pushScopeId;
exports.reactive = reactive;
exports.readonly = readonly;
exports.ref = ref;
exports.registerRuntimeCompiler = registerRuntimeCompiler;
exports.renderList = renderList;
exports.renderSlot = renderSlot;
exports.resolveComponent = resolveComponent;
exports.resolveDirective = resolveDirective;
exports.resolveDynamicComponent = resolveDynamicComponent;
exports.resolveTransitionHooks = resolveTransitionHooks;
exports.setBlockTracking = setBlockTracking;
exports.setTransitionHooks = setTransitionHooks;
exports.shallowReactive = shallowReactive;
exports.shallowRef = shallowRef;
exports.toHandlers = toHandlers;
exports.toRaw = toRaw;
exports.toRefs = toRefs;
exports.unref = unref;
exports.useTransitionState = useTransitionState;
exports.warn = warn;
exports.watch = watch;
exports.watchEffect = watchEffect;
exports.withDirectives = withDirectives;
exports.withScopeId = withScopeId;
exports.withModifiers = exports.withKeys = exports.version = exports.vShow = exports.vModelText = exports.vModelSelect = exports.vModelRadio = exports.vModelDynamic = exports.vModelCheckbox = exports.useSSRContext = exports.useCSSModule = exports.toDisplayString = exports.ssrUtils = exports.ssrContextKey = exports.render = exports.onUpdated = exports.onUnmounted = exports.onRenderTriggered = exports.onRenderTracked = exports.onMounted = exports.onErrorCaptured = exports.onBeforeUpdate = exports.onBeforeUnmount = exports.onBeforeMount = exports.hydrate = exports.getCurrentInstance = exports.createSSRApp = exports.createApp = exports.camelize = exports.TransitionGroup = exports.Transition = exports.Text = exports.Suspense = exports.Portal = exports.KeepAlive = exports.Fragment = exports.Comment = exports.BaseTransition = void 0;

var _PatchFlagNames, _errorMessages, _helperNameMap, _registerRuntimeHelpe, _DOMErrorMessages, _ErrorTypeStrings;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Make a map and return a function for checking if a key
// is in that map.
//
// IMPORTANT: all calls of this function must be prefixed with /*#__PURE__*/
// So that rollup can tree-shake them if necessary.
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return !!map[val.toLowerCase()];
  } : function (val) {
    return !!map[val];
  };
} // Patch flags are optimization hints generated by the compiler.
// when a block with dynamicChildren is encountered during diff, the algorithm
// enters "optimized mode". In this mode, we know that the vdom is produced by
// a render function generated by the compiler, so the algorithm only needs to
// handle updates explicitly marked by these patch flags.
// dev only flag -> name mapping


var PatchFlagNames = (_PatchFlagNames = {}, _defineProperty(_PatchFlagNames, 1
/* TEXT */
, "TEXT"), _defineProperty(_PatchFlagNames, 2
/* CLASS */
, "CLASS"), _defineProperty(_PatchFlagNames, 4
/* STYLE */
, "STYLE"), _defineProperty(_PatchFlagNames, 8
/* PROPS */
, "PROPS"), _defineProperty(_PatchFlagNames, 16
/* FULL_PROPS */
, "FULL_PROPS"), _defineProperty(_PatchFlagNames, 32
/* HYDRATE_EVENTS */
, "HYDRATE_EVENTS"), _defineProperty(_PatchFlagNames, 64
/* STABLE_FRAGMENT */
, "STABLE_FRAGMENT"), _defineProperty(_PatchFlagNames, 128
/* KEYED_FRAGMENT */
, "KEYED_FRAGMENT"), _defineProperty(_PatchFlagNames, 256
/* UNKEYED_FRAGMENT */
, "UNKEYED_FRAGMENT"), _defineProperty(_PatchFlagNames, 1024
/* DYNAMIC_SLOTS */
, "DYNAMIC_SLOTS"), _defineProperty(_PatchFlagNames, 512
/* NEED_PATCH */
, "NEED_PATCH"), _defineProperty(_PatchFlagNames, -1
/* HOISTED */
, "HOISTED"), _defineProperty(_PatchFlagNames, -2
/* BAIL */
, "BAIL"), _PatchFlagNames);
var GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' + 'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' + 'Object,Boolean,String,RegExp,Map,Set,JSON,Intl';
var isGloballyWhitelisted = /*#__PURE__*/makeMap(GLOBALS_WHITE_LISTED);
var range = 2;

function generateCodeFrame(source) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : source.length;
  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];

  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;

    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) continue;
        var line = j + 1;
        res.push("".concat(line).concat(' '.repeat(3 - String(line).length), "|  ").concat(lines[j]));
        var lineLength = lines[j].length;

        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push("   |  " + ' '.repeat(pad) + '^'.repeat(length));
        } else if (j > i) {
          if (end > count) {
            var _length = Math.max(Math.min(end - count, lineLength), 1);

            res.push("   |  " + '^'.repeat(_length));
          }

          count += lineLength + 1;
        }
      }

      break;
    }
  }

  return res.join('\n');
} // On the client we only need to offer special cases for boolean attributes that
// have different names from their corresponding dom properties:
// - itemscope -> N/A
// - allowfullscreen -> allowFullscreen
// - formnovalidate -> formNoValidate
// - ismap -> isMap
// - nomodule -> noModule
// - novalidate -> noValidate
// - readonly -> readOnly


var specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
var isSpecialBooleanAttr = /*#__PURE__*/makeMap(specialBooleanAttrs);

function normalizeStyle(value) {
  if (isArray(value)) {
    var res = {};

    for (var i = 0; i < value.length; i++) {
      var normalized = normalizeStyle(value[i]);

      if (normalized) {
        for (var key in normalized) {
          res[key] = normalized[key];
        }
      }
    }

    return res;
  } else if (isObject(value)) {
    return value;
  }
}

function normalizeClass(value) {
  var res = '';

  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      res += normalizeClass(value[i]) + ' ';
    }
  } else if (isObject(value)) {
    for (var name in value) {
      if (value[name]) {
        res += name + ' ';
      }
    }
  }

  return res.trim();
} // These tag configs are shared between compiler-dom and runtime-dom, so they
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element


var HTML_TAGS = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,' + 'header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,' + 'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' + 'data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,' + 'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' + 'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' + 'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' + 'option,output,progress,select,textarea,details,dialog,menu,menuitem,' + 'summary,content,element,shadow,template,blockquote,iframe,tfoot'; // https://developer.mozilla.org/en-US/docs/Web/SVG/Element

var SVG_TAGS = 'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,' + 'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,' + 'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,' + 'feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,' + 'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' + 'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,' + 'foreignObject,g,hatch,hatchpath,image,line,lineGradient,marker,mask,' + 'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' + 'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,' + 'text,textPath,title,tspan,unknown,use,view';
var VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr';
var isHTMLTag = /*#__PURE__*/makeMap(HTML_TAGS);
var isSVGTag = /*#__PURE__*/makeMap(SVG_TAGS);
var isVoidTag = /*#__PURE__*/makeMap(VOID_TAGS);

function looseEqual(a, b) {
  if (a === b) return true;
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = isArray(a);
      var isArrayB = isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (_instanceof(a, Date) && _instanceof(b, Date)) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  return arr.findIndex(function (item) {
    return looseEqual(item, val);
  });
}

var EMPTY_OBJ = Object.freeze({});
var EMPTY_ARR = [];

var NOOP = function NOOP() {};
/**
 * Always return false.
 */


var NO = function NO() {
  return false;
};

var isOn = function isOn(key) {
  return key[0] === 'o' && key[1] === 'n';
};

var extend = function extend(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }

  return a;
};

var remove = function remove(arr, el) {
  var i = arr.indexOf(el);

  if (i > -1) {
    arr.splice(i, 1);
  }
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};

var isArray = Array.isArray;

var isFunction = function isFunction(val) {
  return typeof val === 'function';
};

var isString = function isString(val) {
  return typeof val === 'string';
};

var isSymbol = function isSymbol(val) {
  return _typeof(val) === 'symbol';
};

var isObject = function isObject(val) {
  return val !== null && _typeof(val) === 'object';
};

var isPromise = function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

var objectToString = Object.prototype.toString;

var toTypeString = function toTypeString(value) {
  return objectToString.call(value);
};

var toRawType = function toRawType(value) {
  return toTypeString(value).slice(8, -1);
};

var isPlainObject = function isPlainObject(val) {
  return toTypeString(val) === '[object Object]';
};

var isReservedProp = /*#__PURE__*/makeMap('key,ref,' + 'onVnodeBeforeMount,onVnodeMounted,' + 'onVnodeBeforeUpdate,onVnodeUpdated,' + 'onVnodeBeforeUnmount,onVnodeUnmounted');

var cacheStringFunction = function cacheStringFunction(fn) {
  var cache = Object.create(null);
  return function (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};

var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
var capitalize = cacheStringFunction(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}); // compare whether a value has changed, accounting for NaN.

var hasChanged = function hasChanged(value, oldValue) {
  return value !== oldValue && (value === value || oldValue === oldValue);
}; // for converting {{ interpolation }} values to displayed strings.


var toDisplayString = function toDisplayString(val) {
  return val == null ? '' : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};

function defaultOnError(error) {
  throw error;
}

function createCompilerError(code, loc, messages) {
  var msg = (messages || errorMessages)[code];
  var error = new SyntaxError(String(msg));
  error.code = code;
  error.loc = loc;
  return error;
}

var errorMessages = (_errorMessages = {}, _defineProperty(_errorMessages, 0
/* ABRUPT_CLOSING_OF_EMPTY_COMMENT */
, 'Illegal comment.'), _defineProperty(_errorMessages, 1
/* ABSENCE_OF_DIGITS_IN_NUMERIC_CHARACTER_REFERENCE */
, 'Illegal numeric character reference: invalid character.'), _defineProperty(_errorMessages, 2
/* CDATA_IN_HTML_CONTENT */
, 'CDATA section is allowed only in XML context.'), _defineProperty(_errorMessages, 3
/* CHARACTER_REFERENCE_OUTSIDE_UNICODE_RANGE */
, 'Illegal numeric character reference: too big.'), _defineProperty(_errorMessages, 4
/* CONTROL_CHARACTER_REFERENCE */
, 'Illegal numeric character reference: control character.'), _defineProperty(_errorMessages, 5
/* DUPLICATE_ATTRIBUTE */
, 'Duplicate attribute.'), _defineProperty(_errorMessages, 6
/* END_TAG_WITH_ATTRIBUTES */
, 'End tag cannot have attributes.'), _defineProperty(_errorMessages, 7
/* END_TAG_WITH_TRAILING_SOLIDUS */
, "Illegal '/' in tags."), _defineProperty(_errorMessages, 8
/* EOF_BEFORE_TAG_NAME */
, 'Unexpected EOF in tag.'), _defineProperty(_errorMessages, 9
/* EOF_IN_CDATA */
, 'Unexpected EOF in CDATA section.'), _defineProperty(_errorMessages, 10
/* EOF_IN_COMMENT */
, 'Unexpected EOF in comment.'), _defineProperty(_errorMessages, 11
/* EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT */
, 'Unexpected EOF in script.'), _defineProperty(_errorMessages, 12
/* EOF_IN_TAG */
, 'Unexpected EOF in tag.'), _defineProperty(_errorMessages, 13
/* INCORRECTLY_CLOSED_COMMENT */
, 'Incorrectly closed comment.'), _defineProperty(_errorMessages, 14
/* INCORRECTLY_OPENED_COMMENT */
, 'Incorrectly opened comment.'), _defineProperty(_errorMessages, 15
/* INVALID_FIRST_CHARACTER_OF_TAG_NAME */
, "Illegal tag name. Use '&lt;' to print '<'."), _defineProperty(_errorMessages, 16
/* MISSING_ATTRIBUTE_VALUE */
, 'Attribute value was expected.'), _defineProperty(_errorMessages, 17
/* MISSING_END_TAG_NAME */
, 'End tag name was expected.'), _defineProperty(_errorMessages, 18
/* MISSING_SEMICOLON_AFTER_CHARACTER_REFERENCE */
, 'Semicolon was expected.'), _defineProperty(_errorMessages, 19
/* MISSING_WHITESPACE_BETWEEN_ATTRIBUTES */
, 'Whitespace was expected.'), _defineProperty(_errorMessages, 20
/* NESTED_COMMENT */
, "Unexpected '<!--' in comment."), _defineProperty(_errorMessages, 21
/* NONCHARACTER_CHARACTER_REFERENCE */
, 'Illegal numeric character reference: non character.'), _defineProperty(_errorMessages, 22
/* NULL_CHARACTER_REFERENCE */
, 'Illegal numeric character reference: null character.'), _defineProperty(_errorMessages, 23
/* SURROGATE_CHARACTER_REFERENCE */
, 'Illegal numeric character reference: non-pair surrogate.'), _defineProperty(_errorMessages, 24
/* UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME */
, 'Attribute name cannot contain U+0022 ("), U+0027 (\'), and U+003C (<).'), _defineProperty(_errorMessages, 25
/* UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE */
, 'Unquoted attribute value cannot contain U+0022 ("), U+0027 (\'), U+003C (<), U+003D (=), and U+0060 (`).'), _defineProperty(_errorMessages, 26
/* UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME */
, "Attribute name cannot start with '='."), _defineProperty(_errorMessages, 28
/* UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME */
, "'<?' is allowed only in XML context."), _defineProperty(_errorMessages, 29
/* UNEXPECTED_SOLIDUS_IN_TAG */
, "Illegal '/' in tags."), _defineProperty(_errorMessages, 30
/* X_INVALID_END_TAG */
, 'Invalid end tag.'), _defineProperty(_errorMessages, 31
/* X_MISSING_END_TAG */
, 'Element is missing end tag.'), _defineProperty(_errorMessages, 32
/* X_MISSING_INTERPOLATION_END */
, 'Interpolation end sign was not found.'), _defineProperty(_errorMessages, 33
/* X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END */
, 'End bracket for dynamic directive argument was not found. ' + 'Note that dynamic directive argument cannot contain spaces.'), _defineProperty(_errorMessages, 34
/* X_V_IF_NO_EXPRESSION */
, "v-if/v-else-if is missing expression."), _defineProperty(_errorMessages, 35
/* X_V_ELSE_NO_ADJACENT_IF */
, "v-else/v-else-if has no adjacent v-if."), _defineProperty(_errorMessages, 36
/* X_V_FOR_NO_EXPRESSION */
, "v-for is missing expression."), _defineProperty(_errorMessages, 37
/* X_V_FOR_MALFORMED_EXPRESSION */
, "v-for has invalid expression."), _defineProperty(_errorMessages, 38
/* X_V_BIND_NO_EXPRESSION */
, "v-bind is missing expression."), _defineProperty(_errorMessages, 39
/* X_V_ON_NO_EXPRESSION */
, "v-on is missing expression."), _defineProperty(_errorMessages, 40
/* X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET */
, "Unexpected custom directive on <slot> outlet."), _defineProperty(_errorMessages, 41
/* X_V_SLOT_NAMED_SLOT_ON_COMPONENT */
, "Named v-slot on component. " + "Named slots should use <template v-slot> syntax nested inside the component."), _defineProperty(_errorMessages, 42
/* X_V_SLOT_MIXED_SLOT_USAGE */
, "Mixed v-slot usage on both the component and nested <template>." + "The default slot should also use <template> syntax when there are other " + "named slots to avoid scope ambiguity."), _defineProperty(_errorMessages, 43
/* X_V_SLOT_DUPLICATE_SLOT_NAMES */
, "Duplicate slot names found. "), _defineProperty(_errorMessages, 44
/* X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN */
, "Extraneous children found when component already has explicitly named " + "default slot. These children will be ignored."), _defineProperty(_errorMessages, 45
/* X_V_SLOT_MISPLACED */
, "v-slot can only be used on components or <template> tags."), _defineProperty(_errorMessages, 46
/* X_V_MODEL_NO_EXPRESSION */
, "v-model is missing expression."), _defineProperty(_errorMessages, 47
/* X_V_MODEL_MALFORMED_EXPRESSION */
, "v-model value must be a valid JavaScript member expression."), _defineProperty(_errorMessages, 48
/* X_V_MODEL_ON_SCOPE_VARIABLE */
, "v-model cannot be used on v-for or v-slot scope variables because they are not writable."), _defineProperty(_errorMessages, 49
/* X_INVALID_EXPRESSION */
, "Invalid JavaScript expression."), _defineProperty(_errorMessages, 50
/* X_KEEP_ALIVE_INVALID_CHILDREN */
, "<KeepAlive> expects exactly one child component."), _defineProperty(_errorMessages, 51
/* X_PREFIX_ID_NOT_SUPPORTED */
, "\"prefixIdentifiers\" option is not supported in this build of compiler."), _defineProperty(_errorMessages, 52
/* X_MODULE_MODE_NOT_SUPPORTED */
, "ES module mode is not supported in this build of compiler."), _defineProperty(_errorMessages, 53
/* X_CACHE_HANDLER_NOT_SUPPORTED */
, "\"cacheHandlers\" option is only supported when the \"prefixIdentifiers\" option is enabled."), _defineProperty(_errorMessages, 54
/* X_SCOPE_ID_NOT_SUPPORTED */
, "\"scopeId\" option is only supported in module mode."), _errorMessages);
var FRAGMENT = Symbol("Fragment");
var PORTAL = Symbol("Portal");
var SUSPENSE = Symbol("Suspense");
var KEEP_ALIVE = Symbol("KeepAlive");
var BASE_TRANSITION = Symbol("BaseTransition");
var OPEN_BLOCK = Symbol("openBlock");
var CREATE_BLOCK = Symbol("createBlock");
var CREATE_VNODE = Symbol("createVNode");
var CREATE_COMMENT = Symbol("createCommentVNode");
var CREATE_TEXT = Symbol("createTextVNode");
var CREATE_STATIC = Symbol("createStaticVNode");
var RESOLVE_COMPONENT = Symbol("resolveComponent");
var RESOLVE_DYNAMIC_COMPONENT = Symbol("resolveDynamicComponent");
var RESOLVE_DIRECTIVE = Symbol("resolveDirective");
var WITH_DIRECTIVES = Symbol("withDirectives");
var RENDER_LIST = Symbol("renderList");
var RENDER_SLOT = Symbol("renderSlot");
var CREATE_SLOTS = Symbol("createSlots");
var TO_DISPLAY_STRING = Symbol("toDisplayString");
var MERGE_PROPS = Symbol("mergeProps");
var TO_HANDLERS = Symbol("toHandlers");
var CAMELIZE = Symbol("camelize");
var SET_BLOCK_TRACKING = Symbol("setBlockTracking");
var PUSH_SCOPE_ID = Symbol("pushScopeId");
var POP_SCOPE_ID = Symbol("popScopeId");
var WITH_SCOPE_ID = Symbol("withScopeId"); // Name mapping for runtime helpers that need to be imported from 'vue' in
// generated code. Make sure these are correctly exported in the runtime!
// Using `any` here because TS doesn't allow symbols as index type.

var helperNameMap = (_helperNameMap = {}, _defineProperty(_helperNameMap, FRAGMENT, "Fragment"), _defineProperty(_helperNameMap, PORTAL, "Portal"), _defineProperty(_helperNameMap, SUSPENSE, "Suspense"), _defineProperty(_helperNameMap, KEEP_ALIVE, "KeepAlive"), _defineProperty(_helperNameMap, BASE_TRANSITION, "BaseTransition"), _defineProperty(_helperNameMap, OPEN_BLOCK, "openBlock"), _defineProperty(_helperNameMap, CREATE_BLOCK, "createBlock"), _defineProperty(_helperNameMap, CREATE_VNODE, "createVNode"), _defineProperty(_helperNameMap, CREATE_COMMENT, "createCommentVNode"), _defineProperty(_helperNameMap, CREATE_TEXT, "createTextVNode"), _defineProperty(_helperNameMap, CREATE_STATIC, "createStaticVNode"), _defineProperty(_helperNameMap, RESOLVE_COMPONENT, "resolveComponent"), _defineProperty(_helperNameMap, RESOLVE_DYNAMIC_COMPONENT, "resolveDynamicComponent"), _defineProperty(_helperNameMap, RESOLVE_DIRECTIVE, "resolveDirective"), _defineProperty(_helperNameMap, WITH_DIRECTIVES, "withDirectives"), _defineProperty(_helperNameMap, RENDER_LIST, "renderList"), _defineProperty(_helperNameMap, RENDER_SLOT, "renderSlot"), _defineProperty(_helperNameMap, CREATE_SLOTS, "createSlots"), _defineProperty(_helperNameMap, TO_DISPLAY_STRING, "toDisplayString"), _defineProperty(_helperNameMap, MERGE_PROPS, "mergeProps"), _defineProperty(_helperNameMap, TO_HANDLERS, "toHandlers"), _defineProperty(_helperNameMap, CAMELIZE, "camelize"), _defineProperty(_helperNameMap, SET_BLOCK_TRACKING, "setBlockTracking"), _defineProperty(_helperNameMap, PUSH_SCOPE_ID, "pushScopeId"), _defineProperty(_helperNameMap, POP_SCOPE_ID, "popScopeId"), _defineProperty(_helperNameMap, WITH_SCOPE_ID, "withScopeId"), _helperNameMap);

function registerRuntimeHelpers(helpers) {
  Object.getOwnPropertySymbols(helpers).forEach(function (s) {
    helperNameMap[s] = helpers[s];
  });
} // AST Utilities ---------------------------------------------------------------
// Some expressions, e.g. sequence and conditional expressions, are never
// associated with template nodes, so their source locations are just a stub.
// Container types like CompoundExpression also don't need a real location.


var locStub = {
  source: '',
  start: {
    line: 1,
    column: 1,
    offset: 0
  },
  end: {
    line: 1,
    column: 1,
    offset: 0
  }
};

function createRoot(children) {
  var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : locStub;
  return {
    type: 0
    /* ROOT */
    ,
    children: children,
    helpers: [],
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: 0,
    temps: 0,
    codegenNode: undefined,
    loc: loc
  };
}

function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives) {
  var isBlock = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var isForBlock = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var loc = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : locStub;

  if (context) {
    if (isBlock) {
      context.helper(OPEN_BLOCK);
      context.helper(CREATE_BLOCK);
    } else {
      context.helper(CREATE_VNODE);
    }

    if (directives) {
      context.helper(WITH_DIRECTIVES);
    }
  }

  return {
    type: 13
    /* VNODE_CALL */
    ,
    tag: tag,
    props: props,
    children: children,
    patchFlag: patchFlag,
    dynamicProps: dynamicProps,
    directives: directives,
    isBlock: isBlock,
    isForBlock: isForBlock,
    loc: loc
  };
}

function createArrayExpression(elements) {
  var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : locStub;
  return {
    type: 17
    /* JS_ARRAY_EXPRESSION */
    ,
    loc: loc,
    elements: elements
  };
}

function createObjectExpression(properties) {
  var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : locStub;
  return {
    type: 15
    /* JS_OBJECT_EXPRESSION */
    ,
    loc: loc,
    properties: properties
  };
}

function createObjectProperty(key, value) {
  return {
    type: 16
    /* JS_PROPERTY */
    ,
    loc: locStub,
    key: isString(key) ? createSimpleExpression(key, true) : key,
    value: value
  };
}

function createSimpleExpression(content, isStatic) {
  var loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : locStub;
  var isConstant = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return {
    type: 4
    /* SIMPLE_EXPRESSION */
    ,
    loc: loc,
    isConstant: isConstant,
    content: content,
    isStatic: isStatic
  };
}

function createCompoundExpression(children) {
  var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : locStub;
  return {
    type: 8
    /* COMPOUND_EXPRESSION */
    ,
    loc: loc,
    children: children
  };
}

function createCallExpression(callee) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : locStub;
  return {
    type: 14
    /* JS_CALL_EXPRESSION */
    ,
    loc: loc,
    callee: callee,
    arguments: args
  };
}

function createFunctionExpression(params) {
  var returns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var newline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isSlot = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var loc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : locStub;
  return {
    type: 18
    /* JS_FUNCTION_EXPRESSION */
    ,
    params: params,
    returns: returns,
    newline: newline,
    isSlot: isSlot,
    loc: loc
  };
}

function createConditionalExpression(test, consequent, alternate) {
  var newline = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return {
    type: 19
    /* JS_CONDITIONAL_EXPRESSION */
    ,
    test: test,
    consequent: consequent,
    alternate: alternate,
    newline: newline,
    loc: locStub
  };
}

function createCacheExpression(index, value) {
  var isVNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return {
    type: 20
    /* JS_CACHE_EXPRESSION */
    ,
    index: index,
    value: value,
    isVNode: isVNode,
    loc: locStub
  };
}

var isBuiltInType = function isBuiltInType(tag, expected) {
  return tag === expected || tag === hyphenate(expected);
};

function isCoreComponent(tag) {
  if (isBuiltInType(tag, 'Portal')) {
    return PORTAL;
  } else if (isBuiltInType(tag, 'Suspense')) {
    return SUSPENSE;
  } else if (isBuiltInType(tag, 'KeepAlive')) {
    return KEEP_ALIVE;
  } else if (isBuiltInType(tag, 'BaseTransition')) {
    return BASE_TRANSITION;
  }
}

var nonIdentifierRE = /^\d|[^\$\w]/;

var isSimpleIdentifier = function isSimpleIdentifier(name) {
  return !nonIdentifierRE.test(name);
};

var memberExpRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])*$/;

var isMemberExpression = function isMemberExpression(path) {
  return memberExpRE.test(path);
};

function getInnerRange(loc, offset, length) {
  var source = loc.source.substr(offset, length);
  var newLoc = {
    source: source,
    start: advancePositionWithClone(loc.start, loc.source, offset),
    end: loc.end
  };

  if (length != null) {
    newLoc.end = advancePositionWithClone(loc.start, loc.source, offset + length);
  }

  return newLoc;
}

function advancePositionWithClone(pos, source) {
  var numberOfCharacters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : source.length;
  return advancePositionWithMutation({ ...pos
  }, source, numberOfCharacters);
} // advance by mutation without cloning (for performance reasons), since this
// gets called a lot in the parser


function advancePositionWithMutation(pos, source) {
  var numberOfCharacters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : source.length;
  var linesCount = 0;
  var lastNewLinePos = -1;

  for (var i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10
    /* newline char code */
    ) {
        linesCount++;
        lastNewLinePos = i;
      }
  }

  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
  return pos;
}

function assert(condition, msg) {
  /* istanbul ignore if */
  if (!condition) {
    throw new Error(msg || "unexpected compiler condition");
  }
}

function findDir(node, name) {
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  for (var i = 0; i < node.props.length; i++) {
    var _p = node.props[i];

    if (_p.type === 7
    /* DIRECTIVE */
    && (allowEmpty || _p.exp) && (isString(name) ? _p.name === name : name.test(_p.name))) {
      return _p;
    }
  }
}

function findProp(node, name) {
  var dynamicOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  for (var i = 0; i < node.props.length; i++) {
    var _p2 = node.props[i];

    if (_p2.type === 6
    /* ATTRIBUTE */
    ) {
        if (dynamicOnly) continue;

        if (_p2.name === name && _p2.value) {
          return _p2;
        }
      } else if (_p2.name === 'bind' && _p2.exp && isBindKey(_p2.arg, name)) {
      return _p2;
    }
  }
}

function isBindKey(arg, name) {
  return !!(arg && arg.type === 4
  /* SIMPLE_EXPRESSION */
  && arg.isStatic && arg.content === name);
}

function hasDynamicKeyVBind(node) {
  return node.props.some(function (p) {
    return p.type === 7
    /* DIRECTIVE */
    && p.name === 'bind' && (!p.arg || // v-bind="obj"
    p.arg.type !== 4
    /* SIMPLE_EXPRESSION */
    || // v-bind:[_ctx.foo]
    !p.arg.isStatic);
  } // v-bind:[foo]
  );
}

function isText(node) {
  return node.type === 5
  /* INTERPOLATION */
  || node.type === 2
  /* TEXT */
  ;
}

function isVSlot(p) {
  return p.type === 7
  /* DIRECTIVE */
  && p.name === 'slot';
}

function isTemplateNode(node) {
  return node.type === 1
  /* ELEMENT */
  && node.tagType === 3
  /* TEMPLATE */
  ;
}

function isSlotOutlet(node) {
  return node.type === 1
  /* ELEMENT */
  && node.tagType === 2
  /* SLOT */
  ;
}

function injectProp(node, prop, context) {
  var propsWithInjection;
  var props = node.type === 13
  /* VNODE_CALL */
  ? node.props : node.arguments[2];

  if (props == null || isString(props)) {
    propsWithInjection = createObjectExpression([prop]);
  } else if (props.type === 14
  /* JS_CALL_EXPRESSION */
  ) {
      // merged props... add ours
      // only inject key to object literal if it's the first argument so that
      // if doesn't override user provided keys
      var first = props.arguments[0];

      if (!isString(first) && first.type === 15
      /* JS_OBJECT_EXPRESSION */
      ) {
          first.properties.unshift(prop);
        } else {
        props.arguments.unshift(createObjectExpression([prop]));
      }

      propsWithInjection = props;
    } else if (props.type === 15
  /* JS_OBJECT_EXPRESSION */
  ) {
      var alreadyExists = false; // check existing key to avoid overriding user provided keys

      if (prop.key.type === 4
      /* SIMPLE_EXPRESSION */
      ) {
          var propKeyName = prop.key.content;
          alreadyExists = props.properties.some(function (p) {
            return p.key.type === 4
            /* SIMPLE_EXPRESSION */
            && p.key.content === propKeyName;
          });
        }

      if (!alreadyExists) {
        props.properties.unshift(prop);
      }

      propsWithInjection = props;
    } else {
    // single v-bind with expression, return a merged replacement
    propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [createObjectExpression([prop]), props]);
  }

  if (node.type === 13
  /* VNODE_CALL */
  ) {
      node.props = propsWithInjection;
    } else {
    node.arguments[2] = propsWithInjection;
  }
}

function toValidAssetId(name, type) {
  return "_".concat(type, "_").concat(name.replace(/[^\w]/g, '_'));
}

var defaultParserOptions = {
  delimiters: ["{{", "}}"],
  getNamespace: function getNamespace() {
    return 0;
  }
  /* HTML */
  ,
  getTextMode: function getTextMode() {
    return 0;
  }
  /* DATA */
  ,
  isVoidTag: NO,
  isPreTag: NO,
  isCustomElement: NO,
  namedCharacterReferences: {
    'gt;': '>',
    'lt;': '<',
    'amp;': '&',
    'apos;': "'",
    'quot;': '"'
  },
  maxCRNameLength: 5,
  onError: defaultOnError
};

function baseParse(content) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var context = createParserContext(content, options);
  var start = getCursor(context);
  return createRoot(parseChildren(context, 0
  /* DATA */
  , []), getSelection(context, start));
}

function createParserContext(content, options) {
  return {
    options: { ...defaultParserOptions,
      ...options
    },
    column: 1,
    line: 1,
    offset: 0,
    originalSource: content,
    source: content,
    inPre: false
  };
}

function parseChildren(context, mode, ancestors) {
  var parent = last(ancestors);
  var ns = parent ? parent.ns : 0
  /* HTML */
  ;
  var nodes = [];

  while (!isEnd(context, mode, ancestors)) {
    var s = context.source;
    var node = undefined;

    if (mode === 0
    /* DATA */
    ) {
        if (!context.inPre && startsWith(s, context.options.delimiters[0])) {
          // '{{'
          node = parseInterpolation(context, mode);
        } else if (s[0] === '<') {
          // https://html.spec.whatwg.org/multipage/parsing.html#tag-open-state
          if (s.length === 1) {
            emitError(context, 8
            /* EOF_BEFORE_TAG_NAME */
            , 1);
          } else if (s[1] === '!') {
            // https://html.spec.whatwg.org/multipage/parsing.html#markup-declaration-open-state
            if (startsWith(s, '<!--')) {
              node = parseComment(context);
            } else if (startsWith(s, '<!DOCTYPE')) {
              // Ignore DOCTYPE by a limitation.
              node = parseBogusComment(context);
            } else if (startsWith(s, '<![CDATA[')) {
              if (ns !== 0
              /* HTML */
              ) {
                  node = parseCDATA(context, ancestors);
                } else {
                emitError(context, 2
                /* CDATA_IN_HTML_CONTENT */
                );
                node = parseBogusComment(context);
              }
            } else {
              emitError(context, 14
              /* INCORRECTLY_OPENED_COMMENT */
              );
              node = parseBogusComment(context);
            }
          } else if (s[1] === '/') {
            // https://html.spec.whatwg.org/multipage/parsing.html#end-tag-open-state
            if (s.length === 2) {
              emitError(context, 8
              /* EOF_BEFORE_TAG_NAME */
              , 2);
            } else if (s[2] === '>') {
              emitError(context, 17
              /* MISSING_END_TAG_NAME */
              , 2);
              advanceBy(context, 3);
              continue;
            } else if (/[a-z]/i.test(s[2])) {
              emitError(context, 30
              /* X_INVALID_END_TAG */
              );
              parseTag(context, 1
              /* End */
              , parent);
              continue;
            } else {
              emitError(context, 15
              /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */
              , 2);
              node = parseBogusComment(context);
            }
          } else if (/[a-z]/i.test(s[1])) {
            node = parseElement(context, ancestors);
          } else if (s[1] === '?') {
            emitError(context, 28
            /* UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME */
            , 1);
            node = parseBogusComment(context);
          } else {
            emitError(context, 15
            /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */
            , 1);
          }
        }
      }

    if (!node) {
      node = parseText(context, mode);
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        pushNode(nodes, node[i]);
      }
    } else {
      pushNode(nodes, node);
    }
  } // Whitespace management for more efficient output
  // (same as v2 whitespace: 'condense')


  var removedWhitespace = false;

  if (mode !== 2
  /* RAWTEXT */
  && (!parent || !context.options.isPreTag(parent.tag))) {
    for (var _i = 0; _i < nodes.length; _i++) {
      var _node = nodes[_i];

      if (_node.type === 2
      /* TEXT */
      ) {
          if (!_node.content.trim()) {
            var prev = nodes[_i - 1];
            var next = nodes[_i + 1]; // If:
            // - the whitespace is the first or last node, or:
            // - the whitespace is adjacent to a comment, or:
            // - the whitespace is between two elements AND contains newline
            // Then the whitespace is ignored.

            if (!prev || !next || prev.type === 3
            /* COMMENT */
            || next.type === 3
            /* COMMENT */
            || prev.type === 1
            /* ELEMENT */
            && next.type === 1
            /* ELEMENT */
            && /[\r\n]/.test(_node.content)) {
              removedWhitespace = true;
              nodes[_i] = null;
            } else {
              // Otherwise, condensed consecutive whitespace inside the text down to
              // a single space
              _node.content = ' ';
            }
          } else {
            _node.content = _node.content.replace(/\s+/g, ' ');
          }
        }
    }
  }

  return removedWhitespace ? nodes.filter(Boolean) : nodes;
}

function pushNode(nodes, node) {
  if (node.type === 2
  /* TEXT */
  ) {
      var prev = last(nodes); // Merge if both this and the previous node are text and those are
      // consecutive. This happens for cases like "a < b".

      if (prev && prev.type === 2
      /* TEXT */
      && prev.loc.end.offset === node.loc.start.offset) {
        prev.content += node.content;
        prev.loc.end = node.loc.end;
        prev.loc.source += node.loc.source;
        return;
      }
    }

  nodes.push(node);
}

function parseCDATA(context, ancestors) {
  advanceBy(context, 9);
  var nodes = parseChildren(context, 3
  /* CDATA */
  , ancestors);

  if (context.source.length === 0) {
    emitError(context, 9
    /* EOF_IN_CDATA */
    );
  } else {
    advanceBy(context, 3);
  }

  return nodes;
}

function parseComment(context) {
  var start = getCursor(context);
  var content; // Regular comment.

  var match = /--(\!)?>/.exec(context.source);

  if (!match) {
    content = context.source.slice(4);
    advanceBy(context, context.source.length);
    emitError(context, 10
    /* EOF_IN_COMMENT */
    );
  } else {
    if (match.index <= 3) {
      emitError(context, 0
      /* ABRUPT_CLOSING_OF_EMPTY_COMMENT */
      );
    }

    if (match[1]) {
      emitError(context, 13
      /* INCORRECTLY_CLOSED_COMMENT */
      );
    }

    content = context.source.slice(4, match.index); // Advancing with reporting nested comments.

    var s = context.source.slice(0, match.index);
    var prevIndex = 1,
        nestedIndex = 0;

    while ((nestedIndex = s.indexOf('<!--', prevIndex)) !== -1) {
      advanceBy(context, nestedIndex - prevIndex + 1);

      if (nestedIndex + 4 < s.length) {
        emitError(context, 20
        /* NESTED_COMMENT */
        );
      }

      prevIndex = nestedIndex + 1;
    }

    advanceBy(context, match.index + match[0].length - prevIndex + 1);
  }

  return {
    type: 3
    /* COMMENT */
    ,
    content: content,
    loc: getSelection(context, start)
  };
}

function parseBogusComment(context) {
  var start = getCursor(context);
  var contentStart = context.source[1] === '?' ? 1 : 2;
  var content;
  var closeIndex = context.source.indexOf('>');

  if (closeIndex === -1) {
    content = context.source.slice(contentStart);
    advanceBy(context, context.source.length);
  } else {
    content = context.source.slice(contentStart, closeIndex);
    advanceBy(context, closeIndex + 1);
  }

  return {
    type: 3
    /* COMMENT */
    ,
    content: content,
    loc: getSelection(context, start)
  };
}

function parseElement(context, ancestors) {
  // Start tag.
  var wasInPre = context.inPre;
  var parent = last(ancestors);
  var element = parseTag(context, 0
  /* Start */
  , parent);
  var isPreBoundary = context.inPre && !wasInPre;

  if (element.isSelfClosing || context.options.isVoidTag(element.tag)) {
    return element;
  } // Children.


  ancestors.push(element);
  var mode = context.options.getTextMode(element.tag, element.ns, parent);
  var children = parseChildren(context, mode, ancestors);
  ancestors.pop();
  element.children = children; // End tag.

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, 1
    /* End */
    , parent);
  } else {
    emitError(context, 31
    /* X_MISSING_END_TAG */
    , 0, element.loc.start);

    if (context.source.length === 0 && element.tag.toLowerCase() === 'script') {
      var first = children[0];

      if (first && startsWith(first.loc.source, '<!--')) {
        emitError(context, 11
        /* EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT */
        );
      }
    }
  }

  element.loc = getSelection(context, element.loc.start);

  if (isPreBoundary) {
    context.inPre = false;
  }

  return element;
}

var isSpecialTemplateDirective = /*#__PURE__*/makeMap("if,else,else-if,for,slot");
/**
 * Parse a tag (E.g. `<div id=a>`) with that type (start tag or end tag).
 */

function parseTag(context, type, parent) {
  // Tag open.
  var start = getCursor(context);
  var match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source);
  var tag = match[1];
  var ns = context.options.getNamespace(tag, parent);
  advanceBy(context, match[0].length);
  advanceSpaces(context); // save current state in case we need to re-parse attributes with v-pre

  var cursor = getCursor(context);
  var currentSource = context.source; // Attributes.

  var props = parseAttributes(context, type); // check v-pre

  if (!context.inPre && props.some(function (p) {
    return p.type === 7
    /* DIRECTIVE */
    && p.name === 'pre';
  })) {
    context.inPre = true; // reset context

    extend(context, cursor);
    context.source = currentSource; // re-parse attrs and filter out v-pre itself

    props = parseAttributes(context, type).filter(function (p) {
      return p.name !== 'v-pre';
    });
  } // Tag close.


  var isSelfClosing = false;

  if (context.source.length === 0) {
    emitError(context, 12
    /* EOF_IN_TAG */
    );
  } else {
    isSelfClosing = startsWith(context.source, '/>');

    if (type === 1
    /* End */
    && isSelfClosing) {
      emitError(context, 7
      /* END_TAG_WITH_TRAILING_SOLIDUS */
      );
    }

    advanceBy(context, isSelfClosing ? 2 : 1);
  }

  var tagType = 0
  /* ELEMENT */
  ;
  var options = context.options;

  if (!context.inPre && !options.isCustomElement(tag)) {
    if (options.isNativeTag) {
      if (!options.isNativeTag(tag)) tagType = 1
      /* COMPONENT */
      ;
    } else if (isCoreComponent(tag) || options.isBuiltInComponent && options.isBuiltInComponent(tag) || /^[A-Z]/.test(tag) || tag === 'component') {
      tagType = 1
      /* COMPONENT */
      ;
    }

    if (tag === 'slot') {
      tagType = 2
      /* SLOT */
      ;
    } else if (tag === 'template' && props.some(function (p) {
      return p.type === 7
      /* DIRECTIVE */
      && isSpecialTemplateDirective(p.name);
    })) {
      tagType = 3
      /* TEMPLATE */
      ;
    }
  }

  return {
    type: 1
    /* ELEMENT */
    ,
    ns: ns,
    tag: tag,
    tagType: tagType,
    props: props,
    isSelfClosing: isSelfClosing,
    children: [],
    loc: getSelection(context, start),
    codegenNode: undefined // to be created during transform phase

  };
}

function parseAttributes(context, type) {
  var props = [];
  var attributeNames = new Set();

  while (context.source.length > 0 && !startsWith(context.source, '>') && !startsWith(context.source, '/>')) {
    if (startsWith(context.source, '/')) {
      emitError(context, 29
      /* UNEXPECTED_SOLIDUS_IN_TAG */
      );
      advanceBy(context, 1);
      advanceSpaces(context);
      continue;
    }

    if (type === 1
    /* End */
    ) {
        emitError(context, 6
        /* END_TAG_WITH_ATTRIBUTES */
        );
      }

    var attr = parseAttribute(context, attributeNames);

    if (type === 0
    /* Start */
    ) {
        props.push(attr);
      }

    if (/^[^\t\r\n\f />]/.test(context.source)) {
      emitError(context, 19
      /* MISSING_WHITESPACE_BETWEEN_ATTRIBUTES */
      );
    }

    advanceSpaces(context);
  }

  return props;
}

function parseAttribute(context, nameSet) {
  // Name.
  var start = getCursor(context);
  var match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source);
  var name = match[0];

  if (nameSet.has(name)) {
    emitError(context, 5
    /* DUPLICATE_ATTRIBUTE */
    );
  }

  nameSet.add(name);

  if (name[0] === '=') {
    emitError(context, 26
    /* UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME */
    );
  }

  {
    var pattern = /["'<]/g;
    var m;

    while ((m = pattern.exec(name)) !== null) {
      emitError(context, 24
      /* UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME */
      , m.index);
    }
  }
  advanceBy(context, name.length); // Value

  var value = undefined;

  if (/^[\t\r\n\f ]*=/.test(context.source)) {
    advanceSpaces(context);
    advanceBy(context, 1);
    advanceSpaces(context);
    value = parseAttributeValue(context);

    if (!value) {
      emitError(context, 16
      /* MISSING_ATTRIBUTE_VALUE */
      );
    }
  }

  var loc = getSelection(context, start);

  if (!context.inPre && /^(v-|:|@|#)/.test(name)) {
    var _match = /(?:^v-([a-z0-9-]+))?(?:(?::|^@|^#)([^\.]+))?(.+)?$/i.exec(name);

    var arg;

    if (_match[2]) {
      var startOffset = name.indexOf(_match[2]);

      var _loc = getSelection(context, getNewPosition(context, start, startOffset), getNewPosition(context, start, startOffset + _match[2].length));

      var content = _match[2];
      var isStatic = true;

      if (content.startsWith('[')) {
        isStatic = false;

        if (!content.endsWith(']')) {
          emitError(context, 33
          /* X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END */
          );
        }

        content = content.substr(1, content.length - 2);
      }

      arg = {
        type: 4
        /* SIMPLE_EXPRESSION */
        ,
        content: content,
        isStatic: isStatic,
        isConstant: isStatic,
        loc: _loc
      };
    }

    if (value && value.isQuoted) {
      var valueLoc = value.loc;
      valueLoc.start.offset++;
      valueLoc.start.column++;
      valueLoc.end = advancePositionWithClone(valueLoc.start, value.content);
      valueLoc.source = valueLoc.source.slice(1, -1);
    }

    return {
      type: 7
      /* DIRECTIVE */
      ,
      name: _match[1] || (startsWith(name, ':') ? 'bind' : startsWith(name, '@') ? 'on' : 'slot'),
      exp: value && {
        type: 4
        /* SIMPLE_EXPRESSION */
        ,
        content: value.content,
        isStatic: false,
        // Treat as non-constant by default. This can be potentially set to
        // true by `transformExpression` to make it eligible for hoisting.
        isConstant: false,
        loc: value.loc
      },
      arg: arg,
      modifiers: _match[3] ? _match[3].substr(1).split('.') : [],
      loc: loc
    };
  }

  return {
    type: 6
    /* ATTRIBUTE */
    ,
    name: name,
    value: value && {
      type: 2
      /* TEXT */
      ,
      content: value.content,
      loc: value.loc
    },
    loc: loc
  };
}

function parseAttributeValue(context) {
  var start = getCursor(context);
  var content;
  var quote = context.source[0];
  var isQuoted = quote === "\"" || quote === "'";

  if (isQuoted) {
    // Quoted value.
    advanceBy(context, 1);
    var endIndex = context.source.indexOf(quote);

    if (endIndex === -1) {
      content = parseTextData(context, context.source.length, 4
      /* ATTRIBUTE_VALUE */
      );
    } else {
      content = parseTextData(context, endIndex, 4
      /* ATTRIBUTE_VALUE */
      );
      advanceBy(context, 1);
    }
  } else {
    // Unquoted
    var match = /^[^\t\r\n\f >]+/.exec(context.source);

    if (!match) {
      return undefined;
    }

    var unexpectedChars = /["'<=`]/g;
    var m;

    while ((m = unexpectedChars.exec(match[0])) !== null) {
      emitError(context, 25
      /* UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE */
      , m.index);
    }

    content = parseTextData(context, match[0].length, 4
    /* ATTRIBUTE_VALUE */
    );
  }

  return {
    content: content,
    isQuoted: isQuoted,
    loc: getSelection(context, start)
  };
}

function parseInterpolation(context, mode) {
  var _context$options$deli = _slicedToArray(context.options.delimiters, 2),
      open = _context$options$deli[0],
      close = _context$options$deli[1];

  var closeIndex = context.source.indexOf(close, open.length);

  if (closeIndex === -1) {
    emitError(context, 32
    /* X_MISSING_INTERPOLATION_END */
    );
    return undefined;
  }

  var start = getCursor(context);
  advanceBy(context, open.length);
  var innerStart = getCursor(context);
  var innerEnd = getCursor(context);
  var rawContentLength = closeIndex - open.length;
  var rawContent = context.source.slice(0, rawContentLength);
  var preTrimContent = parseTextData(context, rawContentLength, mode);
  var content = preTrimContent.trim();
  var startOffset = preTrimContent.indexOf(content);

  if (startOffset > 0) {
    advancePositionWithMutation(innerStart, rawContent, startOffset);
  }

  var endOffset = rawContentLength - (preTrimContent.length - content.length - startOffset);
  advancePositionWithMutation(innerEnd, rawContent, endOffset);
  advanceBy(context, close.length);
  return {
    type: 5
    /* INTERPOLATION */
    ,
    content: {
      type: 4
      /* SIMPLE_EXPRESSION */
      ,
      isStatic: false,
      // Set `isConstant` to false by default and will decide in transformExpression
      isConstant: false,
      content: content,
      loc: getSelection(context, innerStart, innerEnd)
    },
    loc: getSelection(context, start)
  };
}

function parseText(context, mode) {
  var endTokens = ['<', context.options.delimiters[0]];

  if (mode === 3
  /* CDATA */
  ) {
      endTokens.push(']]>');
    }

  var endIndex = context.source.length;

  for (var i = 0; i < endTokens.length; i++) {
    var index = context.source.indexOf(endTokens[i], 1);

    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }

  var start = getCursor(context);
  var content = parseTextData(context, endIndex, mode);
  return {
    type: 2
    /* TEXT */
    ,
    content: content,
    loc: getSelection(context, start)
  };
}
/**
 * Get text data with a given length from the current location.
 * This translates HTML entities in the text data.
 */


function parseTextData(context, length, mode) {
  var rawText = context.source.slice(0, length);

  if (mode === 2
  /* RAWTEXT */
  || mode === 3
  /* CDATA */
  || rawText.indexOf('&') === -1) {
    advanceBy(context, length);
    return rawText;
  } // DATA or RCDATA containing "&"". Entity decoding required.


  var end = context.offset + length;
  var decodedText = '';

  function advance(length) {
    advanceBy(context, length);
    rawText = rawText.slice(length);
  }

  while (context.offset < end) {
    var head = /&(?:#x?)?/i.exec(rawText);

    if (!head || context.offset + head.index >= end) {
      var remaining = end - context.offset;
      decodedText += rawText.slice(0, remaining);
      advance(remaining);
      break;
    } // Advance to the "&".


    decodedText += rawText.slice(0, head.index);
    advance(head.index);

    if (head[0] === '&') {
      // Named character reference.
      var name = '';
      var value = undefined;

      if (/[0-9a-z]/i.test(rawText[1])) {
        for (var _length2 = context.options.maxCRNameLength; !value && _length2 > 0; --_length2) {
          name = rawText.substr(1, _length2);
          value = context.options.namedCharacterReferences[name];
        }

        if (value) {
          var semi = name.endsWith(';');

          if (mode === 4
          /* ATTRIBUTE_VALUE */
          && !semi && /[=a-z0-9]/i.test(rawText[name.length + 1] || '')) {
            decodedText += '&' + name;
            advance(1 + name.length);
          } else {
            decodedText += value;
            advance(1 + name.length);

            if (!semi) {
              emitError(context, 18
              /* MISSING_SEMICOLON_AFTER_CHARACTER_REFERENCE */
              );
            }
          }
        } else {
          decodedText += '&' + name;
          advance(1 + name.length);
        }
      } else {
        decodedText += '&';
        advance(1);
      }
    } else {
      // Numeric character reference.
      var hex = head[0] === '&#x';
      var pattern = hex ? /^&#x([0-9a-f]+);?/i : /^&#([0-9]+);?/;
      var body = pattern.exec(rawText);

      if (!body) {
        decodedText += head[0];
        emitError(context, 1
        /* ABSENCE_OF_DIGITS_IN_NUMERIC_CHARACTER_REFERENCE */
        );
        advance(head[0].length);
      } else {
        // https://html.spec.whatwg.org/multipage/parsing.html#numeric-character-reference-end-state
        var cp = Number.parseInt(body[1], hex ? 16 : 10);

        if (cp === 0) {
          emitError(context, 22
          /* NULL_CHARACTER_REFERENCE */
          );
          cp = 0xfffd;
        } else if (cp > 0x10ffff) {
          emitError(context, 3
          /* CHARACTER_REFERENCE_OUTSIDE_UNICODE_RANGE */
          );
          cp = 0xfffd;
        } else if (cp >= 0xd800 && cp <= 0xdfff) {
          emitError(context, 23
          /* SURROGATE_CHARACTER_REFERENCE */
          );
          cp = 0xfffd;
        } else if (cp >= 0xfdd0 && cp <= 0xfdef || (cp & 0xfffe) === 0xfffe) {
          emitError(context, 21
          /* NONCHARACTER_CHARACTER_REFERENCE */
          );
        } else if (cp >= 0x01 && cp <= 0x08 || cp === 0x0b || cp >= 0x0d && cp <= 0x1f || cp >= 0x7f && cp <= 0x9f) {
          emitError(context, 4
          /* CONTROL_CHARACTER_REFERENCE */
          );
          cp = CCR_REPLACEMENTS[cp] || cp;
        }

        decodedText += String.fromCodePoint(cp);
        advance(body[0].length);

        if (!body[0].endsWith(';')) {
          emitError(context, 18
          /* MISSING_SEMICOLON_AFTER_CHARACTER_REFERENCE */
          );
        }
      }
    }
  }

  return decodedText;
}

function getCursor(context) {
  var column = context.column,
      line = context.line,
      offset = context.offset;
  return {
    column: column,
    line: line,
    offset: offset
  };
}

function getSelection(context, start, end) {
  end = end || getCursor(context);
  return {
    start: start,
    end: end,
    source: context.originalSource.slice(start.offset, end.offset)
  };
}

function last(xs) {
  return xs[xs.length - 1];
}

function startsWith(source, searchString) {
  return source.startsWith(searchString);
}

function advanceBy(context, numberOfCharacters) {
  var source = context.source;
  advancePositionWithMutation(context, source, numberOfCharacters);
  context.source = source.slice(numberOfCharacters);
}

function advanceSpaces(context) {
  var match = /^[\t\r\n\f ]+/.exec(context.source);

  if (match) {
    advanceBy(context, match[0].length);
  }
}

function getNewPosition(context, start, numberOfCharacters) {
  return advancePositionWithClone(start, context.originalSource.slice(start.offset, numberOfCharacters), numberOfCharacters);
}

function emitError(context, code, offset) {
  var loc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getCursor(context);

  if (offset) {
    loc.offset += offset;
    loc.column += offset;
  }

  context.options.onError(createCompilerError(code, {
    start: loc,
    end: loc,
    source: ''
  }));
}

function isEnd(context, mode, ancestors) {
  var s = context.source;

  switch (mode) {
    case 0
    /* DATA */
    :
      if (startsWith(s, '</')) {
        //TODO: probably bad performance
        for (var i = ancestors.length - 1; i >= 0; --i) {
          if (startsWithEndTagOpen(s, ancestors[i].tag)) {
            return true;
          }
        }
      }

      break;

    case 1
    /* RCDATA */
    :
    case 2
    /* RAWTEXT */
    :
      {
        var parent = last(ancestors);

        if (parent && startsWithEndTagOpen(s, parent.tag)) {
          return true;
        }

        break;
      }

    case 3
    /* CDATA */
    :
      if (startsWith(s, ']]>')) {
        return true;
      }

      break;
  }

  return !s;
}

function startsWithEndTagOpen(source, tag) {
  return startsWith(source, '</') && source.substr(2, tag.length).toLowerCase() === tag.toLowerCase() && /[\t\n\f />]/.test(source[2 + tag.length] || '>');
} // https://html.spec.whatwg.org/multipage/parsing.html#numeric-character-reference-end-state


var CCR_REPLACEMENTS = {
  0x80: 0x20ac,
  0x82: 0x201a,
  0x83: 0x0192,
  0x84: 0x201e,
  0x85: 0x2026,
  0x86: 0x2020,
  0x87: 0x2021,
  0x88: 0x02c6,
  0x89: 0x2030,
  0x8a: 0x0160,
  0x8b: 0x2039,
  0x8c: 0x0152,
  0x8e: 0x017d,
  0x91: 0x2018,
  0x92: 0x2019,
  0x93: 0x201c,
  0x94: 0x201d,
  0x95: 0x2022,
  0x96: 0x2013,
  0x97: 0x2014,
  0x98: 0x02dc,
  0x99: 0x2122,
  0x9a: 0x0161,
  0x9b: 0x203a,
  0x9c: 0x0153,
  0x9e: 0x017e,
  0x9f: 0x0178
};

function hoistStatic(root, context) {
  walk(root.children, context, new Map(), // Root node is unfortuantely non-hoistable due to potential parent
  // fallthrough attributes.
  isSingleElementRoot(root, root.children[0]));
}

function isSingleElementRoot(root, child) {
  var children = root.children;
  return children.length === 1 && child.type === 1
  /* ELEMENT */
  && !isSlotOutlet(child);
}

function walk(children, context, resultCache) {
  var doNotHoistNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  for (var i = 0; i < children.length; i++) {
    var child = children[i]; // only plain elements are eligible for hoisting.

    if (child.type === 1
    /* ELEMENT */
    && child.tagType === 0
    /* ELEMENT */
    ) {
        if (!doNotHoistNode && isStaticNode(child, resultCache)) {
          child.codegenNode.patchFlag = -1
          /* HOISTED */
          + " /* HOISTED */";
          var hoisted = context.transformHoist ? context.transformHoist(child, context) : child.codegenNode;
          child.codegenNode = context.hoist(hoisted);
          continue;
        } else {
          // node may contain dynamic children, but its props may be eligible for
          // hoisting.
          var codegenNode = child.codegenNode;

          if (codegenNode.type === 13
          /* VNODE_CALL */
          ) {
              var flag = getPatchFlag(codegenNode);

              if ((!flag || flag === 512
              /* NEED_PATCH */
              || flag === 1
              /* TEXT */
              ) && !hasDynamicKeyOrRef(child) && !hasCachedProps()) {
                var props = getNodeProps(child);

                if (props) {
                  codegenNode.props = context.hoist(props);
                }
              }
            }
        }
      }

    if (child.type === 1
    /* ELEMENT */
    ) {
        walk(child.children, context, resultCache);
      } else if (child.type === 11
    /* FOR */
    ) {
        // Do not hoist v-for single child because it has to be a block
        walk(child.children, context, resultCache, child.children.length === 1);
      } else if (child.type === 9
    /* IF */
    ) {
        for (var _i2 = 0; _i2 < child.branches.length; _i2++) {
          var branchChildren = child.branches[_i2].children; // Do not hoist v-if single child because it has to be a block

          walk(branchChildren, context, resultCache, branchChildren.length === 1);
        }
      } else if (child.type === 12
    /* TEXT_CALL */
    && isStaticNode(child.content, resultCache)) {
      child.codegenNode = context.hoist(child.codegenNode);
    }
  }
}

function isStaticNode(node) {
  var resultCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();

  switch (node.type) {
    case 1
    /* ELEMENT */
    :
      if (node.tagType !== 0
      /* ELEMENT */
      ) {
          return false;
        }

      var cached = resultCache.get(node);

      if (cached !== undefined) {
        return cached;
      }

      var codegenNode = node.codegenNode;

      if (codegenNode.type !== 13
      /* VNODE_CALL */
      ) {
          return false;
        }

      var flag = getPatchFlag(codegenNode);

      if (!flag && !hasDynamicKeyOrRef(node) && !hasCachedProps()) {
        // element self is static. check its children.
        for (var i = 0; i < node.children.length; i++) {
          if (!isStaticNode(node.children[i], resultCache)) {
            resultCache.set(node, false);
            return false;
          }
        } // only svg/foreignObject could be block here, however if they are static
        // then they don't need to be blocks since there will be no nested
        // updates.


        if (codegenNode.isBlock) {
          codegenNode.isBlock = false;
        }

        resultCache.set(node, true);
        return true;
      } else {
        resultCache.set(node, false);
        return false;
      }

    case 2
    /* TEXT */
    :
    case 3
    /* COMMENT */
    :
      return true;

    case 9
    /* IF */
    :
    case 11
    /* FOR */
    :
    case 10
    /* IF_BRANCH */
    :
      return false;

    case 5
    /* INTERPOLATION */
    :
    case 12
    /* TEXT_CALL */
    :
      return isStaticNode(node.content, resultCache);

    case 4
    /* SIMPLE_EXPRESSION */
    :
      return node.isConstant;

    case 8
    /* COMPOUND_EXPRESSION */
    :
      return node.children.every(function (child) {
        return isString(child) || isSymbol(child) || isStaticNode(child, resultCache);
      });

    default:
      return false;
  }
}

function hasDynamicKeyOrRef(node) {
  return !!(findProp(node, 'key', true) || findProp(node, 'ref', true));
}

function hasCachedProps(node) {
  {
    return false;
  }
}

function getNodeProps(node) {
  var codegenNode = node.codegenNode;

  if (codegenNode.type === 13
  /* VNODE_CALL */
  ) {
      return codegenNode.props;
    }
}

function getPatchFlag(node) {
  var flag = node.patchFlag;
  return flag ? parseInt(flag, 10) : undefined;
}

function createTransformContext(root, _ref) {
  var _ref$prefixIdentifier = _ref.prefixIdentifiers,
      prefixIdentifiers = _ref$prefixIdentifier === void 0 ? false : _ref$prefixIdentifier,
      _ref$hoistStatic = _ref.hoistStatic,
      hoistStatic = _ref$hoistStatic === void 0 ? false : _ref$hoistStatic,
      _ref$cacheHandlers = _ref.cacheHandlers,
      cacheHandlers = _ref$cacheHandlers === void 0 ? false : _ref$cacheHandlers,
      _ref$nodeTransforms = _ref.nodeTransforms,
      nodeTransforms = _ref$nodeTransforms === void 0 ? [] : _ref$nodeTransforms,
      _ref$directiveTransfo = _ref.directiveTransforms,
      directiveTransforms = _ref$directiveTransfo === void 0 ? {} : _ref$directiveTransfo,
      _ref$transformHoist = _ref.transformHoist,
      transformHoist = _ref$transformHoist === void 0 ? null : _ref$transformHoist,
      _ref$isBuiltInCompone = _ref.isBuiltInComponent,
      isBuiltInComponent = _ref$isBuiltInCompone === void 0 ? NOOP : _ref$isBuiltInCompone,
      _ref$scopeId = _ref.scopeId,
      scopeId = _ref$scopeId === void 0 ? null : _ref$scopeId,
      _ref$ssr = _ref.ssr,
      ssr = _ref$ssr === void 0 ? false : _ref$ssr,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? defaultOnError : _ref$onError;
  var context = {
    // options
    prefixIdentifiers: prefixIdentifiers,
    hoistStatic: hoistStatic,
    cacheHandlers: cacheHandlers,
    nodeTransforms: nodeTransforms,
    directiveTransforms: directiveTransforms,
    transformHoist: transformHoist,
    isBuiltInComponent: isBuiltInComponent,
    scopeId: scopeId,
    ssr: ssr,
    onError: onError,
    // state
    root: root,
    helpers: new Set(),
    components: new Set(),
    directives: new Set(),
    hoists: [],
    imports: new Set(),
    temps: 0,
    cached: 0,
    identifiers: {},
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    currentNode: root,
    childIndex: 0,
    // methods
    helper: function helper(name) {
      context.helpers.add(name);
      return name;
    },
    helperString: function helperString(name) {
      return "_".concat(helperNameMap[context.helper(name)]);
    },
    replaceNode: function replaceNode(node) {
      /* istanbul ignore if */
      {
        if (!context.currentNode) {
          throw new Error("Node being replaced is already removed.");
        }

        if (!context.parent) {
          throw new Error("Cannot replace root node.");
        }
      }
      context.parent.children[context.childIndex] = context.currentNode = node;
    },
    removeNode: function removeNode(node) {
      if (!context.parent) {
        throw new Error("Cannot remove root node.");
      }

      var list = context.parent.children;
      var removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
      /* istanbul ignore if */

      if (removalIndex < 0) {
        throw new Error("node being removed is not a child of current parent");
      }

      if (!node || node === context.currentNode) {
        // current node removed
        context.currentNode = null;
        context.onNodeRemoved();
      } else {
        // sibling node removed
        if (context.childIndex > removalIndex) {
          context.childIndex--;
          context.onNodeRemoved();
        }
      }

      context.parent.children.splice(removalIndex, 1);
    },
    onNodeRemoved: function onNodeRemoved() {},
    addIdentifiers: function addIdentifiers(exp) {},
    removeIdentifiers: function removeIdentifiers(exp) {},
    hoist: function hoist(exp) {
      context.hoists.push(exp);
      return createSimpleExpression("_hoisted_".concat(context.hoists.length), false, exp.loc, true);
    },
    cache: function cache(exp) {
      var isVNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return createCacheExpression(++context.cached, exp, isVNode);
    }
  };
  return context;
}

function transform(root, options) {
  var context = createTransformContext(root, options);
  traverseNode(root, context);

  if (options.hoistStatic) {
    hoistStatic(root, context);
  }

  if (!options.ssr) {
    createRootCodegen(root, context);
  } // finalize meta information


  root.helpers = _toConsumableArray(context.helpers);
  root.components = _toConsumableArray(context.components);
  root.directives = _toConsumableArray(context.directives);
  root.imports = _toConsumableArray(context.imports);
  root.hoists = context.hoists;
  root.temps = context.temps;
  root.cached = context.cached;
}

function createRootCodegen(root, context) {
  var helper = context.helper;
  var children = root.children;
  var child = children[0];

  if (children.length === 1) {
    // if the single child is an element, turn it into a block.
    if (isSingleElementRoot(root, child) && child.codegenNode) {
      // single element root is never hoisted so codegenNode will never be
      // SimpleExpressionNode
      var codegenNode = child.codegenNode;

      if (codegenNode.type === 13
      /* VNODE_CALL */
      ) {
          codegenNode.isBlock = true;
          helper(OPEN_BLOCK);
          helper(CREATE_BLOCK);
        }

      root.codegenNode = codegenNode;
    } else {
      // - single <slot/>, IfNode, ForNode: already blocks.
      // - single text node: always patched.
      // root codegen falls through via genNode()
      root.codegenNode = child;
    }
  } else if (children.length > 1) {
    // root has multiple nodes - return a fragment block.
    root.codegenNode = createVNodeCall(context, helper(FRAGMENT), undefined, root.children, "".concat(64
    /* STABLE_FRAGMENT */
    , " /* ", PatchFlagNames[64
    /* STABLE_FRAGMENT */
    ], " */"), undefined, undefined, true);
  }
}

function traverseChildren(parent, context) {
  var i = 0;

  var nodeRemoved = function nodeRemoved() {
    i--;
  };

  for (; i < parent.children.length; i++) {
    var child = parent.children[i];
    if (isString(child)) continue;
    context.parent = parent;
    context.childIndex = i;
    context.onNodeRemoved = nodeRemoved;
    traverseNode(child, context);
  }
}

function traverseNode(node, context) {
  context.currentNode = node; // apply transform plugins

  var nodeTransforms = context.nodeTransforms;
  var exitFns = [];

  for (var _i3 = 0; _i3 < nodeTransforms.length; _i3++) {
    var onExit = nodeTransforms[_i3](node, context);

    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push.apply(exitFns, _toConsumableArray(onExit));
      } else {
        exitFns.push(onExit);
      }
    }

    if (!context.currentNode) {
      // node was removed
      return;
    } else {
      // node may have been replaced
      node = context.currentNode;
    }
  }

  switch (node.type) {
    case 3
    /* COMMENT */
    :
      if (!context.ssr) {
        // inject import for the Comment symbol, which is needed for creating
        // comment nodes with `createVNode`
        context.helper(CREATE_COMMENT);
      }

      break;

    case 5
    /* INTERPOLATION */
    :
      // no need to traverse, but we need to inject toString helper
      if (!context.ssr) {
        context.helper(TO_DISPLAY_STRING);
      }

      break;
    // for container types, further traverse downwards

    case 9
    /* IF */
    :
      for (var _i4 = 0; _i4 < node.branches.length; _i4++) {
        traverseNode(node.branches[_i4], context);
      }

      break;

    case 10
    /* IF_BRANCH */
    :
    case 11
    /* FOR */
    :
    case 1
    /* ELEMENT */
    :
    case 0
    /* ROOT */
    :
      traverseChildren(node, context);
      break;
  } // exit transforms


  var i = exitFns.length;

  while (i--) {
    exitFns[i]();
  }
}

function createStructuralDirectiveTransform(name, fn) {
  var matches = isString(name) ? function (n) {
    return n === name;
  } : function (n) {
    return name.test(n);
  };
  return function (node, context) {
    if (node.type === 1
    /* ELEMENT */
    ) {
        var props = node.props; // structural directive transforms are not concerned with slots
        // as they are handled separately in vSlot.ts

        if (node.tagType === 3
        /* TEMPLATE */
        && props.some(isVSlot)) {
          return;
        }

        var exitFns = [];

        for (var i = 0; i < props.length; i++) {
          var prop = props[i];

          if (prop.type === 7
          /* DIRECTIVE */
          && matches(prop.name)) {
            // structural directives are removed to avoid infinite recursion
            // also we remove them *before* applying so that it can further
            // traverse itself in case it moves the node around
            props.splice(i, 1);
            i--;
            var onExit = fn(node, prop, context);
            if (onExit) exitFns.push(onExit);
          }
        }

        return exitFns;
      }
  };
}

function createCodegenContext(ast, _ref2) {
  var _ref2$mode = _ref2.mode,
      mode = _ref2$mode === void 0 ? 'function' : _ref2$mode,
      _ref2$prefixIdentifie = _ref2.prefixIdentifiers,
      prefixIdentifiers = _ref2$prefixIdentifie === void 0 ? mode === 'module' : _ref2$prefixIdentifie,
      _ref2$sourceMap = _ref2.sourceMap,
      sourceMap = _ref2$sourceMap === void 0 ? false : _ref2$sourceMap,
      _ref2$filename = _ref2.filename,
      filename = _ref2$filename === void 0 ? "template.vue.html" : _ref2$filename,
      _ref2$scopeId = _ref2.scopeId,
      scopeId = _ref2$scopeId === void 0 ? null : _ref2$scopeId,
      _ref2$optimizeBinding = _ref2.optimizeBindings,
      optimizeBindings = _ref2$optimizeBinding === void 0 ? false : _ref2$optimizeBinding,
      _ref2$runtimeGlobalNa = _ref2.runtimeGlobalName,
      runtimeGlobalName = _ref2$runtimeGlobalNa === void 0 ? "Vue" : _ref2$runtimeGlobalNa,
      _ref2$runtimeModuleNa = _ref2.runtimeModuleName,
      runtimeModuleName = _ref2$runtimeModuleNa === void 0 ? "vue" : _ref2$runtimeModuleNa,
      _ref2$ssr = _ref2.ssr,
      ssr = _ref2$ssr === void 0 ? false : _ref2$ssr;
  var context = {
    mode: mode,
    prefixIdentifiers: prefixIdentifiers,
    sourceMap: sourceMap,
    filename: filename,
    scopeId: scopeId,
    optimizeBindings: optimizeBindings,
    runtimeGlobalName: runtimeGlobalName,
    runtimeModuleName: runtimeModuleName,
    ssr: ssr,
    source: ast.loc.source,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    map: undefined,
    helper: function helper(key) {
      return "_".concat(helperNameMap[key]);
    },
    push: function push(code, node) {
      context.code += code;
    },
    indent: function indent() {
      _newline(++context.indentLevel);
    },
    deindent: function deindent() {
      var withoutNewLine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (withoutNewLine) {
        --context.indentLevel;
      } else {
        _newline(--context.indentLevel);
      }
    },
    newline: function newline() {
      _newline(context.indentLevel);
    }
  };

  function _newline(n) {
    context.push('\n' + "  ".repeat(n));
  }

  return context;
}

function generate(ast) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var context = createCodegenContext(ast, options);
  var mode = context.mode,
      push = context.push,
      prefixIdentifiers = context.prefixIdentifiers,
      indent = context.indent,
      deindent = context.deindent,
      newline = context.newline,
      scopeId = context.scopeId,
      ssr = context.ssr;
  var hasHelpers = ast.helpers.length > 0;
  var useWithBlock = !prefixIdentifiers && mode !== 'module'; // preambles

  {
    genFunctionPreamble(ast, context);
  }

  if (!ssr) {
    push("function render(_ctx, _cache) {");
  } else {
    push("function ssrRender(_ctx, _push, _parent) {");
  }

  indent();

  if (useWithBlock) {
    push("with (_ctx) {");
    indent(); // function mode const declarations should be inside with block
    // also they should be renamed to avoid collision with user properties

    if (hasHelpers) {
      push("const { ".concat(ast.helpers.map(function (s) {
        return "".concat(helperNameMap[s], ": _").concat(helperNameMap[s]);
      }).join(', '), " } = _Vue"));
      push("\n");
      newline();
    }
  } // generate asset resolution statements


  if (ast.components.length) {
    genAssets(ast.components, 'component', context);

    if (ast.directives.length || ast.temps > 0) {
      newline();
    }
  }

  if (ast.directives.length) {
    genAssets(ast.directives, 'directive', context);

    if (ast.temps > 0) {
      newline();
    }
  }

  if (ast.temps > 0) {
    push("let ");

    for (var i = 0; i < ast.temps; i++) {
      push("".concat(i > 0 ? ", " : "", "_temp").concat(i));
    }
  }

  if (ast.components.length || ast.directives.length || ast.temps) {
    push("\n");
    newline();
  } // generate the VNode tree expression


  if (!ssr) {
    push("return ");
  }

  if (ast.codegenNode) {
    genNode(ast.codegenNode, context);
  } else {
    push("null");
  }

  if (useWithBlock) {
    deindent();
    push("}");
  }

  deindent();
  push("}");
  return {
    ast: ast,
    code: context.code,
    // SourceMapGenerator does have toJSON() method but it's not in the types
    map: context.map ? context.map.toJSON() : undefined
  };
}

function genFunctionPreamble(ast, context) {
  var ssr = context.ssr,
      prefixIdentifiers = context.prefixIdentifiers,
      push = context.push,
      newline = context.newline,
      runtimeModuleName = context.runtimeModuleName,
      runtimeGlobalName = context.runtimeGlobalName;
  var VueBinding = runtimeGlobalName;

  var aliasHelper = function aliasHelper(s) {
    return "".concat(helperNameMap[s], ": _").concat(helperNameMap[s]);
  }; // Generate const declaration for helpers
  // In prefix mode, we place the const declaration at top so it's done
  // only once; But if we not prefixing, we place the declaration inside the
  // with block so it doesn't incur the `in` check cost for every helper access.


  if (ast.helpers.length > 0) {
    {
      // "with" mode.
      // save Vue in a separate variable to avoid collision
      push("const _Vue = ".concat(VueBinding, "\n")); // in "with" mode, helpers are declared inside the with block to avoid
      // has check cost, but hoists are lifted out of the function - we need
      // to provide the helper here.

      if (ast.hoists.length) {
        var staticHelpers = [CREATE_VNODE, CREATE_COMMENT, CREATE_TEXT, CREATE_STATIC].filter(function (helper) {
          return ast.helpers.includes(helper);
        }).map(aliasHelper).join(', ');
        push("const { ".concat(staticHelpers, " } = _Vue\n"));
      }
    }
  }

  genHoists(ast.hoists, context);
  newline();
  push("return ");
}

function genAssets(assets, type, _ref3) {
  var helper = _ref3.helper,
      push = _ref3.push,
      newline = _ref3.newline;
  var resolver = helper(type === 'component' ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE);

  for (var i = 0; i < assets.length; i++) {
    var id = assets[i];
    push("const ".concat(toValidAssetId(id, type), " = ").concat(resolver, "(").concat(JSON.stringify(id), ")"));

    if (i < assets.length - 1) {
      newline();
    }
  }
}

function genHoists(hoists, context) {
  if (!hoists.length) {
    return;
  }

  var push = context.push,
      newline = context.newline,
      helper = context.helper,
      scopeId = context.scopeId,
      mode = context.mode;
  newline();
  hoists.forEach(function (exp, i) {
    push("const _hoisted_".concat(i + 1, " = "));
    genNode(exp, context);
    newline();
  });
}

function isText$1(n) {
  return isString(n) || n.type === 4
  /* SIMPLE_EXPRESSION */
  || n.type === 2
  /* TEXT */
  || n.type === 5
  /* INTERPOLATION */
  || n.type === 8
  /* COMPOUND_EXPRESSION */
  ;
}

function genNodeListAsArray(nodes, context) {
  var multilines = nodes.length > 3 || nodes.some(function (n) {
    return isArray(n) || !isText$1(n);
  });
  context.push("[");
  multilines && context.indent();
  genNodeList(nodes, context, multilines);
  multilines && context.deindent();
  context.push("]");
}

function genNodeList(nodes, context) {
  var multilines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var comma = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var push = context.push,
      newline = context.newline;

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    if (isString(node)) {
      push(node);
    } else if (isArray(node)) {
      genNodeListAsArray(node, context);
    } else {
      genNode(node, context);
    }

    if (i < nodes.length - 1) {
      if (multilines) {
        comma && push(',');
        newline();
      } else {
        comma && push(', ');
      }
    }
  }
}

function genNode(node, context) {
  if (isString(node)) {
    context.push(node);
    return;
  }

  if (isSymbol(node)) {
    context.push(context.helper(node));
    return;
  }

  switch (node.type) {
    case 1
    /* ELEMENT */
    :
    case 9
    /* IF */
    :
    case 11
    /* FOR */
    :
      assert(node.codegenNode != null, "Codegen node is missing for element/if/for node. " + "Apply appropriate transforms first.");
      genNode(node.codegenNode, context);
      break;

    case 2
    /* TEXT */
    :
      genText(node, context);
      break;

    case 4
    /* SIMPLE_EXPRESSION */
    :
      genExpression(node, context);
      break;

    case 5
    /* INTERPOLATION */
    :
      genInterpolation(node, context);
      break;

    case 12
    /* TEXT_CALL */
    :
      genNode(node.codegenNode, context);
      break;

    case 8
    /* COMPOUND_EXPRESSION */
    :
      genCompoundExpression(node, context);
      break;

    case 3
    /* COMMENT */
    :
      genComment(node, context);
      break;

    case 13
    /* VNODE_CALL */
    :
      genVNodeCall(node, context);
      break;

    case 14
    /* JS_CALL_EXPRESSION */
    :
      genCallExpression(node, context);
      break;

    case 15
    /* JS_OBJECT_EXPRESSION */
    :
      genObjectExpression(node, context);
      break;

    case 17
    /* JS_ARRAY_EXPRESSION */
    :
      genArrayExpression(node, context);
      break;

    case 18
    /* JS_FUNCTION_EXPRESSION */
    :
      genFunctionExpression(node, context);
      break;

    case 19
    /* JS_CONDITIONAL_EXPRESSION */
    :
      genConditionalExpression(node, context);
      break;

    case 20
    /* JS_CACHE_EXPRESSION */
    :
      genCacheExpression(node, context);
      break;
    // SSR only types

    case 21
    /* JS_BLOCK_STATEMENT */
    :
      break;

    case 22
    /* JS_TEMPLATE_LITERAL */
    :
      break;

    case 23
    /* JS_IF_STATEMENT */
    :
      break;

    case 24
    /* JS_ASSIGNMENT_EXPRESSION */
    :
      break;

    case 25
    /* JS_RETURN_STATEMENT */
    :
      break;

    /* istanbul ignore next */

    case 10
    /* IF_BRANCH */
    :
      // noop
      break;

    default:
      {
        assert(false, "unhandled codegen node type: ".concat(node.type)); // make sure we exhaust all possible types

        var exhaustiveCheck = node;
        return exhaustiveCheck;
      }
  }
}

function genText(node, context) {
  context.push(JSON.stringify(node.content), node);
}

function genExpression(node, context) {
  var content = node.content,
      isStatic = node.isStatic;
  context.push(isStatic ? JSON.stringify(content) : content, node);
}

function genInterpolation(node, context) {
  var push = context.push,
      helper = context.helper;
  push("".concat(helper(TO_DISPLAY_STRING), "("));
  genNode(node.content, context);
  push(")");
}

function genCompoundExpression(node, context) {
  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];

    if (isString(child)) {
      context.push(child);
    } else {
      genNode(child, context);
    }
  }
}

function genExpressionAsPropertyKey(node, context) {
  var push = context.push;

  if (node.type === 8
  /* COMPOUND_EXPRESSION */
  ) {
      push("[");
      genCompoundExpression(node, context);
      push("]");
    } else if (node.isStatic) {
    // only quote keys if necessary
    var text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
    push(text, node);
  } else {
    push("[".concat(node.content, "]"), node);
  }
}

function genComment(node, context) {
  {
    var push = context.push,
        helper = context.helper;
    push("".concat(helper(CREATE_COMMENT), "(").concat(JSON.stringify(node.content), ")"), node);
  }
}

function genVNodeCall(node, context) {
  var push = context.push,
      helper = context.helper;
  var tag = node.tag,
      props = node.props,
      children = node.children,
      patchFlag = node.patchFlag,
      dynamicProps = node.dynamicProps,
      directives = node.directives,
      isBlock = node.isBlock,
      isForBlock = node.isForBlock;

  if (directives) {
    push(helper(WITH_DIRECTIVES) + "(");
  }

  if (isBlock) {
    push("(".concat(helper(OPEN_BLOCK), "(").concat(isForBlock ? "true" : "", "), "));
  }

  push(helper(isBlock ? CREATE_BLOCK : CREATE_VNODE) + "(", node);
  genNodeList(genNullableArgs([tag, props, children, patchFlag, dynamicProps]), context);
  push(")");

  if (isBlock) {
    push(")");
  }

  if (directives) {
    push(", ");
    genNode(directives, context);
    push(")");
  }
}

function genNullableArgs(args) {
  var i = args.length;

  while (i--) {
    if (args[i] != null) break;
  }

  return args.slice(0, i + 1).map(function (arg) {
    return arg || "null";
  });
} // JavaScript


function genCallExpression(node, context) {
  var callee = isString(node.callee) ? node.callee : context.helper(node.callee);
  context.push(callee + "(", node);
  genNodeList(node.arguments, context);
  context.push(")");
}

function genObjectExpression(node, context) {
  var push = context.push,
      indent = context.indent,
      deindent = context.deindent,
      newline = context.newline;
  var properties = node.properties;

  if (!properties.length) {
    push("{}", node);
    return;
  }

  var multilines = properties.length > 1 || properties.some(function (p) {
    return p.value.type !== 4;
  }
  /* SIMPLE_EXPRESSION */
  );
  push(multilines ? "{" : "{ ");
  multilines && indent();

  for (var i = 0; i < properties.length; i++) {
    var _properties$i = properties[i],
        key = _properties$i.key,
        value = _properties$i.value; // key

    genExpressionAsPropertyKey(key, context);
    push(": "); // value

    genNode(value, context);

    if (i < properties.length - 1) {
      // will only reach this if it's multilines
      push(",");
      newline();
    }
  }

  multilines && deindent();
  push(multilines ? "}" : " }");
}

function genArrayExpression(node, context) {
  genNodeListAsArray(node.elements, context);
}

function genFunctionExpression(node, context) {
  var push = context.push,
      indent = context.indent,
      deindent = context.deindent,
      scopeId = context.scopeId,
      mode = context.mode;
  var params = node.params,
      returns = node.returns,
      body = node.body,
      newline = node.newline,
      isSlot = node.isSlot;
  push("(", node);

  if (isArray(params)) {
    genNodeList(params, context);
  } else if (params) {
    genNode(params, context);
  }

  push(") => ");

  if (newline || body) {
    push("{");
    indent();
  }

  if (returns) {
    if (newline) {
      push("return ");
    }

    if (isArray(returns)) {
      genNodeListAsArray(returns, context);
    } else {
      genNode(returns, context);
    }
  } else if (body) {
    genNode(body, context);
  }

  if (newline || body) {
    deindent();
    push("}");
  }
}

function genConditionalExpression(node, context) {
  var test = node.test,
      consequent = node.consequent,
      alternate = node.alternate,
      needNewline = node.newline;
  var push = context.push,
      indent = context.indent,
      deindent = context.deindent,
      newline = context.newline;

  if (test.type === 4
  /* SIMPLE_EXPRESSION */
  ) {
      var needsParens = !isSimpleIdentifier(test.content);
      needsParens && push("(");
      genExpression(test, context);
      needsParens && push(")");
    } else {
    push("(");
    genNode(test, context);
    push(")");
  }

  needNewline && indent();
  context.indentLevel++;
  needNewline || push(" ");
  push("? ");
  genNode(consequent, context);
  context.indentLevel--;
  needNewline && newline();
  needNewline || push(" ");
  push(": ");
  var isNested = alternate.type === 19
  /* JS_CONDITIONAL_EXPRESSION */
  ;

  if (!isNested) {
    context.indentLevel++;
  }

  genNode(alternate, context);

  if (!isNested) {
    context.indentLevel--;
  }

  needNewline && deindent(true
  /* without newline */
  );
}

function genCacheExpression(node, context) {
  var push = context.push,
      helper = context.helper,
      indent = context.indent,
      deindent = context.deindent,
      newline = context.newline;
  push("_cache[".concat(node.index, "] || ("));

  if (node.isVNode) {
    indent();
    push("".concat(helper(SET_BLOCK_TRACKING), "(-1),"));
    newline();
  }

  push("_cache[".concat(node.index, "] = "));
  genNode(node.value, context);

  if (node.isVNode) {
    push(",");
    newline();
    push("".concat(helper(SET_BLOCK_TRACKING), "(1),"));
    newline();
    push("_cache[".concat(node.index, "]"));
    deindent();
  }

  push(")");
} // Convert ref="foo" to `:ref="[_ctx, 'foo']"` so that the ref contains the
// correct owner instance even inside slots.


var transformRef = function transformRef(node) {
  if (!(node.type === 1
  /* ELEMENT */
  && (node.tagType === 0
  /* ELEMENT */
  || node.tagType === 1
  /* COMPONENT */
  ))) {
    return;
  }

  var ref = findProp(node, 'ref');
  if (!ref) return;
  var refKey = ref.type === 6
  /* ATTRIBUTE */
  ? ref.value ? createSimpleExpression(ref.value.content, true, ref.value.loc) : null : ref.exp;

  if (refKey) {
    node.props[node.props.indexOf(ref)] = {
      type: 7
      /* DIRECTIVE */
      ,
      name: "bind",
      arg: createSimpleExpression("ref", true, ref.loc),
      exp: createCompoundExpression(["[_ctx, ", refKey, "]"]),
      modifiers: [],
      loc: ref.loc
    };
  }
};

var transformIf = createStructuralDirectiveTransform(/^(if|else|else-if)$/, function (node, dir, context) {
  return processIf(node, dir, context, function (ifNode, branch, isRoot) {
    // Exit callback. Complete the codegenNode when all children have been
    // transformed.
    return function () {
      if (isRoot) {
        ifNode.codegenNode = createCodegenNodeForBranch(branch, 0, context);
      } else {
        // attach this branch's codegen node to the v-if root.
        var parentCondition = ifNode.codegenNode;

        while (parentCondition.alternate.type === 19
        /* JS_CONDITIONAL_EXPRESSION */
        ) {
          parentCondition = parentCondition.alternate;
        }

        parentCondition.alternate = createCodegenNodeForBranch(branch, ifNode.branches.length - 1, context);
      }
    };
  });
}); // target-agnostic transform used for both Client and SSR

function processIf(node, dir, context, processCodegen) {
  if (dir.name !== 'else' && (!dir.exp || !dir.exp.content.trim())) {
    var loc = dir.exp ? dir.exp.loc : node.loc;
    context.onError(createCompilerError(34
    /* X_V_IF_NO_EXPRESSION */
    , dir.loc));
    dir.exp = createSimpleExpression("true", false, loc);
  }

  if (dir.name === 'if') {
    var branch = createIfBranch(node, dir);
    var ifNode = {
      type: 9
      /* IF */
      ,
      loc: node.loc,
      branches: [branch]
    };
    context.replaceNode(ifNode);

    if (processCodegen) {
      return processCodegen(ifNode, branch, true);
    }
  } else {
    // locate the adjacent v-if
    var siblings = context.parent.children;
    var comments = [];
    var i = siblings.indexOf(node);

    while (i-- >= -1) {
      var sibling = siblings[i];

      if (sibling && sibling.type === 3
      /* COMMENT */
      ) {
          context.removeNode(sibling);
          comments.unshift(sibling);
          continue;
        }

      if (sibling && sibling.type === 9
      /* IF */
      ) {
          // move the node to the if node's branches
          context.removeNode();

          var _branch = createIfBranch(node, dir);

          if (comments.length) {
            _branch.children = [].concat(comments, _toConsumableArray(_branch.children));
          }

          sibling.branches.push(_branch);
          var onExit = processCodegen && processCodegen(sibling, _branch, false); // since the branch was removed, it will not be traversed.
          // make sure to traverse here.

          traverseNode(_branch, context); // call on exit

          if (onExit) onExit(); // make sure to reset currentNode after traversal to indicate this
          // node has been removed.

          context.currentNode = null;
        } else {
        context.onError(createCompilerError(35
        /* X_V_ELSE_NO_ADJACENT_IF */
        , node.loc));
      }

      break;
    }
  }
}

function createIfBranch(node, dir) {
  return {
    type: 10
    /* IF_BRANCH */
    ,
    loc: node.loc,
    condition: dir.name === 'else' ? undefined : dir.exp,
    children: node.tagType === 3
    /* TEMPLATE */
    ? node.children : [node]
  };
}

function createCodegenNodeForBranch(branch, index, context) {
  if (branch.condition) {
    return createConditionalExpression(branch.condition, createChildrenCodegenNode(branch, index, context), // make sure to pass in asBlock: true so that the comment node call
    // closes the current block.
    createCallExpression(context.helper(CREATE_COMMENT), ['"v-if"', 'true']));
  } else {
    return createChildrenCodegenNode(branch, index, context);
  }
}

function createChildrenCodegenNode(branch, index, context) {
  var helper = context.helper;
  var keyProperty = createObjectProperty("key", createSimpleExpression(index + '', false));
  var children = branch.children;
  var firstChild = children[0];
  var needFragmentWrapper = children.length !== 1 || firstChild.type !== 1
  /* ELEMENT */
  ;

  if (needFragmentWrapper) {
    if (children.length === 1 && firstChild.type === 11
    /* FOR */
    ) {
        // optimize away nested fragments when child is a ForNode
        var vnodeCall = firstChild.codegenNode;
        injectProp(vnodeCall, keyProperty, context);
        return vnodeCall;
      } else {
      return createVNodeCall(context, helper(FRAGMENT), createObjectExpression([keyProperty]), children, undefined, undefined, undefined, true, false, branch.loc);
    }
  } else {
    var _vnodeCall = firstChild.codegenNode; // Change createVNode to createBlock.

    if (_vnodeCall.type === 13
    /* VNODE_CALL */
    ) {
        _vnodeCall.isBlock = true;
        helper(OPEN_BLOCK);
        helper(CREATE_BLOCK);
      } // inject branch key


    injectProp(_vnodeCall, keyProperty, context);
    return _vnodeCall;
  }
}

var transformFor = createStructuralDirectiveTransform('for', function (node, dir, context) {
  var helper = context.helper;
  return processFor(node, dir, context, function (forNode) {
    // create the loop render function expression now, and add the
    // iterator on exit after all children have been traversed
    var renderExp = createCallExpression(helper(RENDER_LIST), [forNode.source]);
    var keyProp = findProp(node, "key");
    var fragmentFlag = keyProp ? 128
    /* KEYED_FRAGMENT */
    : 256
    /* UNKEYED_FRAGMENT */
    ;
    forNode.codegenNode = createVNodeCall(context, helper(FRAGMENT), undefined, renderExp, "".concat(fragmentFlag, " /* ").concat(PatchFlagNames[fragmentFlag], " */"), undefined, undefined, true
    /* isBlock */
    , true
    /* isForBlock */
    , node.loc);
    return function () {
      // finish the codegen now that all children have been traversed
      var childBlock;
      var isTemplate = isTemplateNode(node);
      var children = forNode.children;
      var needFragmentWrapper = children.length > 1 || children[0].type !== 1
      /* ELEMENT */
      ;
      var slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] // api-extractor somehow fails to infer this
      : null;
      var keyProperty = keyProp ? createObjectProperty("key", keyProp.type === 6
      /* ATTRIBUTE */
      ? createSimpleExpression(keyProp.value.content, true) : keyProp.exp) : null;

      if (slotOutlet) {
        // <slot v-for="..."> or <template v-for="..."><slot/></template>
        childBlock = slotOutlet.codegenNode;

        if (isTemplate && keyProperty) {
          // <template v-for="..." :key="..."><slot/></template>
          // we need to inject the key to the renderSlot() call.
          // the props for renderSlot is passed as the 3rd argument.
          injectProp(childBlock, keyProperty, context);
        }
      } else if (needFragmentWrapper) {
        // <template v-for="..."> with text or multi-elements
        // should generate a fragment block for each loop
        childBlock = createVNodeCall(context, helper(FRAGMENT), keyProperty ? createObjectExpression([keyProperty]) : undefined, node.children, "".concat(64
        /* STABLE_FRAGMENT */
        , " /* ", PatchFlagNames[64
        /* STABLE_FRAGMENT */
        ], " */"), undefined, undefined, true);
      } else {
        // Normal element v-for. Directly use the child's codegenNode
        // but mark it as a block.
        childBlock = children[0].codegenNode;
        childBlock.isBlock = true;
        helper(OPEN_BLOCK);
        helper(CREATE_BLOCK);
      }

      renderExp.arguments.push(createFunctionExpression(createForLoopParams(forNode.parseResult), childBlock, true
      /* force newline */
      ));
    };
  });
}); // target-agnostic transform used for both Client and SSR

function processFor(node, dir, context, processCodegen) {
  if (!dir.exp) {
    context.onError(createCompilerError(36
    /* X_V_FOR_NO_EXPRESSION */
    , dir.loc));
    return;
  }

  var parseResult = parseForExpression( // can only be simple expression because vFor transform is applied
  // before expression transform.
  dir.exp);

  if (!parseResult) {
    context.onError(createCompilerError(37
    /* X_V_FOR_MALFORMED_EXPRESSION */
    , dir.loc));
    return;
  }

  var addIdentifiers = context.addIdentifiers,
      removeIdentifiers = context.removeIdentifiers,
      scopes = context.scopes;
  var source = parseResult.source,
      value = parseResult.value,
      key = parseResult.key,
      index = parseResult.index;
  var forNode = {
    type: 11
    /* FOR */
    ,
    loc: dir.loc,
    source: source,
    valueAlias: value,
    keyAlias: key,
    objectIndexAlias: index,
    parseResult: parseResult,
    children: node.tagType === 3
    /* TEMPLATE */
    ? node.children : [node]
  };
  context.replaceNode(forNode); // bookkeeping

  scopes.vFor++;
  var onExit = processCodegen && processCodegen(forNode);
  return function () {
    scopes.vFor--;
    if (onExit) onExit();
  };
}

var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/; // This regex doesn't cover the case if key or index aliases have destructuring,
// but those do not make sense in the first place, so this works in practice.

var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

function parseForExpression(input, context) {
  var loc = input.loc;
  var exp = input.content;
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) return;

  var _inMatch = _slicedToArray(inMatch, 3),
      LHS = _inMatch[1],
      RHS = _inMatch[2];

  var result = {
    source: createAliasExpression(loc, RHS.trim(), exp.indexOf(RHS, LHS.length)),
    value: undefined,
    key: undefined,
    index: undefined
  };
  var valueContent = LHS.trim().replace(stripParensRE, '').trim();
  var trimmedOffset = LHS.indexOf(valueContent);
  var iteratorMatch = valueContent.match(forIteratorRE);

  if (iteratorMatch) {
    valueContent = valueContent.replace(forIteratorRE, '').trim();
    var keyContent = iteratorMatch[1].trim();
    var keyOffset;

    if (keyContent) {
      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
      result.key = createAliasExpression(loc, keyContent, keyOffset);
    }

    if (iteratorMatch[2]) {
      var indexContent = iteratorMatch[2].trim();

      if (indexContent) {
        result.index = createAliasExpression(loc, indexContent, exp.indexOf(indexContent, result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length));
      }
    }
  }

  if (valueContent) {
    result.value = createAliasExpression(loc, valueContent, trimmedOffset);
  }

  return result;
}

function createAliasExpression(range, content, offset) {
  return createSimpleExpression(content, false, getInnerRange(range, offset, content.length));
}

function createForLoopParams(_ref4) {
  var value = _ref4.value,
      key = _ref4.key,
      index = _ref4.index;
  var params = [];

  if (value) {
    params.push(value);
  }

  if (key) {
    if (!value) {
      params.push(createSimpleExpression("_", false));
    }

    params.push(key);
  }

  if (index) {
    if (!key) {
      if (!value) {
        params.push(createSimpleExpression("_", false));
      }

      params.push(createSimpleExpression("__", false));
    }

    params.push(index);
  }

  return params;
}

var isStaticExp = function isStaticExp(p) {
  return p.type === 4
  /* SIMPLE_EXPRESSION */
  && p.isStatic;
};

var defaultFallback = createSimpleExpression("undefined", false); // A NodeTransform that:
// 1. Tracks scope identifiers for scoped slots so that they don't get prefixed
//    by transformExpression. This is only applied in non-browser builds with
//    { prefixIdentifiers: true }.
// 2. Track v-slot depths so that we know a slot is inside another slot.
//    Note the exit callback is executed before buildSlots() on the same node,
//    so only nested slots see positive numbers.

var trackSlotScopes = function trackSlotScopes(node, context) {
  if (node.type === 1
  /* ELEMENT */
  && (node.tagType === 1
  /* COMPONENT */
  || node.tagType === 3
  /* TEMPLATE */
  )) {
    // We are only checking non-empty v-slot here
    // since we only care about slots that introduce scope variables.
    var vSlot = findDir(node, 'slot');

    if (vSlot) {
      var slotProps = vSlot.exp;
      context.scopes.vSlot++;
      return function () {
        context.scopes.vSlot--;
      };
    }
  }
};

var buildClientSlotFn = function buildClientSlotFn(props, children, loc) {
  return createFunctionExpression(props, children, false
  /* newline */
  , true
  /* isSlot */
  , children.length ? children[0].loc : loc);
}; // Instead of being a DirectiveTransform, v-slot processing is called during
// transformElement to build the slots object for a component.


function buildSlots(node, context) {
  var buildSlotFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : buildClientSlotFn;
  var children = node.children,
      loc = node.loc;
  var slotsProperties = [];
  var dynamicSlots = [];

  var buildDefaultSlotProperty = function buildDefaultSlotProperty(props, children) {
    return createObjectProperty("default", buildSlotFn(props, children, loc));
  }; // If the slot is inside a v-for or another v-slot, force it to be dynamic
  // since it likely uses a scope variable.


  var hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0; // 1. Check for default slot with slotProps on component itself.
  //    <Comp v-slot="{ prop }"/>

  var onComponentDefaultSlot = findDir(node, 'slot', true);

  if (onComponentDefaultSlot) {
    var arg = onComponentDefaultSlot.arg,
        exp = onComponentDefaultSlot.exp,
        _loc2 = onComponentDefaultSlot.loc;

    if (arg) {
      context.onError(createCompilerError(41
      /* X_V_SLOT_NAMED_SLOT_ON_COMPONENT */
      , _loc2));
    }

    slotsProperties.push(buildDefaultSlotProperty(exp, children));
  } // 2. Iterate through children and check for template slots
  //    <template v-slot:foo="{ prop }">


  var hasTemplateSlots = false;
  var hasNamedDefaultSlot = false;
  var implicitDefaultChildren = [];
  var seenSlotNames = new Set();

  for (var i = 0; i < children.length; i++) {
    var slotElement = children[i];
    var slotDir = void 0;

    if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, 'slot', true))) {
      // not a <template v-slot>, skip.
      if (slotElement.type !== 3
      /* COMMENT */
      ) {
          implicitDefaultChildren.push(slotElement);
        }

      continue;
    }

    if (onComponentDefaultSlot) {
      // already has on-component default slot - this is incorrect usage.
      context.onError(createCompilerError(42
      /* X_V_SLOT_MIXED_SLOT_USAGE */
      , slotDir.loc));
      break;
    }

    hasTemplateSlots = true;
    var slotChildren = slotElement.children,
        slotLoc = slotElement.loc;
    var _slotDir = slotDir,
        _slotDir$arg = _slotDir.arg,
        slotName = _slotDir$arg === void 0 ? createSimpleExpression("default", true) : _slotDir$arg,
        slotProps = _slotDir.exp,
        dirLoc = _slotDir.loc; // check if name is dynamic.

    var staticSlotName = void 0;

    if (isStaticExp(slotName)) {
      staticSlotName = slotName ? slotName.content : "default";
    } else {
      hasDynamicSlots = true;
    }

    var slotFunction = buildSlotFn(slotProps, slotChildren, slotLoc); // check if this slot is conditional (v-if/v-for)

    var vIf = void 0;
    var vElse = void 0;
    var vFor = void 0;

    if (vIf = findDir(slotElement, 'if')) {
      hasDynamicSlots = true;
      dynamicSlots.push(createConditionalExpression(vIf.exp, buildDynamicSlot(slotName, slotFunction), defaultFallback));
    } else if (vElse = findDir(slotElement, /^else(-if)?$/, true
    /* allowEmpty */
    )) {
      // find adjacent v-if
      var j = i;
      var prev = void 0;

      while (j--) {
        prev = children[j];

        if (prev.type !== 3
        /* COMMENT */
        ) {
            break;
          }
      }

      if (prev && isTemplateNode(prev) && findDir(prev, 'if')) {
        // remove node
        children.splice(i, 1);
        i--; // attach this slot to previous conditional

        var conditional = dynamicSlots[dynamicSlots.length - 1];

        while (conditional.alternate.type === 19
        /* JS_CONDITIONAL_EXPRESSION */
        ) {
          conditional = conditional.alternate;
        }

        conditional.alternate = vElse.exp ? createConditionalExpression(vElse.exp, buildDynamicSlot(slotName, slotFunction), defaultFallback) : buildDynamicSlot(slotName, slotFunction);
      } else {
        context.onError(createCompilerError(35
        /* X_V_ELSE_NO_ADJACENT_IF */
        , vElse.loc));
      }
    } else if (vFor = findDir(slotElement, 'for')) {
      hasDynamicSlots = true;
      var parseResult = vFor.parseResult || parseForExpression(vFor.exp);

      if (parseResult) {
        // Render the dynamic slots as an array and add it to the createSlot()
        // args. The runtime knows how to handle it appropriately.
        dynamicSlots.push(createCallExpression(context.helper(RENDER_LIST), [parseResult.source, createFunctionExpression(createForLoopParams(parseResult), buildDynamicSlot(slotName, slotFunction), true
        /* force newline */
        )]));
      } else {
        context.onError(createCompilerError(37
        /* X_V_FOR_MALFORMED_EXPRESSION */
        , vFor.loc));
      }
    } else {
      // check duplicate static names
      if (staticSlotName) {
        if (seenSlotNames.has(staticSlotName)) {
          context.onError(createCompilerError(43
          /* X_V_SLOT_DUPLICATE_SLOT_NAMES */
          , dirLoc));
          continue;
        }

        seenSlotNames.add(staticSlotName);

        if (staticSlotName === 'default') {
          hasNamedDefaultSlot = true;
        }
      }

      slotsProperties.push(createObjectProperty(slotName, slotFunction));
    }
  }

  if (!onComponentDefaultSlot) {
    if (!hasTemplateSlots) {
      // implicit default slot (on component)
      slotsProperties.push(buildDefaultSlotProperty(undefined, children));
    } else if (implicitDefaultChildren.length) {
      // implicit default slot (mixed with named slots)
      if (hasNamedDefaultSlot) {
        context.onError(createCompilerError(44
        /* X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN */
        , implicitDefaultChildren[0].loc));
      } else {
        slotsProperties.push(buildDefaultSlotProperty(undefined, implicitDefaultChildren));
      }
    }
  }

  var slots = createObjectExpression(slotsProperties.concat(createObjectProperty("_", createSimpleExpression("1", false))), loc);

  if (dynamicSlots.length) {
    slots = createCallExpression(context.helper(CREATE_SLOTS), [slots, createArrayExpression(dynamicSlots)]);
  }

  return {
    slots: slots,
    hasDynamicSlots: hasDynamicSlots
  };
}

function buildDynamicSlot(name, fn) {
  return createObjectExpression([createObjectProperty("name", name), createObjectProperty("fn", fn)]);
} // some directive transforms (e.g. v-model) may return a symbol for runtime
// import, which should be used instead of a resolveDirective call.


var directiveImportMap = new WeakMap(); // generate a JavaScript AST for this element's codegen

var transformElement = function transformElement(node, context) {
  if (!(node.type === 1
  /* ELEMENT */
  && (node.tagType === 0
  /* ELEMENT */
  || node.tagType === 1
  /* COMPONENT */
  ))) {
    return;
  } // perform the work on exit, after all child expressions have been
  // processed and merged.


  return function postTransformElement() {
    var tag = node.tag,
        props = node.props;
    var isComponent = node.tagType === 1
    /* COMPONENT */
    ; // The goal of the transform is to create a codegenNode implementing the
    // VNodeCall interface.

    var vnodeTag = isComponent ? resolveComponentType(node, context) : "\"".concat(tag, "\"");
    var vnodeProps;
    var vnodeChildren;
    var vnodePatchFlag;
    var patchFlag = 0;
    var vnodeDynamicProps;
    var dynamicPropNames;
    var vnodeDirectives; // <svg> and <foreignObject> must be forced into blocks so that block
    // updates inside get proper isSVG flag at runtime. (#639, #643)
    // This is technically web-specific, but splitting the logic out of core
    // leads to too much unnecessary complexity.

    var shouldUseBlock = !isComponent && (tag === 'svg' || tag === 'foreignObject'); // props

    if (props.length > 0) {
      var propsBuildResult = buildProps(node, context);
      vnodeProps = propsBuildResult.props;
      patchFlag = propsBuildResult.patchFlag;
      dynamicPropNames = propsBuildResult.dynamicPropNames;
      var directives = propsBuildResult.directives;
      vnodeDirectives = directives && directives.length ? createArrayExpression(directives.map(function (dir) {
        return buildDirectiveArgs(dir, context);
      })) : undefined;
    } // children


    if (node.children.length > 0) {
      if (vnodeTag === KEEP_ALIVE) {
        // Although a built-in component, we compile KeepAlive with raw children
        // instead of slot functions so that it can be used inside Transition
        // or other Transition-wrapping HOCs.
        // To ensure correct updates with block optimizations, we need to:
        // 1. Force keep-alive into a block. This avoids its children being
        //    collected by a parent block.
        shouldUseBlock = true; // 2. Force keep-alive to always be updated, since it uses raw children.

        patchFlag |= 1024
        /* DYNAMIC_SLOTS */
        ;

        if (node.children.length > 1) {
          context.onError(createCompilerError(50
          /* X_KEEP_ALIVE_INVALID_CHILDREN */
          , {
            start: node.children[0].loc.start,
            end: node.children[node.children.length - 1].loc.end,
            source: ''
          }));
        }
      }

      var shouldBuildAsSlots = isComponent && // Portal is not a real component has dedicated handling in the renderer
      vnodeTag !== PORTAL && // explained above.
      vnodeTag !== KEEP_ALIVE;

      if (shouldBuildAsSlots) {
        var _buildSlots = buildSlots(node, context),
            slots = _buildSlots.slots,
            hasDynamicSlots = _buildSlots.hasDynamicSlots;

        vnodeChildren = slots;

        if (hasDynamicSlots) {
          patchFlag |= 1024
          /* DYNAMIC_SLOTS */
          ;
        }
      } else if (node.children.length === 1) {
        var child = node.children[0];
        var type = child.type; // check for dynamic text children

        var hasDynamicTextChild = type === 5
        /* INTERPOLATION */
        || type === 8
        /* COMPOUND_EXPRESSION */
        ;

        if (hasDynamicTextChild && !isStaticNode(child)) {
          patchFlag |= 1
          /* TEXT */
          ;
        } // pass directly if the only child is a text node
        // (plain / interpolation / expression)


        if (hasDynamicTextChild || type === 2
        /* TEXT */
        ) {
            vnodeChildren = child;
          } else {
          vnodeChildren = node.children;
        }
      } else {
        vnodeChildren = node.children;
      }
    } // patchFlag & dynamicPropNames


    if (patchFlag !== 0) {
      {
        if (patchFlag < 0) {
          // special flags (negative and mutually exclusive)
          vnodePatchFlag = patchFlag + " /* ".concat(PatchFlagNames[patchFlag], " */");
        } else {
          // bitwise flags
          var flagNames = Object.keys(PatchFlagNames).map(Number).filter(function (n) {
            return n > 0 && patchFlag & n;
          }).map(function (n) {
            return PatchFlagNames[n];
          }).join(", ");
          vnodePatchFlag = patchFlag + " /* ".concat(flagNames, " */");
        }
      }

      if (dynamicPropNames && dynamicPropNames.length) {
        vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
      }
    }

    node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren, vnodePatchFlag, vnodeDynamicProps, vnodeDirectives, shouldUseBlock, false
    /* isForBlock */
    , node.loc);
  };
};

function resolveComponentType(node, context) {
  var ssr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var tag = node.tag; // 1. dynamic component

  var isProp = node.tag === 'component' && findProp(node, 'is');

  if (isProp) {
    // static <component is="foo" />
    if (isProp.type === 6
    /* ATTRIBUTE */
    ) {
        var isType = isProp.value && isProp.value.content;

        if (isType) {
          context.helper(RESOLVE_COMPONENT);
          context.components.add(isType);
          return toValidAssetId(isType, "component");
        }
      } // dynamic <component :is="asdf" />
    else if (isProp.exp) {
        return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), // _ctx.$ exposes the owner instance of current render function
        [isProp.exp, context.prefixIdentifiers ? "_ctx.$" : "$"]);
      }
  } // 2. built-in components (Portal, Transition, KeepAlive, Suspense...)


  var builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);

  if (builtIn) {
    // built-ins are simply fallthroughs / have special handling during ssr
    // no we don't need to import their runtime equivalents
    if (!ssr) context.helper(builtIn);
    return builtIn;
  } // 3. user component (resolve)


  context.helper(RESOLVE_COMPONENT);
  context.components.add(tag);
  return toValidAssetId(tag, "component");
}

function buildProps(node, context) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : node.props;
  var ssr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var tag = node.tag,
      elementLoc = node.loc;
  var isComponent = node.tagType === 1
  /* COMPONENT */
  ;
  var properties = [];
  var mergeArgs = [];
  var runtimeDirectives = []; // patchFlag analysis

  var patchFlag = 0;
  var hasRef = false;
  var hasClassBinding = false;
  var hasStyleBinding = false;
  var hasHydrationEventBinding = false;
  var hasDynamicKeys = false;
  var dynamicPropNames = [];

  var analyzePatchFlag = function analyzePatchFlag(_ref5) {
    var key = _ref5.key,
        value = _ref5.value;

    if (key.type === 4
    /* SIMPLE_EXPRESSION */
    && key.isStatic) {
      var name = key.content;

      if (!isComponent && isOn(name) && // omit the flag for click handlers becaues hydration gives click
      // dedicated fast path.
      name.toLowerCase() !== 'onclick' && // omit v-model handlers
      name !== 'onUpdate:modelValue') {
        hasHydrationEventBinding = true;
      }

      if (value.type === 20
      /* JS_CACHE_EXPRESSION */
      || (value.type === 4
      /* SIMPLE_EXPRESSION */
      || value.type === 8
      /* COMPOUND_EXPRESSION */
      ) && isStaticNode(value)) {
        // skip if the prop is a cached handler or has constant value
        return;
      }

      if (name === 'ref') {
        hasRef = true;
      } else if (name === 'class') {
        hasClassBinding = true;
      } else if (name === 'style') {
        hasStyleBinding = true;
      } else if (name !== 'key' && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
    } else {
      hasDynamicKeys = true;
    }
  };

  for (var i = 0; i < props.length; i++) {
    // static attribute
    var prop = props[i];

    if (prop.type === 6
    /* ATTRIBUTE */
    ) {
        var loc = prop.loc,
            name = prop.name,
            value = prop.value;

        if (name === 'ref') {
          hasRef = true;
        } // skip :is on <component>


        if (name === 'is' && tag === 'component') {
          continue;
        }

        properties.push(createObjectProperty(createSimpleExpression(name, true, getInnerRange(loc, 0, name.length)), createSimpleExpression(value ? value.content : '', true, value ? value.loc : loc)));
      } else {
      // directives
      var _name = prop.name,
          arg = prop.arg,
          exp = prop.exp,
          _loc3 = prop.loc;
      var isBind = _name === 'bind';

      var _isOn = _name === 'on'; // skip v-slot - it is handled by its dedicated transform.


      if (_name === 'slot') {
        if (!isComponent) {
          context.onError(createCompilerError(45
          /* X_V_SLOT_MISPLACED */
          , _loc3));
        }

        continue;
      } // skip v-once - it is handled by its dedicated transform.


      if (_name === 'once') {
        continue;
      } // skip :is on <component>


      if (isBind && tag === 'component' && isBindKey(arg, 'is')) {
        continue;
      } // skip v-on in SSR compilation


      if (_isOn && ssr) {
        continue;
      } // special case for v-bind and v-on with no argument


      if (!arg && (isBind || _isOn)) {
        hasDynamicKeys = true;

        if (exp) {
          if (properties.length) {
            mergeArgs.push(createObjectExpression(dedupeProperties(properties), elementLoc));
            properties = [];
          }

          if (isBind) {
            mergeArgs.push(exp);
          } else {
            // v-on="obj" -> toHandlers(obj)
            mergeArgs.push({
              type: 14
              /* JS_CALL_EXPRESSION */
              ,
              loc: _loc3,
              callee: context.helper(TO_HANDLERS),
              arguments: [exp]
            });
          }
        } else {
          context.onError(createCompilerError(isBind ? 38
          /* X_V_BIND_NO_EXPRESSION */
          : 39
          /* X_V_ON_NO_EXPRESSION */
          , _loc3));
        }

        continue;
      }

      var directiveTransform = context.directiveTransforms[_name];

      if (directiveTransform) {
        var _properties;

        // has built-in directive transform.
        var _directiveTransform = directiveTransform(prop, node, context),
            _props = _directiveTransform.props,
            needRuntime = _directiveTransform.needRuntime;

        !ssr && _props.forEach(analyzePatchFlag);

        (_properties = properties).push.apply(_properties, _toConsumableArray(_props));

        if (needRuntime) {
          runtimeDirectives.push(prop);

          if (isSymbol(needRuntime)) {
            directiveImportMap.set(prop, needRuntime);
          }
        }
      } else {
        // no built-in transform, this is a user custom directive.
        runtimeDirectives.push(prop);
      }
    }
  }

  var propsExpression = undefined; // has v-bind="object" or v-on="object", wrap with mergeProps

  if (mergeArgs.length) {
    if (properties.length) {
      mergeArgs.push(createObjectExpression(dedupeProperties(properties), elementLoc));
    }

    if (mergeArgs.length > 1) {
      propsExpression = createCallExpression(context.helper(MERGE_PROPS), mergeArgs, elementLoc);
    } else {
      // single v-bind with nothing else - no need for a mergeProps call
      propsExpression = mergeArgs[0];
    }
  } else if (properties.length) {
    propsExpression = createObjectExpression(dedupeProperties(properties), elementLoc);
  } // patchFlag analysis


  if (hasDynamicKeys) {
    patchFlag |= 16
    /* FULL_PROPS */
    ;
  } else {
    if (hasClassBinding) {
      patchFlag |= 2
      /* CLASS */
      ;
    }

    if (hasStyleBinding) {
      patchFlag |= 4
      /* STYLE */
      ;
    }

    if (dynamicPropNames.length) {
      patchFlag |= 8
      /* PROPS */
      ;
    }

    if (hasHydrationEventBinding) {
      patchFlag |= 32
      /* HYDRATE_EVENTS */
      ;
    }
  }

  if ((patchFlag === 0 || patchFlag === 32
  /* HYDRATE_EVENTS */
  ) && (hasRef || runtimeDirectives.length > 0)) {
    patchFlag |= 512
    /* NEED_PATCH */
    ;
  }

  return {
    props: propsExpression,
    directives: runtimeDirectives,
    patchFlag: patchFlag,
    dynamicPropNames: dynamicPropNames
  };
} // Dedupe props in an object literal.
// Literal duplicated attributes would have been warned during the parse phase,
// however, it's possible to encounter duplicated `onXXX` handlers with different
// modifiers. We also need to merge static and dynamic class / style attributes.
// - onXXX handlers / style: merge into array
// - class: merge into single expression with concatenation


function dedupeProperties(properties) {
  var knownProps = new Map();
  var deduped = [];

  for (var i = 0; i < properties.length; i++) {
    var prop = properties[i]; // dynamic keys are always allowed

    if (prop.key.type === 8
    /* COMPOUND_EXPRESSION */
    || !prop.key.isStatic) {
      deduped.push(prop);
      continue;
    }

    var name = prop.key.content;
    var existing = knownProps.get(name);

    if (existing) {
      if (name === 'style' || name === 'class' || name.startsWith('on')) {
        mergeAsArray(existing, prop);
      } // unexpected duplicate, should have emitted error during parse

    } else {
      knownProps.set(name, prop);
      deduped.push(prop);
    }
  }

  return deduped;
}

function mergeAsArray(existing, incoming) {
  if (existing.value.type === 17
  /* JS_ARRAY_EXPRESSION */
  ) {
      existing.value.elements.push(incoming.value);
    } else {
    existing.value = createArrayExpression([existing.value, incoming.value], existing.loc);
  }
}

function buildDirectiveArgs(dir, context) {
  var dirArgs = [];
  var runtime = directiveImportMap.get(dir);

  if (runtime) {
    dirArgs.push(context.helperString(runtime));
  } else {
    // inject statement for resolving directive
    context.helper(RESOLVE_DIRECTIVE);
    context.directives.add(dir.name);
    dirArgs.push(toValidAssetId(dir.name, "directive"));
  }

  var loc = dir.loc;
  if (dir.exp) dirArgs.push(dir.exp);

  if (dir.arg) {
    if (!dir.exp) {
      dirArgs.push("void 0");
    }

    dirArgs.push(dir.arg);
  }

  if (Object.keys(dir.modifiers).length) {
    if (!dir.arg) {
      if (!dir.exp) {
        dirArgs.push("void 0");
      }

      dirArgs.push("void 0");
    }

    var trueExpression = createSimpleExpression("true", false, loc);
    dirArgs.push(createObjectExpression(dir.modifiers.map(function (modifier) {
      return createObjectProperty(modifier, trueExpression);
    }), loc));
  }

  return createArrayExpression(dirArgs, dir.loc);
}

function stringifyDynamicPropNames(props) {
  var propsNamesString = "[";

  for (var i = 0, l = props.length; i < l; i++) {
    propsNamesString += JSON.stringify(props[i]);
    if (i < l - 1) propsNamesString += ', ';
  }

  return propsNamesString + "]";
}

var transformSlotOutlet = function transformSlotOutlet(node, context) {
  if (isSlotOutlet(node)) {
    var children = node.children,
        loc = node.loc;

    var _processSlotOutlet = processSlotOutlet(node, context),
        slotName = _processSlotOutlet.slotName,
        slotProps = _processSlotOutlet.slotProps;

    var slotArgs = [context.prefixIdentifiers ? "_ctx.$slots" : "$slots", slotName];

    if (slotProps) {
      slotArgs.push(slotProps);
    }

    if (children.length) {
      if (!slotProps) {
        slotArgs.push("{}");
      }

      slotArgs.push(children);
    }

    node.codegenNode = createCallExpression(context.helper(RENDER_SLOT), slotArgs, loc);
  }
};

function processSlotOutlet(node, context) {
  var slotName = "\"default\"";
  var slotProps = undefined; // check for <slot name="xxx" OR :name="xxx" />

  var name = findProp(node, 'name');

  if (name) {
    if (name.type === 6
    /* ATTRIBUTE */
    && name.value) {
      // static name
      slotName = JSON.stringify(name.value.content);
    } else if (name.type === 7
    /* DIRECTIVE */
    && name.exp) {
      // dynamic name
      slotName = name.exp;
    }
  }

  var propsWithoutName = name ? node.props.filter(function (p) {
    return p !== name;
  }) : node.props;

  if (propsWithoutName.length > 0) {
    var _buildProps = buildProps(node, context, propsWithoutName),
        props = _buildProps.props,
        directives = _buildProps.directives;

    slotProps = props;

    if (directives.length) {
      context.onError(createCompilerError(40
      /* X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET */
      , directives[0].loc));
    }
  }

  return {
    slotName: slotName,
    slotProps: slotProps
  };
}

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;

var transformOn = function transformOn(dir, node, context, augmentor) {
  var loc = dir.loc,
      modifiers = dir.modifiers,
      arg = dir.arg;

  if (!dir.exp && !modifiers.length) {
    context.onError(createCompilerError(39
    /* X_V_ON_NO_EXPRESSION */
    , loc));
  }

  var eventName;

  if (arg.type === 4
  /* SIMPLE_EXPRESSION */
  ) {
      if (arg.isStatic) {
        var rawName = arg.content; // for @vnode-xxx event listeners, auto convert it to camelCase

        var normalizedName = rawName.startsWith("vnode") ? capitalize(camelize(rawName)) : capitalize(rawName);
        eventName = createSimpleExpression("on".concat(normalizedName), true, arg.loc);
      } else {
        eventName = createCompoundExpression(["\"on\" + (", arg, ")"]);
      }
    } else {
    // already a compound expression.
    eventName = arg;
    eventName.children.unshift("\"on\" + (");
    eventName.children.push(")");
  } // handler processing


  var exp = dir.exp;

  if (exp && !exp.content.trim()) {
    exp = undefined;
  }

  var isCacheable = !exp;

  if (exp) {
    var isMemberExp = isMemberExpression(exp.content);
    var isInlineStatement = !(isMemberExp || fnExpRE.test(exp.content));
    var hasMultipleStatements = exp.content.includes(";");

    if (isInlineStatement || isCacheable && isMemberExp) {
      // wrap inline statement in a function expression
      exp = createCompoundExpression(["$event => ".concat(hasMultipleStatements ? "{" : "("), exp, hasMultipleStatements ? "}" : ")"]);
    }
  }

  var ret = {
    props: [createObjectProperty(eventName, exp || createSimpleExpression("() => {}", false, loc))]
  }; // apply extended compiler augmentor

  if (augmentor) {
    ret = augmentor(ret);
  }

  if (isCacheable) {
    // cache handlers so that it's always the same handler being passed down.
    // this avoids unnecessary re-renders when users use inline handlers on
    // components.
    ret.props[0].value = context.cache(ret.props[0].value);
  }

  return ret;
}; // v-bind without arg is handled directly in ./transformElements.ts due to it affecting
// codegen for the entire props object. This transform here is only for v-bind
// *with* args.


var transformBind = function transformBind(dir, node, context) {
  var exp = dir.exp,
      modifiers = dir.modifiers,
      loc = dir.loc;
  var arg = dir.arg;

  if (!exp) {
    context.onError(createCompilerError(38
    /* X_V_BIND_NO_EXPRESSION */
    , loc));
  } // .prop is no longer necessary due to new patch behavior
  // .sync is replaced by v-model:arg


  if (modifiers.includes('camel')) {
    if (arg.type === 4
    /* SIMPLE_EXPRESSION */
    ) {
        if (arg.isStatic) {
          arg.content = camelize(arg.content);
        } else {
          arg.content = "".concat(context.helperString(CAMELIZE), "(").concat(arg.content, ")");
        }
      } else {
      arg.children.unshift("".concat(context.helperString(CAMELIZE), "("));
      arg.children.push(")");
    }
  }

  return {
    props: [createObjectProperty(arg, exp || createSimpleExpression('', true, loc))]
  };
}; // Merge adjacent text nodes and expressions into a single expression
// e.g. <div>abc {{ d }} {{ e }}</div> should have a single expression node as child.


var transformText = function transformText(node, context) {
  if (node.type === 0
  /* ROOT */
  || node.type === 1
  /* ELEMENT */
  || node.type === 11
  /* FOR */
  || node.type === 10
  /* IF_BRANCH */
  ) {
      // perform the transform on node exit so that all expressions have already
      // been processed.
      return function () {
        var children = node.children;
        var currentContainer = undefined;
        var hasText = false;

        for (var i = 0; i < children.length; i++) {
          var child = children[i];

          if (isText(child)) {
            hasText = true;

            for (var j = i + 1; j < children.length; j++) {
              var next = children[j];

              if (isText(next)) {
                if (!currentContainer) {
                  currentContainer = children[i] = {
                    type: 8
                    /* COMPOUND_EXPRESSION */
                    ,
                    loc: child.loc,
                    children: [child]
                  };
                } // merge adjacent text node into current


                currentContainer.children.push(" + ", next);
                children.splice(j, 1);
                j--;
              } else {
                currentContainer = undefined;
                break;
              }
            }
          }
        }

        if (!hasText || // if this is a plain element with a single text child, leave it
        // as-is since the runtime has dedicated fast path for this by directly
        // setting textContent of the element.
        // for component root it's always normalized anyway.
        children.length === 1 && (node.type === 0
        /* ROOT */
        || node.type === 1
        /* ELEMENT */
        && node.tagType === 0
        /* ELEMENT */
        )) {
          return;
        } // pre-convert text nodes into createTextVNode(text) calls to avoid
        // runtime normalization.


        for (var _i5 = 0; _i5 < children.length; _i5++) {
          var _child = children[_i5];

          if (isText(_child) || _child.type === 8
          /* COMPOUND_EXPRESSION */
          ) {
              var callArgs = []; // createTextVNode defaults to single whitespace, so if it is a
              // single space the code could be an empty call to save bytes.

              if (_child.type !== 2
              /* TEXT */
              || _child.content !== ' ') {
                callArgs.push(_child);
              } // mark dynamic text with flag so it gets patched inside a block


              if (!context.ssr && _child.type !== 2
              /* TEXT */
              ) {
                  callArgs.push("".concat(1
                  /* TEXT */
                  , " /* ", PatchFlagNames[1
                  /* TEXT */
                  ], " */"));
                }

              children[_i5] = {
                type: 12
                /* TEXT_CALL */
                ,
                content: _child,
                loc: _child.loc,
                codegenNode: createCallExpression(context.helper(CREATE_TEXT), callArgs)
              };
            }
        }
      };
    }
};

var transformOnce = function transformOnce(node, context) {
  if (node.type === 1
  /* ELEMENT */
  && findDir(node, 'once', true)) {
    context.helper(SET_BLOCK_TRACKING);
    return function () {
      if (node.codegenNode) {
        node.codegenNode = context.cache(node.codegenNode, true
        /* isVNode */
        );
      }
    };
  }
};

var transformModel = function transformModel(dir, node, context) {
  var exp = dir.exp,
      arg = dir.arg;

  if (!exp) {
    context.onError(createCompilerError(46
    /* X_V_MODEL_NO_EXPRESSION */
    , dir.loc));
    return createTransformProps();
  }

  var expString = exp.type === 4
  /* SIMPLE_EXPRESSION */
  ? exp.content : exp.loc.source;

  if (!isMemberExpression(expString)) {
    context.onError(createCompilerError(47
    /* X_V_MODEL_MALFORMED_EXPRESSION */
    , exp.loc));
    return createTransformProps();
  }

  var propName = arg ? arg : createSimpleExpression('modelValue', true);
  var eventName = arg ? arg.type === 4
  /* SIMPLE_EXPRESSION */
  && arg.isStatic ? "onUpdate:".concat(arg.content) : createCompoundExpression(['"onUpdate:" + ', arg]) : "onUpdate:modelValue";
  var props = [// modelValue: foo
  createObjectProperty(propName, dir.exp), // "onUpdate:modelValue": $event => (foo = $event)
  createObjectProperty(eventName, createCompoundExpression(["$event => (", exp, " = $event)"]))]; // modelModifiers: { foo: true, "bar-baz": true }

  if (dir.modifiers.length && node.tagType === 1
  /* COMPONENT */
  ) {
      var modifiers = dir.modifiers.map(function (m) {
        return (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + ": true";
      }).join(", ");
      var modifiersKey = arg ? arg.type === 4
      /* SIMPLE_EXPRESSION */
      && arg.isStatic ? "".concat(arg.content, "Modifiers") : createCompoundExpression([arg, ' + "Modifiers"']) : "modelModifiers";
      props.push(createObjectProperty(modifiersKey, createSimpleExpression("{ ".concat(modifiers, " }"), false, dir.loc, true)));
    }

  return createTransformProps(props);
};

function createTransformProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    props: props
  };
}

function getBaseTransformPreset(prefixIdentifiers) {
  return [[transformRef, transformOnce, transformIf, transformFor].concat([], [transformSlotOutlet, transformElement, trackSlotScopes, transformText]), {
    on: transformOn,
    bind: transformBind,
    model: transformModel
  }];
} // we name it `baseCompile` so that higher order compilers like
// @vue/compiler-dom can export `compile` while re-exporting everything else.


function baseCompile(template) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onError = options.onError || defaultOnError;
  var isModuleMode = options.mode === 'module';
  /* istanbul ignore if */

  {
    if (options.prefixIdentifiers === true) {
      onError(createCompilerError(51
      /* X_PREFIX_ID_NOT_SUPPORTED */
      ));
    } else if (isModuleMode) {
      onError(createCompilerError(52
      /* X_MODULE_MODE_NOT_SUPPORTED */
      ));
    }
  }
  var prefixIdentifiers = !true;

  if (options.cacheHandlers) {
    onError(createCompilerError(53
    /* X_CACHE_HANDLER_NOT_SUPPORTED */
    ));
  }

  if (options.scopeId && !isModuleMode) {
    onError(createCompilerError(54
    /* X_SCOPE_ID_NOT_SUPPORTED */
    ));
  }

  var ast = isString(template) ? baseParse(template, options) : template;

  var _getBaseTransformPres = getBaseTransformPreset(),
      _getBaseTransformPres2 = _slicedToArray(_getBaseTransformPres, 2),
      nodeTransforms = _getBaseTransformPres2[0],
      directiveTransforms = _getBaseTransformPres2[1];

  transform(ast, { ...options,
    prefixIdentifiers: prefixIdentifiers,
    nodeTransforms: [].concat(_toConsumableArray(nodeTransforms), _toConsumableArray(options.nodeTransforms || [])),
    directiveTransforms: { ...directiveTransforms,
      ...(options.directiveTransforms || {}) // user transforms

    }
  });
  return generate(ast, { ...options,
    prefixIdentifiers: prefixIdentifiers
  });
}

var noopDirectiveTransform = function noopDirectiveTransform() {
  return {
    props: []
  };
};

var V_MODEL_RADIO = Symbol("vModelRadio");
var V_MODEL_CHECKBOX = Symbol("vModelCheckbox");
var V_MODEL_TEXT = Symbol("vModelText");
var V_MODEL_SELECT = Symbol("vModelSelect");
var V_MODEL_DYNAMIC = Symbol("vModelDynamic");
var V_ON_WITH_MODIFIERS = Symbol("vOnModifiersGuard");
var V_ON_WITH_KEYS = Symbol("vOnKeysGuard");
var V_SHOW = Symbol("vShow");
var TRANSITION = Symbol("Transition");
var TRANSITION_GROUP = Symbol("TransitionGroup");
registerRuntimeHelpers((_registerRuntimeHelpe = {}, _defineProperty(_registerRuntimeHelpe, V_MODEL_RADIO, "vModelRadio"), _defineProperty(_registerRuntimeHelpe, V_MODEL_CHECKBOX, "vModelCheckbox"), _defineProperty(_registerRuntimeHelpe, V_MODEL_TEXT, "vModelText"), _defineProperty(_registerRuntimeHelpe, V_MODEL_SELECT, "vModelSelect"), _defineProperty(_registerRuntimeHelpe, V_MODEL_DYNAMIC, "vModelDynamic"), _defineProperty(_registerRuntimeHelpe, V_ON_WITH_MODIFIERS, "withModifiers"), _defineProperty(_registerRuntimeHelpe, V_ON_WITH_KEYS, "withKeys"), _defineProperty(_registerRuntimeHelpe, V_SHOW, "vShow"), _defineProperty(_registerRuntimeHelpe, TRANSITION, "Transition"), _defineProperty(_registerRuntimeHelpe, TRANSITION_GROUP, "TransitionGroup"), _registerRuntimeHelpe));
var isRawTextContainer = /*#__PURE__*/makeMap('style,iframe,script,noscript', true);
var parserOptionsMinimal = {
  isVoidTag: isVoidTag,
  isNativeTag: function isNativeTag(tag) {
    return isHTMLTag(tag) || isSVGTag(tag);
  },
  isPreTag: function isPreTag(tag) {
    return tag === 'pre';
  },
  isBuiltInComponent: function isBuiltInComponent(tag) {
    if (isBuiltInType(tag, "Transition")) {
      return TRANSITION;
    } else if (isBuiltInType(tag, "TransitionGroup")) {
      return TRANSITION_GROUP;
    }
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace: function getNamespace(tag, parent) {
    var ns = parent ? parent.ns : 0
    /* HTML */
    ;

    if (parent && ns === 2
    /* MATH_ML */
    ) {
        if (parent.tag === 'annotation-xml') {
          if (tag === 'svg') {
            return 1
            /* SVG */
            ;
          }

          if (parent.props.some(function (a) {
            return a.type === 6
            /* ATTRIBUTE */
            && a.name === 'encoding' && a.value != null && (a.value.content === 'text/html' || a.value.content === 'application/xhtml+xml');
          })) {
            ns = 0
            /* HTML */
            ;
          }
        } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== 'mglyph' && tag !== 'malignmark') {
          ns = 0
          /* HTML */
          ;
        }
      } else if (parent && ns === 1
    /* SVG */
    ) {
        if (parent.tag === 'foreignObject' || parent.tag === 'desc' || parent.tag === 'title') {
          ns = 0
          /* HTML */
          ;
        }
      }

    if (ns === 0
    /* HTML */
    ) {
        if (tag === 'svg') {
          return 1
          /* SVG */
          ;
        }

        if (tag === 'math') {
          return 2
          /* MATH_ML */
          ;
        }
      }

    return ns;
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#parsing-html-fragments
  getTextMode: function getTextMode(tag, ns) {
    if (ns === 0
    /* HTML */
    ) {
        if (tag === 'textarea' || tag === 'title') {
          return 1
          /* RCDATA */
          ;
        }

        if (isRawTextContainer(tag)) {
          return 2
          /* RAWTEXT */
          ;
        }
      }

    return 0
    /* DATA */
    ;
  }
}; // Parse inline CSS strings for static style attributes into an object.
// This is a NodeTransform since it works on the static `style` attribute and
// converts it into a dynamic equivalent:
// style="color: red" -> :style='{ "color": "red" }'
// It is then processed by `transformElement` and included in the generated
// props.

var transformStyle = function transformStyle(node, context) {
  if (node.type === 1
  /* ELEMENT */
  ) {
      node.props.forEach(function (p, i) {
        if (p.type === 6
        /* ATTRIBUTE */
        && p.name === 'style' && p.value) {
          // replace p with an expression node
          node.props[i] = {
            type: 7
            /* DIRECTIVE */
            ,
            name: "bind",
            arg: createSimpleExpression("style", true, p.loc),
            exp: parseInlineCSS(p.value.content, p.loc),
            modifiers: [],
            loc: p.loc
          };
        }
      });
    }
};

var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:(.+)/;

function parseInlineCSS(cssText, loc) {
  var res = {};
  cssText.split(listDelimiterRE).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return createSimpleExpression(JSON.stringify(res), false, loc, true);
}

function createDOMCompilerError(code, loc) {
  return createCompilerError(code, loc, DOMErrorMessages);
}

var DOMErrorMessages = (_DOMErrorMessages = {}, _defineProperty(_DOMErrorMessages, 55
/* X_V_HTML_NO_EXPRESSION */
, "v-html is missing expression."), _defineProperty(_DOMErrorMessages, 56
/* X_V_HTML_WITH_CHILDREN */
, "v-html will override element children."), _defineProperty(_DOMErrorMessages, 57
/* X_V_TEXT_NO_EXPRESSION */
, "v-text is missing expression."), _defineProperty(_DOMErrorMessages, 58
/* X_V_TEXT_WITH_CHILDREN */
, "v-text will override element children."), _defineProperty(_DOMErrorMessages, 59
/* X_V_MODEL_ON_INVALID_ELEMENT */
, "v-model can only be used on <input>, <textarea> and <select> elements."), _defineProperty(_DOMErrorMessages, 60
/* X_V_MODEL_ARG_ON_ELEMENT */
, "v-model argument is not supported on plain elements."), _defineProperty(_DOMErrorMessages, 61
/* X_V_MODEL_ON_FILE_INPUT_ELEMENT */
, "v-model cannot used on file inputs since they are read-only. Use a v-on:change listener instead."), _defineProperty(_DOMErrorMessages, 62
/* X_V_MODEL_UNNECESSARY_VALUE */
, "Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior."), _defineProperty(_DOMErrorMessages, 63
/* X_V_SHOW_NO_EXPRESSION */
, "v-show is missing expression."), _defineProperty(_DOMErrorMessages, 64
/* X_TRANSITION_INVALID_CHILDREN */
, "<Transition> expects exactly one child element or component."), _DOMErrorMessages);

var transformVHtml = function transformVHtml(dir, node, context) {
  var exp = dir.exp,
      loc = dir.loc;

  if (!exp) {
    context.onError(createDOMCompilerError(55
    /* X_V_HTML_NO_EXPRESSION */
    , loc));
  }

  if (node.children.length) {
    context.onError(createDOMCompilerError(56
    /* X_V_HTML_WITH_CHILDREN */
    , loc));
    node.children.length = 0;
  }

  return {
    props: [createObjectProperty(createSimpleExpression("innerHTML", true, loc), exp || createSimpleExpression('', true))]
  };
};

var transformVText = function transformVText(dir, node, context) {
  var exp = dir.exp,
      loc = dir.loc;

  if (!exp) {
    context.onError(createDOMCompilerError(57
    /* X_V_TEXT_NO_EXPRESSION */
    , loc));
  }

  if (node.children.length) {
    context.onError(createDOMCompilerError(58
    /* X_V_TEXT_WITH_CHILDREN */
    , loc));
    node.children.length = 0;
  }

  return {
    props: [createObjectProperty(createSimpleExpression("textContent", true, loc), exp || createSimpleExpression('', true))]
  };
};

var transformModel$1 = function transformModel$1(dir, node, context) {
  var baseResult = transformModel(dir, node, context); // base transform has errors OR component v-model (only need props)

  if (!baseResult.props.length || node.tagType === 1
  /* COMPONENT */
  ) {
      return baseResult;
    }

  if (dir.arg) {
    context.onError(createDOMCompilerError(60
    /* X_V_MODEL_ARG_ON_ELEMENT */
    , dir.arg.loc));
  }

  function checkDuplicatedValue() {
    var value = findProp(node, 'value');

    if (value) {
      context.onError(createDOMCompilerError(62
      /* X_V_MODEL_UNNECESSARY_VALUE */
      , value.loc));
    }
  }

  var tag = node.tag;

  if (tag === 'input' || tag === 'textarea' || tag === 'select') {
    var directiveToUse = V_MODEL_TEXT;
    var isInvalidType = false;

    if (tag === 'input') {
      var type = findProp(node, "type");

      if (type) {
        if (type.type === 7
        /* DIRECTIVE */
        ) {
            // :type="foo"
            directiveToUse = V_MODEL_DYNAMIC;
          } else if (type.value) {
          switch (type.value.content) {
            case 'radio':
              directiveToUse = V_MODEL_RADIO;
              break;

            case 'checkbox':
              directiveToUse = V_MODEL_CHECKBOX;
              break;

            case 'file':
              isInvalidType = true;
              context.onError(createDOMCompilerError(61
              /* X_V_MODEL_ON_FILE_INPUT_ELEMENT */
              , dir.loc));
              break;

            default:
              // text type
              checkDuplicatedValue();
              break;
          }
        }
      } else if (hasDynamicKeyVBind(node)) {
        // element has bindings with dynamic keys, which can possibly contain
        // "type".
        directiveToUse = V_MODEL_DYNAMIC;
      } else {
        // text type
        checkDuplicatedValue();
      }
    } else if (tag === 'select') {
      directiveToUse = V_MODEL_SELECT;
    } else if (tag === 'textarea') {
      checkDuplicatedValue();
    } // inject runtime directive
    // by returning the helper symbol via needRuntime
    // the import will replaced a resolveDirective call.


    if (!isInvalidType) {
      baseResult.needRuntime = context.helper(directiveToUse);
    }
  } else {
    context.onError(createDOMCompilerError(59
    /* X_V_MODEL_ON_INVALID_ELEMENT */
    , dir.loc));
  }

  return baseResult;
};

var isEventOptionModifier = /*#__PURE__*/makeMap("passive,once,capture");
var isNonKeyModifier = /*#__PURE__*/makeMap( // event propagation management
"stop,prevent,self," + // system modifiers + exact
"ctrl,shift,alt,meta,exact," + // mouse
"left,middle,right");
var isKeyboardEvent = /*#__PURE__*/makeMap("onkeyup,onkeydown,onkeypress", true);

var generateModifiers = function generateModifiers(modifiers) {
  var keyModifiers = [];
  var nonKeyModifiers = [];
  var eventOptionModifiers = [];

  for (var i = 0; i < modifiers.length; i++) {
    var modifier = modifiers[i];

    if (isEventOptionModifier(modifier)) {
      // eventOptionModifiers: modifiers for addEventListener() options, e.g. .passive & .capture
      eventOptionModifiers.push(modifier);
    } else {
      // runtimeModifiers: modifiers that needs runtime guards
      if (isNonKeyModifier(modifier)) {
        nonKeyModifiers.push(modifier);
      } else {
        keyModifiers.push(modifier);
      }
    }
  }

  return {
    keyModifiers: keyModifiers,
    nonKeyModifiers: nonKeyModifiers,
    eventOptionModifiers: eventOptionModifiers
  };
};

var transformClick = function transformClick(key, event) {
  var isStaticClick = key.type === 4
  /* SIMPLE_EXPRESSION */
  && key.isStatic && key.content.toLowerCase() === 'onclick';
  return isStaticClick ? createSimpleExpression(event, true) : key.type !== 4
  /* SIMPLE_EXPRESSION */
  ? createCompoundExpression(["(", key, ").toLowerCase() === \"onclick\" ? \"".concat(event, "\" : ("), key, ")"]) : key;
};

var transformOn$1 = function transformOn$1(dir, node, context) {
  return transformOn(dir, node, context, function (baseResult) {
    var modifiers = dir.modifiers;
    if (!modifiers.length) return baseResult;
    var _baseResult$props$ = baseResult.props[0],
        key = _baseResult$props$.key,
        handlerExp = _baseResult$props$.value;

    var _generateModifiers = generateModifiers(modifiers),
        keyModifiers = _generateModifiers.keyModifiers,
        nonKeyModifiers = _generateModifiers.nonKeyModifiers,
        eventOptionModifiers = _generateModifiers.eventOptionModifiers; // normalize click.right and click.middle since they don't actually fire


    if (nonKeyModifiers.includes('right')) {
      key = transformClick(key, "onContextmenu");
    }

    if (nonKeyModifiers.includes('middle')) {
      key = transformClick(key, "onMouseup");
    }

    if (nonKeyModifiers.length) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [handlerExp, JSON.stringify(nonKeyModifiers)]);
    }

    if (keyModifiers.length && ( // if event name is dynamic, always wrap with keys guard
    key.type === 8
    /* COMPOUND_EXPRESSION */
    || !key.isStatic || isKeyboardEvent(key.content))) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_KEYS), [handlerExp, JSON.stringify(keyModifiers)]);
    }

    if (eventOptionModifiers.length) {
      handlerExp = createObjectExpression([createObjectProperty('handler', handlerExp), createObjectProperty('options', createObjectExpression(eventOptionModifiers.map(function (modifier) {
        return createObjectProperty(modifier, createSimpleExpression('true', false));
      })))]);
    }

    return {
      props: [createObjectProperty(key, handlerExp)]
    };
  });
};

var transformShow = function transformShow(dir, node, context) {
  var exp = dir.exp,
      loc = dir.loc;

  if (!exp) {
    context.onError(createDOMCompilerError(63
    /* X_V_SHOW_NO_EXPRESSION */
    , loc));
  }

  return {
    props: [],
    needRuntime: context.helper(V_SHOW)
  };
};

var warnTransitionChildren = function warnTransitionChildren(node, context) {
  if (node.type === 1
  /* ELEMENT */
  && node.tagType === 1
  /* COMPONENT */
  ) {
      var component = context.isBuiltInComponent(node.tag);

      if (component === TRANSITION && (node.children.length > 1 || node.children[0].type === 11
      /* FOR */
      )) {
        context.onError(createDOMCompilerError(64
        /* X_TRANSITION_INVALID_CHILDREN */
        , {
          start: node.children[0].loc.start,
          end: node.children[node.children.length - 1].loc.end,
          source: ''
        }));
      }
    }
};

var parserOptions = parserOptionsMinimal;
var DOMNodeTransforms = [transformStyle].concat([warnTransitionChildren]);
var DOMDirectiveTransforms = {
  cloak: noopDirectiveTransform,
  html: transformVHtml,
  text: transformVText,
  model: transformModel$1,
  on: transformOn$1,
  show: transformShow
};

function compile(template) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return baseCompile(template, { ...parserOptions,
    ...options,
    nodeTransforms: [].concat(_toConsumableArray(DOMNodeTransforms), _toConsumableArray(options.nodeTransforms || [])),
    directiveTransforms: { ...DOMDirectiveTransforms,
      ...(options.directiveTransforms || {})
    },
    transformHoist: null
  });
}

var targetMap = new WeakMap();
var effectStack = [];
var activeEffect;
var ITERATE_KEY = Symbol('iterate');

function isEffect(fn) {
  return fn != null && fn._isEffect === true;
}

function effect(fn) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EMPTY_OBJ;

  if (isEffect(fn)) {
    fn = fn.raw;
  }

  var effect = createReactiveEffect(fn, options);

  if (!options.lazy) {
    effect();
  }

  return effect;
}

function stop(effect) {
  if (effect.active) {
    cleanup(effect);

    if (effect.options.onStop) {
      effect.options.onStop();
    }

    effect.active = false;
  }
}

function createReactiveEffect(fn, options) {
  var effect = function reactiveEffect() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return run(effect, fn, args);
  };

  effect._isEffect = true;
  effect.active = true;
  effect.raw = fn;
  effect.deps = [];
  effect.options = options;
  return effect;
}

function run(effect, fn, args) {
  if (!effect.active) {
    return fn.apply(void 0, _toConsumableArray(args));
  }

  if (!effectStack.includes(effect)) {
    cleanup(effect);

    try {
      enableTracking();
      effectStack.push(effect);
      activeEffect = effect;
      return fn.apply(void 0, _toConsumableArray(args));
    } finally {
      effectStack.pop();
      resetTracking();
      activeEffect = effectStack[effectStack.length - 1];
    }
  }
}

function cleanup(effect) {
  var deps = effect.deps;

  if (deps.length) {
    for (var i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }

    deps.length = 0;
  }
}

var shouldTrack = true;
var trackStack = [];

function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}

function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}

function resetTracking() {
  var last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
}

function track(target, type, key) {
  if (!shouldTrack || activeEffect === undefined) {
    return;
  }

  var depsMap = targetMap.get(target);

  if (depsMap === void 0) {
    targetMap.set(target, depsMap = new Map());
  }

  var dep = depsMap.get(key);

  if (dep === void 0) {
    depsMap.set(key, dep = new Set());
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);

    if (activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target: target,
        type: type,
        key: key
      });
    }
  }
}

function trigger(target, type, key, newValue, oldValue, oldTarget) {
  var depsMap = targetMap.get(target);

  if (depsMap === void 0) {
    // never been tracked
    return;
  }

  var effects = new Set();
  var computedRunners = new Set();

  if (type === "clear"
  /* CLEAR */
  ) {
      // collection being cleared
      // trigger all effects for target
      depsMap.forEach(function (dep) {
        addRunners(effects, computedRunners, dep);
      });
    } else if (key === 'length' && isArray(target)) {
    depsMap.forEach(function (dep, key) {
      if (key === 'length' || key >= newValue) {
        addRunners(effects, computedRunners, dep);
      }
    });
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      addRunners(effects, computedRunners, depsMap.get(key));
    } // also run for iteration key on ADD | DELETE | Map.SET


    if (type === "add"
    /* ADD */
    || type === "delete"
    /* DELETE */
    || type === "set"
    /* SET */
    && _instanceof(target, Map)) {
      var iterationKey = isArray(target) ? 'length' : ITERATE_KEY;
      addRunners(effects, computedRunners, depsMap.get(iterationKey));
    }
  }

  var run = function run(effect) {
    scheduleRun(effect, target, type, key, {
      newValue: newValue,
      oldValue: oldValue,
      oldTarget: oldTarget
    });
  }; // Important: computed effects must be run first so that computed getters
  // can be invalidated before any normal effects that depend on them are run.


  computedRunners.forEach(run);
  effects.forEach(run);
}

function addRunners(effects, computedRunners, effectsToAdd) {
  if (effectsToAdd !== void 0) {
    effectsToAdd.forEach(function (effect) {
      if (effect !== activeEffect) {
        if (effect.options.computed) {
          computedRunners.add(effect);
        } else {
          effects.add(effect);
        }
      }
    });
  }
}

function scheduleRun(effect, target, type, key, extraInfo) {
  if (effect.options.onTrigger) {
    var event = {
      effect: effect,
      target: target,
      key: key,
      type: type
    };
    effect.options.onTrigger(extraInfo ? extend(event, extraInfo) : event);
  }

  if (effect.options.scheduler !== void 0) {
    effect.options.scheduler(effect);
  } else {
    effect();
  }
} // global immutability lock


var LOCKED = true;

function lock() {
  LOCKED = true;
}

function unlock() {
  LOCKED = false;
}

var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map(function (key) {
  return Symbol[key];
}).filter(isSymbol));
var get = /*#__PURE__*/createGetter();
var shallowReactiveGet = /*#__PURE__*/createGetter(false, true);
var readonlyGet = /*#__PURE__*/createGetter(true);
var shallowReadonlyGet = /*#__PURE__*/createGetter(true, true);
var arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach(function (key) {
  arrayInstrumentations[key] = function () {
    var arr = toRaw(this);

    for (var i = 0, l = this.length; i < l; i++) {
      track(arr, "get"
      /* GET */
      , i + '');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return arr[key].apply(arr, _toConsumableArray(args.map(toRaw)));
  };
});

function createGetter() {
  var isReadonly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var shallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function get(target, key, receiver) {
    if (isArray(target) && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }

    var res = Reflect.get(target, key, receiver);

    if (isSymbol(key) && builtInSymbols.has(key)) {
      return res;
    }

    if (shallow) {
      track(target, "get"
      /* GET */
      , key); // TODO strict mode that returns a shallow-readonly version of the value

      return res;
    } // ref unwrapping, only for Objects, not for Arrays.


    if (isRef(res) && !isArray(target)) {
      return res.value;
    }

    track(target, "get"
    /* GET */
    , key);
    return isObject(res) ? isReadonly ? // need to lazy access readonly and reactive here to avoid
    // circular dependency
    readonly(res) : reactive(res) : res;
  };
}

var set = /*#__PURE__*/createSetter();
var shallowReactiveSet = /*#__PURE__*/createSetter(false, true);
var readonlySet = /*#__PURE__*/createSetter(true);
var shallowReadonlySet = /*#__PURE__*/createSetter(true, true);

function createSetter() {
  var isReadonly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var shallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function set(target, key, value, receiver) {
    if (isReadonly && LOCKED) {
      {
        console.warn("Set operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
      }
      return true;
    }

    var oldValue = target[key];

    if (!shallow) {
      value = toRaw(value);

      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }

    var hadKey = hasOwn(target, key);
    var result = Reflect.set(target, key, value, receiver); // don't trigger if target is something up in the prototype chain of original

    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add"
        /* ADD */
        , key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set"
        /* SET */
        , key, value, oldValue);
      }
    }

    return result;
  };
}

function _deleteProperty(target, key) {
  var hadKey = hasOwn(target, key);
  var oldValue = target[key];
  var result = Reflect.deleteProperty(target, key);

  if (result && hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function has(target, key) {
  var result = Reflect.has(target, key);
  track(target, "has"
  /* HAS */
  , key);
  return result;
}

function ownKeys(target) {
  track(target, "iterate"
  /* ITERATE */
  , ITERATE_KEY);
  return Reflect.ownKeys(target);
}

var mutableHandlers = {
  get: get,
  set: set,
  deleteProperty: _deleteProperty,
  has: has,
  ownKeys: ownKeys
};
var readonlyHandlers = {
  get: readonlyGet,
  set: readonlySet,
  has: has,
  ownKeys: ownKeys,
  deleteProperty: function deleteProperty(target, key) {
    if (LOCKED) {
      {
        console.warn("Delete operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
      }
      return true;
    } else {
      return _deleteProperty(target, key);
    }
  }
};
var shallowReactiveHandlers = { ...mutableHandlers,
  get: shallowReactiveGet,
  set: shallowReactiveSet
}; // Props handlers are special in the sense that it should not unwrap top-level
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.

var shallowReadonlyHandlers = { ...readonlyHandlers,
  get: shallowReadonlyGet,
  set: shallowReadonlySet
};

var toReactive = function toReactive(value) {
  return isObject(value) ? reactive(value) : value;
};

var toReadonly = function toReadonly(value) {
  return isObject(value) ? readonly(value) : value;
};

var getProto = function getProto(v) {
  return Reflect.getPrototypeOf(v);
};

function get$1(target, key, wrap) {
  target = toRaw(target);
  key = toRaw(key);
  track(target, "get"
  /* GET */
  , key);
  return wrap(getProto(target).get.call(target, key));
}

function has$1(key) {
  var target = toRaw(this);
  key = toRaw(key);
  track(target, "has"
  /* HAS */
  , key);
  return getProto(target).has.call(target, key);
}

function size(target) {
  target = toRaw(target);
  track(target, "iterate"
  /* ITERATE */
  , ITERATE_KEY);
  return Reflect.get(getProto(target), 'size', target);
}

function add(value) {
  value = toRaw(value);
  var target = toRaw(this);
  var proto = getProto(target);
  var hadKey = proto.has.call(target, value);
  var result = proto.add.call(target, value);

  if (!hadKey) {
    trigger(target, "add"
    /* ADD */
    , value, value);
  }

  return result;
}

function set$1(key, value) {
  value = toRaw(value);
  key = toRaw(key);
  var target = toRaw(this);
  var proto = getProto(target);
  var hadKey = proto.has.call(target, key);
  var oldValue = proto.get.call(target, key);
  var result = proto.set.call(target, key, value);

  if (!hadKey) {
    trigger(target, "add"
    /* ADD */
    , key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set"
    /* SET */
    , key, value, oldValue);
  }

  return result;
}

function deleteEntry(key) {
  key = toRaw(key);
  var target = toRaw(this);
  var proto = getProto(target);
  var hadKey = proto.has.call(target, key);
  var oldValue = proto.get ? proto.get.call(target, key) : undefined; // forward the operation before queueing reactions

  var result = proto.delete.call(target, key);

  if (hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function clear() {
  var target = toRaw(this);
  var hadItems = target.size !== 0;
  var oldTarget = _instanceof(target, Map) ? new Map(target) : new Set(target); // forward the operation before queueing reactions

  var result = getProto(target).clear.call(target);

  if (hadItems) {
    trigger(target, "clear"
    /* CLEAR */
    , undefined, undefined, oldTarget);
  }

  return result;
}

function createForEach(isReadonly) {
  return function forEach(callback, thisArg) {
    var observed = this;
    var target = toRaw(observed);
    var wrap = isReadonly ? toReadonly : toReactive;
    track(target, "iterate"
    /* ITERATE */
    , ITERATE_KEY); // important: create sure the callback is
    // 1. invoked with the reactive map as `this` and 3rd arg
    // 2. the value received should be a corresponding reactive/readonly.

    function wrappedCallback(value, key) {
      return callback.call(observed, wrap(value), wrap(key), observed);
    }

    return getProto(target).forEach.call(target, wrappedCallback, thisArg);
  };
}

function createIterableMethod(method, isReadonly) {
  return function () {
    var target = toRaw(this);

    var isPair = method === 'entries' || method === Symbol.iterator && _instanceof(target, Map);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var innerIterator = getProto(target)[method].apply(target, args);
    var wrap = isReadonly ? toReadonly : toReactive;
    track(target, "iterate"
    /* ITERATE */
    , ITERATE_KEY); // return a wrapped iterator which returns observed versions of the
    // values emitted from the real iterator

    return _defineProperty({
      // iterator protocol
      next: function next() {
        var _innerIterator$next = innerIterator.next(),
            value = _innerIterator$next.value,
            done = _innerIterator$next.done;

        return done ? {
          value: value,
          done: done
        } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done: done
        };
      }
    }, Symbol.iterator, function () {
      return this;
    });
  };
}

function createReadonlyMethod(method, type) {
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    if (LOCKED) {
      {
        var key = args[0] ? "on key \"".concat(args[0], "\" ") : "";
        console.warn("".concat(capitalize(type), " operation ").concat(key, "failed: target is readonly."), toRaw(this));
      }
      return type === "delete"
      /* DELETE */
      ? false : this;
    } else {
      return method.apply(this, args);
    }
  };
}

var mutableInstrumentations = {
  get: function get(key) {
    return get$1(this, key, toReactive);
  },

  get size() {
    return size(this);
  },

  has: has$1,
  add: add,
  set: set$1,
  delete: deleteEntry,
  clear: clear,
  forEach: createForEach(false)
};
var readonlyInstrumentations = {
  get: function get(key) {
    return get$1(this, key, toReadonly);
  },

  get size() {
    return size(this);
  },

  has: has$1,
  add: createReadonlyMethod(add, "add"
  /* ADD */
  ),
  set: createReadonlyMethod(set$1, "set"
  /* SET */
  ),
  delete: createReadonlyMethod(deleteEntry, "delete"
  /* DELETE */
  ),
  clear: createReadonlyMethod(clear, "clear"
  /* CLEAR */
  ),
  forEach: createForEach(true)
};
var iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
iteratorMethods.forEach(function (method) {
  mutableInstrumentations[method] = createIterableMethod(method, false);
  readonlyInstrumentations[method] = createIterableMethod(method, true);
});

function createInstrumentationGetter(instrumentations) {
  return function (target, key, receiver) {
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}

var mutableCollectionHandlers = {
  get: createInstrumentationGetter(mutableInstrumentations)
};
var readonlyCollectionHandlers = {
  get: createInstrumentationGetter(readonlyInstrumentations)
}; // WeakMaps that store {raw <-> observed} pairs.

var rawToReactive = new WeakMap();
var reactiveToRaw = new WeakMap();
var rawToReadonly = new WeakMap();
var readonlyToRaw = new WeakMap(); // WeakSets for values that are marked readonly or non-reactive during
// observable creation.

var readonlyValues = new WeakSet();
var nonReactiveValues = new WeakSet();
var collectionTypes = new Set([Set, Map, WeakMap, WeakSet]);
var isObservableType = /*#__PURE__*/makeMap('Object,Array,Map,Set,WeakMap,WeakSet');

var canObserve = function canObserve(value) {
  return !value._isVue && !value._isVNode && isObservableType(toRawType(value)) && !nonReactiveValues.has(value);
};

function reactive(target) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (readonlyToRaw.has(target)) {
    return target;
  } // target is explicitly marked as readonly by user


  if (readonlyValues.has(target)) {
    return readonly(target);
  }

  if (isRef(target)) {
    return target;
  }

  return createReactiveObject(target, rawToReactive, reactiveToRaw, mutableHandlers, mutableCollectionHandlers);
}

function readonly(target) {
  // value is a mutable observable, retrieve its original and return
  // a readonly version.
  if (reactiveToRaw.has(target)) {
    target = reactiveToRaw.get(target);
  }

  return createReactiveObject(target, rawToReadonly, readonlyToRaw, readonlyHandlers, readonlyCollectionHandlers);
} // Return a reactive-copy of the original object, where only the root level
// properties are readonly, and does NOT unwrap refs nor recursively convert
// returned properties.
// This is used for creating the props proxy object for stateful components.


function shallowReadonly(target) {
  return createReactiveObject(target, rawToReadonly, readonlyToRaw, shallowReadonlyHandlers, readonlyCollectionHandlers);
} // Return a reactive-copy of the original object, where only the root level
// properties are reactive, and does NOT unwrap refs nor recursively convert
// returned properties.


function shallowReactive(target) {
  return createReactiveObject(target, rawToReactive, reactiveToRaw, shallowReactiveHandlers, mutableCollectionHandlers);
}

function createReactiveObject(target, toProxy, toRaw, baseHandlers, collectionHandlers) {
  if (!isObject(target)) {
    {
      console.warn("value cannot be made reactive: ".concat(String(target)));
    }
    return target;
  } // target already has corresponding Proxy


  var observed = toProxy.get(target);

  if (observed !== void 0) {
    return observed;
  } // target is already a Proxy


  if (toRaw.has(target)) {
    return target;
  } // only a whitelist of value types can be observed.


  if (!canObserve(target)) {
    return target;
  }

  var handlers = collectionTypes.has(target.constructor) ? collectionHandlers : baseHandlers;
  observed = new Proxy(target, handlers);
  toProxy.set(target, observed);
  toRaw.set(observed, target);
  return observed;
}

function isReactive(value) {
  return reactiveToRaw.has(value) || readonlyToRaw.has(value);
}

function isReadonly(value) {
  return readonlyToRaw.has(value);
}

function toRaw(observed) {
  return reactiveToRaw.get(observed) || readonlyToRaw.get(observed) || observed;
}

function markReadonly(value) {
  readonlyValues.add(value);
  return value;
}

function markNonReactive(value) {
  nonReactiveValues.add(value);
  return value;
}

var convert = function convert(val) {
  return isObject(val) ? reactive(val) : val;
};

function isRef(r) {
  return r ? r._isRef === true : false;
}

function ref(value) {
  return createRef(value);
}

function shallowRef(value) {
  return createRef(value, true);
}

function createRef(value) {
  var shallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isRef(value)) {
    return value;
  }

  if (!shallow) {
    value = convert(value);
  }

  var r = {
    _isRef: true,

    get value() {
      track(r, "get"
      /* GET */
      , 'value');
      return value;
    },

    set value(newVal) {
      value = shallow ? newVal : convert(newVal);
      trigger(r, "set"
      /* SET */
      , 'value', {
        newValue: newVal
      });
    }

  };
  return r;
}

function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}

function toRefs(object) {
  if (!isReactive(object)) {
    console.warn("toRefs() expects a reactive object but received a plain one.");
  }

  var ret = {};

  for (var key in object) {
    ret[key] = toProxyRef(object, key);
  }

  return ret;
}

function toProxyRef(object, key) {
  return {
    _isRef: true,

    get value() {
      return object[key];
    },

    set value(newVal) {
      object[key] = newVal;
    }

  };
}

function computed(getterOrOptions) {
  var getter;
  var setter;

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;

    setter = function setter() {
      console.warn('Write operation failed: computed value is readonly');
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  var dirty = true;
  var value;
  var computed;
  var runner = effect(getter, {
    lazy: true,
    // mark effect as computed so that it gets priority during trigger
    computed: true,
    scheduler: function scheduler() {
      if (!dirty) {
        dirty = true;
        trigger(computed, "set"
        /* SET */
        , 'value');
      }
    }
  });
  computed = {
    _isRef: true,
    // expose effect so computed can be stopped
    effect: runner,

    get value() {
      if (dirty) {
        value = runner();
        dirty = false;
      }

      track(computed, "get"
      /* GET */
      , 'value');
      return value;
    },

    set value(newValue) {
      setter(newValue);
    }

  };
  return computed;
}

var stack = [];

function pushWarningContext(vnode) {
  stack.push(vnode);
}

function popWarningContext() {
  stack.pop();
}

function warn(msg) {
  // avoid props formatting or warn handler tracking deps that might be mutated
  // during patch, leading to infinite recursion.
  pauseTracking();
  var instance = stack.length ? stack[stack.length - 1].component : null;
  var appWarnHandler = instance && instance.appContext.config.warnHandler;
  var trace = getComponentTrace();

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 10
    /* APP_WARN_HANDLER */
    , [msg + args.join(''), instance && instance.proxy, trace.map(function (_ref7) {
      var vnode = _ref7.vnode;
      return "at <".concat(formatComponentName(vnode), ">");
    }).join('\n'), trace]);
  } else {
    var _console;

    var warnArgs = ["[Vue warn]: ".concat(msg)].concat(args);

    if (trace.length && // avoid spamming console during tests
    !false) {
      warnArgs.push.apply(warnArgs, ["\n"].concat(_toConsumableArray(formatTrace(trace))));
    }

    (_console = console).warn.apply(_console, _toConsumableArray(warnArgs));
  }

  resetTracking();
}

function getComponentTrace() {
  var currentVNode = stack[stack.length - 1];

  if (!currentVNode) {
    return [];
  } // we can't just use the stack because it will be incomplete during updates
  // that did not start from the root. Re-construct the parent chain using
  // instance parent pointers.


  var normalizedStack = [];

  while (currentVNode) {
    var _last = normalizedStack[0];

    if (_last && _last.vnode === currentVNode) {
      _last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }

    var parentInstance = currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }

  return normalizedStack;
}

function formatTrace(trace) {
  var logs = [];
  trace.forEach(function (entry, i) {
    logs.push.apply(logs, _toConsumableArray(i === 0 ? [] : ["\n"]).concat(_toConsumableArray(formatTraceEntry(entry))));
  });
  return logs;
}

function formatTraceEntry(_ref8) {
  var vnode = _ref8.vnode,
      recurseCount = _ref8.recurseCount;
  var postfix = recurseCount > 0 ? "... (".concat(recurseCount, " recursive calls)") : "";
  var open = " at <".concat(formatComponentName(vnode));
  var close = ">" + postfix;
  var rootLabel = vnode.component.parent == null ? "(Root)" : "";
  return vnode.props ? [open].concat(_toConsumableArray(formatProps(vnode.props)), [close, rootLabel]) : [open + close, rootLabel];
}

var classifyRE = /(?:^|[-_])(\w)/g;

var classify = function classify(str) {
  return str.replace(classifyRE, function (c) {
    return c.toUpperCase();
  }).replace(/[-_]/g, '');
};

function formatComponentName(vnode, file) {
  var Component = vnode.type;
  var name = isFunction(Component) ? Component.displayName || Component.name : Component.name;

  if (!name && file) {
    var match = file.match(/([^/\\]+)\.vue$/);

    if (match) {
      name = match[1];
    }
  }

  return name ? classify(name) : 'Anonymous';
}

function formatProps(props) {
  var res = [];
  var keys = Object.keys(props);
  keys.slice(0, 3).forEach(function (key) {
    res.push.apply(res, _toConsumableArray(formatProp(key, props[key])));
  });

  if (keys.length > 3) {
    res.push(" ...");
  }

  return res;
}

function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : ["".concat(key, "=").concat(value)];
  } else if (typeof value === 'number' || typeof value === 'boolean' || value == null) {
    return raw ? value : ["".concat(key, "=").concat(value)];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : ["".concat(key, "=Ref<"), value, ">"];
  } else if (isFunction(value)) {
    return ["".concat(key, "=fn").concat(value.name ? "<".concat(value.name, ">") : "")];
  } else {
    value = toRaw(value);
    return raw ? value : ["".concat(key, "="), value];
  }
}

var ErrorTypeStrings = (_ErrorTypeStrings = {}, _defineProperty(_ErrorTypeStrings, "bc"
/* BEFORE_CREATE */
, 'beforeCreate hook'), _defineProperty(_ErrorTypeStrings, "c"
/* CREATED */
, 'created hook'), _defineProperty(_ErrorTypeStrings, "bm"
/* BEFORE_MOUNT */
, 'beforeMount hook'), _defineProperty(_ErrorTypeStrings, "m"
/* MOUNTED */
, 'mounted hook'), _defineProperty(_ErrorTypeStrings, "bu"
/* BEFORE_UPDATE */
, 'beforeUpdate hook'), _defineProperty(_ErrorTypeStrings, "u"
/* UPDATED */
, 'updated'), _defineProperty(_ErrorTypeStrings, "bum"
/* BEFORE_UNMOUNT */
, 'beforeUnmount hook'), _defineProperty(_ErrorTypeStrings, "um"
/* UNMOUNTED */
, 'unmounted hook'), _defineProperty(_ErrorTypeStrings, "a"
/* ACTIVATED */
, 'activated hook'), _defineProperty(_ErrorTypeStrings, "da"
/* DEACTIVATED */
, 'deactivated hook'), _defineProperty(_ErrorTypeStrings, "ec"
/* ERROR_CAPTURED */
, 'errorCaptured hook'), _defineProperty(_ErrorTypeStrings, "rtc"
/* RENDER_TRACKED */
, 'renderTracked hook'), _defineProperty(_ErrorTypeStrings, "rtg"
/* RENDER_TRIGGERED */
, 'renderTriggered hook'), _defineProperty(_ErrorTypeStrings, 0
/* SETUP_FUNCTION */
, 'setup function'), _defineProperty(_ErrorTypeStrings, 1
/* RENDER_FUNCTION */
, 'render function'), _defineProperty(_ErrorTypeStrings, 2
/* WATCH_GETTER */
, 'watcher getter'), _defineProperty(_ErrorTypeStrings, 3
/* WATCH_CALLBACK */
, 'watcher callback'), _defineProperty(_ErrorTypeStrings, 4
/* WATCH_CLEANUP */
, 'watcher cleanup function'), _defineProperty(_ErrorTypeStrings, 5
/* NATIVE_EVENT_HANDLER */
, 'native event handler'), _defineProperty(_ErrorTypeStrings, 6
/* COMPONENT_EVENT_HANDLER */
, 'component event handler'), _defineProperty(_ErrorTypeStrings, 7
/* DIRECTIVE_HOOK */
, 'directive hook'), _defineProperty(_ErrorTypeStrings, 8
/* TRANSITION_HOOK */
, 'transition hook'), _defineProperty(_ErrorTypeStrings, 9
/* APP_ERROR_HANDLER */
, 'app errorHandler'), _defineProperty(_ErrorTypeStrings, 10
/* APP_WARN_HANDLER */
, 'app warnHandler'), _defineProperty(_ErrorTypeStrings, 11
/* FUNCTION_REF */
, 'ref function'), _defineProperty(_ErrorTypeStrings, 12
/* SCHEDULER */
, 'scheduler flush. This is likely a Vue internals bug. ' + 'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next'), _ErrorTypeStrings);

function callWithErrorHandling(fn, instance, type, args) {
  var res;

  try {
    res = args ? fn.apply(void 0, _toConsumableArray(args)) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }

  return res;
}

function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    var res = callWithErrorHandling(fn, instance, type, args);

    if (res != null && !res._isVue && isPromise(res)) {
      res.catch(function (err) {
        handleError(err, instance, type);
      });
    }

    return res;
  }

  var values = [];

  for (var i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }

  return values;
}

function handleError(err, instance, type) {
  var contextVNode = instance ? instance.vnode : null;

  if (instance) {
    var cur = instance.parent; // the exposed instance is the render proxy to keep it consistent with 2.x

    var exposedInstance = instance.proxy; // in production the hook receives only the error code

    var errorInfo = ErrorTypeStrings[type];

    while (cur) {
      var errorCapturedHooks = cur.ec;

      if (errorCapturedHooks !== null) {
        for (var i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo)) {
            return;
          }
        }
      }

      cur = cur.parent;
    } // app-level handling


    var appErrorHandler = instance.appContext.config.errorHandler;

    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 9
      /* APP_ERROR_HANDLER */
      , [err, exposedInstance, errorInfo]);
      return;
    }
  }

  logError(err, type, contextVNode);
}

function logError(err, type, contextVNode) {
  // default behavior is crash in prod & test, recover in dev.
  {
    var info = ErrorTypeStrings[type];

    if (contextVNode) {
      pushWarningContext(contextVNode);
    }

    warn("Unhandled error".concat(info ? " during execution of ".concat(info) : ""));
    console.error(err);

    if (contextVNode) {
      popWarningContext();
    }
  }
}

var queue = [];
var postFlushCbs = [];
var p = Promise.resolve();
var isFlushing = false;
var isFlushPending = false;
var RECURSION_LIMIT = 100;

function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job);
    queueFlush();
  }
}

function invalidateJob(job) {
  var i = queue.indexOf(job);

  if (i > -1) {
    queue[i] = null;
  }
}

function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    postFlushCbs.push(cb);
  } else {
    postFlushCbs.push.apply(postFlushCbs, _toConsumableArray(cb));
  }

  queueFlush();
}

function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    nextTick(flushJobs);
  }
}

var dedupe = function dedupe(cbs) {
  return _toConsumableArray(new Set(cbs));
};

function flushPostFlushCbs(seen) {
  if (postFlushCbs.length) {
    var cbs = dedupe(postFlushCbs);
    postFlushCbs.length = 0;
    {
      seen = seen || new Map();
    }

    for (var i = 0; i < cbs.length; i++) {
      {
        checkRecursiveUpdates(seen, cbs[i]);
      }
      cbs[i]();
    }
  }
}

function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  var job;
  {
    seen = seen || new Map();
  }

  while ((job = queue.shift()) !== undefined) {
    if (job === null) {
      continue;
    }

    {
      checkRecursiveUpdates(seen, job);
    }
    callWithErrorHandling(job, null, 12
    /* SCHEDULER */
    );
  }

  flushPostFlushCbs(seen);
  isFlushing = false; // some postFlushCb queued jobs!
  // keep flushing until it drains.

  if (queue.length || postFlushCbs.length) {
    flushJobs(seen);
  }
}

function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    var count = seen.get(fn);

    if (count > RECURSION_LIMIT) {
      throw new Error('Maximum recursive updates exceeded. ' + "You may have code that is mutating state in your component's " + 'render function or updated hook or watcher source function.');
    } else {
      seen.set(fn, count + 1);
    }
  }
} // mark the current rendering instance for asset resolution (e.g.
// resolveComponent, resolveDirective) during render


var currentRenderingInstance = null; // dev only flag to track whether $attrs was used during render.
// If $attrs was used during render then the warning for failed attrs
// fallthrough can be suppressed.

var accessedAttrs = false;

function markAttrsAccessed() {
  accessedAttrs = true;
}

function renderComponentRoot(instance) {
  var Component = instance.type,
      parent = instance.parent,
      vnode = instance.vnode,
      proxy = instance.proxy,
      withProxy = instance.withProxy,
      props = instance.props,
      slots = instance.slots,
      attrs = instance.attrs,
      vnodeHooks = instance.vnodeHooks,
      emit = instance.emit,
      renderCache = instance.renderCache;
  var result;
  currentRenderingInstance = instance;
  {
    accessedAttrs = false;
  }

  try {
    if (vnode.shapeFlag & 4
    /* STATEFUL_COMPONENT */
    ) {
        // withProxy is a proxy with a diffrent `has` trap only for
        // runtime-compiled render functions using `with` block.
        var proxyToUse = withProxy || proxy;
        result = normalizeVNode(instance.render.call(proxyToUse, proxyToUse, renderCache));
      } else {
      // functional
      var _render = Component;
      result = normalizeVNode(_render.length > 1 ? _render(props, {
        attrs: attrs,
        slots: slots,
        emit: emit
      }) : _render(props, null
      /* we know it doesn't need it */
      ));
    } // attr merging


    if (Component.props != null && Component.inheritAttrs !== false && attrs !== EMPTY_OBJ && Object.keys(attrs).length) {
      if (result.shapeFlag & 1
      /* ELEMENT */
      || result.shapeFlag & 6
      /* COMPONENT */
      ) {
          result = cloneVNode(result, attrs);
        } else if (true && !accessedAttrs && result.type !== Comment) {
        warn("Extraneous non-props attributes (".concat(Object.keys(attrs).join(','), ") ") + "were passed to component but could not be automatically inherited " + "because component renders fragment or text root nodes.");
      }
    } // inherit vnode hooks


    if (vnodeHooks !== EMPTY_OBJ) {
      result = cloneVNode(result, vnodeHooks);
    } // inherit scopeId


    var parentScopeId = parent && parent.type.__scopeId;

    if (parentScopeId) {
      result = cloneVNode(result, _defineProperty({}, parentScopeId, ''));
    } // inherit directives


    if (vnode.dirs != null) {
      if (true && !isElementRoot(result)) {
        warn("Runtime directive used on component with non-element root node. " + "The directives will not function as intended.");
      }

      result.dirs = vnode.dirs;
    } // inherit transition data


    if (vnode.transition != null) {
      if (true && !isElementRoot(result)) {
        warn("Component inside <Transition> renders non-element root node " + "that cannot be animated.");
      }

      result.transition = vnode.transition;
    }
  } catch (err) {
    handleError(err, instance, 1
    /* RENDER_FUNCTION */
    );
    result = createVNode(Comment);
  }

  currentRenderingInstance = null;
  return result;
}

function isElementRoot(vnode) {
  return vnode.shapeFlag & 6
  /* COMPONENT */
  || vnode.shapeFlag & 1
  /* ELEMENT */
  || vnode.type === Comment // potential v-if branch switch
  ;
}

function shouldUpdateComponent(prevVNode, nextVNode, parentComponent, optimized) {
  var prevProps = prevVNode.props,
      prevChildren = prevVNode.children;
  var nextProps = nextVNode.props,
      nextChildren = nextVNode.children,
      patchFlag = nextVNode.patchFlag; // force child update on runtime directive usage on component vnode.

  if (nextVNode.dirs != null) {
    return true;
  }

  if (patchFlag > 0) {
    if (patchFlag & 1024
    /* DYNAMIC_SLOTS */
    ) {
        // slot content that references values that might have changed,
        // e.g. in a v-for
        return true;
      }

    if (patchFlag & 16
    /* FULL_PROPS */
    ) {
        // presence of this flag indicates props are always non-null
        return hasPropsChanged(prevProps, nextProps);
      } else {
      if (patchFlag & 2
      /* CLASS */
      ) {
          return prevProps.class === nextProps.class;
        }

      if (patchFlag & 4
      /* STYLE */
      ) {
          return hasPropsChanged(prevProps.style, nextProps.style);
        }

      if (patchFlag & 8
      /* PROPS */
      ) {
          var dynamicProps = nextVNode.dynamicProps;

          for (var i = 0; i < dynamicProps.length; i++) {
            var key = dynamicProps[i];

            if (nextProps[key] !== prevProps[key]) {
              return true;
            }
          }
        }
    }
  } else if (!optimized) {
    // this path is only taken by manually written render functions
    // so presence of any children leads to a forced update
    if (prevChildren != null || nextChildren != null) {
      if (nextChildren == null || !nextChildren.$stable) {
        return true;
      }
    }

    if (prevProps === nextProps) {
      return false;
    }

    if (prevProps === null) {
      return nextProps !== null;
    }

    if (nextProps === null) {
      return true;
    }

    return hasPropsChanged(prevProps, nextProps);
  }

  return false;
}

function hasPropsChanged(prevProps, nextProps) {
  var nextKeys = Object.keys(nextProps);

  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }

  for (var i = 0; i < nextKeys.length; i++) {
    var key = nextKeys[i];

    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }

  return false;
}

function updateHOCHostEl(_ref9, el // HostNode
) {
  var vnode = _ref9.vnode,
      parent = _ref9.parent;

  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}

var isSuspense = function isSuspense(type) {
  return type.__isSuspense;
}; // Suspense exposes a component-like API, and is treated like a component
// in the compiler, but internally it's a special built-in type that hooks
// directly into the renderer.


var SuspenseImpl = {
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,
  process: function process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, // platform-specific impl passed from renderer
  rendererInternals) {
    if (n1 == null) {
      mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, rendererInternals);
    } else {
      patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, optimized, rendererInternals);
    }
  }
}; // Force-casted public typing for h and TSX props inference

var Suspense = SuspenseImpl;
exports.Suspense = Suspense;

function mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, rendererInternals) {
  var patch = rendererInternals.p,
      createElement = rendererInternals.o.createElement;
  var hiddenContainer = createElement('div');
  var suspense = n2.suspense = createSuspenseBoundary(n2, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, optimized, rendererInternals);

  var _normalizeSuspenseChi = normalizeSuspenseChildren(n2),
      content = _normalizeSuspenseChi.content,
      fallback = _normalizeSuspenseChi.fallback;

  suspense.subTree = content;
  suspense.fallbackTree = fallback; // start mounting the content subtree in an off-dom container

  patch(null, content, hiddenContainer, null, parentComponent, suspense, isSVG, optimized); // now check if we have encountered any async deps

  if (suspense.deps > 0) {
    // mount the fallback tree
    patch(null, fallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
    isSVG, optimized);
    n2.el = fallback.el;
  } else {
    // Suspense has no async deps. Just resolve.
    suspense.resolve();
  }
}

function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, optimized, _ref10) {
  var patch = _ref10.p;
  var suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;

  var _normalizeSuspenseChi2 = normalizeSuspenseChildren(n2),
      content = _normalizeSuspenseChi2.content,
      fallback = _normalizeSuspenseChi2.fallback;

  var oldSubTree = suspense.subTree;
  var oldFallbackTree = suspense.fallbackTree;

  if (!suspense.isResolved) {
    patch(oldSubTree, content, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, optimized);

    if (suspense.deps > 0) {
      // still pending. patch the fallback tree.
      patch(oldFallbackTree, fallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
      isSVG, optimized);
      n2.el = fallback.el;
    } // If deps somehow becomes 0 after the patch it means the patch caused an
    // async dep component to unmount and removed its dep. It will cause the
    // suspense to resolve and we don't need to do anything here.

  } else {
    // just normal patch inner content as a fragment
    patch(oldSubTree, content, container, anchor, parentComponent, suspense, isSVG, optimized);
    n2.el = content.el;
  }

  suspense.subTree = content;
  suspense.fallbackTree = fallback;
}

function createSuspenseBoundary(vnode, parent, parentComponent, container, hiddenContainer, anchor, isSVG, optimized, rendererInternals) {
  var patch = rendererInternals.p,
      _move = rendererInternals.m,
      _unmount2 = rendererInternals.um,
      _next = rendererInternals.n,
      parentNode = rendererInternals.o.parentNode;
  var suspense = {
    vnode: vnode,
    parent: parent,
    parentComponent: parentComponent,
    isSVG: isSVG,
    optimized: optimized,
    container: container,
    hiddenContainer: hiddenContainer,
    anchor: anchor,
    deps: 0,
    subTree: null,
    fallbackTree: null,
    isResolved: false,
    isUnmounted: false,
    effects: [],
    resolve: function resolve() {
      {
        if (suspense.isResolved) {
          throw new Error("resolveSuspense() is called on an already resolved suspense boundary.");
        }

        if (suspense.isUnmounted) {
          throw new Error("resolveSuspense() is called on an already unmounted suspense boundary.");
        }
      }
      var vnode = suspense.vnode,
          subTree = suspense.subTree,
          fallbackTree = suspense.fallbackTree,
          effects = suspense.effects,
          parentComponent = suspense.parentComponent,
          container = suspense.container; // this is initial anchor on mount

      var anchor = suspense.anchor; // unmount fallback tree

      if (fallbackTree.el) {
        // if the fallback tree was mounted, it may have been moved
        // as part of a parent suspense. get the latest anchor for insertion
        anchor = _next(fallbackTree);

        _unmount2(fallbackTree, parentComponent, suspense, true);
      } // move content from off-dom container to actual container


      _move(subTree, container, anchor, 0
      /* ENTER */
      );

      var el = vnode.el = subTree.el; // suspense as the root node of a component...

      if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
      } // check if there is a pending parent suspense


      var parent = suspense.parent;
      var hasUnresolvedAncestor = false;

      while (parent) {
        if (!parent.isResolved) {
          var _parent$effects;

          // found a pending parent suspense, merge buffered post jobs
          // into that parent
          (_parent$effects = parent.effects).push.apply(_parent$effects, _toConsumableArray(effects));

          hasUnresolvedAncestor = true;
          break;
        }

        parent = parent.parent;
      } // no pending parent suspense, flush all jobs


      if (!hasUnresolvedAncestor) {
        queuePostFlushCb(effects);
      }

      suspense.isResolved = true; // invoke @resolve event

      var onResolve = vnode.props && vnode.props.onResolve;

      if (isFunction(onResolve)) {
        onResolve();
      }
    },
    recede: function recede() {
      suspense.isResolved = false;
      var vnode = suspense.vnode,
          subTree = suspense.subTree,
          fallbackTree = suspense.fallbackTree,
          parentComponent = suspense.parentComponent,
          container = suspense.container,
          hiddenContainer = suspense.hiddenContainer,
          isSVG = suspense.isSVG,
          optimized = suspense.optimized; // move content tree back to the off-dom container

      var anchor = _next(subTree);

      _move(subTree, hiddenContainer, null, 1
      /* LEAVE */
      ); // remount the fallback tree


      patch(null, fallbackTree, container, anchor, parentComponent, null, // fallback tree will not have suspense context
      isSVG, optimized);
      var el = vnode.el = fallbackTree.el; // suspense as the root node of a component...

      if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
      } // invoke @recede event


      var onRecede = vnode.props && vnode.props.onRecede;

      if (isFunction(onRecede)) {
        onRecede();
      }
    },
    move: function move(container, anchor, type) {
      _move(suspense.isResolved ? suspense.subTree : suspense.fallbackTree, container, anchor, type);

      suspense.container = container;
    },
    next: function next() {
      return _next(suspense.isResolved ? suspense.subTree : suspense.fallbackTree);
    },
    registerDep: function registerDep(instance, setupRenderEffect) {
      // suspense is already resolved, need to recede.
      // use queueJob so it's handled synchronously after patching the current
      // suspense tree
      if (suspense.isResolved) {
        queueJob(function () {
          suspense.recede();
        });
      }

      suspense.deps++;
      instance.asyncDep.catch(function (err) {
        handleError(err, instance, 0
        /* SETUP_FUNCTION */
        );
      }).then(function (asyncSetupResult) {
        // retry when the setup() promise resolves.
        // component may have been unmounted before resolve.
        if (instance.isUnmounted || suspense.isUnmounted) {
          return;
        }

        suspense.deps--; // retry from this component

        instance.asyncResolved = true;
        var vnode = instance.vnode;
        {
          pushWarningContext(vnode);
        }
        handleSetupResult(instance, asyncSetupResult, suspense); // unset placeholder, otherwise this will be treated as a hydration mount

        vnode.el = null;
        setupRenderEffect(instance, vnode, // component may have been moved before resolve
        parentNode(instance.subTree.el), _next(instance.subTree), suspense, isSVG);
        updateHOCHostEl(instance, vnode.el);
        {
          popWarningContext();
        }

        if (suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },
    unmount: function unmount(parentSuspense, doRemove) {
      suspense.isUnmounted = true;

      _unmount2(suspense.subTree, parentComponent, parentSuspense, doRemove);

      if (!suspense.isResolved) {
        _unmount2(suspense.fallbackTree, parentComponent, parentSuspense, doRemove);
      }
    }
  };
  return suspense;
}

function normalizeSuspenseChildren(vnode) {
  var shapeFlag = vnode.shapeFlag,
      children = vnode.children;

  if (shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
      var d = children.default,
          fallback = children.fallback;
      return {
        content: normalizeVNode(isFunction(d) ? d() : d),
        fallback: normalizeVNode(isFunction(fallback) ? fallback() : fallback)
      };
    } else {
    return {
      content: normalizeVNode(children),
      fallback: normalizeVNode(null)
    };
  }
}

function queueEffectWithSuspense(fn, suspense) {
  if (suspense !== null && !suspense.isResolved) {
    if (isArray(fn)) {
      var _suspense$effects;

      (_suspense$effects = suspense.effects).push.apply(_suspense$effects, _toConsumableArray(fn));
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
} // SFC scoped style ID management.
// These are only used in esm-bundler builds, but since exports cannot be
// conditional, we can only drop inner implementations in non-bundler builds.


var currentScopeId = null;

function pushScopeId(id) {}

function popScopeId() {}

function withScopeId(id) {
  {
    return undefined;
  }
}

var isPortal = function isPortal(type) {
  return type.__isPortal;
};

var PortalImpl = {
  __isPortal: true,
  process: function process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, _ref11) {
    var mountChildren = _ref11.mc,
        patchChildren = _ref11.pc,
        patchBlockChildren = _ref11.pbc,
        move = _ref11.m,
        insertComment = _ref11.c,
        _ref11$o = _ref11.o,
        querySelector = _ref11$o.querySelector,
        setElementText = _ref11$o.setElementText;
    var targetSelector = n2.props && n2.props.target;
    var patchFlag = n2.patchFlag,
        shapeFlag = n2.shapeFlag,
        children = n2.children;

    if (n1 == null) {
      if (isString(targetSelector) && !querySelector) {
        warn("Current renderer does not support string target for Portals. " + "(missing querySelector renderer option)");
      }

      var target = n2.target = isString(targetSelector) ? querySelector(targetSelector) : targetSelector;

      if (target != null) {
        if (shapeFlag & 8
        /* TEXT_CHILDREN */
        ) {
            setElementText(target, children);
          } else if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            mountChildren(children, target, null, parentComponent, parentSuspense, isSVG, optimized);
          }
      } else {
        warn('Invalid Portal target on mount:', target, "(".concat(_typeof(target), ")"));
      }
    } else {
      // update content
      var _target2 = n2.target = n1.target;

      if (patchFlag === 1
      /* TEXT */
      ) {
          setElementText(_target2, children);
        } else if (n2.dynamicChildren) {
        // fast path when the portal happens to be a block root
        patchBlockChildren(n1.dynamicChildren, n2.dynamicChildren, container, parentComponent, parentSuspense, isSVG);
      } else if (!optimized) {
        patchChildren(n1, n2, _target2, null, parentComponent, parentSuspense, isSVG);
      } // target changed


      if (targetSelector !== (n1.props && n1.props.target)) {
        var nextTarget = n2.target = isString(targetSelector) ? querySelector(targetSelector) : targetSelector;

        if (nextTarget != null) {
          // move content
          if (shapeFlag & 8
          /* TEXT_CHILDREN */
          ) {
              setElementText(_target2, '');
              setElementText(nextTarget, children);
            } else if (shapeFlag & 16
          /* ARRAY_CHILDREN */
          ) {
              for (var i = 0; i < children.length; i++) {
                move(children[i], nextTarget, null, 2
                /* REORDER */
                );
              }
            }
        } else {
          warn('Invalid Portal target on update:', _target2, "(".concat(_typeof(_target2), ")"));
        }
      }
    } // insert an empty node as the placeholder for the portal


    insertComment(n1, n2, container, anchor);
  }
}; // Force-casted public typing for h and TSX props inference

var Portal = PortalImpl;
exports.Portal = Portal;
var Fragment = Symbol('Fragment');
exports.Fragment = Fragment;
var Text = Symbol('Text');
exports.Text = Text;
var Comment = Symbol('Comment');
exports.Comment = Comment;
var Static = Symbol('Static'); // Since v-if and v-for are the two possible ways node structure can dynamically
// change, once we consider v-if branches and each v-for fragment a block, we
// can divide a template into nested blocks, and within each block the node
// structure would be stable. This allows us to skip most children diffing
// and only worry about the dynamic nodes (indicated by patch flags).

var blockStack = [];
var currentBlock = null; // Open a block.
// This must be called before `createBlock`. It cannot be part of `createBlock`
// because the children of the block are evaluated before `createBlock` itself
// is called. The generated code typically looks like this:
//
//   function render() {
//     return (openBlock(),createBlock('div', null, [...]))
//   }
//
// disableTracking is true when creating a fragment block, since a fragment
// always diffs its children.

function openBlock() {
  var disableTracking = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  blockStack.push(currentBlock = disableTracking ? null : []);
} // Whether we should be tracking dynamic child nodes inside a block.
// Only tracks when this value is > 0
// We are not using a simple boolean because this value may need to be
// incremented/decremented by nested usage of v-once (see below)


var shouldTrack$1 = 1; // Block tracking sometimes needs to be disabled, for example during the
// creation of a tree that needs to be cached by v-once. The compiler generates
// code like this:
//   _cache[1] || (
//     setBlockTracking(-1),
//     _cache[1] = createVNode(...),
//     setBlockTracking(1),
//     _cache[1]
//   )

function setBlockTracking(value) {
  shouldTrack$1 += value;
} // Create a block root vnode. Takes the same exact arguments as `createVNode`.
// A block root keeps track of dynamic nodes within the block in the
// `dynamicChildren` array.


function createBlock(type, props, children, patchFlag, dynamicProps) {
  // avoid a block with patchFlag tracking itself
  shouldTrack$1--;
  var vnode = createVNode(type, props, children, patchFlag, dynamicProps);
  shouldTrack$1++; // save current block children on the block vnode

  vnode.dynamicChildren = currentBlock || EMPTY_ARR; // close block

  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null; // a block is always going to be patched, so track it as a child of its
  // parent block

  if (currentBlock !== null) {
    currentBlock.push(vnode);
  }

  return vnode;
}

function isVNode(value) {
  return value ? value._isVNode === true : false;
}

function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}

function createVNode(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var patchFlag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var dynamicProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (!type) {
    warn("Invalid vnode type when creating vnode: ".concat(type, "."));
    type = Comment;
  } // class & style normalization.


  if (props !== null) {
    // for reactive or proxy objects, we need to clone it to enable mutation.
    if (isReactive(props) || SetupProxySymbol in props) {
      props = extend({}, props);
    }

    var _props2 = props,
        klass = _props2.class,
        style = _props2.style;

    if (klass != null && !isString(klass)) {
      props.class = normalizeClass(klass);
    }

    if (isObject(style)) {
      // reactive state objects need to be cloned since they are likely to be
      // mutated
      if (isReactive(style) && !isArray(style)) {
        style = extend({}, style);
      }

      props.style = normalizeStyle(style);
    }
  } // encode the vnode type information into a bitmap


  var shapeFlag = isString(type) ? 1
  /* ELEMENT */
  : isSuspense(type) ? 128
  /* SUSPENSE */
  : isPortal(type) ? 64
  /* PORTAL */
  : isObject(type) ? 4
  /* STATEFUL_COMPONENT */
  : isFunction(type) ? 2
  /* FUNCTIONAL_COMPONENT */
  : 0;
  var vnode = {
    _isVNode: true,
    type: type,
    props: props,
    key: props !== null && props.key || null,
    ref: props !== null && props.ref || null,
    scopeId: currentScopeId,
    children: null,
    component: null,
    suspense: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    shapeFlag: shapeFlag,
    patchFlag: patchFlag,
    dynamicProps: dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  normalizeChildren(vnode, children); // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.

  if (shouldTrack$1 > 0 && currentBlock !== null && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  patchFlag !== 32
  /* HYDRATE_EVENTS */
  && (patchFlag > 0 || shapeFlag & 128
  /* SUSPENSE */
  || shapeFlag & 4
  /* STATEFUL_COMPONENT */
  || shapeFlag & 2
  /* FUNCTIONAL_COMPONENT */
  )) {
    currentBlock.push(vnode);
  }

  return vnode;
}

function cloneVNode(vnode, extraProps) {
  // This is intentionally NOT using spread or extend to avoid the runtime
  // key enumeration cost.
  return {
    _isVNode: true,
    type: vnode.type,
    props: extraProps ? vnode.props ? mergeProps(vnode.props, extraProps) : extraProps : vnode.props,
    key: vnode.key,
    ref: vnode.ref,
    scopeId: vnode.scopeId,
    children: vnode.children,
    target: vnode.target,
    shapeFlag: vnode.shapeFlag,
    patchFlag: vnode.patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    el: vnode.el,
    anchor: vnode.anchor
  };
}

function createTextVNode() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
  var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return createVNode(Text, null, text, flag);
}

function createStaticVNode(content) {
  return createVNode(Static, null, content);
}

function createCommentVNode() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var asBlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}

function normalizeVNode(child) {
  if (child == null || typeof child === 'boolean') {
    // empty placeholder
    return createVNode(Comment);
  } else if (isArray(child)) {
    // fragment
    return createVNode(Fragment, null, child);
  } else if (_typeof(child) === 'object') {
    // already vnode, this should be the most common since compiled templates
    // always produce all-vnode children arrays
    return child.el === null ? child : cloneVNode(child);
  } else {
    // strings and numbers
    return createVNode(Text, null, String(child));
  }
} // optimized normalization for template-compiled render fns


function cloneIfMounted(child) {
  return child.el === null ? child : cloneVNode(child);
}

function normalizeChildren(vnode, children) {
  var type = 0;

  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16
    /* ARRAY_CHILDREN */
    ;
  } else if (_typeof(children) === 'object') {
    type = 32
    /* SLOTS_CHILDREN */
    ;
  } else if (isFunction(children)) {
    children = {
      default: children
    };
    type = 32
    /* SLOTS_CHILDREN */
    ;
  } else {
    children = String(children);
    type = 8
    /* TEXT_CHILDREN */
    ;
  }

  vnode.children = children;
  vnode.shapeFlag |= type;
}

var handlersRE = /^on|^vnode/;

function mergeProps() {
  var ret = {};
  extend(ret, arguments.length <= 0 ? undefined : arguments[0]);

  for (var i = 1; i < arguments.length; i++) {
    var toMerge = i < 0 || arguments.length <= i ? undefined : arguments[i];

    for (var key in toMerge) {
      if (key === 'class') {
        ret.class = normalizeClass([ret.class, toMerge.class]);
      } else if (key === 'style') {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (handlersRE.test(key)) {
        // on*, vnode*
        var existing = ret[key];
        ret[key] = existing ? [].concat(existing, toMerge[key]) : toMerge[key];
      } else {
        ret[key] = toMerge[key];
      }
    }
  }

  return ret;
} // resolve raw VNode data.
// - filter out reserved keys (key, ref)
// - extract class and style into $attrs (to be merged onto child
//   component root)
// - for the rest:
//   - if has declared props: put declared ones in `props`, the rest in `attrs`
//   - else: everything goes in `props`.


function resolveProps(instance, rawProps, _options) {
  var hasDeclaredProps = _options != null;

  if (!rawProps && !hasDeclaredProps) {
    return;
  }

  var _normalizePropsOption = normalizePropsOptions(_options),
      options = _normalizePropsOption[0],
      needCastKeys = _normalizePropsOption[1];

  var props = {};
  var attrs = undefined;
  var vnodeHooks = undefined; // update the instance propsProxy (passed to setup()) to trigger potential
  // changes

  var propsProxy = instance.propsProxy;
  var setProp = propsProxy ? function (key, val) {
    props[key] = val;
    propsProxy[key] = val;
  } : function (key, val) {
    props[key] = val;
  }; // allow mutation of propsProxy (which is readonly by default)

  unlock();

  if (rawProps != null) {
    for (var key in rawProps) {
      var value = rawProps[key]; // key, ref are reserved and never passed down

      if (isReservedProp(key)) {
        if (key !== 'key' && key !== 'ref') {
          (vnodeHooks || (vnodeHooks = {}))[key] = value;
        }

        continue;
      } // prop option names are camelized during normalization, so to support
      // kebab -> camel conversion here we need to camelize the key.


      if (hasDeclaredProps) {
        var camelKey = camelize(key);

        if (hasOwn(options, camelKey)) {
          setProp(camelKey, value);
        } else {
          (attrs || (attrs = {}))[key] = value;
        }
      } else {
        setProp(key, value);
      }
    }
  }

  if (hasDeclaredProps) {
    // set default values & cast booleans
    for (var i = 0; i < needCastKeys.length; i++) {
      var _key6 = needCastKeys[i];
      var opt = options[_key6];
      if (opt == null) continue;
      var isAbsent = !hasOwn(props, _key6);
      var hasDefault = hasOwn(opt, 'default');
      var currentValue = props[_key6]; // default values

      if (hasDefault && currentValue === undefined) {
        var defaultValue = opt.default;
        setProp(_key6, isFunction(defaultValue) ? defaultValue() : defaultValue);
      } // boolean casting


      if (opt[0
      /* shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          setProp(_key6, false);
        } else if (opt[1
        /* shouldCastTrue */
        ] && (currentValue === '' || currentValue === hyphenate(_key6))) {
          setProp(_key6, true);
        }
      }
    } // validation


    if (rawProps) {
      for (var _key7 in options) {
        var _opt = options[_key7];
        if (_opt == null) continue;
        var rawValue = void 0;

        if (!(_key7 in rawProps) && hyphenate(_key7) in rawProps) {
          rawValue = rawProps[hyphenate(_key7)];
        } else {
          rawValue = rawProps[_key7];
        }

        validateProp(_key7, toRaw(rawValue), _opt, !hasOwn(props, _key7));
      }
    }
  } else {
    // if component has no declared props, $attrs === $props
    attrs = props;
  } // in case of dynamic props, check if we need to delete keys from
  // the props proxy


  var patchFlag = instance.vnode.patchFlag;

  if (propsProxy !== null && (patchFlag === 0 || patchFlag & 16
  /* FULL_PROPS */
  )) {
    var rawInitialProps = toRaw(propsProxy);

    for (var _key8 in rawInitialProps) {
      if (!hasOwn(props, _key8)) {
        delete propsProxy[_key8];
      }
    }
  } // lock readonly


  lock();
  instance.props = props;
  instance.attrs = options ? attrs || EMPTY_OBJ : props;
  instance.vnodeHooks = vnodeHooks || EMPTY_OBJ;
}

var normalizationMap = new WeakMap();

function normalizePropsOptions(raw) {
  if (!raw) {
    return [];
  }

  if (normalizationMap.has(raw)) {
    return normalizationMap.get(raw);
  }

  var options = {};
  var needCastKeys = [];

  if (isArray(raw)) {
    for (var i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn("props must be strings when using array syntax.", raw[i]);
      }

      var normalizedKey = camelize(raw[i]);

      if (normalizedKey[0] !== '$') {
        options[normalizedKey] = EMPTY_OBJ;
      } else {
        warn("Invalid prop name: \"".concat(normalizedKey, "\" is a reserved property."));
      }
    }
  } else {
    if (!isObject(raw)) {
      warn("invalid props options", raw);
    }

    for (var key in raw) {
      var _normalizedKey = camelize(key);

      if (_normalizedKey[0] !== '$') {
        var opt = raw[key];
        var prop = options[_normalizedKey] = isArray(opt) || isFunction(opt) ? {
          type: opt
        } : opt;

        if (prop != null) {
          var booleanIndex = getTypeIndex(Boolean, prop.type);
          var stringIndex = getTypeIndex(String, prop.type);
          prop[0
          /* shouldCast */
          ] = booleanIndex > -1;
          prop[1
          /* shouldCastTrue */
          ] = booleanIndex < stringIndex; // if the prop needs boolean casting or default value

          if (booleanIndex > -1 || hasOwn(prop, 'default')) {
            needCastKeys.push(_normalizedKey);
          }
        }
      } else {
        warn("Invalid prop name: \"".concat(_normalizedKey, "\" is a reserved property."));
      }
    }
  }

  var normalized = [options, needCastKeys];
  normalizationMap.set(raw, normalized);
  return normalized;
} // use function string name to check type constructors
// so that it works across vms / iframes.


function getType(ctor) {
  var match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i;
      }
    }
  } else if (isObject(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  return -1;
}

function validateProp(name, value, prop, isAbsent) {
  var type = prop.type,
      required = prop.required,
      validator = prop.validator; // required!

  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  } // missing but optional


  if (value == null && !prop.required) {
    return;
  } // type check


  if (type != null && type !== true) {
    var isValid = false;
    var types = isArray(type) ? type : [type];
    var expectedTypes = []; // value is valid as long as one of the specified types match

    for (var i = 0; i < types.length && !isValid; i++) {
      var _assertType = assertType(value, types[i]),
          valid = _assertType.valid,
          expectedType = _assertType.expectedType;

      expectedTypes.push(expectedType || '');
      isValid = valid;
    }

    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  } // custom validator


  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}

var isSimpleType = /*#__PURE__*/makeMap('String,Number,Boolean,Function,Symbol');

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (isSimpleType(expectedType)) {
    var t = _typeof(value);

    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = _instanceof(value, type);
    }
  } else if (expectedType === 'Object') {
    valid = toRawType(value) === 'Object';
  } else if (expectedType === 'Array') {
    valid = isArray(value);
  } else {
    valid = _instanceof(value, type);
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"".concat(name, "\".") + " Expected ".concat(expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value ".concat(expectedValue);
  }

  message += ", got ".concat(receivedType, " "); // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value ".concat(receivedValue, ".");
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"".concat(value, "\"");
  } else if (type === 'Number') {
    return "".concat(Number(value));
  } else {
    return "".concat(value);
  }
}

function isExplicable(type) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return type.toLowerCase() === elem;
  });
}

function isBoolean() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key9 = 0; _key9 < _len6; _key9++) {
    args[_key9] = arguments[_key9];
  }

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}

var normalizeSlotValue = function normalizeSlotValue(value) {
  return isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
};

var normalizeSlot = function normalizeSlot(key, rawSlot) {
  return function (props) {
    if (currentInstance != null) {
      warn("Slot \"".concat(key, "\" invoked outside of the render function: ") + "this will not track dependencies used in the slot. " + "Invoke the slot function inside the render function instead.");
    }

    return normalizeSlotValue(rawSlot(props));
  };
};

function resolveSlots(instance, children) {
  var slots;

  if (instance.vnode.shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
      var rawSlots = children;

      if (rawSlots._ === 1) {
        // pre-normalized slots object generated by compiler
        slots = children;
      } else {
        slots = {};

        for (var key in rawSlots) {
          if (key === '$stable') continue;
          var value = rawSlots[key];

          if (isFunction(value)) {
            slots[key] = normalizeSlot(key, value);
          } else if (value != null) {
            (function () {
              {
                warn("Non-function value encountered for slot \"".concat(key, "\". ") + "Prefer function slots for better performance.");
              }
              var normalized = normalizeSlotValue(value);

              slots[key] = function () {
                return normalized;
              };
            })();
          }
        }
      }
    } else if (children !== null) {
    // non slot object children (direct value) passed to a component
    if (!isKeepAlive(instance.vnode)) {
      warn("Non-function value encountered for default slot. " + "Prefer function slots for better performance.");
    }

    var normalized = normalizeSlotValue(children);
    slots = {
      default: function _default() {
        return normalized;
      }
    };
  }

  instance.slots = slots || EMPTY_OBJ;
}
/**
Runtime helper for applying directives to a vnode. Example usage:

const comp = resolveComponent('comp')
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h(comp), [
  [foo, this.x],
  [bar, this.y]
])
*/


var isBuiltInDirective = /*#__PURE__*/makeMap('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text');

function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn('Do not use built-in directive ids as custom directive id: ' + name);
  }
}

var directiveToVnodeHooksMap = /*#__PURE__*/['beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeUnmount', 'unmounted'].reduce(function (map, key) {
  var vnodeKey = "onVnode" + key[0].toUpperCase() + key.slice(1);

  var vnodeHook = function vnodeHook(vnode, prevVnode) {
    var bindings = vnode.dirs;
    var prevBindings = prevVnode ? prevVnode.dirs : EMPTY_ARR;

    for (var i = 0; i < bindings.length; i++) {
      var binding = bindings[i];
      var hook = binding.dir[key];

      if (hook != null) {
        if (prevVnode != null) {
          binding.oldValue = prevBindings[i].value;
        }

        hook(vnode.el, binding, vnode, prevVnode);
      }
    }
  };

  map[key] = [vnodeKey, vnodeHook];
  return map;
}, {});

function withDirectives(vnode, directives) {
  var props = vnode.props || (vnode.props = {});
  var bindings = vnode.dirs || (vnode.dirs = new Array(directives.length));
  var injected = {};

  for (var i = 0; i < directives.length; i++) {
    var _directives$i = _slicedToArray(directives[i], 4),
        dir = _directives$i[0],
        value = _directives$i[1],
        arg = _directives$i[2],
        _directives$i$ = _directives$i[3],
        modifiers = _directives$i$ === void 0 ? EMPTY_OBJ : _directives$i$;

    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }

    bindings[i] = {
      dir: dir,
      value: value,
      oldValue: void 0,
      arg: arg,
      modifiers: modifiers
    }; // inject onVnodeXXX hooks

    for (var key in dir) {
      if (!injected[key]) {
        var _directiveToVnodeHook = directiveToVnodeHooksMap[key],
            hookName = _directiveToVnodeHook[0],
            hook = _directiveToVnodeHook[1];
        var existing = props[hookName];
        props[hookName] = existing ? [].concat(existing, hook) : hook;
        injected[key] = true;
      }
    }
  }

  return vnode;
}

function invokeDirectiveHook(hook, instance, vnode) {
  var prevVNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  callWithAsyncErrorHandling(hook, instance, 7
  /* DIRECTIVE_HOOK */
  , [vnode, prevVNode]);
}

function createAppContext() {
  return {
    config: {
      devtools: true,
      performance: false,
      isNativeTag: NO,
      isCustomElement: NO,
      errorHandler: undefined,
      warnHandler: undefined
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null)
  };
}

function createAppAPI(render, hydrate) {
  return function createApp(rootComponent) {
    var rootProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (rootProps != null && !isObject(rootProps)) {
      warn("root props passed to app.mount() must be an object.");
      rootProps = null;
    }

    var context = createAppContext();
    var installedPlugins = new Set();
    var isMounted = false;
    var app = {
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,

      get config() {
        return context.config;
      },

      set config(v) {
        {
          warn("app.config cannot be replaced. Modify individual options instead.");
        }
      },

      use: function use(plugin) {
        for (var _len7 = arguments.length, options = new Array(_len7 > 1 ? _len7 - 1 : 0), _key10 = 1; _key10 < _len7; _key10++) {
          options[_key10 - 1] = arguments[_key10];
        }

        if (installedPlugins.has(plugin)) {
          warn("Plugin has already been applied to target app.");
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install.apply(plugin, [app].concat(options));
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin.apply(void 0, [app].concat(options));
        } else {
          warn("A plugin must either be a function or an object with an \"install\" " + "function.");
        }

        return app;
      },
      mixin: function mixin(_mixin) {
        {
          if (!context.mixins.includes(_mixin)) {
            context.mixins.push(_mixin);
          } else {
            warn('Mixin has already been applied to target app' + (_mixin.name ? ": ".concat(_mixin.name) : ''));
          }
        }
        return app;
      },
      component: function component(name, _component) {
        {
          validateComponentName(name, context.config);
        }

        if (!_component) {
          return context.components[name];
        }

        if (context.components[name]) {
          warn("Component \"".concat(name, "\" has already been registered in target app."));
        }

        context.components[name] = _component;
        return app;
      },
      directive: function directive(name, _directive) {
        {
          validateDirectiveName(name);
        }

        if (!_directive) {
          return context.directives[name];
        }

        if (context.directives[name]) {
          warn("Directive \"".concat(name, "\" has already been registered in target app."));
        }

        context.directives[name] = _directive;
        return app;
      },
      mount: function mount(rootContainer, isHydrate) {
        if (!isMounted) {
          var vnode = createVNode(rootComponent, rootProps); // store app context on the root VNode.
          // this will be set on the root instance on initial mount.

          vnode.appContext = context;

          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer);
          }

          isMounted = true;
          app._container = rootContainer;
          return vnode.component.proxy;
        } else {
          warn("App has already been mounted. Create a new app instance instead.");
        }
      },
      unmount: function unmount() {
        if (isMounted) {
          render(null, app._container);
        } else {
          warn("Cannot unmount an app that is not mounted.");
        }
      },
      provide: function provide(key, value) {
        if (key in context.provides) {
          warn("App already provides property with key \"".concat(key, "\". ") + "It will be overwritten with the new value.");
        } // TypeScript doesn't allow symbols as index type
        // https://github.com/Microsoft/TypeScript/issues/24587


        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
} // Note: hydration is DOM-specific
// But we have to place it in core due to tight coupling with core - splitting
// it out creates a ton of unnecessary complexity.
// Hydration also depends on some renderer internal logic which needs to be
// passed in via arguments.


function createHydrationFunctions(_ref12) {
  var mountComponent = _ref12.mt,
      patchProp = _ref12.o.patchProp;

  var hydrate = function hydrate(vnode, container) {
    if (!container.hasChildNodes()) {
      warn("Attempting to hydrate existing markup but container is empty.");
      return;
    }

    hydrateNode(container.firstChild, vnode);
    flushPostFlushCbs();
  }; // TODO handle mismatches


  var hydrateNode = function hydrateNode(node, vnode) {
    var parentComponent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var type = vnode.type,
        shapeFlag = vnode.shapeFlag;
    vnode.el = node;

    switch (type) {
      case Text:
      case Comment:
      case Static:
        return node.nextSibling;

      case Fragment:
        var anchor = vnode.anchor = hydrateChildren(node.nextSibling, vnode.children, parentComponent); // TODO handle potential hydration error if fragment didn't get
        // back anchor as expected.

        return anchor.nextSibling;

      default:
        if (shapeFlag & 1
        /* ELEMENT */
        ) {
            return hydrateElement(node, vnode, parentComponent);
          } else if (shapeFlag & 6
        /* COMPONENT */
        ) {
            // when setting up the render effect, if the initial vnode already
            // has .el set, the component will perform hydration instead of mount
            // on its sub-tree.
            mountComponent(vnode, null, null, parentComponent, null, false);
            var subTree = vnode.component.subTree;
            return (subTree.anchor || subTree.el).nextSibling;
          } else if (shapeFlag & 64
        /* PORTAL */
        ) {
            hydratePortal(vnode, parentComponent);
            return node.nextSibling;
          } else if (shapeFlag & 128
        /* SUSPENSE */
        ) ;else {
          warn('Invalid HostVNode type:', type, "(".concat(_typeof(type), ")"));
        }

    }
  };

  var hydrateElement = function hydrateElement(el, vnode, parentComponent) {
    var props = vnode.props,
        patchFlag = vnode.patchFlag; // skip props & children if this is hoisted static nodes

    if (patchFlag !== -1
    /* HOISTED */
    ) {
        // props
        if (props !== null) {
          if (patchFlag & 16
          /* FULL_PROPS */
          || patchFlag & 32
          /* HYDRATE_EVENTS */
          ) {
              for (var key in props) {
                if (!isReservedProp(key) && isOn(key)) {
                  patchProp(el, key, props[key], null);
                }
              }
            } else if (props.onClick != null) {
            // Fast path for click listeners (which is most often) to avoid
            // iterating through props.
            patchProp(el, 'onClick', props.onClick, null);
          } // vnode hooks


          var onVnodeBeforeMount = props.onVnodeBeforeMount,
              onVnodeMounted = props.onVnodeMounted;

          if (onVnodeBeforeMount != null) {
            invokeDirectiveHook(onVnodeBeforeMount, parentComponent, vnode);
          }

          if (onVnodeMounted != null) {
            queuePostFlushCb(function () {
              invokeDirectiveHook(onVnodeMounted, parentComponent, vnode);
            });
          }
        } // children


        if (vnode.shapeFlag & 16
        /* ARRAY_CHILDREN */
        && // skip if element has innerHTML / textContent
        !(props !== null && (props.innerHTML || props.textContent))) {
          hydrateChildren(el.firstChild, vnode.children, parentComponent);
        }
      }

    return el.nextSibling;
  };

  var hydrateChildren = function hydrateChildren(node, vnodes, parentComponent) {
    for (var i = 0; node != null && i < vnodes.length; i++) {
      // TODO can skip normalizeVNode in optimized mode
      // (need hint on rendered markup?)
      var vnode = vnodes[i] = normalizeVNode(vnodes[i]);
      node = hydrateNode(node, vnode, parentComponent);
    }

    return node;
  };

  var hydratePortal = function hydratePortal(vnode, parentComponent) {
    var targetSelector = vnode.props && vnode.props.target;
    var target = vnode.target = isString(targetSelector) ? document.querySelector(targetSelector) : targetSelector;

    if (target != null && vnode.shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
        hydrateChildren(target.firstChild, vnode.children, parentComponent);
      }
  };

  return [hydrate, hydrateNode];
}

function createDevEffectOptions(instance) {
  return {
    scheduler: queueJob,
    onTrack: instance.rtc ? function (e) {
      return invokeHooks(instance.rtc, e);
    } : void 0,
    onTrigger: instance.rtg ? function (e) {
      return invokeHooks(instance.rtg, e);
    } : void 0
  };
}

function invokeHooks(hooks, arg) {
  for (var i = 0; i < hooks.length; i++) {
    hooks[i](arg);
  }
}

var queuePostRenderEffect = queueEffectWithSuspense;
/**
 * The createRenderer function accepts two generic arguments:
 * HostNode and HostElement, corresponding to Node and Element types in the
 * host environment. For example, for runtime-dom, HostNode would be the DOM
 * `Node` interface and HostElement would be the DOM `Element` interface.
 *
 * Custom renderers can pass in the platform specific types like this:
 *
 * ``` js
 * const { render, createApp } = createRenderer<Node, Element>({
 *   patchProp,
 *   ...nodeOps
 * })
 * ```
 */

function createRenderer(options) {
  return baseCreateRenderer(options);
} // Separate API for creating hydration-enabled renderer.
// Hydration logic is only used when calling this function, making it
// tree-shakable.


function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
} // implementation


function baseCreateRenderer(options, createHydrationFns) {
  var hostInsert = options.insert,
      hostRemove = options.remove,
      hostPatchProp = options.patchProp,
      hostCreateElement = options.createElement,
      hostCreateText = options.createText,
      hostCreateComment = options.createComment,
      hostSetText = options.setText,
      hostSetElementText = options.setElementText,
      hostParentNode = options.parentNode,
      hostNextSibling = options.nextSibling,
      _options$setScopeId = options.setScopeId,
      hostSetScopeId = _options$setScopeId === void 0 ? NOOP : _options$setScopeId,
      hostCloneNode = options.cloneNode,
      hostInsertStaticContent = options.insertStaticContent; // Note: functions inside this closure should use `const xxx = () => {}`
  // style in order to prevent being inlined by minifiers.

  var patch = function patch(n1, n2, container) {
    var anchor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var parentComponent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var parentSuspense = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var isSVG = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var optimized = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    // patching & not same type, unmount old tree
    if (n1 != null && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }

    var type = n2.type,
        shapeFlag = n2.shapeFlag;

    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;

      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;

      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } // static nodes are noop on patch


        break;

      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        break;

      default:
        if (shapeFlag & 1
        /* ELEMENT */
        ) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          } else if (shapeFlag & 6
        /* COMPONENT */
        ) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          } else if (shapeFlag & 64
        /* PORTAL */
        ) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
          } else if (shapeFlag & 128
        /* SUSPENSE */
        ) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
          } else {
          warn('Invalid HostVNode type:', type, "(".concat(_typeof(type), ")"));
        }

    }
  };

  var processText = function processText(n1, n2, container, anchor) {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      var el = n2.el = n1.el;

      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };

  var processCommentNode = function processCommentNode(n1, n2, container, anchor) {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ''), container, anchor);
    } else {
      // there's no support for dynamic comments
      n2.el = n1.el;
    }
  };

  var mountStaticNode = function mountStaticNode(n2, container, anchor, isSVG) {
    if (n2.el != null && hostCloneNode !== undefined) {
      hostInsert(hostCloneNode(n2.el), container, anchor);
    } else {
      // static nodes are only present when used with compiler-dom/runtime-dom
      // which guarantees presence of hostInsertStaticContent.
      n2.el = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    }
  };

  var processElement = function processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    isSVG = isSVG || n2.type === 'svg';

    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized);
    }

    if (n2.ref !== null && parentComponent !== null) {
      setRef(n2.ref, n1 && n1.ref, parentComponent, n2.el);
    }
  };

  var mountElement = function mountElement(vnode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    var el;
    var type = vnode.type,
        props = vnode.props,
        shapeFlag = vnode.shapeFlag,
        transition = vnode.transition,
        scopeId = vnode.scopeId,
        patchFlag = vnode.patchFlag;

    if (vnode.el !== null && hostCloneNode !== undefined && patchFlag === -1
    /* HOISTED */
    ) {
        // If a vnode has non-null el, it means it's being reused.
        // Only static vnodes can be reused, so its mounted DOM nodes should be
        // exactly the same, and we can simply do a clone here.
        el = vnode.el = hostCloneNode(vnode.el);
      } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG); // props

      if (props != null) {
        for (var key in props) {
          if (!isReservedProp(key)) {
            hostPatchProp(el, key, props[key], null, isSVG);
          }
        }

        if (props.onVnodeBeforeMount != null) {
          invokeDirectiveHook(props.onVnodeBeforeMount, parentComponent, vnode);
        }
      } // children


      if (shapeFlag & 8
      /* TEXT_CHILDREN */
      ) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', optimized || vnode.dynamicChildren !== null);
        }

      if (transition != null && !transition.persisted) {
        transition.beforeEnter(el);
      }
    }

    hostInsert(el, container, anchor);
    var vnodeMountedHook = props && props.onVnodeMounted;

    if (vnodeMountedHook != null || transition != null && !transition.persisted) {
      queuePostRenderEffect(function () {
        vnodeMountedHook && invokeDirectiveHook(vnodeMountedHook, parentComponent, vnode);
        transition && !transition.persisted && transition.enter(el);
      }, parentSuspense);
    }
  };

  var mountChildren = function mountChildren(children, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    var start = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;

    for (var i = start; i < children.length; i++) {
      var child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
    }
  };

  var patchElement = function patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized) {
    var el = n2.el = n1.el;
    var patchFlag = n2.patchFlag,
        dynamicChildren = n2.dynamicChildren;
    var oldProps = n1 && n1.props || EMPTY_OBJ;
    var newProps = n2.props || EMPTY_OBJ;

    if (newProps.onVnodeBeforeUpdate != null) {
      invokeDirectiveHook(newProps.onVnodeBeforeUpdate, parentComponent, n2, n1);
    }

    if (patchFlag > 0) {
      // the presence of a patchFlag means this element's render code was
      // generated by the compiler and can take the fast path.
      // in this path old node and new node are guaranteed to have the same shape
      // (i.e. at the exact same position in the source template)
      if (patchFlag & 16
      /* FULL_PROPS */
      ) {
          // element props contain dynamic keys, full diff needed
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
        // class
        // this flag is matched when the element has dynamic class bindings.
        if (patchFlag & 2
        /* CLASS */
        ) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, 'class', newProps.class, null, isSVG);
            }
          } // style
        // this flag is matched when the element has dynamic style bindings


        if (patchFlag & 4
        /* STYLE */
        ) {
            hostPatchProp(el, 'style', newProps.style, oldProps.style, isSVG);
          } // props
        // This flag is matched when the element has dynamic prop/attr bindings
        // other than class and style. The keys of dynamic prop/attrs are saved for
        // faster iteration.
        // Note dynamic keys like :[foo]="bar" will cause this optimization to
        // bail out and go through a full diff because we need to unset the old key


        if (patchFlag & 8
        /* PROPS */
        ) {
            // if the flag is present then dynamicProps must be non-null
            var propsToUpdate = n2.dynamicProps;

            for (var i = 0; i < propsToUpdate.length; i++) {
              var key = propsToUpdate[i];
              var prev = oldProps[key];
              var next = newProps[key];

              if (prev !== next) {
                hostPatchProp(el, key, next, prev, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
      } // text
      // This flag is matched when the element has only dynamic text children.


      if (patchFlag & 1
      /* TEXT */
      ) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
    } else if (!optimized && dynamicChildren == null) {
      // unoptimized, full diff
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }

    var areChildrenSVG = isSVG && n2.type !== 'foreignObject';

    if (dynamicChildren != null) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG);
    } else if (!optimized) {
      // full diff
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG);
    }

    if (newProps.onVnodeUpdated != null) {
      queuePostRenderEffect(function () {
        invokeDirectiveHook(newProps.onVnodeUpdated, parentComponent, n2, n1);
      }, parentSuspense);
    }
  }; // The fast path for blocks.


  var patchBlockChildren = function patchBlockChildren(oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG) {
    for (var i = 0; i < newChildren.length; i++) {
      var oldVNode = oldChildren[i];
      var newVNode = newChildren[i]; // Determine the container (parent element) for the patch.

      var container = // - In the case of a Fragment, we need to provide the actual parent
      // of the Fragment itself so it can move its children.
      oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
      // which also requires the correct parent container
      !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
      oldVNode.shapeFlag & 6
      /* COMPONENT */
      ? hostParentNode(oldVNode.el) : // In other cases, the parent container is not actually used so we
      // just pass the block element here to avoid a DOM parentNode call.
      fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, true);
    }
  };

  var patchProps = function patchProps(el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) {
    if (oldProps !== newProps) {
      for (var key in newProps) {
        if (isReservedProp(key)) continue;
        var next = newProps[key];
        var prev = oldProps[key];

        if (next !== prev) {
          hostPatchProp(el, key, next, prev, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (var _key11 in oldProps) {
          if (!isReservedProp(_key11) && !(_key11 in newProps)) {
            hostPatchProp(el, _key11, null, null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
    }
  };

  var devFragmentID = 0;

  var processFragment = function processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    var fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateComment("fragment-".concat(devFragmentID, "-start"));
    var fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateComment("fragment-".concat(devFragmentID, "-end"));
    var patchFlag = n2.patchFlag,
        dynamicChildren = n2.dynamicChildren;

    if (patchFlag > 0) {
      optimized = true;
    }

    if (n1 == null) {
      {
        devFragmentID++;
      }
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor); // a fragment can only have array children
      // since they are either generated by the compiler, or implicitly created
      // from arrays.

      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
    } else {
      if (patchFlag & 64
      /* STABLE_FRAGMENT */
      && dynamicChildren != null) {
        // a stable fragment (template root or <template v-for>) doesn't need to
        // patch children order, but it may contain dynamicChildren.
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG);
      } else {
        // keyed / unkeyed, or manual fragments.
        // for keyed & unkeyed, since they are compiler generated from v-for,
        // each child is guaranteed to be a block so the fragment will never
        // have dynamicChildren.
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    }
  };

  var processComponent = function processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    if (n1 == null) {
      if (n2.shapeFlag & 512
      /* COMPONENT_KEPT_ALIVE */
      ) {
          parentComponent.sink.activate(n2, container, anchor);
        } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG);
      }
    } else {
      var instance = n2.component = n1.component;

      if (shouldUpdateComponent(n1, n2, parentComponent, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          // async & still pending - just update props and slots
          // since the component's reactive effect for render isn't set-up yet
          {
            pushWarningContext(n2);
          }
          updateComponentPreRender(instance, n2);
          {
            popWarningContext();
          }
          return;
        } else {
          // normal update
          instance.next = n2; // in case the child component is also queued, remove it to avoid
          // double updating the same child component in the same flush.

          invalidateJob(instance.update); // instance.update is the reactive effect runner.

          instance.update();
        }
      } else {
        // no update needed. just copy over properties
        n2.component = n1.component;
        n2.el = n1.el;
      }
    }

    if (n2.ref !== null && parentComponent !== null) {
      if (!(n2.shapeFlag & 4
      /* STATEFUL_COMPONENT */
      )) {
        pushWarningContext(n2);
        warn("Functional components do not support \"ref\" because they do not " + "have instances.");
        popWarningContext();
      }

      setRef(n2.ref, n1 && n1.ref, parentComponent, n2.component.proxy);
    }
  };

  var mountComponent = function mountComponent(initialVNode, container, // only null during hydration
  anchor, parentComponent, parentSuspense, isSVG) {
    var instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent);
    {
      pushWarningContext(initialVNode);
    } // inject renderer internals for keepAlive

    if (isKeepAlive(initialVNode)) {
      var sink = instance.sink;
      sink.renderer = internals;
      sink.parentSuspense = parentSuspense;
    } // resolve props and slots for setup context


    setupComponent(instance, parentSuspense); // setup() is async. This component relies on async logic to be resolved
    // before proceeding

    if (instance.asyncDep) {
      if (!parentSuspense) {
        warn('async setup() is used without a suspense boundary!');
        return;
      }

      parentSuspense.registerDep(instance, setupRenderEffect); // Give it a placeholder if this is not hydration

      var placeholder = instance.subTree = createVNode(Comment);
      processCommentNode(null, placeholder, container, anchor);
      initialVNode.el = placeholder.el;
      return;
    }

    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG);
    {
      popWarningContext();
    }
  };

  var setupRenderEffect = function setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG) {
    // create reactive effect for rendering
    instance.update = effect(function componentEffect() {
      if (!instance.isMounted) {
        var subTree = instance.subTree = renderComponentRoot(instance); // beforeMount hook

        if (instance.bm !== null) {
          invokeHooks(instance.bm);
        }

        if (initialVNode.el && hydrateNode) {
          // vnode has adopted host node - perform hydration instead of mount.
          hydrateNode(initialVNode.el, subTree, instance);
        } else {
          patch(null, subTree, container, // container is only null during hydration
          anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        } // mounted hook


        if (instance.m !== null) {
          queuePostRenderEffect(instance.m, parentSuspense);
        } // activated hook for keep-alive roots.


        if (instance.a !== null && instance.vnode.shapeFlag & 256
        /* COMPONENT_SHOULD_KEEP_ALIVE */
        ) {
            queuePostRenderEffect(instance.a, parentSuspense);
          }

        instance.isMounted = true;
      } else {
        // updateComponent
        // This is triggered by mutation of component's own state (next: null)
        // OR parent calling processComponent (next: HostVNode)
        var next = instance.next;
        {
          pushWarningContext(next || instance.vnode);
        }

        if (next !== null) {
          updateComponentPreRender(instance, next);
        }

        var nextTree = renderComponentRoot(instance);
        var prevTree = instance.subTree;
        instance.subTree = nextTree; // beforeUpdate hook

        if (instance.bu !== null) {
          invokeHooks(instance.bu);
        } // reset refs
        // only needed if previous patch had refs


        if (instance.refs !== EMPTY_OBJ) {
          instance.refs = {};
        }

        patch(prevTree, nextTree, // parent may have changed if it's in a portal
        hostParentNode(prevTree.el), // anchor may have changed if it's in a fragment
        getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        instance.vnode.el = nextTree.el;

        if (next === null) {
          // self-triggered update. In case of HOC, update parent component
          // vnode el. HOC is indicated by parent instance's subTree pointing
          // to child component's vnode
          updateHOCHostEl(instance, nextTree.el);
        } // updated hook


        if (instance.u !== null) {
          queuePostRenderEffect(instance.u, parentSuspense);
        }

        {
          popWarningContext();
        }
      }
    }, createDevEffectOptions(instance));
  };

  var updateComponentPreRender = function updateComponentPreRender(instance, nextVNode) {
    nextVNode.component = instance;
    instance.vnode = nextVNode;
    instance.next = null;
    resolveProps(instance, nextVNode.props, nextVNode.type.props);
    resolveSlots(instance, nextVNode.children);
  };

  var patchChildren = function patchChildren(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG) {
    var optimized = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    var c1 = n1 && n1.children;
    var prevShapeFlag = n1 ? n1.shapeFlag : 0;
    var c2 = n2.children;
    var patchFlag = n2.patchFlag,
        shapeFlag = n2.shapeFlag;

    if (patchFlag === -2
    /* BAIL */
    ) {
        optimized = false;
      } // fast path


    if (patchFlag > 0) {
      if (patchFlag & 128
      /* KEYED_FRAGMENT */
      ) {
          // this could be either fully-keyed or mixed (some keyed some not)
          // presence of patchFlag means children are guaranteed to be arrays
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          return;
        } else if (patchFlag & 256
      /* UNKEYED_FRAGMENT */
      ) {
          // unkeyed
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          return;
        }
    } // children has 3 possibilities: text, array or no children.


    if (shapeFlag & 8
    /* TEXT_CHILDREN */
    ) {
        // text children fast path
        if (prevShapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            unmountChildren(c1, parentComponent, parentSuspense);
          }

        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
      if (prevShapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
          // prev children was array
          if (shapeFlag & 16
          /* ARRAY_CHILDREN */
          ) {
              // two arrays, cannot assume anything, do full diff
              patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
            } else {
            // no new children, just unmount old
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
        // prev children was text OR null
        // new children is array OR null
        if (prevShapeFlag & 8
        /* TEXT_CHILDREN */
        ) {
            hostSetElementText(container, '');
          } // mount new if array


        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          }
      }
    }
  };

  var patchUnkeyedChildren = function patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    var oldLength = c1.length;
    var newLength = c2.length;
    var commonLength = Math.min(oldLength, newLength);
    var i;

    for (i = 0; i < commonLength; i++) {
      var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, optimized);
    }

    if (oldLength > newLength) {
      // remove old
      unmountChildren(c1, parentComponent, parentSuspense, true, commonLength);
    } else {
      // mount new
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, commonLength);
    }
  }; // can be all-keyed or mixed


  var patchKeyedChildren = function patchKeyedChildren(c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) {
    var i = 0;
    var l2 = c2.length;
    var e1 = c1.length - 1; // prev ending index

    var e2 = l2 - 1; // next ending index
    // 1. sync from start
    // (a b) c
    // (a b) d e

    while (i <= e1 && i <= e2) {
      var n1 = c1[i];
      var n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);

      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized);
      } else {
        break;
      }

      i++;
    } // 2. sync from end
    // a (b c)
    // d e (b c)


    while (i <= e1 && i <= e2) {
      var _n2 = c1[e1];

      var _n3 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);

      if (isSameVNodeType(_n2, _n3)) {
        patch(_n2, _n3, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized);
      } else {
        break;
      }

      e1--;
      e2--;
    } // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0


    if (i > e1) {
      if (i <= e2) {
        var nextPos = e2 + 1;
        var anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;

        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG);
          i++;
        }
      }
    } // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } // 5. unknown sequence
      // [i ... e1 + 1]: a b [c d e] f g
      // [i ... e2 + 1]: a b [e d c h] f g
      // i = 2, e1 = 4, e2 = 5
      else {
          var s1 = i; // prev starting index

          var s2 = i; // next starting index
          // 5.1 build key:index map for newChildren

          var keyToNewIndexMap = new Map();

          for (i = s2; i <= e2; i++) {
            var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);

            if (nextChild.key != null) {
              if (keyToNewIndexMap.has(nextChild.key)) {
                warn("Duplicate keys found during update:", JSON.stringify(nextChild.key), "Make sure keys are unique.");
              }

              keyToNewIndexMap.set(nextChild.key, i);
            }
          } // 5.2 loop through old children left to be patched and try to patch
          // matching nodes & remove nodes that are no longer present


          var j;
          var patched = 0;
          var toBePatched = e2 - s2 + 1;
          var moved = false; // used to track whether any node has moved

          var maxNewIndexSoFar = 0; // works as Map<newIndex, oldIndex>
          // Note that oldIndex is offset by +1
          // and oldIndex = 0 is a special value indicating the new node has
          // no corresponding old node.
          // used for determining longest stable subsequence

          var newIndexToOldIndexMap = new Array(toBePatched);

          for (i = 0; i < toBePatched; i++) {
            newIndexToOldIndexMap[i] = 0;
          }

          for (i = s1; i <= e1; i++) {
            var prevChild = c1[i];

            if (patched >= toBePatched) {
              // all new children have been patched so this can only be a removal
              unmount(prevChild, parentComponent, parentSuspense, true);
              continue;
            }

            var newIndex = void 0;

            if (prevChild.key != null) {
              newIndex = keyToNewIndexMap.get(prevChild.key);
            } else {
              // key-less node, try to locate a key-less node of the same type
              for (j = s2; j <= e2; j++) {
                if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                  newIndex = j;
                  break;
                }
              }
            }

            if (newIndex === undefined) {
              unmount(prevChild, parentComponent, parentSuspense, true);
            } else {
              newIndexToOldIndexMap[newIndex - s2] = i + 1;

              if (newIndex >= maxNewIndexSoFar) {
                maxNewIndexSoFar = newIndex;
              } else {
                moved = true;
              }

              patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, optimized);
              patched++;
            }
          } // 5.3 move and mount
          // generate longest stable subsequence only when nodes have moved


          var increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
          j = increasingNewIndexSequence.length - 1; // looping backwards so that we can use last patched node as anchor

          for (i = toBePatched - 1; i >= 0; i--) {
            var nextIndex = s2 + i;
            var _nextChild = c2[nextIndex];

            var _anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;

            if (newIndexToOldIndexMap[i] === 0) {
              // mount new
              patch(null, _nextChild, container, _anchor, parentComponent, parentSuspense, isSVG);
            } else if (moved) {
              // move if:
              // There is no stable subsequence (e.g. a reverse)
              // OR current node is not among the stable sequence
              if (j < 0 || i !== increasingNewIndexSequence[j]) {
                move(_nextChild, container, _anchor, 2
                /* REORDER */
                );
              } else {
                j--;
              }
            }
          }
        }
  };

  var move = function move(vnode, container, anchor, type) {
    var parentSuspense = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    if (vnode.shapeFlag & 6
    /* COMPONENT */
    ) {
        move(vnode.component.subTree, container, anchor, type);
        return;
      }

    if (vnode.shapeFlag & 128
    /* SUSPENSE */
    ) {
        vnode.suspense.move(container, anchor, type);
        return;
      }

    if (vnode.type === Fragment) {
      hostInsert(vnode.el, container, anchor);
      var children = vnode.children;

      for (var i = 0; i < children.length; i++) {
        move(children[i], container, anchor, type);
      }

      hostInsert(vnode.anchor, container, anchor);
    } else {
      // Plain element
      var el = vnode.el,
          transition = vnode.transition,
          shapeFlag = vnode.shapeFlag;
      var needTransition = type !== 2
      /* REORDER */
      && shapeFlag & 1
      /* ELEMENT */
      && transition != null;

      if (needTransition) {
        if (type === 0
        /* ENTER */
        ) {
            transition.beforeEnter(el);
            hostInsert(el, container, anchor);
            queuePostRenderEffect(function () {
              return transition.enter(el);
            }, parentSuspense);
          } else {
          var leave = transition.leave,
              delayLeave = transition.delayLeave,
              afterLeave = transition.afterLeave;

          var _remove = function _remove() {
            return hostInsert(el, container, anchor);
          };

          var performLeave = function performLeave() {
            leave(el, function () {
              _remove();

              afterLeave && afterLeave();
            });
          };

          if (delayLeave) {
            delayLeave(el, _remove, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    }
  };

  var unmount = function unmount(vnode, parentComponent, parentSuspense) {
    var doRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var props = vnode.props,
        ref = vnode.ref,
        children = vnode.children,
        dynamicChildren = vnode.dynamicChildren,
        shapeFlag = vnode.shapeFlag; // unset ref

    if (ref !== null && parentComponent !== null) {
      setRef(ref, null, parentComponent, null);
    }

    if (shapeFlag & 6
    /* COMPONENT */
    ) {
        if (shapeFlag & 256
        /* COMPONENT_SHOULD_KEEP_ALIVE */
        ) {
            parentComponent.sink.deactivate(vnode);
          } else {
          unmountComponent(vnode.component, parentSuspense, doRemove);
        }

        return;
      }

    if (shapeFlag & 128
    /* SUSPENSE */
    ) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }

    if (props != null && props.onVnodeBeforeUnmount != null) {
      invokeDirectiveHook(props.onVnodeBeforeUnmount, parentComponent, vnode);
    }

    if (dynamicChildren != null) {
      // fast path for block nodes: only need to unmount dynamic children.
      unmountChildren(dynamicChildren, parentComponent, parentSuspense);
    } else if (shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
        unmountChildren(children, parentComponent, parentSuspense);
      }

    if (doRemove) {
      remove(vnode);
    }

    if (props != null && props.onVnodeUnmounted != null) {
      queuePostRenderEffect(function () {
        invokeDirectiveHook(props.onVnodeUnmounted, parentComponent, vnode);
      }, parentSuspense);
    }
  };

  var remove = function remove(vnode) {
    var type = vnode.type,
        el = vnode.el,
        anchor = vnode.anchor,
        transition = vnode.transition;

    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }

    var performRemove = function performRemove() {
      hostRemove(el);

      if (transition != null && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };

    if (vnode.shapeFlag & 1
    /* ELEMENT */
    && transition != null && !transition.persisted) {
      var leave = transition.leave,
          delayLeave = transition.delayLeave;

      var performLeave = function performLeave() {
        return leave(el, performRemove);
      };

      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };

  var removeFragment = function removeFragment(cur, end) {
    // For fragments, directly remove all contained DOM nodes.
    // (fragment child nodes cannot have transition)
    var next;

    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }

    hostRemove(end);
  };

  var unmountComponent = function unmountComponent(instance, parentSuspense, doRemove) {
    var bum = instance.bum,
        effects = instance.effects,
        update = instance.update,
        subTree = instance.subTree,
        um = instance.um,
        da = instance.da,
        isDeactivated = instance.isDeactivated; // beforeUnmount hook

    if (bum !== null) {
      invokeHooks(bum);
    }

    if (effects !== null) {
      for (var i = 0; i < effects.length; i++) {
        stop(effects[i]);
      }
    } // update may be null if a component is unmounted before its async
    // setup has resolved.


    if (update !== null) {
      stop(update);
      unmount(subTree, instance, parentSuspense, doRemove);
    } // unmounted hook


    if (um !== null) {
      queuePostRenderEffect(um, parentSuspense);
    } // deactivated hook


    if (da !== null && !isDeactivated && instance.vnode.shapeFlag & 256
    /* COMPONENT_SHOULD_KEEP_ALIVE */
    ) {
        queuePostRenderEffect(da, parentSuspense);
      }

    queuePostFlushCb(function () {
      instance.isUnmounted = true;
    }); // A component with async dep inside a pending suspense is unmounted before
    // its async dep resolves. This should remove the dep from the suspense, and
    // cause the suspense to resolve immediately if that was the last dep.

    if (parentSuspense !== null && !parentSuspense.isResolved && !parentSuspense.isUnmounted && instance.asyncDep !== null && !instance.asyncResolved) {
      parentSuspense.deps--;

      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };

  var unmountChildren = function unmountChildren(children, parentComponent, parentSuspense) {
    var doRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var start = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    for (var i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove);
    }
  };

  var getNextHostNode = function getNextHostNode(vnode) {
    if (vnode.shapeFlag & 6
    /* COMPONENT */
    ) {
        return getNextHostNode(vnode.component.subTree);
      }

    if (vnode.shapeFlag & 128
    /* SUSPENSE */
    ) {
        return vnode.suspense.next();
      }

    return hostNextSibling(vnode.anchor || vnode.el);
  };

  var setRef = function setRef(ref, oldRef, parent, value) {
    if (isArray(ref)) {
      // template string refs are compiled into tuples like [ctx, key] to
      // ensure refs inside slots are set on the correct owner instance.
      var _ref13 = _slicedToArray(ref, 2),
          owner = _ref13[0].$,
          key = _ref13[1];

      setRef(key, oldRef && oldRef[1], owner, value);
      return;
    }

    var refs = parent.refs === EMPTY_OBJ ? parent.refs = {} : parent.refs;
    var renderContext = toRaw(parent.renderContext); // unset old ref

    if (oldRef !== null && oldRef !== ref) {
      if (isString(oldRef)) {
        refs[oldRef] = null;
        var oldSetupRef = renderContext[oldRef];

        if (isRef(oldSetupRef)) {
          oldSetupRef.value = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }

    if (isString(ref)) {
      var setupRef = renderContext[ref];

      if (isRef(setupRef)) {
        setupRef.value = value;
      }

      refs[ref] = value;
    } else if (isRef(ref)) {
      ref.value = value;
    } else if (isFunction(ref)) {
      callWithErrorHandling(ref, parent, 11
      /* FUNCTION_REF */
      , [value]);
    } else {
      warn('Invalid template ref type:', value, "(".concat(_typeof(value), ")"));
    }
  };

  var render = function render(vnode, container) {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container);
    }

    flushPostFlushCbs();
    container._vnode = vnode;
  };

  var internals = {
    p: patch,
    um: unmount,
    m: move,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    c: processCommentNode,
    o: options
  };
  var hydrate;
  var hydrateNode;

  if (createHydrationFns) {
    var _createHydrationFns = createHydrationFns(internals);

    var _createHydrationFns2 = _slicedToArray(_createHydrationFns, 2);

    hydrate = _createHydrationFns2[0];
    hydrateNode = _createHydrationFns2[1];
  }

  return {
    render: render,
    hydrate: hydrate,
    createApp: createAppAPI(render, hydrate)
  };
} // https://en.wikipedia.org/wiki/Longest_increasing_subsequence


function getSequence(arr) {
  var p = arr.slice();
  var result = [0];
  var i, j, u, v, c;
  var len = arr.length;

  for (i = 0; i < len; i++) {
    var arrI = arr[i];

    if (arrI !== 0) {
      j = result[result.length - 1];

      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }

      u = 0;
      v = result.length - 1;

      while (u < v) {
        c = (u + v) / 2 | 0;

        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }

      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }

        result[u] = i;
      }
    }
  }

  u = result.length;
  v = result[u - 1];

  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }

  return result;
}

function useTransitionState() {
  var state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map()
  };
  onMounted(function () {
    state.isMounted = true;
  });
  onBeforeUnmount(function () {
    state.isUnmounting = true;
  });
  return state;
}

var BaseTransitionImpl = {
  name: "BaseTransition",
  setup: function setup(props, _ref14) {
    var slots = _ref14.slots;
    var instance = getCurrentInstance();
    var state = useTransitionState();
    return function () {
      var children = slots.default && slots.default();

      if (!children || !children.length) {
        return;
      } // warn multiple elements


      if (children.length > 1) {
        warn('<transition> can only be used on a single element or component. Use ' + '<transition-group> for lists.');
      } // there's no need to track reactivity for these props so use the raw
      // props for a bit better perf


      var rawProps = toRaw(props);
      var mode = rawProps.mode; // check mode

      if (mode && !['in-out', 'out-in', 'default'].includes(mode)) {
        warn("invalid <transition> mode: ".concat(mode));
      } // at this point children has a guaranteed length of 1.


      var child = children[0];

      if (state.isLeaving) {
        return emptyPlaceholder(child);
      } // in the case of <transition><keep-alive/></transition>, we need to
      // compare the type of the kept-alive children.


      var innerChild = getKeepAliveChild(child);

      if (!innerChild) {
        return emptyPlaceholder(child);
      }

      var enterHooks = innerChild.transition = resolveTransitionHooks(innerChild, rawProps, state, instance);
      var oldChild = instance.subTree;
      var oldInnerChild = oldChild && getKeepAliveChild(oldChild); // handle mode

      if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild)) {
        var prevHooks = oldInnerChild.transition;
        var leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance); // update old tree's hooks in case of dynamic transition

        setTransitionHooks(oldInnerChild, leavingHooks); // switching between different views

        if (mode === 'out-in') {
          state.isLeaving = true; // return placeholder node and queue update when leave finishes

          leavingHooks.afterLeave = function () {
            state.isLeaving = false;
            instance.update();
          };

          return emptyPlaceholder(child);
        } else if (mode === 'in-out') {
          delete prevHooks.delayedLeave;

          leavingHooks.delayLeave = function (el, earlyRemove, delayedLeave) {
            var leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild; // early removal callback

            el._leaveCb = function () {
              earlyRemove();
              el._leaveCb = undefined;
              delete enterHooks.delayedLeave;
            };

            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }

      return child;
    };
  }
};
{
  BaseTransitionImpl.props = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: Function,
    onEnter: Function,
    onAfterEnter: Function,
    onEnterCancelled: Function,
    // leave
    onBeforeLeave: Function,
    onLeave: Function,
    onAfterLeave: Function,
    onLeaveCancelled: Function
  };
} // export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files

var BaseTransition = BaseTransitionImpl;
exports.BaseTransition = BaseTransition;

function getLeavingNodesForType(state, vnode) {
  var leavingVNodes = state.leavingVNodes;
  var leavingVNodesCache = leavingVNodes.get(vnode.type);

  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }

  return leavingVNodesCache;
} // The transition hooks are attached to the vnode as vnode.transition
// and will be called at appropriate timing in the renderer.


function resolveTransitionHooks(vnode, _ref15, state, instance) {
  var appear = _ref15.appear,
      _ref15$persisted = _ref15.persisted,
      persisted = _ref15$persisted === void 0 ? false : _ref15$persisted,
      onBeforeEnter = _ref15.onBeforeEnter,
      onEnter = _ref15.onEnter,
      onAfterEnter = _ref15.onAfterEnter,
      onEnterCancelled = _ref15.onEnterCancelled,
      onBeforeLeave = _ref15.onBeforeLeave,
      onLeave = _ref15.onLeave,
      onAfterLeave = _ref15.onAfterLeave,
      onLeaveCancelled = _ref15.onLeaveCancelled;
  var key = String(vnode.key);
  var leavingVNodesCache = getLeavingNodesForType(state, vnode);

  var callHook = function callHook(hook, args) {
    hook && callWithAsyncErrorHandling(hook, instance, 8
    /* TRANSITION_HOOK */
    , args);
  };

  var hooks = {
    persisted: persisted,
    beforeEnter: function beforeEnter(el) {
      if (!appear && !state.isMounted) {
        return;
      } // for same element (v-show)


      if (el._leaveCb) {
        el._leaveCb(true
        /* cancelled */
        );
      } // for toggled element with same key (v-if)


      var leavingVNode = leavingVNodesCache[key];

      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        // force early removal (not cancelled)
        leavingVNode.el._leaveCb();
      }

      callHook(onBeforeEnter, [el]);
    },
    enter: function enter(el) {
      if (!appear && !state.isMounted) {
        return;
      }

      var called = false;

      var afterEnter = el._enterCb = function (cancelled) {
        if (called) return;
        called = true;

        if (cancelled) {
          callHook(onEnterCancelled, [el]);
        } else {
          callHook(onAfterEnter, [el]);
        }

        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }

        el._enterCb = undefined;
      };

      if (onEnter) {
        onEnter(el, afterEnter);
      } else {
        afterEnter();
      }
    },
    leave: function leave(el, remove) {
      var key = String(vnode.key);

      if (el._enterCb) {
        el._enterCb(true
        /* cancelled */
        );
      }

      if (state.isUnmounting) {
        return remove();
      }

      callHook(onBeforeLeave, [el]);
      var called = false;

      var afterLeave = el._leaveCb = function (cancelled) {
        if (called) return;
        called = true;
        remove();

        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }

        el._leaveCb = undefined;

        if (leavingVNodesCache[key] === vnode) {
          delete leavingVNodesCache[key];
        }
      };

      leavingVNodesCache[key] = vnode;

      if (onLeave) {
        onLeave(el, afterLeave);
      } else {
        afterLeave();
      }
    }
  };
  return hooks;
} // the placeholder really only handles one special case: KeepAlive
// in the case of a KeepAlive in a leave phase we need to return a KeepAlive
// placeholder with empty content to avoid the KeepAlive instance from being
// unmounted.


function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}

function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : undefined : vnode;
}

function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6
  /* COMPONENT */
  && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else {
    vnode.transition = hooks;
  }
}

var isKeepAlive = function isKeepAlive(vnode) {
  return vnode.type.__isKeepAlive;
};

var KeepAliveImpl = {
  name: "KeepAlive",
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup: function setup(props, _ref16) {
    var slots = _ref16.slots;
    var cache = new Map();
    var keys = new Set();
    var current = null;
    var instance = getCurrentInstance(); // KeepAlive communicates with the instantiated renderer via the "sink"
    // where the renderer passes in platform-specific functions, and the
    // KeepAlive instance exposes activate/deactivate implementations.
    // The whole point of this is to avoid importing KeepAlive directly in the
    // renderer to facilitate tree-shaking.

    var sink = instance.sink;
    var _sink$renderer = sink.renderer,
        move = _sink$renderer.m,
        _unmount = _sink$renderer.um,
        createElement = _sink$renderer.o.createElement,
        parentSuspense = sink.parentSuspense;
    var storageContainer = createElement('div');

    sink.activate = function (vnode, container, anchor) {
      move(vnode, container, anchor, 0
      /* ENTER */
      , parentSuspense);
      queuePostRenderEffect(function () {
        var component = vnode.component;
        component.isDeactivated = false;

        if (component.a !== null) {
          invokeHooks(component.a);
        }
      }, parentSuspense);
    };

    sink.deactivate = function (vnode) {
      move(vnode, storageContainer, null, 1
      /* LEAVE */
      , parentSuspense);
      queuePostRenderEffect(function () {
        var component = vnode.component;

        if (component.da !== null) {
          invokeHooks(component.da);
        }

        component.isDeactivated = true;
      }, parentSuspense);
    };

    function unmount(vnode) {
      // reset the shapeFlag so it can be properly unmounted
      vnode.shapeFlag = 4
      /* STATEFUL_COMPONENT */
      ;

      _unmount(vnode, instance, parentSuspense);
    }

    function pruneCache(filter) {
      cache.forEach(function (vnode, key) {
        var name = getName(vnode.type);

        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }

    function pruneCacheEntry(key) {
      var cached = cache.get(key);

      if (!current || cached.type !== current.type) {
        unmount(cached);
      } else if (current) {
        // current active instance should no longer be kept-alive.
        // we can't unmount it now but it might be later, so reset its flag now.
        current.shapeFlag = 4
        /* STATEFUL_COMPONENT */
        ;
      }

      cache.delete(key);
      keys.delete(key);
    }

    watch(function () {
      return [props.include, props.exclude];
    }, function (_ref17) {
      var _ref18 = _slicedToArray(_ref17, 2),
          include = _ref18[0],
          exclude = _ref18[1];

      include && pruneCache(function (name) {
        return matches(include, name);
      });
      exclude && pruneCache(function (name) {
        return matches(exclude, name);
      });
    });
    onBeforeUnmount(function () {
      cache.forEach(unmount);
    });
    return function () {
      if (!slots.default) {
        return null;
      }

      var children = slots.default();
      var vnode = children[0];

      if (children.length > 1) {
        {
          warn("KeepAlive should contain exactly one component child.");
        }
        current = null;
        return children;
      } else if (!isVNode(vnode) || !(vnode.shapeFlag & 4
      /* STATEFUL_COMPONENT */
      )) {
        current = null;
        return vnode;
      }

      var comp = vnode.type;
      var name = getName(comp);
      var include = props.include,
          exclude = props.exclude,
          max = props.max;

      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var key = vnode.key == null ? comp : vnode.key;
      var cached = cache.get(key); // clone vnode if it's reused because we are going to mutate it

      if (vnode.el) {
        vnode = cloneVNode(vnode);
      }

      cache.set(key, vnode);

      if (cached) {
        // copy over mounted state
        vnode.el = cached.el;
        vnode.anchor = cached.anchor;
        vnode.component = cached.component;

        if (vnode.transition) {
          // recursively update transition hooks on subTree
          setTransitionHooks(vnode, vnode.transition);
        } // avoid vnode being mounted as fresh


        vnode.shapeFlag |= 512
        /* COMPONENT_KEPT_ALIVE */
        ; // make this key the freshest

        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key); // prune oldest entry

        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(Array.from(keys)[0]);
        }
      } // avoid vnode being unmounted


      vnode.shapeFlag |= 256
      /* COMPONENT_SHOULD_KEEP_ALIVE */
      ;
      current = vnode;
      return vnode;
    };
  }
}; // export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files

var KeepAlive = KeepAliveImpl;
exports.KeepAlive = KeepAlive;

function getName(comp) {
  return comp.displayName || comp.name;
}

function matches(pattern, name) {
  if (isArray(pattern)) {
    return pattern.some(function (p) {
      return matches(p, name);
    });
  } else if (isString(pattern)) {
    return pattern.split(',').indexOf(name) > -1;
  } else if (pattern.test) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a"
  /* ACTIVATED */
  , target);
}

function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da"
  /* DEACTIVATED */
  , target);
}

function registerKeepAliveHook(hook, type) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;

  // cache the deactivate branch check wrapper for injected hooks so the same
  // hook can be properly deduped by the scheduler. "__wdc" stands for "with
  // deactivation check".
  var wrappedHook = hook.__wdc || (hook.__wdc = function () {
    // only fire the hook if the target instance is NOT in a deactivated branch.
    var current = target;

    while (current) {
      if (current.isDeactivated) {
        return;
      }

      current = current.parent;
    }

    hook();
  });

  injectHook(type, wrappedHook, target); // In addition to registering it on the target instance, we walk up the parent
  // chain and register it on all ancestor instances that are keep-alive roots.
  // This avoids the need to walk the entire component tree when invoking these
  // hooks, and more importantly, avoids the need to track child components in
  // arrays.

  if (target) {
    var current = target.parent;

    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }

      current = current.parent;
    }
  }
}

function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  injectHook(type, hook, keepAliveRoot, true
  /* prepend */
  );
  onUnmounted(function () {
    remove(keepAliveRoot[type], hook);
  }, target);
}

function injectHook(type, hook) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;
  var prepend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (target) {
    var hooks = target[type] || (target[type] = []); // cache the error handling wrapper for injected hooks so the same hook
    // can be properly deduped by the scheduler. "__weh" stands for "with error
    // handling".

    var wrappedHook = hook.__weh || (hook.__weh = function () {
      if (target.isUnmounted) {
        return;
      } // disable tracking inside all lifecycle hooks
      // since they can potentially be called inside effects.


      pauseTracking(); // Set currentInstance during hook invocation.
      // This assumes the hook does not synchronously trigger other hooks, which
      // can only be false when the user does something really funky.

      setCurrentInstance(target);

      for (var _len8 = arguments.length, args = new Array(_len8), _key12 = 0; _key12 < _len8; _key12++) {
        args[_key12] = arguments[_key12];
      }

      var res = callWithAsyncErrorHandling(hook, target, type, args);
      setCurrentInstance(null);
      resetTracking();
      return res;
    });

    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
  } else {
    var apiName = "on".concat(capitalize(ErrorTypeStrings[type].replace(/ hook$/, '')));
    warn("".concat(apiName, " is called when there is no active component instance to be ") + "associated with. " + "Lifecycle injection APIs can only be used during execution of setup()." + (" If you are using async setup(), make sure to register lifecycle " + "hooks before the first await statement."));
  }
}

var createHook = function createHook(lifecycle) {
  return function (hook) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
    return (// post-create lifecycle registrations are noops during SSR
      !isInSSRComponentSetup && injectHook(lifecycle, hook, target)
    );
  };
};

var onBeforeMount = createHook("bm"
/* BEFORE_MOUNT */
);
exports.onBeforeMount = onBeforeMount;
var onMounted = createHook("m"
/* MOUNTED */
);
exports.onMounted = onMounted;
var onBeforeUpdate = createHook("bu"
/* BEFORE_UPDATE */
);
exports.onBeforeUpdate = onBeforeUpdate;
var onUpdated = createHook("u"
/* UPDATED */
);
exports.onUpdated = onUpdated;
var onBeforeUnmount = createHook("bum"
/* BEFORE_UNMOUNT */
);
exports.onBeforeUnmount = onBeforeUnmount;
var onUnmounted = createHook("um"
/* UNMOUNTED */
);
exports.onUnmounted = onUnmounted;
var onRenderTriggered = createHook("rtg"
/* RENDER_TRIGGERED */
);
exports.onRenderTriggered = onRenderTriggered;
var onRenderTracked = createHook("rtc"
/* RENDER_TRACKED */
);
exports.onRenderTracked = onRenderTracked;

var onErrorCaptured = function onErrorCaptured(hook) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
  injectHook("ec"
  /* ERROR_CAPTURED */
  , hook, target);
};

exports.onErrorCaptured = onErrorCaptured;

var invoke = function invoke(fn) {
  return fn();
}; // Simple effect.


function watchEffect(effect, options) {
  return doWatch(effect, null, options);
} // initial value for watchers to trigger on undefined initial values


var INITIAL_WATCHER_VALUE = {}; // implementation

function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn("`watch(fn, options?)` signature has been moved to a separate API. " + "Use `watchEffect(fn, options?)` instead. `watch` now only " + "supports `watch(source, cb, options?) signature.");
  }

  return doWatch(source, cb, options);
}

function doWatch(source, cb) {
  var _ref19 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJ,
      immediate = _ref19.immediate,
      deep = _ref19.deep,
      flush = _ref19.flush,
      onTrack = _ref19.onTrack,
      onTrigger = _ref19.onTrigger;

  if (!cb) {
    if (immediate !== undefined) {
      warn("watch() \"immediate\" option is only respected when using the " + "watch(source, callback, options?) signature.");
    }

    if (deep !== undefined) {
      warn("watch() \"deep\" option is only respected when using the " + "watch(source, callback, options?) signature.");
    }
  }

  var instance = currentInstance;
  var suspense = currentSuspense;
  var getter;

  if (isArray(source)) {
    getter = function getter() {
      return source.map(function (s) {
        return isRef(s) ? s.value : callWithErrorHandling(s, instance, 2
        /* WATCH_GETTER */
        );
      });
    };
  } else if (isRef(source)) {
    getter = function getter() {
      return source.value;
    };
  } else if (cb) {
    // getter with cb
    getter = function getter() {
      return callWithErrorHandling(source, instance, 2
      /* WATCH_GETTER */
      );
    };
  } else {
    // no cb -> simple effect
    getter = function getter() {
      if (instance && instance.isUnmounted) {
        return;
      }

      if (cleanup) {
        cleanup();
      }

      return callWithErrorHandling(source, instance, 3
      /* WATCH_CALLBACK */
      , [onInvalidate]);
    };
  }

  if (cb && deep) {
    var baseGetter = getter;

    getter = function getter() {
      return traverse(baseGetter());
    };
  }

  var cleanup;

  var onInvalidate = function onInvalidate(fn) {
    cleanup = runner.options.onStop = function () {
      callWithErrorHandling(fn, instance, 4
      /* WATCH_CLEANUP */
      );
    };
  };

  var oldValue = isArray(source) ? [] : INITIAL_WATCHER_VALUE;
  var applyCb = cb ? function () {
    if (instance && instance.isUnmounted) {
      return;
    }

    var newValue = runner();

    if (deep || hasChanged(newValue, oldValue)) {
      // cleanup before running cb again
      if (cleanup) {
        cleanup();
      }

      callWithAsyncErrorHandling(cb, instance, 3
      /* WATCH_CALLBACK */
      , [newValue, // pass undefined as the old value when it's changed for the first time
      oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue, onInvalidate]);
      oldValue = newValue;
    }
  } : void 0;
  var scheduler;

  if (flush === 'sync') {
    scheduler = invoke;
  } else if (flush === 'pre') {
    scheduler = function scheduler(job) {
      if (!instance || instance.vnode.el != null) {
        queueJob(job);
      } else {
        // with 'pre' option, the first call must happen before
        // the component is mounted so it is called synchronously.
        job();
      }
    };
  } else {
    scheduler = function scheduler(job) {
      queuePostRenderEffect(job, suspense);
    };
  }

  var runner = effect(getter, {
    lazy: true,
    // so it runs before component update effects in pre flush mode
    computed: true,
    onTrack: onTrack,
    onTrigger: onTrigger,
    scheduler: applyCb ? function () {
      return scheduler(applyCb);
    } : scheduler
  });
  recordInstanceBoundEffect(runner); // initial run

  if (applyCb) {
    if (immediate) {
      applyCb();
    } else {
      oldValue = runner();
    }
  } else {
    runner();
  }

  return function () {
    stop(runner);

    if (instance) {
      remove(instance.effects, runner);
    }
  };
} // this.$watch


function instanceWatch(source, cb, options) {
  var ctx = this.proxy;
  var getter = isString(source) ? function () {
    return ctx[source];
  } : source.bind(ctx);
  var stop = watch(getter, cb.bind(ctx), options);
  onBeforeUnmount(stop, this);
  return stop;
}

function traverse(value) {
  var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

  if (!isObject(value) || seen.has(value)) {
    return;
  }

  seen.add(value);

  if (isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (_instanceof(value, Map)) {
    value.forEach(function (v, key) {
      // to register mutation dep for existing keys
      traverse(value.get(key), seen);
    });
  } else if (_instanceof(value, Set)) {
    value.forEach(function (v) {
      traverse(v, seen);
    });
  } else {
    for (var key in value) {
      traverse(value[key], seen);
    }
  }

  return value;
}

var publicPropertiesMap = {
  $: function $(i) {
    return i;
  },
  $el: function $el(i) {
    return i.vnode.el;
  },
  $data: function $data(i) {
    return i.data;
  },
  $props: function $props(i) {
    return i.propsProxy;
  },
  $attrs: function $attrs(i) {
    return i.attrs;
  },
  $slots: function $slots(i) {
    return i.slots;
  },
  $refs: function $refs(i) {
    return i.refs;
  },
  $parent: function $parent(i) {
    return i.parent;
  },
  $root: function $root(i) {
    return i.root;
  },
  $emit: function $emit(i) {
    return i.emit;
  },
  $options: function $options(i) {
    return i.type;
  },
  $forceUpdate: function $forceUpdate(i) {
    return function () {
      return queueJob(i.update);
    };
  },
  $nextTick: function $nextTick() {
    return nextTick;
  },
  $watch: function $watch(i) {
    return instanceWatch.bind(i);
  }
};
var PublicInstanceProxyHandlers = {
  get: function get(target, key) {
    // fast path for unscopables when using `with` block
    if (key === Symbol.unscopables) {
      return;
    }

    var renderContext = target.renderContext,
        data = target.data,
        props = target.props,
        propsProxy = target.propsProxy,
        accessCache = target.accessCache,
        type = target.type,
        sink = target.sink; // data / props / renderContext
    // This getter gets called for every property access on the render context
    // during render and is a major hotspot. The most expensive part of this
    // is the multiple hasOwn() calls. It's much faster to do a simple property
    // access on a plain object, so we use an accessCache object (with null
    // prototype) to memoize what access type a key corresponds to.

    if (key[0] !== '$') {
      var n = accessCache[key];

      if (n !== undefined) {
        switch (n) {
          case 0
          /* DATA */
          :
            return data[key];

          case 1
          /* CONTEXT */
          :
            return unref(renderContext[key]);

          case 2
          /* PROPS */
          :
            return propsProxy[key];
          // default: just fallthrough
        }
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 0
        /* DATA */
        ;
        return data[key];
      } else if (hasOwn(renderContext, key)) {
        accessCache[key] = 1
        /* CONTEXT */
        ;
        return unref(renderContext[key]);
      } else if (type.props != null) {
        // only cache other properties when instance has declared (this stable)
        // props
        if (hasOwn(props, key)) {
          accessCache[key] = 2
          /* PROPS */
          ; // return the value from propsProxy for ref unwrapping and readonly

          return propsProxy[key];
        } else {
          accessCache[key] = 3
          /* OTHER */
          ;
        }
      }
    } // public $xxx properties & user-attached properties (sink)


    var publicGetter = publicPropertiesMap[key];

    if (publicGetter != null) {
      if (key === '$attrs') {
        markAttrsAccessed();
      }

      return publicGetter(target);
    } else if (hasOwn(sink, key)) {
      return sink[key];
    } else if (currentRenderingInstance != null) {
      warn("Property ".concat(JSON.stringify(key), " was accessed during render ") + "but is not defined on instance.");
    }
  },
  has: function has(target, key) {
    var data = target.data,
        accessCache = target.accessCache,
        renderContext = target.renderContext,
        type = target.type,
        sink = target.sink;
    return accessCache[key] !== undefined || data !== EMPTY_OBJ && hasOwn(data, key) || hasOwn(renderContext, key) || type.props != null && hasOwn(type.props, key) || hasOwn(publicPropertiesMap, key) || hasOwn(sink, key);
  },
  set: function set(target, key, value) {
    var data = target.data,
        renderContext = target.renderContext;

    if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
    } else if (hasOwn(renderContext, key)) {
      // context is already reactive (user returned reactive object from setup())
      // just set directly
      if (isReactive(renderContext)) {
        renderContext[key] = value;
      } else {
        // handle potential ref set
        var oldValue = renderContext[key];

        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
        } else {
          renderContext[key] = value;
        }
      }
    } else if (key[0] === '$' && key.slice(1) in target) {
      warn("Attempting to mutate public property \"".concat(key, "\". ") + "Properties starting with $ are reserved and readonly.", target);
      return false;
    } else if (key in target.props) {
      warn("Attempting to mutate prop \"".concat(key, "\". Props are readonly."), target);
      return false;
    } else {
      target.sink[key] = value;
    }

    return true;
  }
};
var runtimeCompiledRenderProxyHandlers = { ...PublicInstanceProxyHandlers,
  has: function has(_target, key) {
    return key[0] !== '_' && !isGloballyWhitelisted(key);
  }
};

function provide(key, value) {
  if (!currentInstance) {
    {
      warn("provide() can only be used inside setup().");
    }
  } else {
    var provides = currentInstance.provides; // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.

    var parentProvides = currentInstance.parent && currentInstance.parent.provides;

    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    } // TS doesn't allow symbol as index type


    provides[key] = value;
  }
}

function inject(key, defaultValue) {
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  var instance = currentInstance || currentRenderingInstance;

  if (instance) {
    var provides = instance.provides;

    if (key in provides) {
      // TS doesn't allow symbol as index type
      return provides[key];
    } else if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      warn("injection \"".concat(String(key), "\" not found."));
    }
  } else {
    warn("inject() can only be used inside setup() or functional components.");
  }
}

function createDuplicateChecker() {
  var cache = Object.create(null);
  return function (type, key) {
    if (cache[key]) {
      warn("".concat(type, " property \"").concat(key, "\" is already defined in ").concat(cache[key], "."));
    } else {
      cache[key] = type;
    }
  };
}

function applyOptions(instance, options) {
  var asMixin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var ctx = instance.proxy;
  var mixins = options.mixins,
      extendsOptions = options.extends,
      propsOptions = options.props,
      dataOptions = options.data,
      computedOptions = options.computed,
      methods = options.methods,
      watchOptions = options.watch,
      provideOptions = options.provide,
      injectOptions = options.inject,
      components = options.components,
      directives = options.directives,
      beforeMount = options.beforeMount,
      mounted = options.mounted,
      beforeUpdate = options.beforeUpdate,
      updated = options.updated,
      activated = options.activated,
      deactivated = options.deactivated,
      beforeUnmount = options.beforeUnmount,
      unmounted = options.unmounted,
      renderTracked = options.renderTracked,
      renderTriggered = options.renderTriggered,
      errorCaptured = options.errorCaptured;
  var renderContext = instance.renderContext === EMPTY_OBJ ? instance.renderContext = {} : instance.renderContext;
  var globalMixins = instance.appContext.mixins; // call it only during dev

  var checkDuplicateProperties = createDuplicateChecker(); // applyOptions is called non-as-mixin once per instance

  if (!asMixin) {
    callSyncHook('beforeCreate', options, ctx, globalMixins); // global mixins are applied first

    applyMixins(instance, globalMixins);
  } // extending a base component...


  if (extendsOptions) {
    applyOptions(instance, extendsOptions, true);
  } // local mixins


  if (mixins) {
    applyMixins(instance, mixins);
  }

  if (propsOptions) {
    for (var key in propsOptions) {
      checkDuplicateProperties("Props"
      /* PROPS */
      , key);
    }
  } // state options


  if (dataOptions) {
    var data = isFunction(dataOptions) ? dataOptions.call(ctx) : dataOptions;

    if (!isObject(data)) {
      warn("data() should return an object.");
    } else if (instance.data === EMPTY_OBJ) {
      {
        for (var _key13 in data) {
          checkDuplicateProperties("Data"
          /* DATA */
          , _key13);
        }
      }
      instance.data = reactive(data);
    } else {
      // existing data: this is a mixin or extends.
      extend(instance.data, data);
    }
  }

  if (computedOptions) {
    var _loop = function _loop(_key14) {
      var opt = computedOptions[_key14];
      checkDuplicateProperties("Computed"
      /* COMPUTED */
      , _key14);

      if (isFunction(opt)) {
        renderContext[_key14] = computed$1(opt.bind(ctx, ctx));
      } else {
        var _get = opt.get,
            _set = opt.set;

        if (isFunction(_get)) {
          renderContext[_key14] = computed$1({
            get: _get.bind(ctx, ctx),
            set: isFunction(_set) ? _set.bind(ctx) : function () {
              warn("Computed property \"".concat(_key14, "\" was assigned to but it has no setter."));
            }
          });
        } else {
          warn("Computed property \"".concat(_key14, "\" has no getter."));
        }
      }
    };

    for (var _key14 in computedOptions) {
      _loop(_key14);
    }
  }

  if (methods) {
    for (var _key15 in methods) {
      var methodHandler = methods[_key15];

      if (isFunction(methodHandler)) {
        checkDuplicateProperties("Methods"
        /* METHODS */
        , _key15);
        renderContext[_key15] = methodHandler.bind(ctx);
      } else {
        warn("Method \"".concat(_key15, "\" has type \"").concat(_typeof(methodHandler), "\" in the component definition. ") + "Did you reference the function correctly?");
      }
    }
  }

  if (watchOptions) {
    for (var _key16 in watchOptions) {
      createWatcher(watchOptions[_key16], renderContext, ctx, _key16);
    }
  }

  if (provideOptions) {
    var provides = isFunction(provideOptions) ? provideOptions.call(ctx) : provideOptions;

    for (var _key17 in provides) {
      provide(_key17, provides[_key17]);
    }
  }

  if (injectOptions) {
    if (isArray(injectOptions)) {
      for (var i = 0; i < injectOptions.length; i++) {
        var _key18 = injectOptions[i];
        checkDuplicateProperties("Inject"
        /* INJECT */
        , _key18);
        renderContext[_key18] = inject(_key18);
      }
    } else {
      for (var _key19 in injectOptions) {
        checkDuplicateProperties("Inject"
        /* INJECT */
        , _key19);
        var opt = injectOptions[_key19];

        if (isObject(opt)) {
          renderContext[_key19] = inject(opt.from, opt.default);
        } else {
          renderContext[_key19] = inject(opt);
        }
      }
    }
  } // asset options


  if (components) {
    extend(instance.components, components);
  }

  if (directives) {
    extend(instance.directives, directives);
  } // lifecycle options


  if (!asMixin) {
    callSyncHook('created', options, ctx, globalMixins);
  }

  if (beforeMount) {
    onBeforeMount(beforeMount.bind(ctx));
  }

  if (mounted) {
    onMounted(mounted.bind(ctx));
  }

  if (beforeUpdate) {
    onBeforeUpdate(beforeUpdate.bind(ctx));
  }

  if (updated) {
    onUpdated(updated.bind(ctx));
  }

  if (activated) {
    onActivated(activated.bind(ctx));
  }

  if (deactivated) {
    onDeactivated(deactivated.bind(ctx));
  }

  if (errorCaptured) {
    onErrorCaptured(errorCaptured.bind(ctx));
  }

  if (renderTracked) {
    onRenderTracked(renderTracked.bind(ctx));
  }

  if (renderTriggered) {
    onRenderTriggered(renderTriggered.bind(ctx));
  }

  if (beforeUnmount) {
    onBeforeUnmount(beforeUnmount.bind(ctx));
  }

  if (unmounted) {
    onUnmounted(unmounted.bind(ctx));
  }
}

function callSyncHook(name, options, ctx, globalMixins) {
  callHookFromMixins(name, globalMixins, ctx);
  var baseHook = options.extends && options.extends[name];

  if (baseHook) {
    baseHook.call(ctx);
  }

  var mixins = options.mixins;

  if (mixins) {
    callHookFromMixins(name, mixins, ctx);
  }

  var selfHook = options[name];

  if (selfHook) {
    selfHook.call(ctx);
  }
}

function callHookFromMixins(name, mixins, ctx) {
  for (var i = 0; i < mixins.length; i++) {
    var fn = mixins[i][name];

    if (fn) {
      fn.call(ctx);
    }
  }
}

function applyMixins(instance, mixins) {
  for (var i = 0; i < mixins.length; i++) {
    applyOptions(instance, mixins[i], true);
  }
}

function createWatcher(raw, renderContext, ctx, key) {
  var getter = function getter() {
    return ctx[key];
  };

  if (isString(raw)) {
    var handler = renderContext[raw];

    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn("Invalid watch handler specified by key \"".concat(raw, "\""), handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(ctx));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach(function (r) {
        return createWatcher(r, renderContext, ctx, key);
      });
    } else {
      watch(getter, raw.handler.bind(ctx), raw);
    }
  } else {
    warn("Invalid watch option: \"".concat(key, "\""));
  }
}

var emptyAppContext = createAppContext();

function createComponentInstance(vnode, parent) {
  // inherit parent app context - or - if root, adopt from root vnode
  var appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  var instance = {
    vnode: vnode,
    parent: parent,
    appContext: appContext,
    type: vnode.type,
    root: null,
    next: null,
    subTree: null,
    update: null,
    render: null,
    proxy: null,
    withProxy: null,
    propsProxy: null,
    setupContext: null,
    effects: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // setup context properties
    renderContext: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    vnodeHooks: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    // per-instance asset storage (mutable during options resolution)
    components: Object.create(appContext.components),
    directives: Object.create(appContext.directives),
    // async dependency management
    asyncDep: null,
    asyncResult: null,
    asyncResolved: false,
    // user namespace for storing whatever the user assigns to `this`
    // can also be used as a wildcard storage for ad-hoc injections internally
    sink: {},
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    emit: function emit(event) {
      var props = instance.vnode.props || EMPTY_OBJ;
      var handler = props["on".concat(event)] || props["on".concat(capitalize(event))];

      if (!handler && event.indexOf('update:') === 0) {
        event = hyphenate(event);
        handler = props["on".concat(event)] || props["on".concat(capitalize(event))];
      }

      if (handler) {
        for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key20 = 1; _key20 < _len9; _key20++) {
          args[_key20 - 1] = arguments[_key20];
        }

        var res = callWithAsyncErrorHandling(handler, instance, 6
        /* COMPONENT_EVENT_HANDLER */
        , args);
        return isArray(res) ? res : [res];
      } else {
        return [];
      }
    }
  };
  instance.root = parent ? parent.root : instance;
  return instance;
}

var currentInstance = null;
var currentSuspense = null;

var getCurrentInstance = function getCurrentInstance() {
  return currentInstance || currentRenderingInstance;
};

exports.getCurrentInstance = getCurrentInstance;

var setCurrentInstance = function setCurrentInstance(instance) {
  currentInstance = instance;
};

var isBuiltInTag = /*#__PURE__*/makeMap('slot,component');

function validateComponentName(name, config) {
  var appIsNativeTag = config.isNativeTag || NO;

  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component id: ' + name);
  }
}

var isInSSRComponentSetup = false;

function setupComponent(instance, parentSuspense) {
  var isSSR = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  isInSSRComponentSetup = isSSR;
  var propsOptions = instance.type.props;
  var _instance$vnode = instance.vnode,
      props = _instance$vnode.props,
      children = _instance$vnode.children,
      shapeFlag = _instance$vnode.shapeFlag;
  resolveProps(instance, props, propsOptions);
  resolveSlots(instance, children); // setup stateful logic

  var setupResult;

  if (shapeFlag & 4
  /* STATEFUL_COMPONENT */
  ) {
      setupResult = setupStatefulComponent(instance, parentSuspense);
    }

  isInSSRComponentSetup = false;
  return setupResult;
}

function setupStatefulComponent(instance, parentSuspense) {
  var Component = instance.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }

    if (Component.components) {
      var names = Object.keys(Component.components);

      for (var i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }

    if (Component.directives) {
      var _names = Object.keys(Component.directives);

      for (var _i6 = 0; _i6 < _names.length; _i6++) {
        validateDirectiveName(_names[_i6]);
      }
    }
  } // 0. create render proxy property access cache

  instance.accessCache = {}; // 1. create public instance / render proxy

  instance.proxy = new Proxy(instance, PublicInstanceProxyHandlers); // 2. create props proxy
  // the propsProxy is a reactive AND readonly proxy to the actual props.
  // it will be updated in resolveProps() on updates before render

  var propsProxy = instance.propsProxy = isInSSRComponentSetup ? instance.props : shallowReadonly(instance.props); // 3. call setup()

  var setup = Component.setup;

  if (setup) {
    var setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    currentInstance = instance;
    currentSuspense = parentSuspense;
    pauseTracking();
    var setupResult = callWithErrorHandling(setup, instance, 0
    /* SETUP_FUNCTION */
    , [propsProxy, setupContext]);
    resetTracking();
    currentInstance = null;
    currentSuspense = null;

    if (isPromise(setupResult)) {
      if (isInSSRComponentSetup) {
        // return the promise so server-renderer can wait on it
        return setupResult.then(function (resolvedResult) {
          handleSetupResult(instance, resolvedResult, parentSuspense);
        });
      } else {
        // async setup returned Promise.
        // bail here and wait for re-entry.
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, parentSuspense);
    }
  } else {
    finishComponentSetup(instance, parentSuspense);
  }
}

function handleSetupResult(instance, setupResult, parentSuspense) {
  if (isFunction(setupResult)) {
    // setup returned an inline render function
    instance.render = setupResult;
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn("setup() should not return VNodes directly - " + "return a render function instead.");
    } // setup returned bindings.
    // assuming a render function compiled from template is present.


    instance.renderContext = setupResult;
  } else if (setupResult !== undefined) {
    warn("setup() should return an object. Received: ".concat(setupResult === null ? 'null' : _typeof(setupResult)));
  }

  finishComponentSetup(instance, parentSuspense);
}

var compile$1; // exported method uses any to avoid d.ts relying on the compiler types.

function registerRuntimeCompiler(_compile) {
  compile$1 = _compile;
}

function finishComponentSetup(instance, parentSuspense) {
  var Component = instance.type;

  if (!instance.render) {
    if (Component.template && !Component.render) {
      // true ensures `compile` is provided
      Component.render = compile$1(Component.template, {
        isCustomElement: instance.appContext.config.isCustomElement || NO
      });
      Component.render.isRuntimeCompiled = true;
    }

    if (!Component.render && !Component.ssrRender) {
      /* istanbul ignore if */
      {
        warn("Component is missing".concat(" template or", " render function."));
      }
    }

    instance.render = Component.render || NOOP; // for runtime-compiled render functions using `with` blocks, the render
    // proxy used needs a different `has` handler which is more performant and
    // also only allows a whitelist of globals to fallthrough.

    if (instance.render.isRuntimeCompiled) {
      instance.withProxy = new Proxy(instance, runtimeCompiledRenderProxyHandlers);
    }
  } // support for 2.x options


  {
    currentInstance = instance;
    currentSuspense = parentSuspense;
    applyOptions(instance, Component);
    currentInstance = null;
    currentSuspense = null;
  }

  if (instance.renderContext === EMPTY_OBJ) {
    instance.renderContext = {};
  }
} // used to identify a setup context proxy


var SetupProxySymbol = Symbol();
var SetupProxyHandlers = {};
['attrs', 'slots'].forEach(function (type) {
  SetupProxyHandlers[type] = {
    get: function get(instance, key) {
      {
        markAttrsAccessed();
      }
      return instance[type][key];
    },
    has: function has(instance, key) {
      return key === SetupProxySymbol || key in instance[type];
    },
    ownKeys: function ownKeys(instance) {
      return Reflect.ownKeys(instance[type]);
    },
    // this is necessary for ownKeys to work properly
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(instance, key) {
      return Reflect.getOwnPropertyDescriptor(instance[type], key);
    },
    set: function set() {
      return false;
    },
    deleteProperty: function deleteProperty() {
      return false;
    }
  };
});

function createSetupContext(instance) {
  var context = {
    // attrs & slots are non-reactive, but they need to always expose
    // the latest values (instance.xxx may get replaced during updates) so we
    // need to expose them through a proxy
    attrs: new Proxy(instance, SetupProxyHandlers.attrs),
    slots: new Proxy(instance, SetupProxyHandlers.slots),

    get emit() {
      return instance.emit;
    }

  };
  return Object.freeze(context);
} // record effects created during a component's setup() so that they can be
// stopped when the component unmounts


function recordInstanceBoundEffect(effect) {
  if (currentInstance) {
    (currentInstance.effects || (currentInstance.effects = [])).push(effect);
  }
}

function computed$1(getterOrOptions) {
  var c = computed(getterOrOptions);
  recordInstanceBoundEffect(c.effect);
  return c;
} // implementation, close to no-op


function defineComponent(options) {
  return isFunction(options) ? {
    setup: options
  } : options;
} // Actual implementation


function h(type, propsOrChildren, children) {
  if (arguments.length === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      } // props without children


      return createVNode(type, propsOrChildren);
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (isVNode(children)) {
      children = [children];
    }

    return createVNode(type, propsOrChildren, children);
  }
}

var useCSSModule = function useCSSModule() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '$style';
  {
    var instance = getCurrentInstance();

    if (!instance) {
      warn("useCSSModule must be called inside setup()");
      return EMPTY_OBJ;
    }

    var modules = instance.type.__cssModules;

    if (!modules) {
      warn("Current instance does not have CSS modules injected.");
      return EMPTY_OBJ;
    }

    var mod = modules[name];

    if (!mod) {
      warn("Current instance does not have CSS module named \"".concat(name, "\"."));
      return EMPTY_OBJ;
    }

    return mod;
  }
};

exports.useCSSModule = useCSSModule;
var ssrContextKey = Symbol("ssrContext");
exports.ssrContextKey = ssrContextKey;

var useSSRContext = function useSSRContext() {
  {
    var ctx = inject(ssrContextKey);

    if (!ctx) {
      warn("Server rendering context not provided. Make sure to only call " + "useSsrContext() conditionally in the server build.");
    }

    return ctx;
  }
};

exports.useSSRContext = useSSRContext;
var COMPONENTS = 'components';
var DIRECTIVES = 'directives';

function resolveComponent(name) {
  return resolveAsset(COMPONENTS, name);
}

function resolveDynamicComponent(component, // Dynamic component resolution has to be called inline due to potential
// access to scope variables. When called inside slots it will be inside
// a different component's render cycle, so the owner instance must be passed
// in explicitly.
instance) {
  if (!component) return;

  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, instance);
  } else if (isFunction(component) || isObject(component)) {
    return component;
  }
}

function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
}

function resolveAsset(type, name) {
  var instance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentRenderingInstance || currentInstance;

  if (instance) {
    var camelized, capitalized;
    var registry = instance[type];
    var res = registry[name] || registry[camelized = camelize(name)] || registry[capitalized = capitalize(camelized)];

    if (!res && type === COMPONENTS) {
      var self = instance.type;
      var selfName = self.displayName || self.name;

      if (selfName && (selfName === name || selfName === camelized || selfName === capitalized)) {
        res = self;
      }
    }

    if (!res) {
      warn("Failed to resolve ".concat(type.slice(0, -1), ": ").concat(name));
    }

    return res;
  } else {
    warn("resolve".concat(capitalize(type.slice(0, -1)), " ") + "can only be used in render() or setup().");
  }
}

function renderList(source, renderItem) {
  var ret;

  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);

    for (var i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i);
    }
  } else if (typeof source === 'number') {
    ret = new Array(source);

    for (var _i7 = 0; _i7 < source; _i7++) {
      ret[_i7] = renderItem(_i7 + 1, _i7);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, renderItem);
    } else {
      var keys = Object.keys(source);
      ret = new Array(keys.length);

      for (var _i8 = 0, _l = keys.length; _i8 < _l; _i8++) {
        var key = keys[_i8];
        ret[_i8] = renderItem(source[key], key, _i8);
      }
    }
  } else {
    ret = [];
  }

  return ret;
} // For prefixing keys in v-on="obj" with "on"


function toHandlers(obj) {
  var ret = {};

  if (!isObject(obj)) {
    warn("v-on with no argument expects an object value.");
    return ret;
  }

  for (var key in obj) {
    ret["on".concat(key)] = obj[key];
  }

  return ret;
}

function renderSlot(slots, name) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var // this is not a user-facing function, so the fallback is always generated by
  // the compiler and guaranteed to be an array
  fallback = arguments.length > 3 ? arguments[3] : undefined;
  var slot = slots[name];

  if (slot && slot.length > 1) {
    warn("SSR-optimized slot function detected in a non-SSR-optimized render " + "function. You need to mark this component with $dynamic-slots in the " + "parent template.");

    slot = function slot() {
      return [];
    };
  }

  return openBlock(), createBlock(Fragment, {
    key: props.key
  }, slot ? slot(props) : fallback || [], slots._ ? 64
  /* STABLE_FRAGMENT */
  : -2
  /* BAIL */
  );
}

function createSlots(slots, dynamicSlots) {
  for (var i = 0; i < dynamicSlots.length; i++) {
    var slot = dynamicSlots[i]; // array of dynamic slot generated by <template v-for="..." #[...]>

    if (isArray(slot)) {
      for (var j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else {
      // conditional single slot generated by <template v-if="..." #foo>
      slots[slot.name] = slot.fn;
    }
  }

  return slots;
} // Public API ------------------------------------------------------------------


var version = "3.0.0-alpha.7";
exports.version = version;
var toDisplayString$1 = toDisplayString;
exports.toDisplayString = toDisplayString$1;
var camelize$1 = camelize;
exports.camelize = camelize$1;
var ssrUtils = null;
exports.ssrUtils = ssrUtils;
var doc = typeof document !== 'undefined' ? document : null;
var svgNS = 'http://www.w3.org/2000/svg';
var tempContainer;
var tempSVGContainer;
var nodeOps = {
  insert: function insert(child, parent, anchor) {
    if (anchor != null) {
      parent.insertBefore(child, anchor);
    } else {
      parent.appendChild(child);
    }
  },
  remove: function remove(child) {
    var parent = child.parentNode;

    if (parent != null) {
      parent.removeChild(child);
    }
  },
  createElement: function createElement(tag, isSVG) {
    return isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag);
  },
  createText: function createText(text) {
    return doc.createTextNode(text);
  },
  createComment: function createComment(text) {
    return doc.createComment(text);
  },
  setText: function setText(node, text) {
    node.nodeValue = text;
  },
  setElementText: function setElementText(el, text) {
    el.textContent = text;
  },
  parentNode: function parentNode(node) {
    return node.parentNode;
  },
  nextSibling: function nextSibling(node) {
    return node.nextSibling;
  },
  querySelector: function querySelector(selector) {
    return doc.querySelector(selector);
  },
  setScopeId: function setScopeId(el, id) {
    el.setAttribute(id, '');
  },
  cloneNode: function cloneNode(el) {
    return el.cloneNode(true);
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent: function insertStaticContent(content, parent, anchor, isSVG) {
    var temp = isSVG ? tempSVGContainer || (tempSVGContainer = doc.createElementNS(svgNS, 'svg')) : tempContainer || (tempContainer = doc.createElement('div'));
    temp.innerHTML = content;
    var node = temp.children[0];
    nodeOps.insert(node, parent, anchor);
    return node;
  }
}; // compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]

function patchClass(el, value, isSVG) {
  if (value == null) {
    value = '';
  } // directly setting className should be faster than setAttribute in theory


  if (isSVG) {
    el.setAttribute('class', value);
  } else {
    // if this is an element during a transition, take the temporary transition
    // classes into account.
    var transitionClasses = el._vtc;

    if (transitionClasses) {
      value = [value].concat(_toConsumableArray(transitionClasses)).join(' ');
    }

    el.className = value;
  }
}

function patchStyle(el, prev, next) {
  var style = el.style;

  if (!next) {
    el.removeAttribute('style');
  } else if (isString(next)) {
    style.cssText = next;
  } else {
    for (var key in next) {
      setStyle(style, key, next[key]);
    }

    if (prev && !isString(prev)) {
      for (var _key21 in prev) {
        if (!next[_key21]) {
          setStyle(style, _key21, '');
        }
      }
    }
  }
}

var importantRE = /\s*!important$/;

function setStyle(style, name, val) {
  if (name.startsWith('--')) {
    // custom property definition
    style.setProperty(name, val);
  } else {
    var prefixed = autoPrefix(style, name);

    if (importantRE.test(val)) {
      // !important
      style.setProperty(hyphenate(prefixed), val.replace(importantRE, ''), 'important');
    } else {
      style[prefixed] = val;
    }
  }
}

var prefixes = ['Webkit', 'Moz', 'ms'];
var prefixCache = {};

function autoPrefix(style, rawName) {
  var cached = prefixCache[rawName];

  if (cached) {
    return cached;
  }

  var name = camelize$1(rawName);

  if (name !== 'filter' && name in style) {
    return prefixCache[rawName] = name;
  }

  name = capitalize(name);

  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + name;

    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }

  return rawName;
}

var xlinkNS = 'http://www.w3.org/1999/xlink';

function patchAttr(el, key, value, isSVG) {
  if (isSVG && key.indexOf('xlink:') === 0) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key);
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    // note we are only checking boolean attributes that don't have a
    // correspoding dom prop of the same name here.
    var _isBoolean = isSpecialBooleanAttr(key);

    if (value == null || _isBoolean && value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, _isBoolean ? '' : value);
    }
  }
} // __UNSAFE__
// Reason: potentially setting innerHTML.
// This can come from explicit usage of v-html or innerHTML as a prop in render
// functions. The user is reponsible for using them with only trusted content.


function patchDOMProp(el, key, value, // the following args are passed only due to potential innerHTML/textContent
// overriding existing VNodes, in which case the old tree must be properly
// unmounted.
prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if ((key === 'innerHTML' || key === 'textContent') && prevChildren != null) {
    unmountChildren(prevChildren, parentComponent, parentSuspense);
    el[key] = value == null ? '' : value;
    return;
  }

  if (key === 'value' && el.tagName !== 'PROGRESS') {
    // store value as _value as well since
    // non-string values will be stringified.
    el._value = value;
    el.value = value == null ? '' : value;
    return;
  }

  if (value === '' && typeof el[key] === 'boolean') {
    // e.g. <select multiple> compiles to { multiple: '' }
    el[key] = true;
  } else {
    el[key] = value == null ? '' : value;
  }
} // Async edge case fix requires storing an event listener's attach timestamp.


var _getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res ( relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.

if (typeof document !== 'undefined' && _getNow() > document.createEvent('Event').timeStamp) {
  // if the low-res timestamp which is bigger than the event timestamp
  // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
  // and we need to use the hi-res version for event listeners as well.
  _getNow = function _getNow() {
    return performance.now();
  };
} // To avoid the overhead of repeatedly calling performance.now(), we cache
// and use the same timestamp for all event listeners attached in the same tick.


var cachedNow = 0;
var p$1 = Promise.resolve();

var reset = function reset() {
  cachedNow = 0;
};

var getNow = function getNow() {
  return cachedNow || (p$1.then(reset), cachedNow = _getNow());
};

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}

function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}

function patchEvent(el, name, prevValue, nextValue) {
  var instance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var prevOptions = prevValue && 'options' in prevValue && prevValue.options;
  var nextOptions = nextValue && 'options' in nextValue && nextValue.options;
  var invoker = prevValue && prevValue.invoker;
  var value = nextValue && 'handler' in nextValue ? nextValue.handler : nextValue;

  if (prevOptions || nextOptions) {
    var prev = prevOptions || EMPTY_OBJ;
    var next = nextOptions || EMPTY_OBJ;

    if (prev.capture !== next.capture || prev.passive !== next.passive || prev.once !== next.once) {
      if (invoker) {
        removeEventListener(el, name, invoker, prev);
      }

      if (nextValue && value) {
        var _invoker = createInvoker(value, instance);

        nextValue.invoker = _invoker;
        addEventListener(el, name, _invoker, next);
      }

      return;
    }
  }

  if (nextValue && value) {
    if (invoker) {
      prevValue.invoker = null;
      invoker.value = value;
      nextValue.invoker = invoker;
      invoker.lastUpdated = getNow();
    } else {
      addEventListener(el, name, createInvoker(value, instance), nextOptions || void 0);
    }
  } else if (invoker) {
    removeEventListener(el, name, invoker, prevOptions || void 0);
  }
}

function createInvoker(initialValue, instance) {
  var invoker = function invoker(e) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    if (e.timeStamp >= invoker.lastUpdated - 1) {
      callWithAsyncErrorHandling(invoker.value, instance, 5
      /* NATIVE_EVENT_HANDLER */
      , [e]);
    }
  };

  invoker.value = initialValue;
  initialValue.invoker = invoker;
  invoker.lastUpdated = getNow();
  return invoker;
}

var patchProp = function patchProp(el, key, nextValue, prevValue) {
  var isSVG = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var prevChildren = arguments.length > 5 ? arguments[5] : undefined;
  var parentComponent = arguments.length > 6 ? arguments[6] : undefined;
  var parentSuspense = arguments.length > 7 ? arguments[7] : undefined;
  var unmountChildren = arguments.length > 8 ? arguments[8] : undefined;

  switch (key) {
    // special
    case 'class':
      patchClass(el, nextValue, isSVG);
      break;

    case 'style':
      patchStyle(el, prevValue, nextValue);
      break;

    case 'modelValue':
    case 'onUpdate:modelValue':
      // Do nothing. This is handled by v-model directives.
      break;

    default:
      if (isOn(key)) {
        patchEvent(el, key.slice(2).toLowerCase(), prevValue, nextValue, parentComponent);
      } else if (!isSVG && key in el) {
        patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
      } else {
        // special case for <input v-model type="checkbox"> with
        // :true-value & :false-value
        // store value as dom properties since non-string values will be
        // stringified.
        if (key === 'true-value') {
          el._trueValue = nextValue;
        } else if (key === 'false-value') {
          el._falseValue = nextValue;
        }

        patchAttr(el, key, nextValue, isSVG);
      }

      break;
  }
};

var getModelAssigner = function getModelAssigner(vnode) {
  return vnode.props['onUpdate:modelValue'];
};

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  var target = e.target;

  if (target.composing) {
    target.composing = false;
    trigger$1(target, 'input');
  }
}

function trigger$1(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
} // We are exporting the v-model runtime directly as vnode hooks so that it can
// be tree-shaken in case v-model is never used.


var vModelText = {
  beforeMount: function beforeMount(el, _ref20, vnode) {
    var value = _ref20.value,
        _ref20$modifiers = _ref20.modifiers,
        lazy = _ref20$modifiers.lazy,
        trim = _ref20$modifiers.trim,
        number = _ref20$modifiers.number;
    el.value = value;
    var assign = getModelAssigner(vnode);
    var castToNumber = number || el.type === 'number';
    addEventListener(el, lazy ? 'change' : 'input', function () {
      var domValue = el.value;

      if (trim) {
        domValue = domValue.trim();
      } else if (castToNumber) {
        domValue = toNumber(domValue);
      }

      assign(domValue);
    });

    if (trim) {
      addEventListener(el, 'change', function () {
        el.value = el.value.trim();
      });
    }

    if (!lazy) {
      addEventListener(el, 'compositionstart', onCompositionStart);
      addEventListener(el, 'compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
      // switching focus before confirming composition choice
      // this also fixes the issue where some browsers e.g. iOS Chrome
      // fires "change" instead of "input" on autocomplete.

      addEventListener(el, 'change', onCompositionEnd);
    }
  },
  beforeUpdate: function beforeUpdate(el, _ref21) {
    var value = _ref21.value,
        oldValue = _ref21.oldValue,
        _ref21$modifiers = _ref21.modifiers,
        trim = _ref21$modifiers.trim,
        number = _ref21$modifiers.number;

    if (value === oldValue) {
      return;
    }

    if (document.activeElement === el) {
      if (trim && el.value.trim() === value) {
        return;
      }

      if ((number || el.type === 'number') && toNumber(el.value) === value) {
        return;
      }
    }

    el.value = value;
  }
};
exports.vModelText = vModelText;
var vModelCheckbox = {
  beforeMount: function beforeMount(el, binding, vnode) {
    setChecked(el, binding, vnode);
    var assign = getModelAssigner(vnode);
    addEventListener(el, 'change', function () {
      var modelValue = el._modelValue;
      var elementValue = getValue(el);
      var checked = el.checked;

      if (isArray(modelValue)) {
        var index = looseIndexOf(modelValue, elementValue);
        var found = index !== -1;

        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          var filtered = _toConsumableArray(modelValue);

          filtered.splice(index, 1);
          assign(filtered);
        }
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },
  beforeUpdate: setChecked
};
exports.vModelCheckbox = vModelCheckbox;

function setChecked(el, _ref22, vnode) {
  var value = _ref22.value,
      oldValue = _ref22.oldValue;
  el._modelValue = value;

  if (isArray(value)) {
    el.checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (value !== oldValue) {
    el.checked = looseEqual(value, getCheckboxValue(el, true));
  }
}

var vModelRadio = {
  beforeMount: function beforeMount(el, _ref23, vnode) {
    var value = _ref23.value;
    el.checked = looseEqual(value, vnode.props.value);
    var assign = getModelAssigner(vnode);
    addEventListener(el, 'change', function () {
      assign(getValue(el));
    });
  },
  beforeUpdate: function beforeUpdate(el, _ref24, vnode) {
    var value = _ref24.value,
        oldValue = _ref24.oldValue;

    if (value !== oldValue) {
      el.checked = looseEqual(value, vnode.props.value);
    }
  }
};
exports.vModelRadio = vModelRadio;
var vModelSelect = {
  // use mounted & updated because <select> relies on its children <option>s.
  mounted: function mounted(el, _ref25, vnode) {
    var value = _ref25.value;
    setSelected(el, value);
    var assign = getModelAssigner(vnode);
    addEventListener(el, 'change', function () {
      var selectedVal = Array.prototype.filter.call(el.options, function (o) {
        return o.selected;
      }).map(getValue);
      assign(el.multiple ? selectedVal : selectedVal[0]);
    });
  },
  updated: function updated(el, _ref26) {
    var value = _ref26.value;
    setSelected(el, value);
  }
};
exports.vModelSelect = vModelSelect;

function setSelected(el, value) {
  var isMultiple = el.multiple;

  if (isMultiple && !isArray(value)) {
    warn("<select multiple v-model> expects an Array value for its binding, " + "but got ".concat(Object.prototype.toString.call(value).slice(8, -1), "."));
    return;
  }

  for (var i = 0, l = el.options.length; i < l; i++) {
    var option = el.options[i];
    var optionValue = getValue(option);

    if (isMultiple) {
      option.selected = looseIndexOf(value, optionValue) > -1;
    } else {
      if (looseEqual(getValue(option), value)) {
        el.selectedIndex = i;
        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
} // retrieve raw value set via :value bindings


function getValue(el) {
  return '_value' in el ? el._value : el.value;
} // retrieve raw value for true-value and false-value set via :true-value or :false-value bindings


function getCheckboxValue(el, checked) {
  var key = checked ? '_trueValue' : '_falseValue';
  return key in el ? el[key] : checked;
}

var vModelDynamic = {
  beforeMount: function beforeMount(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, 'beforeMount');
  },
  mounted: function mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, 'mounted');
  },
  beforeUpdate: function beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, 'beforeUpdate');
  },
  updated: function updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, 'updated');
  }
};
exports.vModelDynamic = vModelDynamic;

function callModelHook(el, binding, vnode, prevVNode, hook) {
  var modelToUse;

  switch (el.tagName) {
    case 'SELECT':
      modelToUse = vModelSelect;
      break;

    case 'TEXTAREA':
      modelToUse = vModelText;
      break;

    default:
      switch (el.type) {
        case 'checkbox':
          modelToUse = vModelCheckbox;
          break;

        case 'radio':
          modelToUse = vModelRadio;
          break;

        default:
          modelToUse = vModelText;
      }

  }

  var fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}

var systemModifiers = ['ctrl', 'shift', 'alt', 'meta'];
var modifierGuards = {
  stop: function stop(e) {
    return e.stopPropagation();
  },
  prevent: function prevent(e) {
    return e.preventDefault();
  },
  self: function self(e) {
    return e.target !== e.currentTarget;
  },
  ctrl: function ctrl(e) {
    return !e.ctrlKey;
  },
  shift: function shift(e) {
    return !e.shiftKey;
  },
  alt: function alt(e) {
    return !e.altKey;
  },
  meta: function meta(e) {
    return !e.metaKey;
  },
  left: function left(e) {
    return 'button' in e && e.button !== 0;
  },
  middle: function middle(e) {
    return 'button' in e && e.button !== 1;
  },
  right: function right(e) {
    return 'button' in e && e.button !== 2;
  },
  exact: function exact(e, modifiers) {
    return systemModifiers.some(function (m) {
      return e["".concat(m, "Key")] && !modifiers.includes(m);
    });
  }
};

var withModifiers = function withModifiers(fn, modifiers) {
  return function (event) {
    for (var i = 0; i < modifiers.length; i++) {
      var guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }

    return fn(event);
  };
}; // Kept for 2.x compat.
// Note: IE11 compat for `spacebar` and `del` is removed for now.


exports.withModifiers = withModifiers;
var keyNames = {
  esc: 'escape',
  space: ' ',
  up: 'arrow-up',
  left: 'arrow-left',
  right: 'arrow-right',
  down: 'arrow-down',
  delete: 'backspace'
};

var withKeys = function withKeys(fn, modifiers) {
  return function (event) {
    if (!('key' in event)) return;
    var eventKey = hyphenate(event.key);

    if ( // None of the provided key modifiers match the current event key
    !modifiers.some(function (k) {
      return k === eventKey || keyNames[k] === eventKey;
    })) {
      return;
    }

    return fn(event);
  };
};

exports.withKeys = withKeys;
var vShow = {
  beforeMount: function beforeMount(el, _ref27, _ref28) {
    var value = _ref27.value;
    var transition = _ref28.transition;
    el._vod = el.style.display === 'none' ? '' : el.style.display;

    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted: function mounted(el, _ref29, _ref30) {
    var value = _ref29.value;
    var transition = _ref30.transition;

    if (transition && value) {
      transition.enter(el);
    }
  },
  updated: function updated(el, _ref31, _ref32) {
    var value = _ref31.value,
        oldValue = _ref31.oldValue;
    var transition = _ref32.transition;
    if (!value === !oldValue) return;

    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, function () {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount: function beforeUnmount(el) {
    setDisplay(el, true);
  }
};
exports.vShow = vShow;

function setDisplay(el, value) {
  el.style.display = value ? el._vod : 'none';
}

var TRANSITION$1 = 'transition';
var ANIMATION = 'animation'; // DOM Transition is a higher-order-component based on the platform-agnostic
// base Transition component, with DOM-specific logic.

var Transition = function Transition(props, _ref33) {
  var slots = _ref33.slots;
  return h(BaseTransition, resolveTransitionProps(props), slots);
};

exports.Transition = Transition;
var TransitionPropsValidators = { ...BaseTransition.props,
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: Object,
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
{
  Transition.props = TransitionPropsValidators;
}

function resolveTransitionProps(_ref34) {
  var _ref34$name = _ref34.name,
      name = _ref34$name === void 0 ? 'v' : _ref34$name,
      type = _ref34.type,
      _ref34$css = _ref34.css,
      css = _ref34$css === void 0 ? true : _ref34$css,
      duration = _ref34.duration,
      _ref34$enterFromClass = _ref34.enterFromClass,
      enterFromClass = _ref34$enterFromClass === void 0 ? "".concat(name, "-enter-from") : _ref34$enterFromClass,
      _ref34$enterActiveCla = _ref34.enterActiveClass,
      enterActiveClass = _ref34$enterActiveCla === void 0 ? "".concat(name, "-enter-active") : _ref34$enterActiveCla,
      _ref34$enterToClass = _ref34.enterToClass,
      enterToClass = _ref34$enterToClass === void 0 ? "".concat(name, "-enter-to") : _ref34$enterToClass,
      _ref34$appearFromClas = _ref34.appearFromClass,
      appearFromClass = _ref34$appearFromClas === void 0 ? enterFromClass : _ref34$appearFromClas,
      _ref34$appearActiveCl = _ref34.appearActiveClass,
      appearActiveClass = _ref34$appearActiveCl === void 0 ? enterActiveClass : _ref34$appearActiveCl,
      _ref34$appearToClass = _ref34.appearToClass,
      appearToClass = _ref34$appearToClass === void 0 ? enterToClass : _ref34$appearToClass,
      _ref34$leaveFromClass = _ref34.leaveFromClass,
      leaveFromClass = _ref34$leaveFromClass === void 0 ? "".concat(name, "-leave-from") : _ref34$leaveFromClass,
      _ref34$leaveActiveCla = _ref34.leaveActiveClass,
      leaveActiveClass = _ref34$leaveActiveCla === void 0 ? "".concat(name, "-leave-active") : _ref34$leaveActiveCla,
      _ref34$leaveToClass = _ref34.leaveToClass,
      leaveToClass = _ref34$leaveToClass === void 0 ? "".concat(name, "-leave-to") : _ref34$leaveToClass,
      baseProps = _objectWithoutProperties(_ref34, ["name", "type", "css", "duration", "enterFromClass", "enterActiveClass", "enterToClass", "appearFromClass", "appearActiveClass", "appearToClass", "leaveFromClass", "leaveActiveClass", "leaveToClass"]);

  if (!css) {
    return baseProps;
  }

  var instance = getCurrentInstance();
  var durations = normalizeDuration(duration);
  var enterDuration = durations && durations[0];
  var leaveDuration = durations && durations[1];
  var appear = baseProps.appear,
      _onBeforeEnter = baseProps.onBeforeEnter,
      _onEnter = baseProps.onEnter,
      _onLeave = baseProps.onLeave; // is appearing

  if (appear && !getCurrentInstance().isMounted) {
    enterFromClass = appearFromClass;
    enterActiveClass = appearActiveClass;
    enterToClass = appearToClass;
  }

  var finishEnter = function finishEnter(el, done) {
    removeTransitionClass(el, enterToClass);
    removeTransitionClass(el, enterActiveClass);
    done && done();
  };

  var finishLeave = function finishLeave(el, done) {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  }; // only needed for user hooks called in nextFrame
  // sync errors are already handled by BaseTransition


  function callHookWithErrorHandling(hook, args) {
    callWithAsyncErrorHandling(hook, instance, 8
    /* TRANSITION_HOOK */
    , args);
  }

  return { ...baseProps,
    onBeforeEnter: function onBeforeEnter(el) {
      _onBeforeEnter && _onBeforeEnter(el);
      addTransitionClass(el, enterActiveClass);
      addTransitionClass(el, enterFromClass);
    },
    onEnter: function onEnter(el, done) {
      nextFrame(function () {
        var resolve = function resolve() {
          return finishEnter(el, done);
        };

        _onEnter && callHookWithErrorHandling(_onEnter, [el, resolve]);
        removeTransitionClass(el, enterFromClass);
        addTransitionClass(el, enterToClass);

        if (!(_onEnter && _onEnter.length > 1)) {
          if (enterDuration) {
            setTimeout(resolve, enterDuration);
          } else {
            whenTransitionEnds(el, type, resolve);
          }
        }
      });
    },
    onLeave: function onLeave(el, done) {
      addTransitionClass(el, leaveActiveClass);
      addTransitionClass(el, leaveFromClass);
      nextFrame(function () {
        var resolve = function resolve() {
          return finishLeave(el, done);
        };

        _onLeave && callHookWithErrorHandling(_onLeave, [el, resolve]);
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);

        if (!(_onLeave && _onLeave.length > 1)) {
          if (leaveDuration) {
            setTimeout(resolve, leaveDuration);
          } else {
            whenTransitionEnds(el, type, resolve);
          }
        }
      });
    },
    onEnterCancelled: finishEnter,
    onLeaveCancelled: finishLeave
  };
}

function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [toNumber$1(duration.enter), toNumber$1(duration.leave)];
  } else {
    var n = toNumber$1(duration);
    return [n, n];
  }
}

function toNumber$1(val) {
  var res = Number(val || 0);
  validateDuration(res);
  return res;
}

function validateDuration(val) {
  if (typeof val !== 'number') {
    warn("<transition> explicit duration is not a valid number - " + "got ".concat(JSON.stringify(val), "."));
  } else if (isNaN(val)) {
    warn("<transition> explicit duration is NaN - " + 'the duration expression might be incorrect.');
  }
}

function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(function (c) {
    return c && el.classList.add(c);
  });
  (el._vtc || (el._vtc = new Set())).add(cls);
}

function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(function (c) {
    return c && el.classList.remove(c);
  });

  if (el._vtc) {
    el._vtc.delete(cls);

    if (!el._vtc.size) {
      el._vtc = undefined;
    }
  }
}

function nextFrame(cb) {
  requestAnimationFrame(function () {
    requestAnimationFrame(cb);
  });
}

function whenTransitionEnds(el, expectedType, cb) {
  var _getTransitionInfo = getTransitionInfo(el, expectedType),
      type = _getTransitionInfo.type,
      timeout = _getTransitionInfo.timeout,
      propCount = _getTransitionInfo.propCount;

  if (!type) {
    return cb();
  }

  var endEvent = type + 'end';
  var ended = 0;

  var end = function end() {
    el.removeEventListener(endEvent, onEnd);
    cb();
  };

  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var getStyleProperties = function getStyleProperties(key) {
    return (styles[key] || '').split(', ');
  };

  var transitionDelays = getStyleProperties(TRANSITION$1 + 'Delay');
  var transitionDurations = getStyleProperties(TRANSITION$1 + 'Duration');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = getStyleProperties(ANIMATION + 'Delay');
  var animationDurations = getStyleProperties(ANIMATION + 'Duration');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type = null;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION$1) {
    if (transitionTimeout > 0) {
      type = TRANSITION$1;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION$1 : ANIMATION : null;
    propCount = type ? type === TRANSITION$1 ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION$1 && /\b(transform|all)(,|$)/.test(styles[TRANSITION$1 + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(Math, _toConsumableArray(durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  })));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer
// numbers in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down
// (i.e. acting as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

var positionMap = new WeakMap();
var newPositionMap = new WeakMap();
var TransitionGroupImpl = {
  setup: function setup(props, _ref35) {
    var slots = _ref35.slots;
    var instance = getCurrentInstance();
    var state = useTransitionState();
    var prevChildren;
    var children;
    var hasMove = null;
    onUpdated(function () {
      // children is guaranteed to exist after initial render
      if (!prevChildren.length) {
        return;
      }

      var moveClass = props.moveClass || "".concat(props.name || 'v', "-move"); // Check if move transition is needed. This check is cached per-instance.

      hasMove = hasMove === null ? hasMove = hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass) : hasMove;

      if (!hasMove) {
        return;
      } // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.


      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      var movedChildren = prevChildren.filter(applyTranslation); // force reflow to put everything in position

      forceReflow();
      movedChildren.forEach(function (c) {
        var el = c.el;
        var style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.WebkitTransform = style.transitionDuration = '';

        var cb = el._moveCb = function (e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener('transitionend', cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };

        el.addEventListener('transitionend', cb);
      });
    });
    return function () {
      var rawProps = toRaw(props);
      var cssTransitionProps = resolveTransitionProps(rawProps);
      var tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? slots.default() : []; // handle fragment children case, e.g. v-for

      if (children.length === 1 && children[0].type === Fragment) {
        children = children[0].children;
      }

      for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else {
          warn("<TransitionGroup> children must be keyed.");
        }
      }

      if (prevChildren) {
        for (var _i9 = 0; _i9 < prevChildren.length; _i9++) {
          var _child2 = prevChildren[_i9];
          setTransitionHooks(_child2, resolveTransitionHooks(_child2, cssTransitionProps, state, instance));
          positionMap.set(_child2, _child2.el.getBoundingClientRect());
        }
      }

      return createVNode(tag, null, children);
    };
  }
};
var TransitionGroup = TransitionGroupImpl;
exports.TransitionGroup = TransitionGroup;
{
  var props = TransitionGroup.props = { ...TransitionPropsValidators,
    tag: String,
    moveClass: String
  };
  delete props.mode;
}

function callPendingCbs(c) {
  if (c.el._moveCb) {
    c.el._moveCb();
  }

  if (c.el._enterCb) {
    c.el._enterCb();
  }
}

function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}

function applyTranslation(c) {
  var oldPos = positionMap.get(c);
  var newPos = newPositionMap.get(c);
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    var s = c.el.style;
    s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
    s.transitionDuration = '0s';
    return c;
  }
} // this is put in a dedicated function to avoid the line from being treeshaken


function forceReflow() {
  return document.body.offsetHeight;
}

function hasCSSTransform(el, root, moveClass) {
  // Detect whether an element with the move class applied has
  // CSS transitions. Since the element may be inside an entering
  // transition at this very moment, we make a clone of it and remove
  // all other transition classes applied to ensure only the move class
  // is applied.
  var clone = el.cloneNode();

  if (el._vtc) {
    el._vtc.forEach(function (cls) {
      cls.split(/\s+/).forEach(function (c) {
        return c && clone.classList.remove(c);
      });
    });
  }

  moveClass.split(/\s+/).forEach(function (c) {
    return c && clone.classList.add(c);
  });
  clone.style.display = 'none';
  var container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);

  var _getTransitionInfo2 = getTransitionInfo(clone),
      hasTransform = _getTransitionInfo2.hasTransform;

  container.removeChild(clone);
  return hasTransform;
}

var rendererOptions = {
  patchProp: patchProp,
  ...nodeOps
}; // lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.

var renderer;
var enabledHydration = false;

function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}

function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
} // use explicit type casts here to avoid import() calls in rolled-up d.ts


var render = function render() {
  var _ensureRenderer;

  (_ensureRenderer = ensureRenderer()).render.apply(_ensureRenderer, arguments);
};

exports.render = render;

var hydrate = function hydrate() {
  var _ensureHydrationRende;

  (_ensureHydrationRende = ensureHydrationRenderer()).hydrate.apply(_ensureHydrationRende, arguments);
};

exports.hydrate = hydrate;

var createApp = function createApp() {
  var _ensureRenderer2;

  var app = (_ensureRenderer2 = ensureRenderer()).createApp.apply(_ensureRenderer2, arguments);

  {
    injectNativeTagCheck(app);
  }
  var mount = app.mount;

  app.mount = function (containerOrSelector) {
    var container = normalizeContainer(containerOrSelector);
    if (!container) return;
    var component = app._component;

    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    } // clear content before mounting


    container.innerHTML = '';
    return mount(container);
  };

  return app;
};

exports.createApp = createApp;

var createSSRApp = function createSSRApp() {
  var _ensureHydrationRende2;

  var app = (_ensureHydrationRende2 = ensureHydrationRenderer()).createApp.apply(_ensureHydrationRende2, arguments);

  {
    injectNativeTagCheck(app);
  }
  var mount = app.mount;

  app.mount = function (containerOrSelector) {
    var container = normalizeContainer(containerOrSelector);

    if (container) {
      return mount(container, true);
    }
  };

  return app;
};

exports.createSSRApp = createSSRApp;

function injectNativeTagCheck(app) {
  // Inject `isNativeTag`
  // this is used for component name validation (dev only)
  Object.defineProperty(app.config, 'isNativeTag', {
    value: function value(tag) {
      return isHTMLTag(tag) || isSVGTag(tag);
    },
    writable: false
  });
}

function normalizeContainer(container) {
  if (isString(container)) {
    var res = document.querySelector(container);

    if (!res) {
      warn("Failed to mount app: mount target selector returned null.");
    }

    return res;
  }

  return container;
}

var runtimeDom = /*#__PURE__*/Object.freeze({
  __proto__: null,
  render: render,
  hydrate: hydrate,
  createApp: createApp,
  createSSRApp: createSSRApp,
  vModelText: vModelText,
  vModelCheckbox: vModelCheckbox,
  vModelRadio: vModelRadio,
  vModelSelect: vModelSelect,
  vModelDynamic: vModelDynamic,
  withModifiers: withModifiers,
  withKeys: withKeys,
  vShow: vShow,
  Transition: Transition,
  TransitionGroup: TransitionGroup,
  version: version,
  toDisplayString: toDisplayString$1,
  camelize: camelize$1,
  ssrUtils: ssrUtils,
  ref: ref,
  unref: unref,
  shallowRef: shallowRef,
  isRef: isRef,
  toRefs: toRefs,
  reactive: reactive,
  isReactive: isReactive,
  readonly: readonly,
  isReadonly: isReadonly,
  shallowReactive: shallowReactive,
  toRaw: toRaw,
  markReadonly: markReadonly,
  markNonReactive: markNonReactive,
  computed: computed$1,
  watch: watch,
  watchEffect: watchEffect,
  onBeforeMount: onBeforeMount,
  onMounted: onMounted,
  onBeforeUpdate: onBeforeUpdate,
  onUpdated: onUpdated,
  onBeforeUnmount: onBeforeUnmount,
  onUnmounted: onUnmounted,
  onActivated: onActivated,
  onDeactivated: onDeactivated,
  onRenderTracked: onRenderTracked,
  onRenderTriggered: onRenderTriggered,
  onErrorCaptured: onErrorCaptured,
  provide: provide,
  inject: inject,
  nextTick: nextTick,
  defineComponent: defineComponent,
  getCurrentInstance: getCurrentInstance,
  h: h,
  createVNode: createVNode,
  cloneVNode: cloneVNode,
  mergeProps: mergeProps,
  openBlock: openBlock,
  createBlock: createBlock,
  Text: Text,
  Comment: Comment,
  Fragment: Fragment,
  Portal: Portal,
  Suspense: Suspense,
  KeepAlive: KeepAlive,
  BaseTransition: BaseTransition,
  useCSSModule: useCSSModule,
  useSSRContext: useSSRContext,
  ssrContextKey: ssrContextKey,
  createRenderer: createRenderer,
  createHydrationRenderer: createHydrationRenderer,
  warn: warn,
  handleError: handleError,
  callWithErrorHandling: callWithErrorHandling,
  callWithAsyncErrorHandling: callWithAsyncErrorHandling,
  useTransitionState: useTransitionState,
  resolveTransitionHooks: resolveTransitionHooks,
  setTransitionHooks: setTransitionHooks,
  withDirectives: withDirectives,
  resolveComponent: resolveComponent,
  resolveDirective: resolveDirective,
  resolveDynamicComponent: resolveDynamicComponent,
  renderList: renderList,
  toHandlers: toHandlers,
  renderSlot: renderSlot,
  createSlots: createSlots,
  pushScopeId: pushScopeId,
  popScopeId: popScopeId,
  withScopeId: withScopeId,
  setBlockTracking: setBlockTracking,
  createTextVNode: createTextVNode,
  createCommentVNode: createCommentVNode,
  createStaticVNode: createStaticVNode,
  registerRuntimeCompiler: registerRuntimeCompiler
});
{
  console[console.info ? 'info' : 'log']("You are running a development build of Vue.\n" + "Make sure to use the production build (*.prod.js) when deploying for production.");
} // This entry is the "full-build" that includes both the runtime

var compileCache = Object.create(null);

function compileToFunction(template, options) {
  if (!isString(template)) {
    if (template.nodeType) {
      template = template.innerHTML;
    } else {
      warn("invalid template option: ", template);
      return NOOP;
    }
  }

  var key = template;
  var cached = compileCache[key];

  if (cached) {
    return cached;
  }

  if (template[0] === '#') {
    var el = document.querySelector(template);

    if (!el) {
      warn("Template element not found or is empty: ".concat(template));
    } // __UNSAFE__
    // Reason: potential execution of JS expressions in in-DOM template.
    // The user must make sure the in-DOM template is trusted. If it's rendered
    // by the server, the template should not contain any user data.


    template = el ? el.innerHTML : "";
  }

  var _compile2 = compile(template, {
    hoistStatic: true,
    onError: function onError(err) {
      {
        var message = "Template compilation error: ".concat(err.message);
        var codeFrame = err.loc && generateCodeFrame(template, err.loc.start.offset, err.loc.end.offset);
        warn(codeFrame ? "".concat(message, "\n").concat(codeFrame) : message);
      }
    },
    ...options
  }),
      code = _compile2.code; // The wildcard import results in a huge object with every export
  // with keys that cannot be mangled, and can be quite heavy size-wise.
  // In the global build we know `Vue` is available globally so we can avoid
  // the wildcard object.


  var render = new Function('Vue', code)(runtimeDom);
  return compileCache[key] = render;
}

registerRuntimeCompiler(compileToFunction);
