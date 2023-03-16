!(function () {
    var e = {
        createName: function (e, n) {
            return `${e}|${JSON.stringify(n)}`;
        },
        getName: n,
        getParams: function () {
            return (
                (function (e) {
                    try {
                        return JSON.parse(e);
                    } catch (e) {
                        return null;
                    }
                })(window.self.name.split("|")[1]) || {}
            );
        },
        isIframe: function (e = null) {
            return window.self !== parent && (!e || n() === e);
        },
    };
    function n() {
        return window.self.name.split("|")[0] || null;
    }
    function t(e) {
        const n = document.createElement("div"),
            t = e.replace("<script>", "(() => {").replace("</script>", "})()");
        n.setAttribute("onreset", t), n.dispatchEvent(new Event("reset"));
    }
    var r = {};
    Object.assign(r, {
        executeScript: t,
        loadExtScript: function (e, n = {}) {
            const t = Math.random().toString().slice(2),
                r = document.createElement("script");
            (r.onload = () => r.remove()), (r.src = chrome.runtime.getURL(`${e}?v=${t}`)), document.documentElement.insertAdjacentElement("afterbegin", r);
            for (const e in n) r.setAttribute(e, n[e]);
        },
        iframe: e,
    });
    var o = {
            selectors: {
                topNav: [".PolarisNavigation > .PolarisDesktopNav", ".PolarisDirectShell_DEPRECATED > .PolarisDesktopNav", ".PolarisDesktopNav._acum"],
                newPostMenuItem: [".XrOey:nth-child(3)", ".PolarisDesktopNav._acut:nth-child(3)"],
                newPostButton: [".ctQZg button", ".PolarisCreationIcon button", ".PolarisNavigation .PolarisCreationNavItem a"],
                modalTitle: [".Yx5HN h1", ".IGDSDialog h1 > div"],
                creationBody: [".uYzeu", "._ac2r"],
                creationBodyRight: [".IJeHu > div > div", ".PolarisCreationModalBodyV2._ac2v"],
                creationDndBody: ["._C8iK > .YBx95", ".Dh40d", '._ac2t > .PolarisIGCoreBox[style*="height: 100%"]'],
                creationDndText: ["._C8iK > .YBx95 h2", ".Yx5HN .Dh40d h2", '._ac2t svg[height="77"] + .PolarisIGCoreBox h2'],
                creationDndIcon: ["._C8iK > .YBx95 svg", ".Yx5HN .Dh40d svg", "._ac2t > .PolarisIGCoreBox svg"],
                creationLoadingBar: ['._ac2r .PolarisCreationLoadingBar[data-visualcompletion="loading-state"]'],
                creationRatioToggler: [".czW__ > div:first-child .RJJyf > button", ".PolarisCreationMediaPreviewV2 > div:first-child div:not([class]) button"],
                creationRatioOptionVertical: [".YAPUk button:nth-of-type(3)", ".PolarisCreationMediaPopover > button:nth-of-type(3)"],
                creationGeoOption: [".brfp7 div:not([class])", "div.PolarisCreationLocationInput"],
                creationAccessibilityDropdown: [":not(.n6uTB) + .n6uTB", ".PolarisCreationModalComposeSettingsContent > div:not([class]) + .PolarisCreationModalComposeExpandInput"],
                creationAdvancedDropdown: ".n6uTB + .n6uTB",
                creationDropdown: [".PolarisCreationModalComposeSettingsContent > div:not([class]) ~ .PolarisCreationModalComposeExpandInput"],
                creationBottomHr: [".W4P49", ".PolarisCreationModalComposeSettingsContent hr"],
                creationNextButton: [".WaOAr .yWX7d", "div.PolarisIGCoreModalHeader:last-child button"],
                creationPublishingSpinnerContainerWrap: ['._ac2t > .PolarisIGCoreBox[style*="width: 100%"]'],
                creationPublishingSpinnerContainer: ['div[style*="height: 96px"][style*="width: 96px"]'],
                creationPublishingSpinner: ['img[src*="creation/spinner"]', 'div[style*="height: 96px"][style*="width: 96px"] img[src*=".gif"]'],
                creationCarouselAddMediaButton: [".czW__ > .Xf6Yq", ".PolarisCreationMediaPreviewV2 > ._abck div:not([class])"],
                uploadForm: [".BaseDialog form.PolarisImageFileForm"],
                followSuggestionList: [".PolarisFeedSidebar:first-child + div .PolarisIGVirtualList > div"],
            },
        },
        i = {
            on: function (e, n) {
                l();
                (s[e] || (s[e] = [])).push(n);
            },
            off: function (e, n) {
                const t = s[e];
                if (!t) return;
                for (;;) {
                    const e = t.findIndex((e) => e === n);
                    if (-1 === e) break;
                    t.splice(e, 1);
                }
            },
            send: function (e, ...n) {
                let t;
                const r = n[n.length - 1];
                "function" == typeof r ? ((t = r), (n = n.slice(0, -1))) : (t = null);
                return new Promise((r) => {
                    chrome.runtime.sendMessage({ [a]: e, [c]: n }, (e) => {
                        chrome.runtime.lastError || (t && t(e), r(e));
                    });
                });
            },
        };
    const s = {},
        a = "__$chromeBus.name",
        c = "__$chromeBus.args";
    function l() {
        const e = l;
        e.init ||
            ((e.init = !0),
            chrome.runtime.onMessage.addListener((e, n, t) => {
                const r = e["__$chromeBus.name"];
                if (!r) return !1;
                const o = e["__$chromeBus.args"] || [],
                    i = s[r] || [];
                return (
                    0 !== i.length &&
                    ((async () => {
                        const e = await Promise.all(i.map((e) => e(...o))),
                            n = e[e.length - 1];
                        t(n);
                    })(),
                    !!t)
                );
            }));
    }
    var d = i,
        u = {};
    u.controller = {
        init: function () {
            this._handleInjectionMessages();
        },
        _handleInjectionMessages: function () {
            window.addEventListener("message", (e) => {
                "ga.send-event" === e.data.type && d.send("ga.send-event", ...e.data.args);
            });
        },
    };
    var p = {
        init: function () {
            r.executeScript(
                "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n\n\n      ;(function main () {\n        patchMessageRendering()\n      })()\n\n\n      function patchMessageRendering () {\n        modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n          // detect that this is a message rendering module\n          if (!bodyStr.includes('UNSUPPORTED_MESSAGE_TYPE_TO_TITLE[')) { return }\n\n          // instagram has 3 bundle versions:\n          //   1) [old] e.default = function({ ..., item: E, ... }) {\n          //   2) [old] e.default = function(t) {\n          //   3) [new] e[\"default\"] = a\n          let messageIdGetterStr\n          if (bodyStr.includes('default=function({')) {\n            const itemPropName = bodyStr\n              .split('function({')[1]\n              .split('}')[0]\n              .split('item:')[1]\n              .split(',')[0]\n            messageIdGetterStr = itemPropName + '.id'\n          } else if (bodyStr.includes('default=function(')) {\n            const propsName = bodyStr\n              .split('function(')[1]\n              .split(')')[0]\n            messageIdGetterStr = propsName + '.item.id'\n          } else if (bodyStr.includes('[\"default\"]=')) {\n            const propsName = bodyStr\n              .split('function')[1]\n              .split('(')[1]\n              .split(')')[0]\n            bodyStr = bodyStr.replace('{', '{ var __props__ = ' + propsName + ';')\n            messageIdGetterStr = '__props__.item.id'\n          }\n\n          // pass \"id\" to Instagram's \"Box\" component\n          //   (only for unsupported message types)\n          const newBodyStr = bodyStr.replace(\n            'direction:\"column\"',\n            'direction: \"column\", id: \"message-\" + ' + messageIdGetterStr\n          )\n\n          setBodyStr(newBodyStr, 'message-rendering')\n        })\n      }\n    </script>\n  "
            );
        },
    };
    var f = {
        init: function () {
            r.executeScript(
                "\n    <script>\n      const moduleInterceptor = window.inssist.moduleInterceptor\n\n\n      moduleInterceptor.registerReduxAction(\n        'inssist.dm.apply-filters',\n        (state, action) => {\n          return {\n            ...state,\n            direct: {\n              ...state.direct,\n              filters: {\n                ...(state.direct.filters || {\n                  string: '',\n                  unread: false,\n                  flagged: false,\n                }),\n                ...('string' in action) && {\n                  string: action.string,\n                },\n                ...('unread' in action) && {\n                  unread: action.unread,\n                },\n                ...('flagged' in action) && {\n                  flagged: action.flagged,\n                },\n              },\n            },\n          }\n        },\n      )\n    </script>\n  "
            ),
                r.executeScript(
                    "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n        const isThreadsNormalizer = (\n          bodyStr.includes('last_permanent_item') &&\n          bodyStr.includes('processStrategy')\n        )\n        if (!isThreadsNormalizer) { return }\n\n        const moduleVarMatch =\n          // for old instagram bundle version\n          bodyStr.match(/(\\w+)\\.default=/) ||\n          // for new instagram bundle version\n          bodyStr.match(/(\\w+)\\[\\\"default\\\"\\]=/)\n        if (!moduleVarMatch) {\n          console.error('failed to intercept threads normalizer')\n          return\n        }\n\n        const moduleVar = moduleVarMatch[1]\n        setBodyStr(\n          bodyStr +\n            ';window.inssist.moduleInterceptor.registerModule(\"dm-threads-normalizer\",' +\n            moduleVar +\n            '.default)',\n          'threads-normalizer'\n        )\n      })\n    </script>\n  "
                ),
                r.executeScript(
                    "\n    <script>\n      // require \"store\" and \"dm-state-proxy\" modules\n      let store\n      let stateProxy\n      const interval = setInterval(() => {\n        if (!window.ig) { return }\n        setTimeout(() => clearInterval(interval))\n        ;(async () => {\n          store = await window.ig.require('store')\n          stateProxy = await window.ig.require('dm-state-proxy')\n        })()\n      }, 100)\n\n\n      const _createSelector_ = Symbol('createSelector')\n      Object.defineProperty(Object.prototype, 'createSelector', {\n        get () {\n          return this[_createSelector_]\n        },\n        set (createSelector) {\n          this[_createSelector_] = (...args) => {\n            const isThreadsSelector = (\n              args[2] &&\n              (\n                // null==s||s===t.folder\n                /null==\\w\\|\\|\\w===\\w\\.folder/.test(args[2].toString()) ||\n                // b==null||b===a.folder\n                /\\w==null\\|\\|\\w===\\w\\.folder/.test(args[2].toString())\n              )\n            )\n            if (!isThreadsSelector) {\n              return createSelector(...args)\n            }\n\n            args[0] = (s) => ([\n              s.direct.threads.filter(t => !t.pending),\n              s.direct.filters,\n            ])\n            args[2] = ([threads, filters], folder) => {\n              let state = null\n              let users = {}\n              if (store && stateProxy) {\n                state = store.getState()\n                users = state.direct.users.toJS()\n              }\n\n              return threads.filter(thread => {\n                // check folder\n                const folderOk = (\n                  typeof folder !== 'number' ||\n                  thread.folder === folder\n                )\n                if (!folderOk) { return false }\n\n                // don't apply filters if store and\n                //   state proxy are not initialized yet\n                if (!state) { return true }\n\n                // no filters in state yet? => use default values\n                if (!filters) {\n                  filters = {\n                    string: '',\n                    unread: false,\n                    flagged: false,\n                  }\n                }\n\n                // check filter string\n                const inviter = users[thread.inviter] || null\n                const filterString = (filters.string || '').toLowerCase()\n                const title = thread.thread_title || (inviter && inviter.username) || ''\n                const filterStringOk = title.toLowerCase().includes(filterString)\n                if (!filterStringOk) { return false }\n\n                // check filter unread\n                const filterUnread = filters.unread || false\n                const seen = stateProxy.getThreadSeenByViewer(state, thread.id)\n                if (filterUnread && seen) { return false }\n\n                // check filter flagged\n                const filterFlagged = filters.flagged || false\n                const flagged = thread.thread_label === 1\n                if (filterFlagged && !flagged) { return false }\n\n                return true\n              })\n            }\n\n            return createSelector(...args)\n          }\n\n          return true\n        },\n      })\n    </script>\n  "
                );
        },
    };
    var m = {
        controller: {
            init: function () {
                p.init(), f.init();
            },
        },
    };
    var g = {
            controller: {
                init: function () {
                    r.executeScript(
                        "\n    <script>\n      window.inssist.modulePatcher.onModuleInit((bodyStr, setBodyStr, moduleName) => {\n        if (moduleName !== 'gkx') return\n        const newBodyStr = bodyStr.replace(\n          /(return \\w.result)/,\n          'if (arguments[0] === \"4798\") return true; $1'\n        )\n        setBodyStr(newBodyStr, 'reels-enabled')\n      })\n    </script>\n  "
                    );
                },
            },
        },
        h = document.documentElement,
        y = function () {
            t(`\n      <script>\n        window.inssist.theme.emojiRegex = ${window.emojiRegex.toString()}\n      <\/script>\n    `);
        };
    var S = {
            init: function () {
                !(function () {
                    const n = e.getParams().theme;
                    if (!n) return;
                    h.classList.add(`theme-${n}`);
                })(),
                    h.insertAdjacentHTML(
                        "afterbegin",
                        '\n    <svg id="theme-night-svg" style="display: none; height: 0px; width: 0px;">\n      <filter id="theme-filter" x="0" y="0" width="99999" height="99999" style="color-interpolation-filters: srgb;">\n        <feColorMatrix type="matrix" values="0.300 -0.600 -0.600 0.000 0.950 -0.600 0.300 -0.600 0.000 0.950 -0.600 -0.600 0.300 0.000 0.950 0.000 0.000 0.000 1.000 0.000"></feColorMatrix>\n      </filter>\n      <filter id="theme-reverse-filter" x="0" y="0" width="99999" height="99999" style="color-interpolation-filters: srgb;">\n        <feColorMatrix type="matrix" values="0.333 -0.667 -0.667 0.000 1.015 -0.667 0.333 -0.667 0.000 1.015 -0.667 -0.667 0.333 0.000 1.015 0.000 0.000 0.000 1.000 0.000"></feColorMatrix>\n      </filter>\n    </svg>\n  '
                    ),
                    h.insertAdjacentHTML(
                        "afterbegin",
                        '\n    <style>\n      .theme-night {\n        filter: url(#theme-filter) !important;\n        text-shadow: 0 0 0 !important;\n        background: #191919 !important;\n      }\n\n      .theme-night ._cqw45._2pnef,\n      .theme-night ._mli86,\n      .theme-night :not(object):not(body)>embed,\n      .theme-night [background],\n      .theme-night [style*="background-image: url"],\n      .theme-night [style*="background-image:url"],\n      .theme-night [style*="background: url"],\n      .theme-night [style*="background:url"],\n      .theme-night img,\n      .theme-night object,\n      .theme-night svg image,\n      .theme-night video {\n        -webkit-filter: url(#theme-reverse-filter) !important;\n        filter: url(#theme-reverse-filter) !important;\n      }\n\n      .theme-night [background] *,\n      .theme-night [style*="background-image: url"] *,\n      .theme-night [style*="background-image:url"] *,\n      .theme-night [style*="background: url"] *,\n      .theme-night [style*="background:url"] *,\n      .theme-night img[src^="https://s0.wp.com/latex.php"],\n      .theme-night input .NaturalImage-image {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n\n      .theme-night :-webkit-full-screen,\n      .theme-night :-webkit-full-screen * {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n\n      .theme-night :-moz-full-screen,\n      .theme-night :-moz-full-screen * {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n\n      .theme-night :fullscreen,\n      .theme-night :fullscreen * {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n    </style>\n  '
                    ),
                    y();
            },
        },
        b = {
            init: function () {
                r.executeScript(
                    "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n\n\n      ;(function main () {\n        patchHasResultsProp()\n      })()\n\n\n      function patchHasResultsProp () {\n        const regexp = /hasResults:(\\w+\\.search\\.results\\.length>0)/\n        modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n          const match = bodyStr.match(regexp)\n          if (!match || !match[1]) { return }\n          setBodyStr(bodyStr.replace(match[1], 'false'), 'has-results-prop')\n        })\n      }\n    </script>\n  "
                );
            },
        };
    var w = {
        controller: {
            init: function () {
                b.init(),
                    r.executeScript("\n    <script>\n      Object.defineProperty(Object.prototype, 'FEED_MAXIMUM_VIDEO_DURATION', {\n        get: () => 60 * 60,\n        set: () => true,\n      })\n    </script>\n  "),
                    r.executeScript(
                        "\n    <script>\n      const moduleInterceptor = window.inssist.moduleInterceptor\n      moduleInterceptor.registerReduxAction(\n        'inssist.ig.stop-creation-session',\n        (state, action) => {\n          return {\n            ...state,\n            creation: {\n              ...state.creation,\n              sessionId: null,\n              sourceImage: null,\n              sourceVideo: null,\n            },\n            storyCreation: {\n              ...state.storyCreation,\n              sessionId: null,\n              sourceImage: null,\n              sourceVideo: null,\n            },\n          }\n        },\n      )\n    </script>\n  "
                    ),
                    r.executeScript(
                        "\n    <script>\n      // show new search input\n      Object.defineProperty(Object.prototype, 'hasSearchOnExplore', {\n        get () {\n          return () => true\n        },\n        set () {\n          return true\n        },\n      })\n    </script>\n  "
                    ),
                    r.executeScript(
                        "\n    <script>\n      Object.defineProperty(Object.prototype, 'hasMobileNavigationRedesign', {\n        get () {\n          return () => false\n        },\n        set () {\n          return true\n        },\n      })\n    </script>\n  "
                    ),
                    r.executeScript(
                        "\n    <script>\n      Object.defineProperty(Object.prototype, 'hasDarkModeToggleEnabled', {\n        get () {\n          return () => false\n        },\n        set () {\n          return true\n        },\n      })\n    </script>\n  "
                    ),
                    r.executeScript(
                        "\n    <script>\n      const _hasClipsTab_ = Symbol('hasClipsTab')\n      Object.defineProperty(Object.prototype, 'hasClipsTab', {\n        get () {\n          return this[_hasClipsTab_]\n        },\n        set (value) {\n          if (typeof value === 'function') {\n            this[_hasClipsTab_] = () => false\n          } else {\n            this[_hasClipsTab_] = value\n          }\n          return true\n        },\n      })\n    </script>\n  "
                    );
            },
        },
    };
    var _ = {
        controller: {
            init: function () {
                (function () {
                    if (Array.prototype.flat) return;
                    Array.prototype.flat = function () {
                        const e = [...this],
                            n = [];
                        for (const t of e) Array.isArray(t) ? n.push(...t) : n.push(t);
                        return n;
                    };
                })(),
                    String.prototype.replaceAll ||
                        (String.prototype.replaceAll = function (e, n) {
                            return this.split(e).join(n);
                        });
            },
        },
    };
    var v = {
        controller: {
            init: function () {
                r.executeScript("\n    <script>\n      window.storyMentionsContentScript = {}\n    </script>\n  "),
                    r.executeScript(
                        "\n    <script>\n      Object.assign(window.storyMentionsContentScript, {\n        onStoryCreationReduce,\n      })\n\n\n      ;(function main () {\n        interceptStoryCreationReducer()\n      })()\n\n\n      const interceptors = []\n\n\n      function onStoryCreationReduce (fn) {\n        interceptors.push(fn)\n      }\n\n\n      function interceptStoryCreationReducer () {\n        const _storyCreationReducer_ = Symbol('storyCreationReducer')\n        Object.defineProperty(Object.prototype, 'storyCreationReducer', {\n          get () {\n            return (...args) => {\n              // call all interceptors\n              const storyCreationState = args[0]\n              const action = args[1]\n              interceptors.forEach(fn => {\n                fn(action, storyCreationState)\n              })\n\n              // call original function\n              return this[_storyCreationReducer_](...args)\n            }\n          },\n          set (value) {\n            this[_storyCreationReducer_] = value\n            return true\n          },\n        })\n      }\n    </script>\n  "
                    );
            },
        },
    };
    const P = o.selectors;
    var I = {
        controller: {
            init: function () {
                document.documentElement.insertAdjacentHTML("afterbegin", `\n    <style>\n      ${P.newPostMenuItem} {\n        order: -1;\n        margin-right: 22px;\n        display: none;\n      }\n    </style>\n  `),
                    r.executeScript(
                        "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n        if (!bodyStr.includes('MAX_RETRY_IN_MS')) { return }\n        const newBodyStr = bodyStr\n          // old instagram bundle contains \"currentRetryInMs:2*e\"\n          .replace(/currentRetryInMs:\\d\\*\\w/g, 'currentRetryInMs:2500')\n          // new instagram bundle contains \"currentRetryInMs:e*2\"\n          .replace(/currentRetryInMs:\\w\\*\\d/g, 'currentRetryInMs:2500')\n        setBodyStr(newBodyStr, 'retry-upload')\n      })\n    </script>\n  "
                    );
            },
        },
    };
    var x = {
            controller: {
                init: function () {
                    !(async function () {
                        const e = await d.send("desktop-reels.get-initial-data");
                        r.executeScript(`\n    <script>\n      window.inssist.desktopReelsData = ${JSON.stringify(e)};\n    <\/script>\n  `);
                    })();
                },
            },
        },
        C = {
            init: function () {
                r.executeScript(
                    "\n    <script>\n      window.inssist.modulePatcher = {\n        onModuleInit,\n      }\n\n\n      const fns = []\n\n\n      function onModuleInit (fn) {\n        fns.push(fn)\n      }\n\n\n      // patch __d function so we can modify modules body\n      const _d_ = Symbol('d')\n      Object.defineProperty(Object.prototype, '__d', {\n        get () {\n          const __d = this[_d_]\n          return (...args) => {\n            // __d(moduleFn, moduleId, dependencyIds)\n            const isOldBundleVersion =\n              typeof args[0] === 'function' &&\n              typeof args[1] === 'number' &&\n              Array.isArray(args[2])\n\n            // __d(moduleName, dependencyNames, moduleFn)\n            const isNewBundleVersion =\n              typeof args[0] === 'string' &&\n              Array.isArray(args[1]) &&\n              typeof args[2] === 'function'\n\n            window.inssist.igBundleVersion =\n              isOldBundleVersion ? 'v1' :\n              isNewBundleVersion ? 'v2' : null\n\n            if (!isOldBundleVersion && !isNewBundleVersion) {\n              return __d(...args)\n            }\n\n            const fn = isOldBundleVersion ? args[0] : args[2]\n            const fnStr = fn.toString()\n            const argsStr = fnStr.split('(')[1].split(')')[0]\n            const bodyStartIndex = fnStr.indexOf('{')\n            const bodyEndIndex = fnStr.lastIndexOf('}')\n\n            let debugLabel = null\n            let bodyStr = fnStr.slice(bodyStartIndex + 1, bodyEndIndex)\n            const setBodyStr = (newBodyStr, label) => {\n              bodyStr = newBodyStr\n              debugLabel = label\n              const newFn = new Function(argsStr, bodyStr)\n              if (isOldBundleVersion) {\n                args[0] = newFn\n              } else {\n                args[2] = newFn\n              }\n            }\n\n            fns.forEach(fn => {\n              try {\n                if (isOldBundleVersion) {\n                  fn(bodyStr, setBodyStr)\n                } else {\n                  const moduleName = args[0]\n                  fn(bodyStr, setBodyStr, moduleName)\n                }\n              } catch (e) {\n                console.error(\n                  'failed to patch module',\n                  { debugLabel, e, fn, args, bodyStr }\n                )\n              }\n            })\n\n            return __d(...args)\n          }\n        },\n        set (value) {\n          this[_d_] = value\n          return true\n        },\n      })\n    </script>\n  "
                );
            },
        };
    var O = {
        init: function () {
            r.executeScript(
                "\n    <script>\n      const inssist = window.inssist\n      inssist.moduleInterceptor = {\n        getModule,\n        registerModule,\n        registerReduxAction,\n      }\n\n\n      let store\n      const modules = {}\n      const customReduxReducers = []\n      const dispatchListeners = []\n\n\n      function getModule (moduleName) {\n        return modules[moduleName]\n      }\n\n\n      function registerModule (moduleName, module) {\n        if (modules[moduleName]) { return }\n        modules[moduleName] = module\n      }\n\n\n      function registerReduxAction (actionType, reducer) {\n        customReduxReducers.push({ actionType, fn: reducer })\n      }\n\n\n      // add-dispatch-listener\n      registerModule('add-dispatch-listener', (fn) => {\n        dispatchListeners.push(fn)\n      })\n\n\n      // nav\n      // for new bundle version (v2)\n      registerModule('nav', {\n        push (url) {\n          const router = window.require('currentCometRouterInstance')\n          return router.get().dispatcher.go(url)\n        },\n      })\n      // for old bundle version (v1)\n      const _createHref_ = Symbol('createHref')\n      Object.defineProperty(Object.prototype, 'createHref', {\n        get () {\n          return this[_createHref_]\n        },\n        set (value) {\n          delete modules.nav\n          registerModule('nav', this)\n          this[_createHref_] = value\n          return true\n        }\n      })\n\n      // nav-interceptor (used only for v2)\n      //   usage: navInterceptor.beforeGo(prevent, ...args)\n      inssist._beforeGoFns = []\n      inssist._navInterceptorReady = false\n      registerModule('nav-interceptor', {\n        beforeGo (fn) {\n          inssist._beforeGoFns.push(fn)\n        },\n      })\n      inssist.modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n        if (!bodyStr.includes('._instances')) return\n        if (inssist._navInterceptorReady) return\n        inssist._navInterceptorReady = true\n\n        // patch this code: \"...go:function(a,c){return b(a,null,c)}...\" =>\n        //   \"...go:function(a,c){ <OUR_CODE_HERE>; return b(a,null,c)}...\"\n        const parts = bodyStr.split('go:function')\n        const start = parts[0] + 'go:function' // ...go:function\n        const mid = parts[1].split('{')[0] + '{' // (a,c){\n        const end = parts[1].split('{').slice(1).join('{') // return b(a, null, c)}...\n        const interception =\n          'let args = [...arguments];' +\n          'let prevented = false;' +\n          'let prevent = () => { prevented = true };' +\n          'window.inssist._beforeGoFns.forEach(f => f(prevent, ...args));' +\n          'if (prevented) return;'\n        setBodyStr(start + mid + interception + end, 'nav-interceptor')\n      })\n\n      // http\n      const _AjaxError_ = Symbol('AjaxError')\n      Object.defineProperty(Object.prototype, 'AjaxError', {\n        get () {\n          return this[_AjaxError_]\n        },\n        set (value) {\n          setTimeout(() => {\n            registerModule('http', this)\n            if (this.post) return\n            Object.defineProperty(this, 'post', {\n              get () {\n                return this.post_UNTYPED\n              },\n              set (value) {\n                this.post_UNTYPED = value\n                return true\n              }\n            })\n            Object.defineProperty(this, 'post_DEPRECATED', {\n              get () {\n                return this.post\n              },\n              set () {\n                return true\n              },\n            })\n          })\n          this[_AjaxError_] = value\n          return true\n        }\n      })\n\n      // proxy PolarisInstapi.apiPost to our patched http.post\n      \n      const _createAPICall_ = Symbol('createAPICall')\n      Object.defineProperty(Object.prototype, 'createAPICall', {\n        get () {\n          return this[_createAPICall_]\n        },\n        set (createApiCall) {\n          this[_createAPICall_] = createApiCall\n          setTimeout(() => {\n            if (!modules.http) return\n            Object.defineProperty(this, 'apiPost', {\n              get () {\n                return createApiCall('POST', modules.http.post)\n              },\n              set () {\n                return true\n              },\n            })\n          })\n          return true\n        },\n      })\n\n      // store\n      const _createStore_ = Symbol('createStore')\n      Object.defineProperty(Object.prototype, 'createStore', {\n        get () {\n          return this[_createStore_]\n        },\n        set (createStore) {\n          this[_createStore_] = (reducer, middleware) => {\n            store = createStore((state, action) => {\n              dispatchListeners.forEach(fn => fn(action))\n              const customReducer = customReduxReducers\n                .find(r => r.actionType === action.type)\n              if (customReducer) {\n                return customReducer.fn(state, action)\n              }\n              return reducer(state, action)\n            }, middleware)\n            registerModule('store', store)\n            return store\n          }\n          return true\n        }\n      })\n\n\n      // config\n      const _needsToConfirmCookies_ = Symbol('needsToConfirmCookies')\n      Object.defineProperty(Object.prototype, 'needsToConfirmCookies', {\n        get () {\n          return this[_needsToConfirmCookies_]\n        },\n        set (value) {\n          registerModule('config', this)\n          this[_needsToConfirmCookies_] = value\n          return true\n        }\n      })\n\n\n      // cookies-controller\n      const _getCookie_ = Symbol('getCookie')\n      Object.defineProperty(Object.prototype, 'getCookie', {\n        get () {\n          return this[_getCookie_]\n        },\n        set (getCookie) {\n          registerModule('cookies-controller', this)\n          this[_getCookie_] = (...args) => {\n            const result = getCookie.call(this, ...args)\n\n            // sometimes \"ds_user_id\" is not readable by iframe, idkw.\n            //   to fix this case we try to return \"viewerId\" value of the user state\n            if (args.length === 1 && args[0] === 'ds_user_id' && !result) {\n              let viewerId\n              if (store) {\n                const state = store.getState()\n                viewerId = state && state.users && state.users.viewerId\n              }\n\n              // fallback to any non-empty string to prevent\n              //   isUserLoggedIn function returning false when user is logged in\n              if (!viewerId) {\n                return 'ds_user_id'\n              }\n\n              return viewerId\n            }\n\n            return result\n          }\n          return true\n        }\n      })\n\n\n      // scroll-controller\n      const _saveScrollPosition_ = Symbol('saveScrollPosition')\n      Object.defineProperty(Object.prototype, 'saveScrollPosition', {\n        get () {\n          return this[_saveScrollPosition_]\n        },\n        set (value) {\n          registerModule('scroll-controller', this)\n          this[_saveScrollPosition_] = value\n          return true\n        }\n      })\n\n\n      // gatekeeper\n      const _getGatekeepers_ = Symbol('getGatekeepers')\n      Object.defineProperty(Object.prototype, 'getGatekeepers', {\n        get () {\n          return this[_getGatekeepers_]\n        },\n        set (value) {\n          registerModule('gatekeeper', this)\n          this[_getGatekeepers_] = value\n          return true\n        },\n      })\n\n\n      // get-stories-context\n      let storiesContext\n      registerModule('get-stories-context', () => storiesContext)\n      const _updateStoriesContext_ = Symbol('updateStoriesContext')\n      Object.defineProperty(Object.prototype, 'updateStoriesContext', {\n        get () {\n          storiesContext = this\n          return this[_updateStoriesContext_]\n        },\n        set (value) {\n          this[_updateStoriesContext_] = value\n          return true\n        },\n      })\n\n\n      // dm-conversation-creator\n      const _filteredCandidates_ = Symbol('filteredCandidates')\n      Object.defineProperty(Object.prototype, 'filteredCandidates', {\n        get () {\n          if ('forwardAction' in this) {\n            registerModule('dm-conversation-creator', this)\n          }\n          return this[_filteredCandidates_]\n        },\n        set (value) {\n          this[_filteredCandidates_] = value\n          return true\n        }\n      })\n\n\n      // dm-delta-parser\n      const _parseDeltaItem_ = Symbol('parseDeltaItem')\n      Object.defineProperty(Object.prototype, 'parseDeltaItem', {\n        get () {\n          return this[_parseDeltaItem_]\n        },\n        set (value) {\n          registerModule('dm-delta-parser', this)\n          this[_parseDeltaItem_] = value\n          return true\n        }\n      })\n\n\n      // dm-state-proxy\n      const _getThreadSeenByViewer_ = Symbol('getThreadSeenByViewer')\n      Object.defineProperty(Object.prototype, 'getThreadSeenByViewer', {\n        get () {\n          return this[_getThreadSeenByViewer_]\n        },\n        set (value) {\n          registerModule('dm-state-proxy', this)\n          this[_getThreadSeenByViewer_] = value\n          return true\n        }\n      })\n    </script>\n  "
            );
        },
    };
    var M = {
        init: function () {
            r.executeScript(
                "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit((bodyStr, setBodyStr, moduleName) => {\n        // moduleName is only present for the new instagram bundle\n        if (!moduleName) return\n\n        if (!bodyStr.includes('className:')) return\n\n        // generate class name\n        const className = moduleName\n          .replace('.react', '')\n          .split('.').join('_')\n\n        // add generated class name to className field\n        const newBodyStr = bodyStr.replace(\n          /className:([\"a-z][^?]{20})/g,\n          'className:\"' + className + ' \"+$1'\n        )\n\n        setBodyStr(newBodyStr, 'class-name')\n      })\n    </script>\n  "
            );
        },
    };
    const j =
        '!function(){let e=!1;function t(){if(e)throw new Error("Invalid Instagram response")}Object.defineProperties(window.navigator,{appCodeName:{value:"Mozilla"},appName:{value:"Netscape"},userAgent:{value:"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"},appVersion:{value:"5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"},platform:{value:"iPhone"},product:{value:"Gecko"},vendor:{value:"Apple Computer, Inc."},vendorSub:{value:""},webdriver:{value:!1},productSub:{value:"20030107"}}),Object.defineProperty(screen.orientation,"type",{value:null}),window.addEventListener("DOMContentLoaded",()=>{document.body.requestFullscreen=(()=>{})}),navigator.serviceWorker.getRegistrations().then(e=>{e&&0!==e.length&&e.forEach(e=>e.unregister())}),function(){let e,o,i;const n=document.createElement.bind(document);document.createElement=((...e)=>{const t=n(...e);return"video"===e[0]&&t.setAttribute("type","video/mp4"),t}),Object.defineProperty(Object.prototype,"creationSelectMedia",{get:()=>(t(),t=>o=>{window.ig.onBeforePostCreation();const i=t.type.split("/")[0];"image"===i?o(e(t)):"video"===i&&o(window.inssist.creationSelectVideo(t))}),set:()=>!0}),Object.defineProperty(Object.prototype,"storyCreationSelectMedia",{get:()=>(t(),e=>t=>{window.ig.onBeforeStoryCreation();const n=e.type.split("/")[0];"image"===n?t(o(e)):"video"===n&&t(i(e))}),set:()=>!0}),Object.defineProperty(Object.prototype,"creationSelectImage",{get:()=>(t(),e),set:t=>(e=t,!0)}),Object.defineProperty(Object.prototype,"storyCreationSelectImage",{get:()=>(t(),o),set:e=>(o=e,!0)}),Object.defineProperty(Object.prototype,"storyCreationSelectVideo",{get:()=>(t(),i),set:e=>(i=e,!0)}),Object.defineProperty(Object.prototype,"isMP4Video",{get:()=>(t(),()=>!0),set:()=>!0})}(),Object.defineProperty(Object.prototype,"resolution",{get(){return t(),this.$resolution?this.$resolution:this.imageWidth&&this.imageHeight?Math.min(Math.max(this.imageWidth,this.imageHeight),4e3):void 0},set(e){return this.$resolution=e,!0}}),function(){const t=()=>{e=!0,parent.postMessage({name:"ig-patch-corrupted"},"*")};fetch(window.inssist.url("/manifest.json")).then(e=>e.text()).then(e=>{e.includes("INSSIST")&&e.includes("*://*.inssist.com/*")&&e.includes("/inssist.html?popup")||t()}).catch(()=>{t()})}()}();';
    function B() {
        r.executeScript(
            `\n    <script>\n      window.inssist = {\n        url (path) {\n          if (path.startsWith('/')) path = path.slice(1)\n          return '${chrome.runtime.getURL(
                "/"
            )}' + path\n        },\n        theme: {},\n        igStore: null,\n        gatekeeper: {},\n        modulePatcher: null,\n        moduleInterceptor: null,\n        desktopReelsData: {},\n        igBundleVersion: null,\n        creationSelectVideo: null,\n      }\n    <\/script>\n  `
        );
    }
    function k() {
        document.documentElement.insertAdjacentHTML(
            "afterbegin",
            '\n    <link\n      href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Nunito+Sans&display=fallback&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese"\n      rel="stylesheet"/>\n  '
        );
    }
    function N() {
        r.executeScript(
            "\n    <script>\n      if (window.trustedTypes) {\n        try {\n          const version = Number(\n            navigator.userAgent\n              .split('Chrome/')[1]\n              .split('.')[0]\n          )\n          if (version < 108) {\n            trustedTypes.createPolicy('default', {\n              createHTML: html => html,\n              createScript: fnBodyStr => fnBodyStr,\n              createScriptURL: url => url,\n            })\n          }\n        } catch (e) {\n          console.error('failed to create default trusted types policy')\n        }\n      }\n    </script>\n  "
        );
    }
    function T() {
        r.executeScript(
            "\n    <script>\n      window.inssist.modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n        if (!bodyStr.includes('touches[0].target.className===')) { return }\n        const newBodyStr = bodyStr.replace(\n          /touches\\[0\\]\\.target\\.className===(\"\\w+\")/,\n          'touches[0].target.classList.contains($1)'\n        )\n        setBodyStr(newBodyStr, 'creation-tag-image')\n      })\n    </script>\n  "
        );
    }
    function E() {
        r.executeScript(
            "\n    <script>\n      const error0 = console.error.bind(console)\n      console.error = (...args) => {\n        if (\n          typeof args[0] === 'string' &&\n          args[0].startsWith('ErrorUtils')\n        ) { return }\n        return error0(...args)\n      }\n    </script>\n  "
        );
    }
    function R() {
        r.executeScript(
            "\n    <script>\n      const addEventListener0 = window.addEventListener.bind(window)\n      window.addEventListener = (...args) => {\n        if (args[0]?.toLowerCase?.() === 'unhandledrejection') { return }\n        return addEventListener0(...args)\n      }\n    </script>\n  "
        );
    }
    function A() {
        r.executeScript(
            "\n    <script>\n      window.inssist.modulePatcher.onModuleInit((bodyStr, setBodyStr, moduleName) => {\n        if (moduleName !== 'PolarisPostsGridItemMediaIndicator') return\n        const parts = bodyStr.split('PolarisClipIndicator')\n        if (parts.length !== 2) return\n        const firstPartStart = parts[0].slice(0, -40)\n        const firstPartEnd = parts[0].slice(-40).replace('||', '&&')\n        const newBodyStr = firstPartStart + firstPartEnd + 'PolarisClipIndicator' + parts[1]\n        setBodyStr(newBodyStr)\n      })\n    </script>\n  "
        );
    }
    ({
        init: function () {
            if ((_.controller.init(), B(), k(), C.init(), M.init(), g.controller.init(), N(), T(), E(), R(), A(), r.loadExtScript("/app/ig-nj.js"), !r.iframe.isIframe()))
                return (
                    O.init(),
                    u.controller.init(),
                    I.controller.init(),
                    x.controller.init(),
                    void (function () {
                        if (!location.pathname.startsWith("/accounts/login/")) return;
                        r.executeScript(
                            "\n    <script>\n      Object.defineProperty(Object.prototype, 'isMobile', {\n        get () {\n          return () => true\n        },\n        set () {\n          return true\n        },\n      })\n    </script>\n  "
                        );
                    })()
                );
            const e = r.iframe.isIframe("inssist-ig"),
                n = r.iframe.isIframe("inssist-dm");
            (e || n) &&
                (r.executeScript(
                    "\n    <script>\n      const setTimeout = window.setTimeout.bind(window)\n      const setInterval = window.setInterval.bind(window)\n      const clearTimeout = window.clearTimeout.bind(window)\n      const clearInterval = window.clearInterval.bind(window)\n\n      Object.defineProperty(window, 'setTimeout', {\n        get: () => setTimeout,\n        set: () => true,\n      })\n      Object.defineProperty(window, 'setInterval', {\n        get: () => setInterval,\n        set: () => true,\n      })\n      Object.defineProperty(window, 'clearTimeout', {\n        get: () => clearTimeout,\n        set: () => true,\n      })\n      Object.defineProperty(window, 'clearInterval', {\n        get: () => clearInterval,\n        set: () => true,\n      })\n    </script>\n  "
                ),
                r.executeScript("\n    <script>\n      window.devicePixelRatio = 3\n    </script>\n  "),
                r.executeScript("\n    <script>\n      document.write = function () {}\n    </script>\n  "),
                r.executeScript(
                    "\n    <script>\n      Object.defineProperty(Object.prototype, 'getFrCookie', {\n        get: () => {\n          return () => {\n            return {\n              then () {\n                return {\n                  catch () {},\n                }\n              },\n            }\n          }\n        },\n        set: () => true,\n      })\n    </script>\n  "
                ),
                r.executeScript(
                    "\n    <script>\n      Object.defineProperty(Object.prototype, 'isDashEligible', {\n        get () {\n          return () => false\n        },\n        set () {\n          return true\n        }\n      })\n    </script>\n  "
                ),
                O.init(),
                S.init(),
                w.controller.init(),
                r.executeScript(
                    "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n        if (!bodyStr.includes('window.top')) { return }\n        const newBodyStr = bodyStr.split('window.top').join('window')\n        setBodyStr(newBodyStr, 'window-top')\n      })\n    </script>\n  "
                ));
            e &&
                (r.executeScript(`\n    <script>\n      ${j}\n    <\/script>\n  `),
                r.executeScript(
                    "\n    <script>\n      Object.defineProperty(Object.prototype, 'getOrientationData', {\n        get () {\n          return () => {\n            return {\n              degreesToRotate: 0,\n              mirrored: false,\n            }\n          }\n        },\n        set () {\n          return true\n        },\n      })\n    </script>\n  "
                ),
                r.executeScript(
                    "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit((bodyStr, setBodyStr) => {\n        const isPostComponent = (\n          bodyStr.includes('$Post1=') ||\n          bodyStr.includes('{currSidecarIndex:')\n        )\n        if (!isPostComponent) { return }\n        if (bodyStr.includes('const _postId')) { return }\n        const newBodyStr = bodyStr\n          .replace(\n            'render=function(){',\n            'render=function(){const _postId = this.props.post.id;'\n          )\n          .replace(\n            'onKeyUp',\n            '\"data-post-id\": typeof _postId === \"undefined\" ? -1 : _postId, onKeyUp'\n          )\n        setBodyStr(newBodyStr, 'post-rendering')\n      })\n    </script>\n  "
                ),
                r.executeScript(
                    "\n    <script>\n      let patched = false\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit((bodyStr, setBodyStr, moduleName) => {\n        const isPostRenderingModule =\n          moduleName === 'PolarisPost.react' ||\n          moduleName === 'PolarisPostFunctional'\n        if (!isPostRenderingModule) return\n        if (patched) return\n        patched = true\n        const newBodyStr = bodyStr\n          .replace(\n            /;function (\\w+)\\((\\w+)\\){/,\n            ';function $1($2){const __props = $2;'\n          )\n          .replace(\n            '\"article\",{',\n            '\"article\",{\"data-post-id\":typeof __props === \"undefined\" ? -1 : __props.id,'\n          )\n        setBodyStr(newBodyStr)\n      })\n    </script>\n  "
                ),
                v.controller.init());
            n && m.controller.init();
        },
    }.init());
})();
