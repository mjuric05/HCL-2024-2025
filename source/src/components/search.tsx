import { useState, ChangeEvent, FormEvent } from "react";

const Search = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [query, setQuery] = useState(''); const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }; const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
    }; return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search..."
            />
            <button type="submit">Search</button>
        </form>
    );
}; export default Search;