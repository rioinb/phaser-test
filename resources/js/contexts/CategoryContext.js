import { useState, createContext, useContext } from "react";

const CategoryContext = createContext();

export function useCategoryContext() {
    return useContext(CategoryContext);
}

export function CategoryProvider({children}) {
    const [category, setCategory] = useState("");

    const value = {
        category,
        setCategory
    };

    return (
        <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
    );
}
