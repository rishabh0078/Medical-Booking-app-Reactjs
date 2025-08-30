import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";


const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(query.trim());
    // You can add additional search logic here
    console.log("Searching for:", { query: query.trim(), location });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);
  const {
    data: approvedDoctors,
    loading: approvedLoading,
    error: approvedError,
  } = useFetchData(`${BASE_URL}/doctors?isApproved=approved`);

  const LOCATIONS = [
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
  ];

  // Filter locations based on search input
  const filteredLocations = LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          const city = data.city || data.locality || data.principalSubdivision;
          if (city) {
            setLocation(city);
            setLocationSearch("");
            setShowLocations(false);
          }
        } catch (error) {
          console.error('Error getting location:', error);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  }
};

React.useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !locationRef.current.contains(event.target)
    ) {
      setShowLocations(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape' && showLocations) {
      setShowLocations(false);
    }
  }

  function updateDropdownPosition() {
    if (dropdownRef.current && locationRef.current) {
      const rect = locationRef.current.getBoundingClientRect();
      dropdownRef.current.style.top = `${rect.bottom + 8}px`;
      dropdownRef.current.style.left = `${Math.max(16, rect.left)}px`;
    }
  }

  if (showLocations) {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", updateDropdownPosition); // Add this
    window.addEventListener("resize", updateDropdownPosition); // Add this
  }
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("scroll", updateDropdownPosition); // Add this
    window.removeEventListener("resize", updateDropdownPosition); // Add this
  };
}, [showLocations]);


  return (
    <>
      <section className="relative py-12 md:py-24 px-4 bg-gradient-to-r from-white to-orange-100 overflow-hidden">
        {/* Decorative SVG Blob */}
        <svg
          className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 opacity-20 -z-10"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="200" fill="#7DD3FC" />
        </svg>

        <div className="max-w-5xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 drop-shadow-sm">
              Your home for health
            </h1>
            <div className="text-lg md:text-2xl font-semibold text-blue-700 text-center pl-50 md:mb-8">
              Find and Book
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row bg-white/95 border border-blue-100 rounded-xl shadow-xl backdrop-blur-sm overflow-visible relative">
              {/* Location Input */}
              <div
                className="relative flex-1 flex items-center cursor-pointer border-b sm:border-b-0 sm:border-r border-blue-100"
                ref={locationRef}
                onClick={() => setShowLocations(true)}
              >
                <span className="absolute left-4 text-blue-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21c4.97-4.17 8-8.06 8-11.5A8 8 0 1 0 4 9.5C4 12.94 7.03 16.83 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={location || locationSearch}
                  onChange={(e) => {
                    const value = e.target.value;
                    setLocationSearch(value);
                    setLocation("");
                    if (value && !showLocations) {
                      setShowLocations(true);
                    }
                  }}
                  onFocus={() => {
                    if (!location) {
                      setShowLocations(true);
                    }
                  }}
                  placeholder="Search location"
                  aria-label="Search location"
                  className={`w-full pl-12 pr-12 py-4 sm:py-3 text-base bg-transparent outline-none ${
                    location ? "text-blue-700 font-medium" : "text-gray-600"
                  }`}
                  autoComplete="off"
                />
                {/* Clear button or Chevron */}
                {location ? (
                  <span
                    className="absolute right-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation("");
                      setLocationSearch("");
                      setShowLocations(false);
                    }}
                    tabIndex={-1}
                    title="Clear location"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                ) : (
                  <span
                    className="absolute right-4 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!showLocations) {
                        setLocationSearch("");
                      }
                      setShowLocations((prev) => !prev);
                    }}
                    tabIndex={-1}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showLocations ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                )}
              </div>

              {/* Keyword Input */}
              <div className="relative flex-1 flex items-center">
                <span className="absolute left-4 text-blue-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-3.8-3.8" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search doctors, clinics, hospitals, etc."
                  aria-label="Search doctors"
                  className="w-full pl-12 pr-4 py-4 sm:py-3 text-base bg-transparent outline-none"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 transition text-white font-bold px-6 py-4 sm:py-3 rounded-b-xl sm:rounded-b-none sm:rounded-r-xl w-full sm:w-auto"
              >
                Search
              </button>
            </div>

            {/* Locations Dropdown Portal */}
            {showLocations &&
              createPortal(
                <div
                  ref={dropdownRef}
                  className="fixed bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-96 overflow-hidden"
                  style={{
                    
                    minWidth: "280px",
                    maxWidth: "90vw",
                    top: locationRef.current
                      ? locationRef.current.getBoundingClientRect().bottom + 8
                      : "auto",
                    left: locationRef.current
                      ? Math.max(
                          16,
                          locationRef.current.getBoundingClientRect().left
                        )
                      : "auto",
                  }}
                >
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Select your location
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose your city to find doctors near you
                    </p>
                  </div>

                  {/* Current Location */}
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center px-3 py-2.5 rounded-md hover:bg-gray-50 cursor-pointer transition-colors group">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 group-hover:text-green-700 transition-colors text-sm truncate"
                          onClick={handleCurrentLocation}>
                          Use my current location
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          Detect your location automatically
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Popular Cities */}
                  <div className="p-3 overflow-y-auto max-h-64">
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        Popular Cities
                      </h4>
                      <div className="grid grid-cols-1 gap-1">
                        {filteredLocations.length > 0 ? (
                          filteredLocations.map((loc) => (
                            <div
                              key={loc}
                              className="flex items-center px-3 py-2.5 rounded-md hover:bg-blue-50 cursor-pointer transition-colors group"
                              onClick={() => {
                                setLocation(loc);
                                setLocationSearch("");
                                setShowLocations(false);
                              }}
                            >
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                                <svg
                                  className="w-3 h-3 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 21c4.97-4.17 8-8.06 8-11.5A8 8 0 1 0 4 9.5C4 12.94 7.03 16.83 12 21z" />
                                  <circle cx="12" cy="9.5" r="2.5" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors text-sm truncate">
                                  {loc}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                  Find doctors in {loc}
                                </div>
                              </div>
                              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg
                                  className="w-4 h-4 text-blue-500"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-4 text-center text-gray-500">
                            <div className="text-sm">No cities found</div>
                            <div className="text-xs mt-1">
                              Try a different search term
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>,
                document.body
              )}
          </form>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-blue-700 font-medium">Popular searches:</span>
            <a
              href="#"
              className="bg-blue-100 text-teal-700 font-semibold rounded px-3 py-1 hover:bg-teal-200 transition"
            >
              Dermatologist
            </a>
            <a
              href="#"
              className="bg-blue-100 text-teal-700 font-semibold rounded px-3 py-1 hover:bg-teal-200 transition"
            >
              Pediatrician
            </a>
            <a
              href="#"
              className="bg-blue-100 text-teal-700 font-semibold rounded px-3 py-1 hover:bg-teal-200 transition"
            >
              Gynecologist
            </a>
          </div>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section className="py-8 md:py-16">
        <div className="container">
          {loading && <Loading />}
          {error && <Error errMessage={error} />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {(() => {
                // Combine all doctors
                const allDoctors = [
                  
                  ...(approvedDoctors || []),
                ];

                // Filter by search query and location
                const filteredDoctors = allDoctors.filter((doctor) => {
                  const matchesQuery =
                    !debounceQuery ||
                    doctor.name
                      ?.toLowerCase()
                      .includes(debounceQuery.toLowerCase()) ||
                    doctor.specialization
                      ?.toLowerCase()
                      .includes(debounceQuery.toLowerCase());

                  const matchesLocation =
                    !location ||
                    doctor.location
                      ?.toLowerCase()
                      .includes(location.toLowerCase()) ||
                    doctor.city?.toLowerCase().includes(location.toLowerCase());

                  return matchesQuery && matchesLocation;
                });

                return filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ));
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center mb-8 md:mb-12">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
