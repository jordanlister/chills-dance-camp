import { useState, useEffect } from 'react';
import GradientText from '../components/GradientText';
import PublicNavigation from '../components/PublicNavigation';

const InstructorsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const founder = {
    name: 'Nika Chill',
    title: 'Founder & Lead Instructor',
    specialty: 'Twerk',
    bio: 'Camp founder offering 6 weekly twerk classes in LA. Leads 3 transformative days of feminine energy, movement, and connection. Passionate about creating a safe space for dancers to explore their artistry and build confidence.',
    image: '',
    featured: true
  };

  const instructors = [
    {
      name: 'Marissa Heart',
      specialty: 'Heartbreak Heels',
      bio: 'Industry-leading choreographer with 700K+ followers. Creator of "Heartbreak Heels" brand, worked with Kanye West, Justin Bieber, Lady Gaga.',
      image: ''
    },
    {
      name: 'Kiira Harper',
      specialty: 'Heels',
      bio: 'Professional heels instructor bringing precision and style to every movement.',
      image: ''
    },
    {
      name: 'Deanna Leggett',
      specialty: 'Hip-Hop',
      bio: 'CEO of Dymensions and accomplished dancer with 180K+ followers. Has worked with Cardi B, Hyolyn, and K Camp. Known for fluid movements and expressive performances.',
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
            MEET YOUR INSTRUCTORS
          </GradientText>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              Learn from World-Class Professionals
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-12">
              Our incredible lineup of 12 global instructors brings decades of experience, 
              diverse styles, and infectious passion to create an unforgettable learning experience.
            </p>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={4}
              className="text-4xl font-bold mb-8"
            >
              Our Founder
            </GradientText>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-0">
            <div className="text-center p-6 sm:p-8 md:p-12 bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-3xl border-2 border-primary-400/30 hover:border-primary-400/50 transition-all duration-300 hover:transform hover:-translate-y-2 backdrop-blur-md">
              <div className="mb-6 sm:mb-8">
                <div className="inline-block p-4 sm:p-6 bg-primary-500/30 rounded-full mb-4 sm:mb-6">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">{founder.name}</h2>
                <p className="text-lg sm:text-xl text-primary-300 font-semibold mb-3 sm:mb-4">{founder.title}</p>
                <p className="text-base sm:text-lg text-primary-400 font-medium mb-4 sm:mb-6">{founder.specialty}</p>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">{founder.bio}</p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-gray-300 italic">
                  "My vision is to create a transformative space where dancers can discover their power, 
                  embrace their femininity, and connect with a supportive community that celebrates every journey."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Instructors Grid */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={5}
              className="text-4xl font-bold mb-8"
            >
              Our Complete Lineup
            </GradientText>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Each instructor brings their unique style, expertise, and passion to create 
              a diverse and comprehensive learning experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="text-center p-6 sm:p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-2 backdrop-blur-md"
                style={{
                  animation: `slideIn 0.6s ease-out ${0.15 * index}s both`
                }}
              >
                <div className="mb-4 sm:mb-6">
                  <div className="inline-block p-3 bg-primary-500/20 rounded-full mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{instructor.name}</h3>
                  <p className="text-primary-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{instructor.specialty}</p>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{instructor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-primary-500/10 to-primary-700/10 rounded-2xl border border-primary-400/20 backdrop-blur-md">
              <div className="text-4xl font-bold text-primary-400 mb-2">12</div>
              <p className="text-lg font-semibold text-white mb-2">World-Class Instructors</p>
              <p className="text-gray-400 text-sm">From industry professionals to rising stars</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-primary-500/10 to-primary-700/10 rounded-2xl border border-primary-400/20 backdrop-blur-md">
              <div className="text-4xl font-bold text-primary-400 mb-2">8+</div>
              <p className="text-lg font-semibold text-white mb-2">Dance Styles</p>
              <p className="text-gray-400 text-sm">Heels, Hip-Hop, Vogue, Twerk, and more</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-primary-500/10 to-primary-700/10 rounded-2xl border border-primary-400/20 backdrop-blur-md">
              <div className="text-4xl font-bold text-primary-400 mb-2">100+</div>
              <p className="text-lg font-semibold text-white mb-2">Years Combined Experience</p>
              <p className="text-gray-400 text-sm">Decades of expertise in dance education</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-3xl border border-primary-400/30 p-12 backdrop-blur-md">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={3}
              className="text-3xl font-bold mb-6"
            >
              Ready to Learn from the Best?
            </GradientText>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Join our incredible community of dancers and learn from industry professionals 
              who are passionate about sharing their knowledge and empowering your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full font-medium hover:transform hover:scale-105 transition-all duration-300"
                style={{ boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)' }}
              >
                Register for Camp
              </button>
              <button className="px-8 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-full font-medium hover:bg-opacity-10 hover:transform hover:-translate-y-1 transition-all duration-300">
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;