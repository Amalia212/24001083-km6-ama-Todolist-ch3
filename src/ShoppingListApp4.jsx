import { useState } from "react";

export default function ShoppingListApp() {
  const [items, setItems] = useState([]); // Membuat state untuk daftar belanjaan dan fungsi untuk mengubahnya
  const [editIndex, setEditIndex] = useState(null); // Membuat state untuk indeks item yang sedang diedit dan fungsi untuk mengubahnya
  const [editedName, setEditedName] = useState(""); // Membuat state untuk nama item yang sedang diedit dan fungsi untuk mengubahnya
  const [editedSum, setEditedSum] = useState(0); // Membuat state untuk jumlah item yang sedang diedit dan fungsi untuk mengubahnya
  const [editedUnit, setEditedUnit] = useState(""); // Membuat state untuk unit item yang sedang diedit dan fungsi untuk mengubahnya

  const addItem = (newItem) => {
    // Fungsi untuk menambahkan item baru ke daftar belanjaan
    if (newItem.name && newItem.sum) {
      // Memeriksa apakah item baru memiliki nama dan jumlah
      setItems([...items, newItem]); // Menambahkan item baru ke daftar belanjaan
      return alert("Berhasil menambahkan data"); // Menampilkan pesan sukses
    }
    alert("Mohon inputkan data keseluruhan"); // Menampilkan pesan kesalahan jika data tidak lengkap
  };

  const editItem = (index, updatedItem) => {
    // Fungsi untuk mengedit item di daftar belanjaan
    const updatedItems = [...items]; // Membuat salinan daftar belanjaan
    updatedItems[index] = updatedItem; // Memperbarui item yang sudah ada di indeks tertentu
    setItems(updatedItems); // Mengupdate daftar belanjaan dengan item yang diperbarui
  };

  const removeItem = (index) => {
    // Fungsi untuk menghapus item dari daftar belanjaan
    if (confirm(`Ingin menghapus?`)) {
      // Meminta konfirmasi sebelum menghapus item
      setEditIndex(null); // Mengatur indeks item yang sedang diedit menjadi null
      setItems(items.filter((_, i) => i !== index)); // Menghapus item dari daftar belanjaan
    }
  };

  return (
    <div className="px-5">
      <div className="max-w-[700px] w-full mx-auto border-[1px] border-black rounded-sm mt-10 py-2 px-2 pb-5 pt-3">
        <div className="max-w-[650px] mx-auto">
          <h1 className="text-2xl font-bold">Shopping List App</h1>
          <form
            onSubmit={(e) => {
              // Menangani submit form
              e.preventDefault(); // Mencegah reload halaman saat submit
              const newItemName = e.target.itemName.value; // Mengambil nilai nama item dari form
              const newItemSum = e.target.itemSum.value; //  - - -  jumlah - - -
              const newItemUnit = e.target.itemUnit.value; // - - - unit - - -

              addItem({
                // Memanggil fungsi addItem dengan item baru
                id: Date.now(),
                name: newItemName,
                sum: newItemSum,
                unit: newItemUnit,
              });
              e.target.reset(); // Mengosongkan form setelah submit
            }}
            className="my-4 flex gap-x-4 justify-between"
          >
            <input
              type="text"
              className="border-[1px] outline-none max-w-[550px] w-full focus:border-[1px] focus:border-black border-gray-300 ps-1 rounded-sm px-2 py-1"
              name="itemName"
              placeholder="Item name"
            />
            <input
              type="number"
              className="border-[1px] outline-none max-w-[550px] w-full focus:border-[1px] focus:border-black border-gray-300 ps-1 rounded-sm px-2 py-1"
              name="itemSum"
              placeholder="Jumlah"
              min="1"
            />
            <select
              className="border border-gray-300 p-1"
              placeholder="tes"
              name="itemUnit"
            >
              <option value="Buah">Buah</option>
              <option value="Gram">Gram</option>
              <option value="Kg">Kg</option>
              <option value="Liter">Liter</option>
            </select>

            <button
              type="submit"
              className="bg-gray-900 text-white rounded-sm px-2 py-1 w-[300px]"
            >
              Add Item
            </button>
          </form>

          {items.length > 0 ? ( // Mengecek apakah daftar belanjaan tidak kosong
            <div className="max-md:overflow-x-scroll">
              <table className="w-full text-center ">
                <thead>
                  <tr>
                    <th className="border border-gray-700 py-2">No.</th>
                    <th className="border border-gray-700 py-2">Nama</th>
                    <th className="border border-gray-700 py-2">Jumlah</th>
                    <th className="border border-gray-700 py-2">Unit</th>
                    <th className="border border-gray-700 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(
                    (
                      item,
                      index // Menampilkan setiap item dalam daftar belanjaan
                    ) => (
                      <tr key={item.id}>
                        <td className="border border-black p-2">{index + 1}</td>
                        <td className="border border-black p-2">
                          {editIndex === index ? ( // Mengecek apakah item sedang diedit
                            <input
                              type="text"
                              value={editedName}
                              className="border-[1px] py-1 border-gray-300 outline-none ps-1  w-full"
                              onChange={(e) => setEditedName(e.target.value)} // Menangani perubahan nilai input nama item yang sedang diedit
                            />
                          ) : (
                            <span>{item.name}</span> // Menampilkan nama item
                          )}
                        </td>
                        <td className="border border-black p-2">
                          {editIndex === index ? ( // Mengecek apakah item sedang diedit
                            <input
                              value={editedSum}
                              type="number"
                              min="1"
                              className="border-[1px] py-1 border-gray-300 outline-none ps-1 w-full max-w-[150px]"
                              onChange={(e) => setEditedSum(e.target.value)} // Menangani perubahan nilai input jumlah item yang sedang diedit
                            />
                          ) : (
                            <span>{item.sum}</span> // Menampilkan jumlah item
                          )}
                        </td>
                        <td className="border border-black p-2">
                          {editIndex === index ? ( // Mengecek apakah unit sedang diedit
                            <select
                              className="border border-gray-300 py-1"
                              value={editedUnit}
                              onChange={(e) => setEditedUnit(e.target.value)} // Menangani perubahan nilai input unit item yang sedang diedit
                            >
                              <option value="Buah">Buah</option>
                              <option value="Gram">Gram</option>
                              <option value="Kg">Kg</option>
                              <option value="Liter">Liter</option>
                            </select>
                          ) : (
                            <span>{item.unit}</span> // Menampilkan unit item
                          )}
                        </td>
                        <td className="border border-black p-2">
                          {editIndex === index ? ( // Mengecek apakah item sedang diedit
                            <div className="flex justify-center gap-x-3 w-full px-10">
                              <button
                                onClick={() => {
                                  editItem(index, {
                                    // Memanggil fungsi editItem dengan item yang diperbarui
                                    ...item,
                                    name: editedName,
                                    sum: editedSum,
                                    unit: editedUnit,
                                  });
                                  setEditedName(""); // Mengosongkan nilai input nama item yang sedang diedit
                                  setEditedSum(0); // Mengosongkan nilai input jumlah item yang sedang diedit
                                  setEditedUnit(""); // Mengosongkan nilai input unit item yang sedang diedit
                                  setEditIndex(null); // Mengatur indeks item yang sedang diedit menjadi null
                                }}
                                className="bg-gray-900 rounded-sm text-white max-w-16 p-1 w-full"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditedName("");
                                  setEditedSum(0);
                                  setEditedUnit("");
                                  setEditIndex(null);
                                }}
                                className="bg-gray-900 rounded-sm text-white max-w-16 p-1 w-full"
                              >
                                Batal
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center gap-x-3">
                              <button
                                onClick={() => {
                                  setEditedName(item.name);
                                  setEditedSum(item.sum);
                                  setEditedUnit(item.unit);
                                  setEditIndex(index);
                                }}
                                className="bg-blue-500 rounded-sm text-white p-1 max-w-16 w-full"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => removeItem(index)} // Memanggil fungsi removeItem dengan indeks item yang akan dihapus
                                className="bg-red-500 rounded-sm max-w-16 w-full text-white p-1"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">List kosong.....</p> // Menampilkan pesan jika daftar belanjaan kosong
          )}
        </div>
      </div>
    </div>
  );
}
