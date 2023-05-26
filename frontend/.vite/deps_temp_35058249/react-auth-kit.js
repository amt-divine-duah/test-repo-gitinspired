import "./chunk-BAQ6TB6O.js";
import {
  Navigate,
  useLocation
} from "./chunk-PJLBXRFZ.js";
import {
  require_react
} from "./chunk-ST3U5LCA.js";
import {
  __toESM
} from "./chunk-DFKQJ226.js";

// node_modules/react-auth-kit/dist/AuthProvider.js
var React3 = __toESM(require_react());

// node_modules/react-auth-kit/dist/AuthContext.js
var React = __toESM(require_react());
var AuthContext = React.createContext(null);
var AuthContextConsumer = AuthContext.Consumer;

// node_modules/react-auth-kit/dist/_virtual/_tslib.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

// node_modules/js-cookie/dist/js.cookie.mjs
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (e) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set,
      get,
      remove: function(name, attributes) {
        set(
          name,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter, { path: "/" });

// node_modules/react-auth-kit/dist/TokenObject.js
var TokenObject = (
  /** @class */
  function() {
    function TokenObject2(authStorageName, authStorageType, refreshTokenName, cookieDomain, cookieSecure) {
      this.authStorageType = authStorageType;
      this.authStorageName = authStorageName;
      this.authTimeStorageName = "".concat(authStorageName, "_storage");
      this.stateStorageName = "".concat(authStorageName, "_state");
      this.refreshTokenName = refreshTokenName;
      this.cookieDomain = cookieDomain;
      this.cookieSecure = cookieSecure;
      this.authStorageTypeName = "".concat(this.authStorageName, "_type");
      this.isUsingRefreshToken = !!this.refreshTokenName;
      this.refreshTokenTimeName = this.refreshTokenName ? "".concat(this.refreshTokenName, "_time") : null;
    }
    TokenObject2.prototype.initialToken = function() {
      if (this.authStorageType === "cookie") {
        return this.initialCookieToken_();
      } else {
        return this.initialLSToken_();
      }
    };
    TokenObject2.prototype.initialCookieToken_ = function() {
      var authToken = api.get(this.authStorageName);
      var authTokenType = api.get(this.authStorageTypeName);
      var authTokenTime = api.get(this.authTimeStorageName);
      var stateCookie = api.get(this.stateStorageName);
      var refreshToken = this.isUsingRefreshToken && this.refreshTokenName != null ? api.get(this.refreshTokenName) : null;
      var refreshTokenTime = this.isUsingRefreshToken && this.refreshTokenTimeName != null ? api.get(this.refreshTokenTimeName) : null;
      return this.checkTokenExist(authToken, authTokenType, authTokenTime, stateCookie, refreshToken, refreshTokenTime);
    };
    TokenObject2.prototype.initialLSToken_ = function() {
      var authToken = localStorage.getItem(this.authStorageName);
      var authTokenType = localStorage.getItem(this.authStorageTypeName);
      var authTokenTime = localStorage.getItem(this.authTimeStorageName);
      var stateCookie = localStorage.getItem(this.stateStorageName);
      var refreshToken = this.isUsingRefreshToken && this.refreshTokenName != null ? localStorage.getItem(this.refreshTokenName) : null;
      var refreshTokenTime = this.isUsingRefreshToken && this.refreshTokenTimeName != null ? localStorage.getItem(this.refreshTokenTimeName) : null;
      return this.checkTokenExist(authToken, authTokenType, authTokenTime, stateCookie, refreshToken, refreshTokenTime);
    };
    TokenObject2.prototype.checkTokenExist = function(authToken, authTokenType, authTokenTime, stateCookie, refreshToken, refreshTokenTime) {
      if (!!authToken && !!authTokenType && !!authTokenTime && !!stateCookie) {
        var expiresAt = new Date(authTokenTime);
        try {
          var authState = JSON.parse(stateCookie);
          var obj = {
            auth: {
              token: authToken,
              type: authTokenType,
              expiresAt
            },
            userState: authState,
            isSignIn: true,
            isUsingRefreshToken: this.isUsingRefreshToken,
            refresh: void 0
          };
          if (this.isUsingRefreshToken && !!refreshToken && !!refreshTokenTime) {
            var refreshTokenExpiresAt = new Date(refreshTokenTime);
            return __assign(__assign({}, obj), { refresh: {
              token: refreshToken,
              expiresAt: refreshTokenExpiresAt
            } });
          } else {
            return __assign(__assign({}, obj), { refresh: null });
          }
        } catch (e) {
          return {
            auth: null,
            refresh: null,
            userState: null,
            isUsingRefreshToken: this.isUsingRefreshToken,
            isSignIn: false
          };
        }
      } else {
        return {
          auth: null,
          refresh: null,
          userState: null,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: false
        };
      }
    };
    TokenObject2.prototype.syncTokens = function(authState) {
      if (authState.auth) {
        if (this.isUsingRefreshToken && authState.refresh) {
          this.setToken(authState.auth.token, authState.auth.type, authState.refresh.token, authState.refresh.expiresAt, authState.auth.expiresAt, authState.userState);
        } else {
          this.setToken(authState.auth.token, authState.auth.type, null, null, authState.auth.expiresAt, authState.userState);
        }
      } else {
        this.removeToken();
      }
    };
    TokenObject2.prototype.setToken = function(authToken, authTokenType, refreshToken, refreshTokenExpiresAt, expiresAt, authState) {
      if (this.authStorageType === "cookie") {
        this.setCookieToken_(authToken, authTokenType, refreshToken, expiresAt, refreshTokenExpiresAt, authState);
      } else {
        this.setLSToken_(authToken, authTokenType, refreshToken, expiresAt, refreshTokenExpiresAt, authState);
      }
    };
    TokenObject2.prototype.setCookieToken_ = function(authToken, authTokenType, refreshToken, expiresAt, refreshTokenExpiresAt, authState) {
      api.set(this.authStorageName, authToken, {
        expires: expiresAt,
        domain: this.cookieDomain,
        secure: this.cookieSecure
      });
      api.set(this.authStorageTypeName, authTokenType, {
        expires: expiresAt,
        domain: this.cookieDomain,
        secure: this.cookieSecure
      });
      api.set(this.authTimeStorageName, expiresAt.toISOString(), {
        expires: expiresAt,
        domain: this.cookieDomain,
        secure: this.cookieSecure
      });
      if (authState) {
        api.set(this.stateStorageName, JSON.stringify(authState), {
          expires: expiresAt,
          domain: this.cookieDomain,
          secure: this.cookieSecure
        });
      }
      if (this.isUsingRefreshToken && !!this.refreshTokenName && !!refreshToken) {
        api.set(this.refreshTokenName, refreshToken, {
          expires: expiresAt,
          domain: this.cookieDomain,
          secure: this.cookieSecure
        });
      }
      if (this.isUsingRefreshToken && !!this.refreshTokenTimeName && !!refreshTokenExpiresAt) {
        api.set(this.refreshTokenTimeName, refreshTokenExpiresAt.toISOString(), {
          expires: expiresAt,
          domain: this.cookieDomain,
          secure: this.cookieSecure
        });
      }
    };
    TokenObject2.prototype.setLSToken_ = function(authToken, authTokenType, refreshToken, expiresAt, refreshTokenExpiresAt, authState) {
      localStorage.setItem(this.authStorageName, authToken);
      localStorage.setItem(this.authStorageTypeName, authTokenType);
      localStorage.setItem(this.authTimeStorageName, expiresAt.toISOString());
      if (authState) {
        localStorage.setItem(this.stateStorageName, JSON.stringify(authState));
      }
      if (this.isUsingRefreshToken && !!this.refreshTokenName && !!refreshToken) {
        localStorage.setItem(this.refreshTokenName, refreshToken);
      }
      if (this.isUsingRefreshToken && !!this.refreshTokenTimeName && !!refreshTokenExpiresAt) {
        localStorage.setItem(this.refreshTokenTimeName, refreshTokenExpiresAt.toISOString());
      }
    };
    TokenObject2.prototype.removeToken = function() {
      if (this.authStorageType === "cookie") {
        this.removeCookieToken_();
      } else {
        this.removeLSToken_();
      }
    };
    TokenObject2.prototype.removeCookieToken_ = function() {
      api.remove(this.authStorageName, {
        domain: this.cookieDomain,
        secure: this.cookieSecure
      });
      api.remove(this.authTimeStorageName, {
        domain: this.cookieDomain,
        secure: this.cookieSecure
      });
      api.remove(this.authStorageTypeName, {
        domain: this.cookieDomain,
        secure: this.cookieSecure
      });
      api.remove(this.stateStorageName, {
        domain: this.cookieDomain,
        secure: this.cookieSecure
      });
      if (this.isUsingRefreshToken && !!this.refreshTokenName) {
        api.remove(this.refreshTokenName, {
          domain: this.cookieDomain,
          secure: this.cookieSecure
        });
      }
      if (this.isUsingRefreshToken && !!this.refreshTokenTimeName) {
        api.remove(this.refreshTokenTimeName, {
          domain: this.cookieDomain,
          secure: this.cookieSecure
        });
      }
    };
    TokenObject2.prototype.removeLSToken_ = function() {
      localStorage.removeItem(this.authStorageName);
      localStorage.removeItem(this.authTimeStorageName);
      localStorage.removeItem(this.authStorageTypeName);
      localStorage.removeItem(this.stateStorageName);
      if (this.isUsingRefreshToken && !!this.refreshTokenName) {
        localStorage.removeItem(this.refreshTokenName);
      }
      if (this.isUsingRefreshToken && !!this.refreshTokenTimeName) {
        localStorage.removeItem(this.refreshTokenTimeName);
      }
    };
    return TokenObject2;
  }()
);

// node_modules/react-auth-kit/dist/utils/actions.js
var ActionType;
(function(ActionType2) {
  ActionType2[ActionType2["SignIn"] = 0] = "SignIn";
  ActionType2[ActionType2["SignOut"] = 1] = "SignOut";
  ActionType2[ActionType2["RefreshToken"] = 2] = "RefreshToken";
})(ActionType || (ActionType = {}));

// node_modules/react-auth-kit/dist/utils/reducers.js
function authReducer(state, action) {
  switch (action.type) {
    case ActionType.SignIn:
      return __assign(__assign({}, state), { auth: action.payload.auth, refresh: action.payload.refresh, userState: action.payload.userState, isSignIn: true });
    case ActionType.SignOut:
      return __assign(__assign({}, state), { auth: null, refresh: null, userState: null, isSignIn: false });
    case ActionType.RefreshToken:
      if (state.isSignIn && state.auth && state.refresh) {
        return __assign(__assign({}, state), { auth: {
          token: action.payload.newAuthToken ? action.payload.newAuthToken : state.auth.token,
          type: state.auth.type,
          expiresAt: action.payload.newAuthTokenExpireIn ? new Date((/* @__PURE__ */ new Date()).getTime() + action.payload.newAuthTokenExpireIn * 60 * 1e3) : state.auth.expiresAt
        }, refresh: {
          token: action.payload.newRefreshToken ? action.payload.newRefreshToken : state.refresh.token,
          expiresAt: action.payload.newRefreshTokenExpiresIn ? new Date((/* @__PURE__ */ new Date()).getTime() + action.payload.newRefreshTokenExpiresIn * 60 * 1e3) : state.refresh.expiresAt
        }, userState: action.payload.newAuthUserState ? action.payload.newAuthUserState : state.userState });
      } else {
        return state;
      }
  }
}
function doSignIn(signInParams) {
  return {
    type: ActionType.SignIn,
    payload: signInParams
  };
}
function doRefresh(refreshTokenParam) {
  return {
    type: ActionType.RefreshToken,
    payload: refreshTokenParam
  };
}
function doSignOut() {
  return {
    type: ActionType.SignOut
  };
}

// node_modules/react-auth-kit/dist/utils/hooks.js
var React2 = __toESM(require_react());
function useInterval(callback, delay) {
  var savedCallback = React2.useRef(callback);
  var intervalRef = React2.useRef(null);
  React2.useEffect(function() {
    savedCallback.current = callback;
  }, [callback]);
  React2.useEffect(function() {
    var tick = function() {
      return savedCallback.current();
    };
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay * 60 * 1e3);
    }
    return function() {
      if (intervalRef.current) {
        window.clearTimeout(intervalRef.current);
      }
    };
  }, [delay]);
  return intervalRef;
}

// node_modules/react-auth-kit/dist/errors.js
var AuthKitError = (
  /** @class */
  function(_super) {
    __extends(AuthKitError2, _super);
    function AuthKitError2(message) {
      return _super.call(this, message) || this;
    }
    return AuthKitError2;
  }(Error)
);

// node_modules/react-auth-kit/dist/AuthProvider.js
var AuthProvider = function(_a) {
  var children = _a.children, authType = _a.authType, authName = _a.authName, cookieDomain = _a.cookieDomain, cookieSecure = _a.cookieSecure, refresh = _a.refresh;
  if (authType === "cookie") {
    if (!cookieDomain) {
      throw new AuthKitError("authType 'cookie' requires 'cookieDomain' and 'cookieSecure' props in AuthProvider");
    }
  }
  var refreshTokenName = refresh ? "".concat(authName, "_refresh") : null;
  var tokenObject = new TokenObject(authName, authType, refreshTokenName, cookieDomain, cookieSecure);
  var _b = React3.useReducer(authReducer, tokenObject.initialToken()), authState = _b[0], dispatch = _b[1];
  if (refresh) {
    useInterval(function() {
      var _a2, _b2, _c, _d;
      refresh.refreshApiCallback({
        authToken: (_a2 = authState.auth) === null || _a2 === void 0 ? void 0 : _a2.token,
        authTokenExpireAt: (_b2 = authState.auth) === null || _b2 === void 0 ? void 0 : _b2.expiresAt,
        authUserState: authState.userState,
        refreshToken: (_c = authState.refresh) === null || _c === void 0 ? void 0 : _c.token,
        refreshTokenExpiresAt: (_d = authState.refresh) === null || _d === void 0 ? void 0 : _d.expiresAt
      }).then(function(result) {
        if (result.isSuccess) {
          dispatch(doRefresh(result));
        }
      }).catch(function() {
      });
    }, authState.isSignIn ? refresh.interval : null);
  }
  React3.useEffect(function() {
    tokenObject.syncTokens(authState);
  }, [authState]);
  return React3.createElement(AuthContext.Provider, { value: { authState, dispatch } }, children);
};

// node_modules/react-auth-kit/dist/createRefresh.js
function createRefresh(param) {
  return param;
}

// node_modules/react-auth-kit/dist/PrivateRoute.js
var React4 = __toESM(require_react());

// node_modules/react-auth-kit/dist/utils/utils.js
function isAuthenticated(auth) {
  if (auth.auth) {
    return new Date(auth.auth.expiresAt) > /* @__PURE__ */ new Date();
  }
  return false;
}

// node_modules/react-auth-kit/dist/PrivateRoute.js
var RequireAuth = function(_a) {
  var children = _a.children, loginPath = _a.loginPath;
  var context = React4.useContext(AuthContext);
  if (context === null) {
    throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
  }
  var location = useLocation();
  if (!isAuthenticated(context.authState)) {
    context.dispatch(doSignOut());
    return React4.createElement(Navigate, { to: loginPath, state: { from: location }, replace: true });
  }
  return children;
};

// node_modules/react-auth-kit/dist/hooks/useSignIn.js
var React5 = __toESM(require_react());
function useSignIn() {
  var context = React5.useContext(AuthContext);
  if (context === null) {
    throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
  }
  return function(signInConfig) {
    var token = signInConfig.token, tokenType = signInConfig.tokenType, authState = signInConfig.authState, expiresIn = signInConfig.expiresIn, refreshToken = signInConfig.refreshToken, refreshTokenExpireIn = signInConfig.refreshTokenExpireIn;
    var expTime = new Date((/* @__PURE__ */ new Date()).getTime() + expiresIn * 60 * 1e3);
    if (context.authState.isUsingRefreshToken) {
      if (!!refreshToken && !!refreshTokenExpireIn) {
        var refreshTokenExpireAt = new Date((/* @__PURE__ */ new Date()).getTime() + refreshTokenExpireIn * 60 * 1e3);
        context.dispatch(doSignIn({
          auth: {
            token,
            type: tokenType,
            expiresAt: expTime
          },
          userState: authState ? authState : null,
          refresh: {
            token: refreshToken,
            expiresAt: refreshTokenExpireAt
          }
        }));
        return true;
      } else {
        throw new AuthKitError('Make sure you given "refreshToken" and  "refreshTokenExpireIn" parameter');
      }
    } else {
      if (!!refreshToken && !!refreshTokenExpireIn) {
        throw new Error("The app doesn't implement 'refreshToken' feature.\nSo you have to implement refresh token feature from 'AuthProvider' before using it.");
      } else {
        context.dispatch(doSignIn({
          auth: {
            token,
            type: tokenType,
            expiresAt: expTime
          },
          userState: authState ? authState : null,
          refresh: null
        }));
        return true;
      }
    }
  };
}

// node_modules/react-auth-kit/dist/hooks/useSignOut.js
var React6 = __toESM(require_react());
function useSignOut() {
  var context = React6.useContext(AuthContext);
  if (context === null) {
    throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
  }
  return function() {
    try {
      if (context) {
        context.dispatch(doSignOut());
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
}

// node_modules/react-auth-kit/dist/hooks/useAuthUser.js
var React7 = __toESM(require_react());
function useAuthUser() {
  var context = React7.useContext(AuthContext);
  if (context === null) {
    throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
  }
  return function() {
    if (isAuthenticated(context.authState)) {
      return context.authState.userState;
    } else {
      return null;
    }
  };
}

// node_modules/react-auth-kit/dist/hooks/useAuthHeader.js
var React8 = __toESM(require_react());
function useAuthHeader() {
  var c = React8.useContext(AuthContext);
  if (c === null) {
    throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
  }
  return function() {
    if (c.authState.auth && isAuthenticated(c.authState)) {
      return "".concat(c.authState.auth.type, " ").concat(c.authState.auth.token);
    } else {
      return "";
    }
  };
}

// node_modules/react-auth-kit/dist/hooks/useIsAuthenticated.js
var React9 = __toESM(require_react());
function useIsAuthenticated() {
  var context = React9.useContext(AuthContext);
  if (context === null) {
    throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
  }
  return function() {
    if (!isAuthenticated(context.authState)) {
      return false;
    } else {
      return true;
    }
  };
}

// node_modules/react-auth-kit/dist/higherOrderComponents/withSignIn.js
var React10 = __toESM(require_react());
function withSignIn(Component) {
  return function(props) {
    return React10.createElement(AuthContextConsumer, null, function(c) {
      if (c === null) {
        throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
      }
      var signIn = function(signInConfig) {
        var token = signInConfig.token, tokenType = signInConfig.tokenType, authState = signInConfig.authState, expiresIn = signInConfig.expiresIn, refreshToken = signInConfig.refreshToken, refreshTokenExpireIn = signInConfig.refreshTokenExpireIn;
        var expTime = new Date((/* @__PURE__ */ new Date()).getTime() + expiresIn * 60 * 1e3);
        if (c.authState.isUsingRefreshToken) {
          if (!!refreshToken && !!refreshTokenExpireIn) {
            var refreshTokenExpireAt = new Date((/* @__PURE__ */ new Date()).getTime() + refreshTokenExpireIn * 60 * 1e3);
            c.dispatch(doSignIn({
              auth: {
                token,
                type: tokenType,
                expiresAt: expTime
              },
              userState: authState ? authState : null,
              refresh: {
                token: refreshToken,
                expiresAt: refreshTokenExpireAt
              }
            }));
            return true;
          } else {
            throw new AuthKitError('Make sure you given "refreshToken" and "refreshTokenExpireIn" parameter');
          }
        } else {
          if (!!refreshToken && !!refreshTokenExpireIn) {
            throw new AuthKitError("The app doesn't implement 'refreshToken' feature.\n So you have to implement refresh token feature from 'AuthProvider' before using it.");
          } else {
            c.dispatch(doSignIn({
              auth: {
                token,
                type: tokenType,
                expiresAt: expTime
              },
              userState: authState ? authState : null,
              refresh: null
            }));
            return true;
          }
        }
      };
      return React10.createElement(Component, __assign({}, props, { signIn }));
    });
  };
}

// node_modules/react-auth-kit/dist/higherOrderComponents/withSignOut.js
var React11 = __toESM(require_react());
function withSignOut(Component) {
  return function(props) {
    return React11.createElement(AuthContextConsumer, null, function(c) {
      if (c === null) {
        throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
      }
      var signOut = function() {
        try {
          if (c) {
            c.dispatch(doSignOut());
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      };
      return React11.createElement(Component, __assign({}, props, { signOut }));
    });
  };
}

// node_modules/react-auth-kit/dist/higherOrderComponents/withAuthUser.js
var React12 = __toESM(require_react());
function withAuthUser(Component) {
  return function(props) {
    return React12.createElement(AuthContextConsumer, null, function(context) {
      if (context === null) {
        throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
      }
      if (context.authState.auth && isAuthenticated(context.authState)) {
        return React12.createElement(Component, __assign({}, props, { authState: context.authState.userState }));
      } else {
        return React12.createElement(Component, __assign({}, props, { authState: null }));
      }
    });
  };
}

// node_modules/react-auth-kit/dist/higherOrderComponents/withAuthHeader.js
var React13 = __toESM(require_react());
function withAuthHeader(Component) {
  return function(props) {
    return React13.createElement(AuthContextConsumer, null, function(c) {
      if (c === null) {
        throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
      }
      if (c.authState.auth && isAuthenticated(c.authState)) {
        return React13.createElement(Component, __assign({}, props, { authHeader: "".concat(c.authState.auth.type, " ").concat(c.authState.auth.token) }));
      } else {
        return React13.createElement(Component, __assign({}, props, { authHeader: "" }));
      }
    });
  };
}

// node_modules/react-auth-kit/dist/higherOrderComponents/withIsAuthenticated.js
var React14 = __toESM(require_react());
function withIsAuthenticated(Component) {
  return function(props) {
    return React14.createElement(AuthContextConsumer, null, function(c) {
      if (c === null) {
        throw new AuthKitError("Auth Provider is missing. Please add the AuthProvider before Router");
      }
      if (c.authState.auth && isAuthenticated(c.authState)) {
        return React14.createElement(Component, __assign({}, props, { isAuth: true }));
      } else {
        return React14.createElement(Component, __assign({}, props, { isAuth: false }));
      }
    });
  };
}

// node_modules/react-auth-kit/dist/index.js
AuthProvider.defaultProps = {
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:"
};
export {
  AuthProvider,
  RequireAuth,
  createRefresh,
  useAuthHeader,
  useAuthUser,
  useIsAuthenticated,
  useSignIn,
  useSignOut,
  withAuthHeader,
  withAuthUser,
  withIsAuthenticated,
  withSignIn,
  withSignOut
};
/*! Bundled license information:

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)

react-auth-kit/dist/hooks/useSignIn.js:
  (**
   *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
   *@fileoverview Sign In functionality <hook>
   *@copyright Arkadip Bhattacharya 2020
   *@license Apache-2.0
   *
   * Copyright 2020 Arkadip Bhattacharya
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *         http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=react-auth-kit.js.map
