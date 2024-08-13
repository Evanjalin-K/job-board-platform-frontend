const Search = ({ setSearchTerm }) => {
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter keywords (e.g., job title, company)"
          onChange={handleSearch}
        />
        <button className="btn btn-primary">Search</button>
      </div>
    );
  };
  
  export default Search;
  