

import styles from './SearchBar.module.css'
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface SearchBarProps{
    onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [query, setQuery] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (query.trim() === '') {
            toast.error("Please enter text to search images!");
            return;
        }
        onSubmit(query);
    };
  


    return (
        <header className={styles.header}>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Search</button>
            </form>
        </header>
    );
};

export default SearchBar;
