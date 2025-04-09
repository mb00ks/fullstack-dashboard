import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import { apiFetch, getToken } from "../lib/api";
import { useRouter } from "next/router";

export default function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const router = useRouter();

  const loadData = async () => {
    const res = await apiFetch(`${baseUrl}/api/customers/`);
    if (res.ok) {
      setCustomers(await res.json());
    } else {
      toast.error("Unauthorized");
      router.push("/");
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/");
    } else {
      loadData();
    }
  }, []);

  const saveCustomer = async () => {
    if (editId) {
      const res = await apiFetch(`${baseUrl}/api/customers/${editId}`, {
        method: "PUT",
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        toast.success("Customer diubah");
      } else {
        toast.error("Gagal mengubah");
      }
    } else {
      const res = await apiFetch(`${baseUrl}/api/customers/`, {
        method: "POST",
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        toast.success("Customer ditambahkan");
      } else {
        toast.error("Gagal menambahkan");
      }
    }
    setName("");
    setEmail("");
    setEditId(null);
    loadData();
  };

  const editCustomer = (c) => {
    setEditId(c.id);
    setName(c.name);
    setEmail(c.email);
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
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input className="border p-2 rounded dark:bg-gray-700 flex-1" placeholder="Nama" value={name} onChange={e => setName(e.target.value)} />
        <input className="border p-2 rounded dark:bg-gray-700 flex-1" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={saveCustomer}>
          {editId ? "Ubah" : "Tambah"}
        </button>
      </div>
      <div className="overflow-x-auto border rounded-md dark:border-gray-700">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
            <tr>
              <th className="p-3 text-left border-r dark:border-gray-700">Nama</th>
              <th className="p-3 text-left border-r dark:border-gray-700">Email</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr><td colSpan="3" className="text-center p-4">Belum ada data</td></tr>
            ) : customers.map(c => (
              <tr key={c.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-3 border-r dark:border-gray-700">{c.name}</td>
                <td className="p-3 border-r dark:border-gray-700">{c.email}</td>
                <td className="p-3 text-center space-x-2">
                  <button onClick={() => editCustomer(c)} className="text-yellow-500 hover:underline">Ubah</button>
                  <button onClick={() => deleteCustomer(c.id)} className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
