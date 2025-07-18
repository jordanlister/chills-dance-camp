import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GradientText from '../components/GradientText';
import PublicNavigation from '../components/PublicNavigation';
import ChillsLogo from '../components/ChillsLogo';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import AutoScrollCards from '../components/AutoScrollCards';
import heroImage from '../assets/IMG_2986_PNG.png';
import vampLogo from '../assets/Red_VAMP.png';

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const instructors = [
    {
      name: 'Kiira Harper',
      specialty: 'Heels',
      bio: 'Professional heels instructor bringing precision and style to every movement.',
      image: ''
    },
    {
      name: 'Marissa Heart',
      specialty: 'Heartbreak Heels',
      bio: 'Industry-leading choreographer with 700K+ followers. Creator of "Heartbreak Heels" brand, worked with Kanye West, Justin Bieber, Lady Gaga.',
      image: ''
    },
    {
      name: 'Deanna Leggett',
      specialty: 'Hip-Hop',
      bio: 'Dynamic hip-hop choreographer with high-energy routines and infectious stage presence.',
      image: ''
    },
    {
      name: 'Nicole Kirkland',
      specialty: 'Street Heels',
      bio: 'Street-style dance expert combining urban movement with heels technique.',
      image: ''
    },
    {
      name: 'Polina Glen',
      specialty: 'Vogue Femme',
      bio: 'Vogue ballroom specialist bringing authentic ballroom culture and fierce femininity.',
      image: ''
    },
    {
      name: 'Adison Briana',
      specialty: 'Floorplay',
      bio: 'Floorwork specialist teaching sensual movement and floor technique mastery.',
      image: ''
    },
    {
      name: 'Nika Chill',
      specialty: 'Twerk',
      bio: 'Camp founder offering 6 weekly twerk classes in LA. Leads 3 transformative days of feminine energy, movement, and connection.',
      image: ''
    },
    {
      name: 'Skyler Hostetler',
      specialty: 'Heels Contemporary',
      bio: 'Contemporary heels fusion artist blending lyrical movement with heels technique.',
      image: ''
    },
    {
      name: 'Brinn Nicole',
      specialty: 'Heels',
      bio: 'Stage confidence expert helping dancers find their inner performer and command the stage.',
      image: ''
    },
    {
      name: 'Venetia Zipporah',
      specialty: 'VibeZ',
      bio: 'High-energy choreographer bringing creative movement and infectious positive energy to every class.',
      image: ''
    },
    {
      name: 'Taisha Monique',
      specialty: 'Divine Femme',
      bio: 'Divine Femme specialist with 10+ years of experience empowering women through dance and feminine expression.',
      image: ''
    },
    {
      name: 'Hector Kramer',
      specialty: 'Heels Feels',
      bio: 'Winner of contrast! Bringing unique style and emotional connection to heels movement.',
      image: ''
    }
  ];

  const features = [
    {
      icon: '',
      title: '12 Global Instructors',
      description: 'Learn from world-renowned dance professionals'
    },
    {
      icon: '',
      title: 'Real Talks with Industry Voices',
      description: 'Gain insights from successful dancers and choreographers'
    },
    {
      icon: '',
      title: 'Exclusive Master Classes',
      description: 'Access to premium content and advanced techniques'
    },
    {
      icon: '',
      title: 'Worldwide Dance Community',
      description: 'Connect with dancers from across the globe'
    },
    {
      icon: '',
      title: 'Open to All Levels',
      description: 'Welcoming environment for beginners to advanced dancers'
    },
    {
      icon: '',
      title: 'Streaming & Live Master Classes',
      description: 'Experience both live and recorded premium content'
    }
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <PublicNavigation />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        
        <div className={`w-full max-w-4xl mx-auto px-4 text-center z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Hero Image */}
          <div className="mb-8 px-4 sm:px-0">
            <img 
              src={heroImage} 
              alt="Chills Dance Camp - Industry Leading Instructors"
              className="w-full max-w-xs sm:max-w-lg md:max-w-2xl mx-auto rounded-2xl shadow-2xl"
              style={{
                animation: 'slideIn 0.8s ease-out 0.2s both',
                boxShadow: '0 25px 50px rgba(255, 107, 107, 0.2)'
              }}
            />
          </div>
          
          {/* Welcome Text with Gradient */}
          <div className="mb-8 px-4 sm:px-0">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={3}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            >
              WELCOME TO CHILLS DANCE CAMP
            </GradientText>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Move. Express. Transform.
            </h2>
          </div>
          
          {/* Vamp Heels Partnership */}
          <div className="max-w-3xl mx-auto mb-10 px-4 sm:px-0">
            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-6 sm:p-8 max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={vampLogo} 
                  alt="Vamp Heels" 
                  className="h-12 sm:h-16 w-auto"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(255, 107, 107, 0.3))'
                  }}
                />
              </div>
              <p className="text-gray-300 leading-relaxed text-center text-sm sm:text-base">
                We're proud to partner with <span className="text-primary-400 font-semibold">Vamp Heels</span>, 
                a premier brand specializing in high-quality dance shoes expertly crafted for heels dancers. 
                Designed to amplify your movement and support every step, Vamp Heels combines style, comfort, 
                and performance to provide dancers of all levels with exceptional footwear that's engineered 
                for durability and versatility across various dance styles.
              </p>
            </div>
            
            {/* Camp Details */}
            <div className="text-center mb-10">
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:items-center sm:gap-8 md:gap-16 sm:space-y-0">
                <div className="text-center">
                  <h3 className="text-primary-400 font-semibold text-base sm:text-lg">Camp Dates:</h3>
                  <p className="text-gray-300 text-base sm:text-lg">July 18-20, 2025</p>
                </div>
                <div className="text-center">
                  <h3 className="text-primary-400 font-semibold text-base sm:text-lg">Location:</h3>
                  <p className="text-gray-300 text-base sm:text-lg">Los Angeles, USA</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center py-8 px-4 sm:px-0">
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-4 sm:px-8 rounded-full font-medium text-white hover:transform hover:scale-105 transition-all duration-300 relative min-h-[48px]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(238, 90, 111, 0.4))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                boxShadow: '0 8px 32px rgba(255, 107, 107, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                filter: 'drop-shadow(0 10px 20px rgba(255, 107, 107, 0.1))'
              }}
            >
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 animate-pulse rounded-full"></div>
            </button>
            <Link 
              to="/schedule"
              className="px-6 py-4 sm:px-8 rounded-full font-medium text-white hover:transform hover:scale-105 transition-all duration-300 relative min-h-[48px] flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))'
              }}
            >
              <span className="relative z-10">View Schedule</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 px-4 sm:px-0">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={5}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
            >
              Why Embark on This Journey with Us?
            </GradientText>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
              Step into three days of powerful training, self-expression, and connection. With global energy, 
              top-tier instructors, and a supportive community, technique, and community come together — 
              creating a dance experience you'll never forget.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 hover:transform hover:-translate-y-2"
                style={{
                  animation: `slideIn 0.6s ease-out ${0.2 * index}s both`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                {feature.icon && <div className="text-4xl mb-4">{feature.icon}</div>}
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructors Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={4}
              className="text-4xl font-bold"
            >
              Meet Your Instructors
            </GradientText>
          </div>
          <AutoScrollCards speed={0.5}>
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 sm:w-80 text-center p-4 sm:p-6 bg-black bg-opacity-60 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-80 transition-all duration-300 hover:transform hover:-translate-y-2"
                style={{
                  animation: `slideIn 0.6s ease-out ${0.15 * index}s both`,
                  backdropFilter: 'blur(20px)',
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(30, 30, 30, 0.8))',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                {instructor.image && <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{instructor.image}</div>}
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{instructor.name}</h3>
                <p className="text-primary-400 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{instructor.specialty}</p>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{instructor.bio}</p>
              </div>
            ))}
          </AutoScrollCards>
        </div>
      </div>



      {/* Journey Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10">
              <h3 className="text-xl font-bold mb-4 text-primary-400">Transform Your Dance Journey</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Immerse in a curriculum that fosters feminine grace, encouraging you to push your limits and fully realize your dance capabilities.
              </p>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10">
              <h3 className="text-xl font-bold mb-4 text-primary-400">Join Community Dance</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Join a supportive and inspiring dance community, where sharing energy and forging connections with fellow dancers and mentors enriches your journey.
              </p>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10">
              <h3 className="text-xl font-bold mb-4 text-primary-400">Forge Your Path</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Participate in transformative workshops and lectures, gaining skills and insights from industry pioneers, aimed to elevate your feminine dance expression.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <GradientText 
            colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
            animationSpeed={3}
            className="text-4xl font-bold mb-8"
          >
            Ready to Transform?
          </GradientText>
          <p className="text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
            Join us for three days of intensive training, empowerment, and community building. 
            All levels welcome - no prior experience required.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full font-medium hover:transform hover:scale-105 transition-all duration-300"
              style={{ boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)' }}
            >
              Get Your Pass Here!
            </button>
            <button 
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-full font-medium hover:bg-opacity-10 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              Already Registered? Login
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default LandingPage;