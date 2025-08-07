import { businessCategories, statusOptions } from '../data/mockBusinesses.js';

export function FilterPanel({ filters, onFilterChange }) {
  return (
    <div class="p-3 p-md-4 bg-light border-bottom">
      <h3 class="h6 h-md-5 mb-3 fw-bold text-dark">
        <i class="bi bi-funnel me-2"></i>
        Filter & Search
      </h3>
      
      <div class="mb-3">
        <label class="form-label fw-semibold small">
          <i class="bi bi-search me-1"></i>
          Search by name:
        </label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Enter business name..."
          value={filters.searchTerm}
          onInput={(e) => onFilterChange({ searchTerm: e.target.value })}
        />
      </div>

      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label fw-semibold small">
            <i class="bi bi-tags me-1"></i>
            Category:
          </label>
          <select
            class="form-select form-select-sm"
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
          >
            {businessCategories.map(category => (
              <option key={category} value={category}>
                {category === 'All Categories' ? 'All' : category}
              </option>
            ))}
          </select>
        </div>

        <div class="col-6">
          <label class="form-label fw-semibold small">
            <i class="bi bi-clipboard-check me-1"></i>
            Status:
          </label>
          <select
            class="form-select form-select-sm"
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'All Statuses' ? 'All' : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div class="mb-3">
        <button 
          class="btn btn-outline-secondary btn-sm w-100"
          onClick={() => onFilterChange({ 
            searchTerm: '', 
            category: 'All Categories', 
            status: 'All Statuses' 
          })}
        >
          <i class="bi bi-arrow-clockwise me-2"></i>
          Clear Filters
        </button>
      </div>

      <div class="card bg-white border d-none d-md-block">
        <div class="card-body py-2">
          <div class="row text-center">
            <div class="col-6">
              <div class="h5 fw-bold text-primary mb-0">{filters.totalCount}</div>
              <small class="text-muted text-uppercase fw-semibold">Total</small>
            </div>
            <div class="col-6">
              <div class="h5 fw-bold text-success mb-0">{filters.filteredCount}</div>
              <small class="text-muted text-uppercase fw-semibold">Showing</small>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stats - simplified */}
      <div class="d-md-none text-center">
        <small class="text-muted">
          Showing <strong class="text-success">{filters.filteredCount}</strong> of <strong class="text-primary">{filters.totalCount}</strong> businesses
        </small>
      </div>
    </div>
  );
}
