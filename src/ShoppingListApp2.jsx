import { useState } from "react";

export default function ShoppingListApp() {
  const [items, setItems] = useState([]); // Membuat state untuk daftar belanjaan dan fungsi untuk mengubahnya
  const [editIndex, setEditIndex] = useState(null); // Membuat state untuk indeks item yang sedang diedit dan fungsi untuk mengubahnya
  const [editedName, setEditedName] = useState(""); // Membuat state untuk nama item yang sedang diedit dan fungsi untuk mengubahnya
  const [editedSum, setEditedSum] = useState(0); // Membuat state untuk jumlah item yang sedang diedit dan fungsi untuk mengubahnya
  const [editedUnit, setEditedUnit] = useState(""); // Membuat state untuk unit item yang sedang diedit dan fungsi untuk mengubahnya

  // Tidak jadi dipakai menuju ke baris 85 panjang item dicek secara langsung
  // const [itemAvailable, setItemAvailable] = useState(false);

  // useEffect(() => {
  //   items.length > 0 ? setItemAvailable(true) : setItemAvailable(false);
  // }, [items]);

  const addItem = (newItem) => {
    if (newItem.name && newItem.sum) {
      setItems([...items, newItem]);
      return alert("Berhasil menambahkan data");
    }
    alert("Mohon inputkan data keseluruhan");
  };

  const editItem = (index, updatedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  const removeItem = (index) => {
    if (confirm(`Ingin menghapus?`)) {
      setEditIndex(null);
      setItems(items.filter((item, i) => i !== index));
    }
  };

  return (
    <div className="px-5">
      <div className="max-w-[700px] w-full mx-auto border-[1px] border-black rounded-sm mt-10 py-2 px-2 pb-5 pt-3">
        <div className="max-w-[650px] mx-auto">
          <h1 className="text-2xl font-bold">Shopping List App</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newItemName = e.target.itemName.value;
              const newItemSum = e.target.itemSum.value;
              const newItemUnit = e.target.itemUnit.value;

              addItem({
                id: Date.now(),
                name: newItemName,
                sum: newItemSum,
                unit: newItemUnit,
              });
              e.target.reset();
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
            <select className="border border-gray-300 p-1" name="itemUnit">
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

          {items.length > 0 ? (
            <table className="w-full text-center">
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
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-black py-2">{index + 1}</td>
                    <td className="border border-black py-2">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editedName}
                          className="border-[1px] py-1 border-gray-300 outline-none ps-1 w-full px-4"
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </td>
                    <td className="border border-black py-2">
                      {editIndex === index ? (
                        <input
                          value={editedSum}
                          type="number"
                          min="1"
                          className="border-[1px] py-1 border-gray-300 outline-none ps-1 w-full"
                          onChange={(e) => setEditedSum(e.target.value)}
                        />
                      ) : (
                        <span>{item.sum}</span>
                      )}
                    </td>
                    <td className="border border-black py-2">
                      {editIndex === index ? (
                        <select
                          className="border border-gray-300 py-1"
                          value={editedUnit}
                          onChange={(e) => setEditedUnit(e.target.value)}
                        >
                          <option value="Buah">Buah</option>
                          <option value="Gram">Gram</option>
                          <option value="Kg">Kg</option>
                          <option value="Liter">Liter</option>
                        </select>
                      ) : (
                        <span>{item.unit}</span>
                      )}
                    </td>
                    <td className="border border-black py-2">
                      {editIndex === index ? (
                        <div className="flex gap-x-2 justify-center">
                          <button
                            onClick={() => {
                              editItem(index, {
                                ...item,
                                name: editedName,
                                sum: editedSum,
                                unit: editedUnit,
                              });
                              setEditedName("");
                              setEditedSum(0);
                              setEditedUnit("");
                              setEditIndex(null);
                            }}
                            className="bg-gray-900 rounded-sm text-white max-w-16 p-1"
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
                            className="bg-gray-900 rounded-sm text-white max-w-16 p-1"
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
                            onClick={() => removeItem(index)}
                            className="bg-red-500 rounded-sm text-white p-1"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">List kosong.....</p>
          )}
        </div>
      </div>
    </div>
  );
}
