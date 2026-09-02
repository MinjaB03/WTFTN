import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const response = await fetch(
                "/api/Auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            if (!response.ok) {
                setError("Wrong username or password.");
                return;
            }

            const data = await response.json();

            sessionStorage.setItem(
                "wtftn_admin_token",
                data.token
            );

            window.location.href = "/";
        } catch (error) {
            console.error("Login failed:", error);

            setError(
                "Could not connect to the server."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <img
                    src="/eestec-logo.png"
                    alt="EESTEC"
                    className="admin-login-logo"
                />

                <p className="admin-login-kicker">
                    WTFTN ADMIN
                </p>

                <h1>Welcome back.</h1>

                <p className="admin-login-description">
                    Sign in to manage locations.
                </p>

                <form
                    className="admin-login-form"
                    onSubmit={handleLogin}
                >
                    <div className="admin-form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="admin-login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Signing in..."
                            : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;