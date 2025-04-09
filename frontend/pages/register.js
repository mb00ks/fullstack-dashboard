import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async () => {
    const res = await fetch(`${baseUrl}/api/admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert("Registrasi berhasil! Silakan login.");
      router.push("/");
    } else {
      alert("Registrasi gagal");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Register Admin</h1>
      <input className="border p-2 mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="border p-2 mb-2" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2" onClick={register}>Register</button>
    </div>
  );
}
