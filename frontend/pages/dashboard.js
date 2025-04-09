import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiFetch } from "../lib/api";

export default function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const loadData = async () => {
    const res = await apiFetch(`${baseUrl}/api/customers/`);
    if (res.ok) {
      setCustomers(await res.json());
    } else {
      router.push("/"); // logout otomatis
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addCustomer = async () => {
    await apiFetch(`${baseUrl}/api/customers/`, {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    loadData();
  };

  const deleteCustomer = async (id) => {
    await apiFetch(`${baseUrl}/api/customers/${id}`, {
      method: "DELETE",
    });
    loadData();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard Customer</h1>
      <div className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Nama" value={name} onChange={e => setName(e.target.value)} />
        <input className="border p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addCustomer}>Tambah</button>
      </div>
      <table className="w-full border">
        <thead><tr><th>Nama</th><th>Email</th><th>Aksi</th></tr></thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id} className="border-t">
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>
                <button onClick={() => deleteCustomer(c.id)} className="text-red-500">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
