import { useEffect, useRef, useState } from 'preact/hooks';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function InteractiveMap({ businesses, selectedBusiness, onBusinessSelect }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([40.7128, -74.0060], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 100);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    businesses.forEach(business => {
      const marker = L.marker(business.coordinates);
      
      const popupContent = `
        <div class="p-2" style="min-width: 250px;">
          <h6 class="fw-bold text-dark mb-2">${business.name}</h6>
          <p class="mb-1 small"><strong>Category:</strong> <span class="text-primary">${business.category}</span></p>
          <p class="mb-2 small"><strong>Status:</strong> <span class="badge bg-secondary">${business.status}</span></p>
          <p class="mb-3 small text-muted">${business.description}</p>
          <button onclick="window.selectBusiness(${business.id})" class="btn btn-primary btn-sm w-100">
            <i class="bi bi-eye me-1"></i>View Details
          </button>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      marker.addTo(mapInstanceRef.current);
      markersRef.current.push(marker);

      // Add click event
      marker.on('click', () => {
        onBusinessSelect(business);
      });
    });

    // Expose selectBusiness to window for popup button
    window.selectBusiness = (businessId) => {
      const business = businesses.find(b => b.id === businessId);
      if (business) {
        onBusinessSelect(business);
      }
    };

    // Fit map to show all markers
    if (businesses.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [businesses, onBusinessSelect]);

  useEffect(() => {
    if (!mapInstanceRef.current || !selectedBusiness) return;

    // Find and highlight selected business marker
    markersRef.current.forEach(marker => {
      const markerLatLng = marker.getLatLng();
      if (
        markerLatLng.lat === selectedBusiness.coordinates[0] &&
        markerLatLng.lng === selectedBusiness.coordinates[1]
      ) {
        marker.openPopup();
        mapInstanceRef.current.setView(markerLatLng, 15);
      }
    });
  }, [selectedBusiness]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        setTimeout(() => {
          mapInstanceRef.current.invalidateSize();
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div class="h-100 w-100">
      <div ref={mapRef} class="h-100 w-100"></div>
    </div>
  );
}
