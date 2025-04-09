import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import { apiFetch } from "../lib/api";

export default function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const loadData = async () => {
    const res = await apiFetch(`${baseUrl}/api/customers/`);
    if (res.ok) {
      setCustomers(await res.json());
    } else {
      toast.error("Gagal mengambil data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addCustomer = async () => {
    const res = await apiFetch(`${baseUrl}/api/customers/`, {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      toast.success("Customer ditambahkan");
      setName("");
      setEmail("");
      loadData();
    } else {
      toast.error("Gagal menambahkan customer");
    }
  };

  const deleteCustomer = async (id) => {
    const res = await apiFetch(`${baseUrl}/api/customers/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Customer dihapus");
      loadData();
    } else {
      toast.error("Gagal menghapus");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard Customer</h1>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 dark:bg-gray-700" placeholder="Nama" value={name} onChange={e => setName(e.target.value)} />
        <input className="border p-2 dark:bg-gray-700" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addCustomer}>Tambah</button>
      </div>
      <table className="w-full border">
        <thead><tr><th>Nama</th><th>Email</th><th>Aksi</th></tr></thead>
        <tbody>
          {customers.length === 0 ? (
            <tr><td colSpan="3" className="text-center p-4">Belum ada data</td></tr>
          ) : customers.map(c => (
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
    </Layout>
  );
}
