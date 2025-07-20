//
        //<h1 className="text-3xl font-extrabold text-gray-800">

// E-Library System for Directorate of Logistics (DOL), Defence Intelligence Agency

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const books = [
  {
    id: 1,
    title: "Fundamentals of Civil Engineering",
    category: "Engineering",
    snippet: "An overview of civil infrastructure design and project planning...",
    file: "/ebooks/civil_engineering.pdf",
  },
  {
    id: 2,
    title: "Project Management in Defence Infrastructure",
    category: "Projects",
    snippet: "A detailed guide on project lifecycle management for military facilities...",
    file: "/ebooks/defence_projects.pdf",
  },
  {
    id: 3,
    title: "Modern Military Buildings & Architecture",
    category: "Building",
    snippet: "Insights into resilient structures, smart designs and logistics efficiency...",
    file: "/ebooks/military_architecture.pdf",
  },
  {
    id: 4,
    title: "Military Logistics and Supply Chain",
    category: "Logistics",
    snippet: "Comprehensive strategies and practices in defence logistics operations...",
    file: "/ebooks/military_logistics.pdf",
  },
  {
    id: 5,
    title: "Cybersecurity Essentials for Defence",
    category: "Technology",
    snippet: "Fundamentals of cyber threats and security protocols in military systems...",
    file: "/ebooks/cybersecurity_defence.pdf",
  },
  {
    id: 6,
    title: "Environmental Sustainability in Defence Projects",
    category: "Environment",
    snippet: "Guidelines for eco-friendly and sustainable infrastructure in defence...",
    file: "/ebooks/environmental_sustainability.pdf",
  },
  {
    id: 7,
    title: "Strategic Military Architecture & Planning",
    category: "Architecture",
    snippet: "Principles and design strategies in military architectural planning...",
    file: "/ebooks/military_architecture_planning.pdf",
  },
  {
    id: 8,
    title: "Warehouse Management for Defence Logistics",
    category: "Logistics",
    snippet: "Effective inventory control and warehouse design for operational efficiency...",
    file: "/ebooks/warehouse_logistics.pdf",
  }
];

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-blue-100">
    <img className=" rounded-full w-[5%] mb-10" src="https://media.licdn.com/dms/image/v2/D4E22AQFSSnN-YOoCHA/feedshare-shrink_800/feedshare-shrink_800/0/1710951284639?e=2147483647&v=beta&t=G9ExVYnV-bThZsdIF_8Rg_-Wi7nScbiuLYM8sfgeM7w" alt="driver"/>
      <Card className="w-full max-w-sm p-6 shadow-md border border-blue-200">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">DIA DOL E-Library Login</h2>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleLogin} className="w-full bg-blue-700 hover:bg-blue-800 text-white">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

const ELibrary = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  //const [selectedBook, setSelectedBook] = useState(null);

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  const categories = ["Engineering", "Building", "Projects", "Logistics", "Technology", "Environment", "Architecture"];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
    <header className="flex items-center mb-10 gap-8  ">

    <img className=" rounded-full w-[5%]" src="https://media.licdn.com/dms/image/v2/D4E22AQFSSnN-YOoCHA/feedshare-shrink_800/feedshare-shrink_800/0/1710951284639?e=2147483647&v=beta&t=G9ExVYnV-bThZsdIF_8Rg_-Wi7nScbiuLYM8sfgeM7w" alt="driver"/>
    <h1 className="text-3xl font-extrabold  text-blue-800 underline text-center">DIA DOL E-Library Catalog</h1>



    
    
    </header>
  
      
      <Tabs defaultValue="Engineering">
        <TabsList className="mb-4 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="px-4 py-2 rounded-md bg-blue-200 hover:bg-blue-300 text-blue-900">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent value={category} key={category}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {books.filter((book) => book.category === category).map((book) => (
                <Card key={book.id} className="p-4 border border-blue-100 shadow-md">
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2 text-blue-800">{book.title}</h3>
                    <p className="text-sm mb-2 text-gray-700">{book.snippet}</p>
                    <a
                      href={book.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                      Access Full Book
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ELibrary;