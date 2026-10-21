const USERS_KEY = "auth_demo_users_v1";

const DEMO_USER = {
    id: "demo-1",
    name: "Bhavy",
    email: "bhavy@example.com",
    password: "Demo123",
};

function getUsers() {
    try {
    const users = JSON.parse(
     localStorage.getItem(USERS_KEY) || "[]"
    );

    return Array.isArray(users) ? users : [];
    } catch {
    return [];
  }
}

function saveUsers(users) {
        localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}

function createSession(user) {
    const { password, ...safeUser } = user;

    return {
        user: safeUser,
        token: `demo-${Date.now()}-${Math.random()}`,
    };
}

export async function signup(name, email, password) {
    const cleanName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!cleanName || !normalizedEmail || !password) {
        throw new Error("Please fill in every field.");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
    }

    const users = getUsers();
    const allUsers = [DEMO_USER, ...users];

    const exists = allUsers.some(
        (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (exists) {
    throw new Error("An account with this email already exists.");
    }

    const newUser = {
        id: `user-${Date.now()}`,
        name: cleanName,
        email: normalizedEmail,
        password,
    };

    saveUsers([...users, newUser]);

    return createSession(newUser);
}

export async function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();

    const users = [DEMO_USER, ...getUsers()];

    const user = users.find(
        (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password
    );

    if (!user) {
    throw new Error("Invalid email or password.");
    }

    return createSession(user);
}

export async function resetPassword(email, newPassword) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !newPassword) {
        throw new Error("Please fill in every field.");
    }

    if (newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters.");
    }

    // Keep the built-in demo account unchanged.
    if (normalizedEmail === DEMO_USER.email) {
        throw new Error(
        "Password reset is disabled for the demo account."
    );
    }

    const users = getUsers();

    const index = users.findIndex(
    (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (index === -1) {
     throw new Error("No account found with that email.");
    }

    const updatedUsers = [...users];

    updatedUsers[index] = {
        ...updatedUsers[index],
        password: newPassword,
    };

    saveUsers(updatedUsers);

    return {
     message: "Password updated successfully. Please log in.",
    };
}