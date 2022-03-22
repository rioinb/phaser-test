import { useState, createContext, useContext } from "react";

const CategoryContext = createContext();

export function useCategoryContext() {
    return useContext(CategoryContext);
}

export function CategoryProvider({children}) {
    const [selectedCategory, setSelectedCategory] = useState("");

    const value = {
        selectedCategory,
        setSelectedCategory
    };

    return (
        <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
    );
}
