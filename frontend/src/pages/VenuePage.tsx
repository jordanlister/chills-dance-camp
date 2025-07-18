import { useState, useEffect } from 'react';
import GradientText from '../components/GradientText';
import PublicNavigation from '../components/PublicNavigation';

const VenuePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const studioDetails = [
    {
      title: "HVAC Access",
      description: "Full heating, ventilation, and air conditioning for optimal comfort throughout the venue"
    },
    {
      title: "Central Air Conditioning",
      description: "Ensuring comfort for all guests with professional-grade climate control systems"
    },
    {
      title: "On-Site Parking",
      description: "Easy drive-in access with ample parking spaces and departures with onsite or nearby parking"
    },
    {
      title: "Professional Lighting",
      description: "Customizable LED lighting for dynamic ambiance and premium sound systems for high-quality audio"
    },
    {
      title: "Premium Sound Systems",
      description: "State-of-the-art audio equipment with professional-grade speakers for crystal clear sound"
    },
    {
      title: "Weatherproof Floors",
      description: "Laminated floors that provide the healthiest dance surface for movement and safety"
    }
  ];

  const travelDetails = [
    {
      category: "Getting There",
      details: [
        "Visiting Mihran K. Studios is easy and comfortable with our travel tips:",
        "Closest to LAX (Los Angeles International Airport)",
        "Glendale Bus from Amtrak - 30 minutes by taxi or Uber/Lyft",
        "Hollywood Burbank Airport - Just 8 minutes by taxi or Uber/Lyft",
        "Use metro and buses for budget-friendly options including the Red Line and other street options"
      ]
    },
    {
      category: "Accommodation",
      details: [
        "Places to stay in and around our location:",
        "Hotels in Burbank",
        "10 minute drive to the studio",
        "Affordable accommodation with family-friendly amenities and rooms",
        "5 star hotels",
        "There are also plenty of Airbnb options available at reasonable and economical destinations"
      ]
    }
  ];

  const studioSpecs = [
    {
      name: "Modern Facilities",
      description: "State-of-the-art dance studios with grade-A lighting and sound systems, and weatherproof laminated floors that provide the healthiest dance surface for movement. Climate control ensures optimal comfort."
    },
    {
      name: "Prime Location",
      description: "Located in the heart of Burbank, surrounded by cafes, shops, and parks, perfect for exploring during breaks. The central location offers easy access via multiple transportation options."
    },
    {
      name: "Inspiring Atmosphere",
      description: "With professional-grade equipment and a sleek, modern design, our venue creates an energetic and motivating environment that enhances your dance experience."
    }
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <PublicNavigation />
      
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div className={`w-full max-w-4xl mx-auto px-4 text-center z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <GradientText 
            colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
            animationSpeed={3}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            VENUE
          </GradientText>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              Enhance Your Dance Experience in the Heart of Burbank
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-12">
              Located at Mihran K. Studios in Burbank, California, our venue offers 
              state-of-the-art facilities with modern amenities, prime location access, 
              and an inspiring atmosphere perfect for an unforgettable dance experience.
            </p>
          </div>
        </div>
      </div>

      {/* Location Overview */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <GradientText 
                colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
                animationSpeed={4}
                className="text-4xl font-bold mb-6"
              >
                Mihran K. Studios
              </GradientText>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Located in the heart of Burbank, our venue is surrounded by cafes, shops, and 
                parks, perfect for exploring during breaks. The central location offers easy 
                access via multiple transportation options while providing a professional 
                atmosphere that inspires creativity and growth.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-primary-500/20 rounded-full px-4 py-2 text-sm">
                  Heart of Burbank
                </div>
                <div className="bg-primary-500/20 rounded-full px-4 py-2 text-sm">
                  Easy Access
                </div>
                <div className="bg-primary-500/20 rounded-full px-4 py-2 text-sm">
                  Professional Studio
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-8 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-6 text-primary-400">Venue Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Address:</span>
                  <span className="text-white font-semibold">334 N Victory Blvd</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">City:</span>
                  <span className="text-white font-semibold">Burbank, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Country:</span>
                  <span className="text-white font-semibold">United States</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Schedule:</span>
                  <span className="text-white font-semibold">July 18-20, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Hours:</span>
                  <span className="text-white font-semibold">10:00 am - 9:00 pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Specifications */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={5}
              className="text-4xl font-bold mb-8"
            >
              Why Choose Mihran K. Studios?
            </GradientText>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Our venue combines modern facilities, prime location access, and an inspiring 
              atmosphere to create the perfect environment for dance education and growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {studioSpecs.map((studio, index) => (
              <div
                key={index}
                className="p-8 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 hover:transform hover:-translate-y-2 backdrop-blur-md"
                style={{
                  animation: `slideIn 0.6s ease-out ${0.2 * index}s both`
                }}
              >
                <div className="mb-6">
                  <div className="inline-block p-3 bg-primary-500/20 rounded-full mb-4">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{studio.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{studio.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio Details */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={4}
              className="text-4xl font-bold mb-8"
            >
              Studio Details
            </GradientText>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Our studios feature premium amenities and technical specifications 
              designed to provide the ultimate dance experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studioDetails.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 hover:transform hover:-translate-y-2 backdrop-blur-md"
                style={{
                  animation: `slideIn 0.6s ease-out ${0.15 * index}s both`
                }}
              >
                <div className="mb-6">
                  <div className="inline-block p-4 bg-primary-500/20 rounded-full mb-4">
                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map & Navigation */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={4}
              className="text-4xl font-bold mb-8"
            >
              Find Us
            </GradientText>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Located in the heart of Burbank at Mihran K. Studios. Click the button below to get directions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-6 sm:p-8 backdrop-blur-md">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary-400">Venue Address</h3>
              <div className="space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">Mihran K. Studios</p>
                    <p className="text-gray-300 text-sm sm:text-base">334 N Victory Blvd</p>
                    <p className="text-gray-300 text-sm sm:text-base">Burbank, CA 91502</p>
                    <p className="text-gray-300 text-sm sm:text-base">United States</p>
                  </div>
                </div>
              </div>
              
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=334+N+Victory+Blvd,+Burbank,+CA+91502"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full font-medium text-white hover:transform hover:scale-105 transition-all duration-300 text-sm sm:text-base min-h-[48px]"
                style={{ boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)' }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </a>
            </div>
            
            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-2 backdrop-blur-md">
              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.1234567890!2d-118.3097!3d34.1808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z334+N+Victory+Blvd%2C+Burbank%2C+CA+91502!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Travel & Accommodation */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={4}
              className="text-4xl font-bold mb-8"
            >
              Travel & Accommodation
            </GradientText>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {travelDetails.map((detail, index) => (
              <div
                key={index}
                className="p-8 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 backdrop-blur-md"
                style={{
                  animation: `slideIn 0.6s ease-out ${0.2 * index}s both`
                }}
              >
                <h3 className="text-xl font-bold mb-6 text-primary-400">{detail.category}</h3>
                <ul className="space-y-3">
                  {detail.details.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <svg className="w-4 h-4 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety & Accessibility */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-8 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-6 text-primary-400">Safety & Security</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-300">24/7 security monitoring</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-300">First aid station on-site</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-300">Emergency evacuation procedures</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-300">Professional injury prevention protocols</span>
                </li>
              </ul>
            </div>
            <div>
              <GradientText 
                colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
                animationSpeed={4}
                className="text-4xl font-bold mb-6"
              >
                Accessibility & Comfort
              </GradientText>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Our venue is fully accessible and designed with comfort in mind. We believe 
                that everyone should have the opportunity to experience the joy of dance, 
                regardless of physical abilities or limitations.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">ADA compliant facilities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Elevator access to all floors</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Comfortable seating areas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Getting There */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-3xl border border-primary-400/30 p-12 backdrop-blur-md">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={3}
              className="text-3xl font-bold mb-6"
            >
              Join Us at Mihran K. Studios
            </GradientText>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Join us at Mihran K. Studios and elevate your dance experience in an inspiring 
              and supportive environment designed for creativity and growth.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-primary-400 font-semibold mb-3">Professional Environment</h4>
                <p className="text-gray-400 text-sm">
                  State-of-the-art facilities with weatherproof floors, premium sound systems, 
                  and professional lighting for the ultimate dance experience.
                </p>
              </div>
              <div>
                <h4 className="text-primary-400 font-semibold mb-3">Convenient Location</h4>
                <p className="text-gray-400 text-sm">
                  Located in the heart of Burbank with easy access from major airports, 
                  public transportation, and ample parking for all attendees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenuePage;