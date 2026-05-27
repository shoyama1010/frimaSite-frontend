import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type LoginResponse = {
    message: string;
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
};

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        const response = await fetch("http://localhost/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            setErrorMessage("メールアドレスまたはパスワードが正しくありません。");
            return;
        }
        
        const result: LoginResponse = await response.json();

        localStorage.setItem("auth_token", result.token);
        localStorage.setItem("auth_user", JSON.stringify(result.user));

        navigate("/");
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="flex h-[70px] items-center bg-black px-8">
                <Link to="/" className="text-3xl font-bold text-white">
                    COACHTECH
                </Link>
            </header>

            <main className="mx-auto mt-20 max-w-[520px] px-6">
                <h1 className="text-center text-3xl font-bold">ログイン</h1>

                <form onSubmit={handleLogin} className="mt-10 space-y-7">
                    {errorMessage && (
                        <p className="rounded border border-red-400 bg-red-50 p-3 text-red-600">
                            {errorMessage}
                        </p>
                    )}

                    <div>
                        <label className="mb-2 block font-bold">メールアドレス</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded border border-gray-400 px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-bold">パスワード</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded border border-gray-400 px-4 py-3 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded bg-red-500 py-3 font-bold text-white"
                    >
                        ログインする
                    </button>
                </form>
            </main>
        </div>
    );
}