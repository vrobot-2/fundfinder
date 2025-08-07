import { useState, useEffect, useRef } from 'preact/hooks';

export function BusinessCard({ business, isSelected, onSelect, onStatusChange }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      // Add a slight delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        // Scroll to the selected business card with smooth behavior
        cardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
        
        // Add a temporary highlight effect
        cardRef.current.style.transition = 'box-shadow 0.3s ease';
        cardRef.current.style.boxShadow = '0 0 20px rgba(13, 110, 253, 0.3)';
        
        // Remove the highlight after 2 seconds
        setTimeout(() => {
          cardRef.current.style.boxShadow = '';
        }, 2000);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [isSelected]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Contacted': return 'status-contacted';
      case 'Interested': return 'status-interested';
      case 'Donated': return 'status-donated';
      case 'Declined': return 'status-declined';
      default: return 'status-not-contacted';
    }
  };

  return (
    <div 
      ref={cardRef}
      class={`business-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(business)}
    >
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="mb-0 fw-bold">{business.name}</h5>
        <span class={`status-badge ${getStatusClass(business.status)}`}>
          {business.status}
        </span>
      </div>
      
      <div class="text-primary fw-semibold small text-uppercase mb-2">
        <i class="bi bi-building me-1"></i>
        {business.category}
      </div>
      
      <p class="text-muted mb-3 text-truncate-2">{business.description}</p>
      
      <div class="small text-muted mb-3">
        <div class="mb-1">
          <i class="bi bi-geo-alt me-2"></i>
          <strong>Address:</strong> {business.address}
        </div>
        <div class="mb-1">
          <i class="bi bi-telephone me-2"></i>
          <strong>Phone:</strong> {business.phone}
        </div>
        <div class="mb-1">
          <i class="bi bi-envelope me-2"></i>
          <strong>Email:</strong> 
          <a href={`mailto:${business.email}`} class="text-decoration-none ms-1">
            {business.email}
          </a>
        </div>
          {business.website && (
            <div class="mb-1">
              <i class="bi bi-globe me-2"></i>
              <strong>Website:</strong> 
              <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" class="text-decoration-none ms-1">
                {business.website}
              </a>
            </div>
          )}
          <div class="mb-1">
            <i class="bi bi-currency-dollar me-2"></i>
            <strong>Estimated Donation:</strong> {business.estimatedDonationRange}
          </div>
          <div class="mb-1">
            <i class="bi bi-gift me-2"></i>
            <strong>Past Donations:</strong> {business.pastDonations}
          </div>
          <div class="mb-1">
            <i class="bi bi-clock me-2"></i>
            <strong>Best Contact Time:</strong> {business.bestContactTime}
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center pt-2 border-top">
          <select 
            class="form-select form-select-sm"
            style="max-width: 150px; font-size: 0.85rem;"
            value={business.status}
            onChange={(e) => onStatusChange(business.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="Not Contacted">Not Contacted</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="Donated">Donated</option>
            <option value="Declined">Declined</option>
          </select>
          
          <div class="btn-group btn-group-sm d-none d-md-flex" role="group">
            <button 
              class="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`mailto:${business.email}?subject=Fundraising Partnership Opportunity`);
              }}
            >
              <i class="bi bi-envelope me-1"></i>
              Email
            </button>
            <button 
              class="btn btn-success"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${business.phone}`);
              }}
            >
              <i class="bi bi-telephone me-1"></i>
              Call
            </button>
          </div>
          
          {/* Mobile action buttons - stacked */}
          <div class="d-md-none d-flex flex-column gap-2" style="width: 120px;">
            <button 
              class="btn btn-primary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`mailto:${business.email}?subject=Fundraising Partnership Opportunity`);
              }}
            >
              <i class="bi bi-envelope me-1"></i>
              Email
            </button>
            <button 
              class="btn btn-success btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${business.phone}`);
              }}
            >
              <i class="bi bi-telephone me-1"></i>
              Call
            </button>
          </div>
        </div>
    </div>
  );
}

export function BusinessList({ businesses, selectedBusiness, onBusinessSelect, onStatusChange }) {
  return (
    <div>
      <div class="mb-3 px-3 py-2 bg-light border-bottom">
        <h2 class="h6 mb-1 fw-bold">
          <i class="bi bi-people me-2"></i>
          Potential Donors ({businesses.length})
        </h2>
        <p class="text-muted small mb-0">Click on a business to view location on map</p>
      </div>
      
      <div>
        {businesses.map(business => (
          <BusinessCard
            key={business.id}
            business={business}
            isSelected={selectedBusiness?.id === business.id}
            onSelect={onBusinessSelect}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
      
      {businesses.length === 0 && (
        <div class="text-center py-5">
          <i class="bi bi-search display-1 text-muted"></i>
          <p class="text-muted mt-3 fs-5">No businesses found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
