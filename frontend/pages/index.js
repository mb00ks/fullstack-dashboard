import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    const res = await fetch(`${baseUrl}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    } else {
      alert("Login gagal");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Login Admin</h1>
      <input className="border p-2 mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="border p-2 mb-2" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={login}>Login</button>
      <p className="mt-2 text-sm">Belum punya akun? <a className="text-blue-600" href="/register">Daftar</a></p>
    </div>
  );
}
