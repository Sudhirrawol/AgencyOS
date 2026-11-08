import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "./services/projectApi";
import "./App.css";
import Createproject from "./components/CreateProject";

const limit = 5;
function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError } = useGetProjectsQuery(
    {
      search: debounceSearch,
      status,
      sort,
      page,
      limit,
    },
    {
      skip: !debounceSearch.trim(),
    },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <h1>Project Management</h1>
      <Createproject />
      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All Status</option>
        <option value="planned">Planned</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setPage(1);
        }}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
      </select>

      {isLoading && <p>Loading projects...</p>}
      {isFetching && !isLoading && <p>Updating results...</p>}
      {isError && <p>Failed to load projects.</p>}
      {!isLoading && !isError && (
        <>
          {data?.projects.length === 0 && <p>No Projects found.</p>}
          {data?.projects.map((project) => (
            <div key={project._id}>
              <h3>{project.name}</h3>
              <p>Status : {project.status}</p>
            </div>
          ))}
          <div>
            <button
              disabled={page === 1 || isFetching}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span>
              Page {page} of {data?.totalPages || 1}
            </span>
            <button
              disabled={isFetching || !data || page >= data.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
