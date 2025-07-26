// E-Library System for Directorate of Logistics (DOL), Defence Intelligence Agency

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const categories = [
  "Architecture", "Building", "Technology", "Security", "Logistics", "Engineering", "ICT",
  "Artificial Intelligence", "Cybersecurity", "Data Analysis", "Computer Science",
  "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Software Development",
  "Building Survey", "Quantity Surveying", "Surveying And Geo Info", "Arms And Ammunition",
  "Novel", "Magazine", "Project Management", "Driving And Maintenance", "Management",
  "Pamphlet/ Hand Book", "Reference", "Periodicals", "Journals/News Papers", "Purchase/Supply",
  "Philosophy", "History", "Catering", "Estate Management", "Audiobooks",
  "Reserve", "Fire And Safety", "Network Administration", "Physical Books"
];

const generateBooks = () => {
  let allBooks = [];
  categories.forEach((category, i) => {
    const cleanCategory = category ? category.replace(/\s+/g, "").toLowerCase() : "misc";
    const bookCount = category === "Audiobooks" ? 8 : 4;

    const bookTitles = [
      "Strategic Foundations", "Principles of Design", "Modern Applications", "Innovative Practices",
      "Tactical Perspectives", "Analytical Frameworks", "Evolution of Methods", "Digital Horizons"
    ];
    const authors = [
      "Dr. A. Sani", "Prof. L. Musa", "Capt. J. Bello", "Engr. K. Adamu",
      "Maj. M. Kabir", "Mrs. F. Zubair", "Dr. R. Adeyemi", "Lt. Cdr. A. Danjuma"
    ];

    for (let j = 1; j <= bookCount; j++) {
      const isPhysical = category === "Physical Books";
      allBooks.push({
        id: `${cleanCategory}-${j}`,
        title: `${category === "Audiobooks" ? "Audio: " : ""}${bookTitles[(j + i) % bookTitles.length]}`,
        category: category,
        snippet: isPhysical ? `This is a physical book. Kindly visit the DOL Library to access it.` : `Insightful content on ${(category || "misc").toLowerCase()}...`,
        file: isPhysical ? null : `/static/files/${cleanCategory}/${cleanCategory}${j}.${category === "Audiobooks" ? "mp3" : "pdf"}`,
        year: 2020 + ((j + i) % 4),
        author: authors[(j + i) % authors.length],
        isPhysical,
        downloads: 0

      });
    }
  });
  return allBooks;
};

const books = generateBooks();

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      onLogin("admin");
    } else {
      onLogin("user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-sky-100 to-white animate-fade-in">
    <img className=" rounded-full w-[5%] mb-5" src="https://media.licdn.com/dms/image/v2/D4E22AQFSSnN-YOoCHA/feedshare-shrink_800/feedshare-shrink_800/0/1710951284639?e=2147483647&v=beta&t=G9ExVYnV-bThZsdIF_8Rg_-Wi7nScbiuLYM8sfgeM7w" alt="driver"/>
      <Card className="w-full max-w-sm p-8 shadow-xl border border-blue-300 rounded-3xl bg-white">
        <CardContent>
          <h2 className="text-3xl font-extrabold mb-5 text-center text-blue-900">📖 DIA DOL E-Library</h2>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-3"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5"
          />
          <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 text-white py-2 text-lg rounded-xl">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const ELibrary = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [filter, setFilter] = useState("");
  const [downloads, setDownloads] = useState(() => JSON.parse(localStorage.getItem("downloads") || "0"));
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem("bookmarks") || "[]"));
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode") || "false"));

  useEffect(() => {
    localStorage.setItem("downloads", JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = (userRole) => {
    setLoggedIn(true);
    setRole(userRole);
  };

  const handleDownload = (file, isPhysical) => {
    if (isPhysical) {
      alert("📚 This is a physical book. Please kindly visit the DOL LIBRARY to access it.");
      return;
    }
    if (role !== "admin" && downloads >= 5) {
      alert("Download limit reached (5 per user). Please contact admin for more access.");
      return;
    }
    setDownloads(downloads + 1);
    window.open(file, "_blank");
  };

  const toggleBookmark = (bookId) => {
    setBookmarks((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const exportBookmarks = () => {
    const data = bookmarks.map((id) => books.find((b) => b.id === id)).filter(Boolean);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookmarks.json";
    a.click();
  };

  if (!loggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-white via-blue-50 to-blue-100 text-black"} p-6 min-h-screen animate-fade-in`}>
    <div className="flex items-center justify-center mb-8">
    <img className=" rounded-full w-[5%]" src="https://media.licdn.com/dms/image/v2/D4E22AQFSSnN-YOoCHA/feedshare-shrink_800/feedshare-shrink_800/0/1710951284639?e=2147483647&v=beta&t=G9ExVYnV-bThZsdIF_8Rg_-Wi7nScbiuLYM8sfgeM7w" alt="driver"/>
      <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow-md tracking-wider">📚 DIA DOL E-Library Catalog</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="🔎 Search by author or year..."
          value={filter}
          onChange={(e) => setFilter(e.target.value.toLowerCase())}
          className="w-full max-w-md px-4 py-3 border border-blue-400 rounded-xl shadow-md text-lg"
        />
        <Button onClick={() => setDarkMode(!darkMode)} className="ml-4 px-4 py-2 rounded-lg border border-gray-400">
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </Button>
      </div>
      

      <div className="flex flex-col gap-y-6">

      <Tabs defaultValue="Engineering" className="flex flex-col gap-20">
        <TabsList className="mb-8 flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-110 text-black font-semibold shadow-md">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent value={category} key={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              {books
                .filter((book) => book.category === category &&
                  (book.author.toLowerCase().includes(filter) || book.year.toString().includes(filter)))
                .map((book) => (
                  <Card key={book.id} className="p-4 border border-blue-200 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105">
                    <CardContent>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">{book.title}</h3>
                      <p className="text-sm text-gray-700 mb-2">{book.snippet}</p>
                      <p className="text-xs text-gray-600">Author: {book.author} | Year: {book.year}</p>
                      <div className="flex justify-between items-center mt-4">
                        <Button
                          onClick={() => handleDownload(book.file, book.isPhysical)}
                          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 text-white text-sm px-4 py-1.5 rounded-lg"
                        >
                          {book.category === "Audiobooks" ? "🎧 Preview" : book.isPhysical ? "🏛 Visit Library" : "📖 Read Book"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => toggleBookmark(book.id)}
                          className="text-sm px-3 py-1 rounded border border-yellow-400 hover:bg-yellow-100 hover:text-yellow-700"
                        >
                          {bookmarks.includes(book.id) ? "★ Saved" : "☆ Save"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      </div>

      <div className="text-center mt-10">
        <Button onClick={exportBookmarks} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-sm">
          Export My Bookmarks
        </Button>
      </div>
    </div>
  );
};

export default ELibrary;
