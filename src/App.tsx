import React, { useState } from "react";
import InputField from "./components/InputField/   InputField";
import DataTable from "./components/DataTable/DataTable";

const App = () => {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
    { header: "Email", accessor: "email" },
    { header: "City", accessor: "city" },
  ];

  const initialData = [
    { name: "Gourav", age: 20, email: "gourav@example.com", city: "Haryana" },
    { name: "Shrijan Sanidhya", age: 19, email: "Shri@example.com", city: "Pune" },
    { name: "Aman", age: 23, email: "aman@example.com", city: "Bangalore" },
    { name: "Kashika", age: 18, email: "Kashika@example.com", city: "Alwar" },
  ];

  const [search, setSearch] = useState("");

  // Filtered data based on search input
  const filteredData = initialData.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>Users Table</h1>

      {/* Input field for search */}
      <div style={{ marginBottom: "1rem", maxWidth: "400px" }}>
        <InputField
          label="Search by Name"
          placeholder="Type a name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default App;
