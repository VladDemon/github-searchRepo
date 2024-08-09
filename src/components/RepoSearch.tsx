import  IconButton  from "@mui/material/IconButton";

import  TextField from "@mui/material/TextField";

export const RepoSearch = ({ setSearchQuery, handleSearch }) => {
    const onFormSubmit = (e) => {
      e.preventDefault();
      handleSearch();
    };
  
    return (
      <form onSubmit={onFormSubmit}>
        <TextField
          id="search"
          className="search"
          onInput={(e) => setSearchQuery(e.target.value)}
          label="Введите название репозитория"
          variant="outlined"
          placeholder="Поиск..."
          size="small"
        />
        <IconButton type="submit" aria-label="search">
          {/* <SearchIcon style={{ fill: "blue" }} /> */}
          Поиск
        </IconButton>
      </form>
    );
  };
  
