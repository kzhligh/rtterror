import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, IconButton } from '@mui/material';
import { useState } from 'react';
import { Close } from '@mui/icons-material';


export default function SearchInput(props) {
    const { handleSearch } = props;
    const [searchInput, setSearchInput] = useState('');
    const searchHandler = (val) => {
        setSearchInput(val);
        handleSearch(val);
    };

    return (
        <Box
            component="form"
            border={2}
            borderColor="primary.main"
            sx={{ borderColor: '#A7A7A7', border: 1.5, borderRadius: 1, display: 'flex', alignItems: 'center', maxWidth: '65%' }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="search" disabled={true}>
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                id="filled-search"
                placeholder="Search"
                value={searchInput}
                onChange={(event) => searchHandler(event.target.value)}
            />
            <IconButton
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={() => searchHandler('')}
            >
                <Close />
            </IconButton>
        </Box>
    );
}
