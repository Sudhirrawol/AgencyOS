import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "./services/projectApi";
import Createproject from "./components/CreateProject";

const limit = 5;

function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError, refetch } = useGetProjectsQuery(
    {
      search: debounceSearch,
      status,
      sort,
      page,
      limit,
    },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const projects = data?.projects ?? [];
  const totalPages = Math.max(1, data?.totalPages ?? 1);

  return (
    <main className="ao-page">
      <header className="ao-page-header">
        <div>
          <h1>Project Management</h1>
          <p className="ao-subtitle">
            Manage projects, track progress and organize work
          </p>
        </div>
      </header>

      <Createproject />

      <section className="ao-card">
        <div className="ao-page-header">
          <h2>All Projects</h2>
        </div>

        <div className="ao-project-filters">
          <label className="ao-field">
            <span className="ao-label">Search Projects</span>
            <input
              className="ao-input"
              type="search"
              placeholder="Search by project name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </label>

          <label className="ao-field">
            <span className="ao-label">Status</span>
            <select
              className="ao-input"
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
          </label>

          <label className="ao-field">
            <span className="ao-label">Sort By</span>
            <select
              className="ao-input"
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
          </label>
        </div>

        {isLoading ? (
          <p className="ao-empty">Loading projects...</p>
        ) : isError ? (
          <div className="ao-empty">
            <p className="ao-error">Failed to load projects.</p>
            <button
              className="ao-button"
              type="button"
              onClick={() => refetch()}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {isFetching && (
              <p className="ao-subtitle" role="status">
                Updating results...
              </p>
            )}

            {projects.length === 0 ? (
              <p className="ao-empty">No projects found.</p>
            ) : (
              <div className="ao-table-wrap">
                <table className="ao-table">
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project._id}>
                        <td>{project.name}</td>
                        <td>
                          <span
                            className={`ao-status ao-status-${project.status}`}
                          >
                            {project.status.replace("-", " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="ao-pagination">
              <button
                className="ao-button ao-button-outline"
                type="button"
                disabled={page === 1 || isFetching}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </button>

              <span className="ao-subtitle">
                Page {page} of {totalPages}
              </span>

              <button
                className="ao-button ao-button-outline"
                type="button"
                disabled={isFetching || !data || page >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
