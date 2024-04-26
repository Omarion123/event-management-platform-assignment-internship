import React, { useState } from "react";
import { data } from "../../dummy/data";
import Table from "../../components/Table";
import NewCategoryModal from "../../components/NewCategory";

function Categories() {
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const handleNewCategoryModal = () => {
    setIsNewCategoryModalOpen(true); // Corrected function call
  };
  // Define the table headers
  const tableHeaders = [
    { label: "Icon", className: "border-e border-black h-full dark:border-white/10 w-16 font-semibold text-blue-600" },
    { label: "Name", className: "border-e border-black h-full dark:border-white/10 font-semibold text-blue-600" },
    { label: "Description", className: "h-full font-semibold text-blue-600" },
    { label: "Action", className: "font-semibold text-blue-600 h-16 flex justify-end items-center pr-14" }
  ];
  return (
    <div className="flex flex-col bg-secondaryLight mt-4">
      <button
        className="bg-pink-400 w-48 h-14 rounded-md text-secondary"
        onClick={handleNewCategoryModal}
      >
        New category
      </button>

      <Table data={data} headers={tableHeaders} />
      <NewCategoryModal
        isOpen={isNewCategoryModalOpen} // Corrected prop name
        onClose={() => setIsNewCategoryModalOpen(false)} // Close function
        // onCreate={handleCreateCategory} // New prop for handling category creation
      />
    </div>
  );
}

export default Categories;
