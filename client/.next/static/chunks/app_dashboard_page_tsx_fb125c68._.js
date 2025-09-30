(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// store/auth.ts
__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
"use client";
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        user: null,
        accessToken: null,
        loading: false,
        error: null,
        rehydrate: ()=>{
            const token = localStorage.getItem("accessToken");
            if (token) set({
                accessToken: token
            });
        },
        login: async (email, password)=>{
            set({
                loading: true,
                error: null
            });
            try {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(("TURBOPACK compile-time value", "http://localhost:5000/api"), "/auth/login"), {
                    email,
                    password
                }, {
                    withCredentials: true
                });
                set({
                    accessToken: data.accessToken
                });
                localStorage.setItem("accessToken", data.accessToken);
                await get().fetchUser();
            } catch (err) {
                set({
                    error: err.message || "Login failed"
                });
                throw err;
            } finally{
                set({
                    loading: false
                });
            }
        },
        register: async (email, password)=>{
            set({
                loading: true,
                error: null
            });
            try {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(("TURBOPACK compile-time value", "http://localhost:5000/api"), "/auth/register"), {
                    email,
                    password
                }, {
                    withCredentials: true
                });
                set({
                    accessToken: data.accessToken
                });
                localStorage.setItem("accessToken", data.accessToken);
                await get().fetchUser();
            } catch (err) {
                set({
                    error: err.message || "Register failed"
                });
                throw err;
            } finally{
                set({
                    loading: false
                });
            }
        },
        logout: async ()=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(("TURBOPACK compile-time value", "http://localhost:5000/api"), "/auth/logout"), {}, {
                    withCredentials: true
                });
            } catch (e) {}
            localStorage.removeItem("accessToken");
            set({
                user: null,
                accessToken: null
            });
        },
        refreshToken: async ()=>{
            try {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(("TURBOPACK compile-time value", "http://localhost:5000/api"), "/auth/refresh"), {}, {
                    withCredentials: true
                });
                set({
                    accessToken: data.accessToken
                });
                localStorage.setItem("accessToken", data.accessToken);
            } catch (e) {
                set({
                    user: null,
                    accessToken: null
                });
            }
        },
        fetchUser: async ()=>{
            const { accessToken } = get();
            if (!accessToken) return;
            try {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("".concat(("TURBOPACK compile-time value", "http://localhost:5000/api"), "/auth/me"), {
                    headers: {
                        Authorization: "Bearer ".concat(accessToken)
                    },
                    withCredentials: true
                });
                set({
                    user: data.user
                });
            } catch (e) {
                set({
                    user: null
                });
            }
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_dashboard_page_tsx_fb125c68._.js.map