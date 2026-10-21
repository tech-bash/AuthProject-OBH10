import {
    createContext,
    useContext,
    useEffect,
    useState,   
} from "react";

import * as authService from "../services/Authentication.js";

const AuthContext = createContext(null);

const SESSION_KEY = "auth_demo_session_v1";
const REMEMBER_KEY = "auth_demo_remember_v1";

function readSavedSession() {
    try {
    const rememberMe =
    localStorage.getItem(REMEMBER_KEY) === "true";

    const storage = rememberMe
        ? localStorage
        : sessionStorage;

    const raw = storage.getItem(SESSION_KEY);

    return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
const [session, setSession] = useState(null);
const [loading, setLoading] = useState(true);

// Restore a previously saved session when the app starts.
useEffect(() => {
setSession(readSavedSession());
setLoading(false);
}, []);

function saveSession(rememberMe, nextSession) {
localStorage.removeItem(SESSION_KEY);
sessionStorage.removeItem(SESSION_KEY);

localStorage.setItem(
REMEMBER_KEY,
String(Boolean(rememberMe))
);

const storage = rememberMe
? localStorage
: sessionStorage;

storage.setItem(
SESSION_KEY,
JSON.stringify(nextSession)
);

setSession(nextSession);
}

async function login(credentials, rememberMe = false) {
    setLoading(true);

    try {
        const result = await authService.login(
        credentials.email,
        credentials.password
    );

    saveSession(rememberMe, result);

    return result.user;
    } finally {
    setLoading(false);
    }
}

async function signup(credentials, rememberMe = false) {
    setLoading(true);

    try {
        const result = await authService.signup(
        credentials.name,
        credentials.email,
        credentials.password
    );

    saveSession(rememberMe, result);

    return result.user;
    } finally {
        setLoading(false);
        }
}

function logout() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(REMEMBER_KEY);

    setSession(null);
}

async function resetPassword(email, newPassword) {
    setLoading(true);

    try {
        const result = await authService.resetPassword(
        email,
        newPassword
    );

    return result;
    } finally {
        setLoading(false);
        }
}

    const value = {
        user: session?.user ?? null,
        session,
        loading,
        login,
        signup,
        logout,
        resetPassword,
    };

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
);
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
        "useAuth must be used inside an AuthProvider."
    );
    }

    return context;
}