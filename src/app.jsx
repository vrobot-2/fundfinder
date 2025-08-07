import { useState, useEffect } from 'preact/hooks';
import { InteractiveMap } from './components/InteractiveMap';
import { SimpleMap } from './components/SimpleMap';
import { BusinessList } from './components/BusinessList';
import { FilterPanel } from './components/FilterPanel';
import { mockBusinesses as businesses } from './data/mockBusinesses';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'All Categories',
    status: 'All Statuses'
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBusinessSelect = (business) => {
    setSelectedBusiness(business);
    
    // Small delay to ensure the business list has updated before scrolling
    setTimeout(() => {
      // The scroll behavior is handled by the BusinessCard component's useEffect
    }, 100);
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    let filtered = businesses;
    
    if (updatedFilters.searchTerm) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(updatedFilters.searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(updatedFilters.searchTerm.toLowerCase()) ||
        business.address.toLowerCase().includes(updatedFilters.searchTerm.toLowerCase())
      );
    }
    
    if (updatedFilters.category !== 'All Categories') {
      filtered = filtered.filter(business => business.category === updatedFilters.category);
    }
    
    if (updatedFilters.status !== 'All Statuses') {
      filtered = filtered.filter(business => business.status === updatedFilters.status);
    }
    
    setFilteredBusinesses(filtered);
  };

  const handleStatusChange = (businessId, newStatus) => {
    // Update the business status in the businesses array
    const updatedBusinesses = businesses.map(business =>
      business.id === businessId ? { ...business, status: newStatus } : business
    );
    
    // Update filtered businesses to reflect the change
    setFilteredBusinesses(prev => 
      prev.map(business =>
        business.id === businessId ? { ...business, status: newStatus } : business
      )
    );
  };

  return (
    <div id="app">
      {/* Header */}
      <header className="app-header">
        <div className="container-fluid px-4">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h3 mb-0">
                <i className="bi bi-geo-alt me-2"></i>
                Fund Finder
              </h1>
              <p className="mb-0 small opacity-75">Discover local business partnerships</p>
            </div>
            <div className="col-auto">
              <span className="badge bg-white bg-opacity-20 text-black border border-white border-opacity-25">
                <i className="bi bi-building me-1"></i>
                {filteredBusinesses.length} businesses
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Sidebar */}
        <aside className="app-sidebar">
          {/* Filter Panel */}
          <div className="filter-panel">
            <FilterPanel
              filters={{
                ...filters,
                totalCount: businesses.length,
                filteredCount: filteredBusinesses.length
              }}
              onFilterChange={handleFilterChange}
              businesses={businesses}
            />
          </div>

          {/* Business List */}
          <div className="business-list-container">
            <BusinessList
              businesses={filteredBusinesses}
              selectedBusiness={selectedBusiness}
              onBusinessSelect={handleBusinessSelect}
              onStatusChange={handleStatusChange}
            />
          </div>
        </aside>

        {/* Map Section */}
        <div className="map-section">
          <div className="map-container">
            {isMobile ? (
              <SimpleMap
                businesses={filteredBusinesses}
                selectedBusiness={selectedBusiness}
                onBusinessSelect={handleBusinessSelect}
              />
            ) : (
              <InteractiveMap
                businesses={filteredBusinesses}
                selectedBusiness={selectedBusiness}
                onBusinessSelect={handleBusinessSelect}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container-fluid">
          <small>© 2024 Fund Finder - Helping connect fundraisers with local businesses</small>
        </div>
      </footer>
    </div>
  );
}
