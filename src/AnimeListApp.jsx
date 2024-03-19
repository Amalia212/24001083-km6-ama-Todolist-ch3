import React, { useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/solid";

//komponen utama untuk aplikasi daftar anime
export default function AnimeListApp() {
  //state untuk menyimpan input pengguna
  const [list, setList] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  //state untuk menyimpan daftar anime
  const [animeList, setAnimeList] = useState([]);
  //state untuk menampilkan daftar anime
  const [showAll, setShowAll] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [showComplete, setShowComplete] = useState(true);

  //fungsi yang dipanggil saat form disubmit untuk menambahkan daftar anime baru
  const handleForm = (e) => {
    e.preventDefault();
    //memeriksa apakah semua input telah diisi
    if (!list || !image || !rating) {
      alert("Mohon isi semua data sebelum menambahkan data baru!");
      return;
    }
    //menambahkan daftar anime baru ke dalam state animelist
    setAnimeList([
      ...animeList,
      {
        id: Date.now(),
        listName: list,
        checked: false,
        image: image,
        rating: parseInt(rating),
      },
    ]);
    //mengosongkan input setelah ditambahkan
    setList("");
    setImage("");
    setRating("");
  };

  //fungsi untuk menghapus daftar anime
  const deleteList = (deleteId) => {
    const restAnimeList = animeList.filter((val) => val.id !== deleteId);
    setAnimeList(restAnimeList);
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus daftar anime ini?"
    );
    if (isConfirmed) {
      const restAnimeList = animeList.filter((val) => val.id !== deleteId);
      setAnimeList(restAnimeList);
    } else {
      return;
    }
  };

  //fungsi untuk menandai daftar anime sebagai selesai atau belum
  const toggleChecked = (id) => {
    const updatedList = animeList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setAnimeList(updatedList);
  };

  //fungsi untuk mengedit nama daftar anime
  const editList = (id, newListName) => {
    if (newListName !== null) {
      const updatedList = animeList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            listName: newListName,
          };
        }
        return item;
      });
      setAnimeList(updatedList);
    }
  };

  //fungsi untuk menampilkan semua jenis daftar anime
  const toggleShow = (type) => {
    if (type === undefined) {
      setShowIncomplete(true);
      setShowComplete(true);
    } else if (type === "incomplete") {
      setShowIncomplete(true);
      setShowComplete(false);
    } else if (type === "complete") {
      setShowComplete(true);
      setShowIncomplete(false);
    }
  };

  //filter daftar anime berdasarkan kriteria
  const filteredList = animeList
    .filter((item) => {
      if (showIncomplete === true && showComplete === false) {
        return item.checked === false;
      } else if (showComplete === true && showIncomplete === false) {
        return item.checked === true;
      } else {
        return true;
      }
    })

    .filter((singleList) =>
      singleList.listName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  console.log("filteredList ", filteredList);
  //menampilkan semua daftar anime
  const showAllLists = () => {
    setShowAll(true);
    setShowComplete(false);
    setShowIncomplete(false);
    setSearchTerm("");
  };

  //menampilkan daftar anime yang sudah selesai
  const showCompletedLists = () => {
    console.log("backup ", animeList);
    // const filteredAnimeList = animeList.filter((item) => item.checked);
    // setAnimeList(filteredAnimeList);
    setShowAll(false);
    setShowIncomplete(false);
    setShowComplete(true);
  };

  //menampilkan daftar anaime yang belum selesai
  const showIncompleteLists = () => {
    // const filteredAnimeList = animeList.filter((item) => !item.checked);
    // setAnimeList(filteredAnimeList);
    setShowAll(false);
    setShowIncomplete(true);
    setShowComplete(false);
  };

  //menghapus semua daftar anime yang sudah selesai
  const deleteAllCompletedLists = () => {
    const filteredAnimeList = animeList.filter((item) => !item.checked);
    setAnimeList(filteredAnimeList);
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus semua daftar anime yang sudah selesai?"
    );
    if (isConfirmed) {
      const filteredAnimeList = animeList.filter((item) => !item.checked);
      setAnimeList(filteredAnimeList);
    } else {
      return;
    }
  };

  //menghapus semua daftar anime
  const deleteAllLists = () => {
    setAnimeList([]);
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus semua daftar anime?"
    );
    if (isConfirmed) {
      setAnimeList([]);
    } else {
      return;
    }
  };

  return (
    <div className="w-full h-full flex items-center">
      <div className="w-[700px] mx-auto text-center bg-gray-300 p-5 rounded-lg">
        <h1 className="text-5xl font-bold mb-8">My Anime List</h1>
        <form onSubmit={handleForm} className="mb-5">
          <div className="flex items-center mb-3">
            <MagnifyingGlassCircleIcon className="h-16 w-16 text-blue-500 cursor-pointer" />
            <input
              className="border-2 placeholder:text-gray-500 rounded-lg border-blue-950 w-full p-3 mr-3 text-black"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-blue-900 text-blue-200 py-3 px-8 rounded-lg"
              type="button"
            >
              Search
            </button>
          </div>
          {/* Input untuk menambahkan daftar anime baru */}
          <div className="flex items-center">
            <input
              className="border-2 placeholder:text-gray-500 rounded-lg border-blue-950 w-full p-3 mr-3 text-black"
              type="text"
              placeholder="Add List"
              value={list}
              onChange={(e) => setList(e.target.value)}
            />
            <input
              className="border-2 placeholder:text-gray-500 rounded-lg border-blue-950 w-full p-3 mr-3 text-black"
              type="text"
              placeholder="Image Link"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <select
              className="border-2 placeholder:text-gray-500 rounded-lg border-blue-950 w-full p-3 mr-3 text-black"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {/* Pilihan untuk rating */}
              <option value="">Select Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {/* Tombol untuk menambahkan daftar anime baru */}
            <button
              className="bg-green-700 text-white py-3 px-8 rounded-lg ml-3"
              type="submit"
            >
              Add List
            </button>
          </div>
        </form>
        <div className="mb-3">
          <button
            onClick={showAllLists}
            className="bg-yellow-900 text-yellow-500 py-3 px-8 rounded-lg mr-3"
          >
            Show All
          </button>
          <button
            onClick={showCompletedLists}
            className="bg-yellow-900 text-yellow-500 py-3 px-8 rounded-lg mr-3"
          >
            Show Completed
          </button>
          <button
            onClick={showIncompleteLists}
            className="bg-yellow-900 text-yellow-500 py-3 px-8 rounded-lg mr-3"
          >
            Show Incomplete
          </button>
        </div>
        {/* Daftar anime */}
        <div className="list-show-area">
          <ul>
            {filteredList.map((singleList, index) => {
              return (
                <li
                  key={singleList.id}
                  className={`bg-green-300 mb-5 flex justify-between py-5 px-5 rounded-lg text-2xl ${
                    singleList.checked
                      ? "text-gray-500 line-through"
                      : "text-black"
                  }`}
                >
                  <div className="flex items-center">
                    {/* Gambar anime */}
                    {singleList.image && (
                      <img
                        src={singleList.image}
                        alt="Anime"
                        className="h-16 w-16 mr-3 object-cover"
                      />
                    )}
                    <div>
                      {singleList.listName} {/* Nama daftar anime */}
                      {/* Rating daftar anime */}
                      {singleList.rating && (
                        <span className="text-xl ml-5 text-purple-500">
                          (Rating: {singleList.rating})
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {/* Checkbox untuk menandai daftar anime selesai atau belum */}
                    <input
                      type="checkbox"
                      checked={singleList.checked}
                      onChange={() => toggleChecked(singleList.id)}
                      className="mr-4 h-6 w-6"
                    />
                    {/* Tombol untuk mengedit nama daftar anime */}
                    <button
                      onClick={() =>
                        editList(singleList.id, prompt("Enter new list name:"))
                      }
                      className="mr-4"
                    >
                      <PencilSquareIcon className="h-6 w-6 text-black cursor-pointer" />
                    </button>
                    {/* Tombol untuk menghapus daftar anime */}
                    <button onClick={() => deleteList(singleList.id)}>
                      <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Tombol untuk menghapus semua daftar anime yang sudah selesai */}
        <div className="mt-5">
          <button
            onClick={deleteAllCompletedLists}
            className="bg-red-500 text-white py-3 px-8 rounded-lg mr-3"
          >
            Hapus Semua Anime Selesai
          </button>
          {/* Tombol untuk menghapus semua daftar anime */}
          <button
            onClick={deleteAllLists}
            className="bg-red-500 text-white py-3 px-8 rounded-lg"
          >
            Hapus Semua Anime
          </button>
        </div>
      </div>
    </div>
  );
}
