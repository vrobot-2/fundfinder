export function SimpleMap({ businesses, selectedBusiness, onBusinessSelect }) {
  return (
    <div class="h-100 d-flex flex-column bg-white">
      <div class="p-2 p-md-3 border-bottom bg-light">
        <h3 class="h6 h-md-5 mb-1 text-dark fw-bold">
          <i class="bi bi-map me-2"></i>
          Business Locations
        </h3>
        <p class="text-muted small mb-0 d-none d-md-block">Interactive map showing {businesses.length} potential donors</p>
        <p class="text-muted small mb-0 d-md-none">{businesses.length} businesses</p>
      </div>
      
      {/* Static Map Placeholder for Mobile */}
      <div class="flex-grow-1 d-flex align-items-center justify-content-center bg-light" style="min-height: 300px;">
        <div class="text-center p-4">
          <i class="bi bi-geo-alt display-1 text-primary mb-3"></i>
          <h5 class="text-dark mb-2">Business Locations</h5>
          <p class="text-muted small mb-3">
            View business locations below or use the contact information to reach out directly.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <span class="badge bg-primary">{businesses.length} Total</span>
            <span class="badge bg-success">{businesses.filter(b => b.status === 'Donated').length} Donated</span>
            <span class="badge bg-warning text-dark">{businesses.filter(b => b.status === 'Contacted').length} Contacted</span>
          </div>
        </div>
      </div>
      
      {/* Business Markers List */}
      <div class="border-top overflow-auto" style="max-height: 250px;">
        <div class="p-2 p-md-3 bg-light border-bottom">
          <h4 class="h6 mb-0 fw-bold text-dark">
            <i class="bi bi-list-ul me-2"></i>
            Quick Access
          </h4>
        </div>
        <div class="p-2">
          {businesses.slice(0, 6).map((business, index) => (
            <div 
              key={business.id}
              class={`d-flex align-items-center p-2 rounded cursor-pointer mb-2 ${selectedBusiness?.id === business.id ? 'bg-primary bg-opacity-10 border border-primary' : 'hover-bg-light'} border`}
              onClick={() => onBusinessSelect(business)}
              style="cursor: pointer;"
            >
              <div class="me-2 fs-6">
                {business.category === 'Restaurant' || business.category === 'Restaurant/Cafe' ? '🍽️' : 
                 business.category === 'Technology' ? '💻' :
                 business.category === 'Healthcare' ? '🏥' :
                 business.category === 'Retail' ? '🏪' :
                 business.category === 'Automotive' ? '�' : '🏢'}
              </div>
              <div class="flex-grow-1">
                <div class="fw-semibold text-dark small">{business.name}</div>
                <div class="text-muted small">{business.address}</div>
                <div class="d-flex align-items-center gap-2 mt-1">
                  <span class={`badge ${
                    business.status === 'Donated' ? 'bg-success' :
                    business.status === 'Contacted' ? 'bg-warning text-dark' :
                    business.status === 'Interested' ? 'bg-info text-dark' :
                    business.status === 'Declined' ? 'bg-danger' : 'bg-secondary'
                  }`} style="font-size: 0.7rem;">
                    {business.status}
                  </span>
                  <small class="text-primary fw-semibold">{business.category}</small>
                </div>
              </div>
              <div class="ms-2">
                <i class="bi bi-chevron-right text-muted"></i>
              </div>
            </div>
          ))}
          {businesses.length > 6 && (
            <div class="text-center p-2">
              <small class="text-muted">
                + {businesses.length - 6} more businesses in the list below
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
