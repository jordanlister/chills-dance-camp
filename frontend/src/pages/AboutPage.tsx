import { useState, useEffect } from 'react';
import GradientText from '../components/GradientText';
import PublicNavigation from '../components/PublicNavigation';

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const principles = [
    {
      title: "Community and Connection",
      description: "Building a supportive network of dancers where everyone belongs and feels valued."
    },
    {
      title: "Empowerment and Self-Expression",
      description: "Encouraging authentic self-expression through movement and building confidence in every dancer."
    },
    {
      title: "Continuous Development",
      description: "Committed to growth through ongoing learning, skill development, and artistic evolution."
    }
  ];

  const offerings = [
    {
      title: "Intensive Training",
      description: "3-day immersive programs with world-class instructors covering multiple dance styles and techniques."
    },
    {
      title: "Streaming Sessions",
      description: "Access to premium online content and live-streamed classes for continued learning."
    },
    {
      title: "Community Events",
      description: "Regular workshops, masterclasses, and social gatherings to strengthen our dance family."
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
            ABOUT US
          </GradientText>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              Welcome to Chills Dance Camp!
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-12">
              We are a passionate community dedicated to empowering dancers through movement, 
              self-expression, and connection. Our mission is to create transformative experiences 
              that celebrate the art of dance while fostering personal growth and confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <GradientText 
                colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
                animationSpeed={4}
                className="text-4xl font-bold mb-6"
              >
                MISSION
              </GradientText>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We believe in the power of movement to heal, inspire, and unite. Our mission is to provide 
                a safe and supportive environment where dancers of all levels can explore their artistry, 
                build confidence, and connect with like-minded individuals.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Through expert instruction, innovative programming, and a commitment to inclusivity, 
                we aim to elevate the dance experience and nurture the next generation of performers.
              </p>
            </div>
            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-8 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-4 text-primary-400">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To be the premier destination for dance education and community building, 
                where passion meets purpose and every dancer finds their voice through movement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Goal Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-8 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-4 text-primary-400">Our Impact</h3>
              <p className="text-gray-300 leading-relaxed">
                Since our founding, we have touched the lives of thousands of dancers worldwide, 
                creating lasting connections and fostering artistic growth that extends far beyond 
                the studio walls.
              </p>
            </div>
            <div>
              <GradientText 
                colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
                animationSpeed={4}
                className="text-4xl font-bold mb-6"
              >
                OUR GOAL
              </GradientText>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We strive to create transformative dance experiences that empower individuals, 
                strengthen communities, and celebrate the diversity of movement. Our goal is to 
                provide world-class instruction while maintaining an inclusive, supportive environment.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Through continuous innovation and dedication to excellence, we aim to set new standards 
                in dance education and community engagement, inspiring dancers to reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Principles Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={5}
              className="text-4xl font-bold mb-8"
            >
              OUR PRINCIPLES
            </GradientText>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 hover:transform hover:-translate-y-2 backdrop-blur-md"
                style={{
                  animation: `slideIn 0.6s ease-out ${0.2 * index}s both`
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-primary-400">{principle.title}</h3>
                <p className="text-gray-300 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={4}
              className="text-4xl font-bold mb-8"
            >
              What We Offer
            </GradientText>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Experience comprehensive dance education through our carefully curated programs, 
              designed to inspire growth and foster artistic expression.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="p-8 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 hover:transform hover:-translate-y-2 backdrop-blur-md"
                style={{
                  animation: `slideIn 0.6s ease-out ${0.2 * index}s both`
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-primary-400">{offering.title}</h3>
                <p className="text-gray-300 leading-relaxed">{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-12 backdrop-blur-md">
            <div className="mb-8">
              <div className="inline-block p-4 bg-primary-500 bg-opacity-20 rounded-full mb-4">
                <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary-400">Our Partnership</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We're proud to partner with Vamp Heels, creating synergy of artistry and 
                innovation. Together, we're building a stronger dance community and 
                redefining what it means to move with purpose and passion.
              </p>
              <p className="text-gray-400">
                This collaboration represents our commitment to excellence and our shared 
                vision of empowering dancers through quality education and community support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-2xl border border-primary-400/30 p-12 backdrop-blur-md">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={3}
              className="text-3xl font-bold mb-6"
            >
              Join Our Dance Family
            </GradientText>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Whether you're a beginner taking your first steps or an experienced dancer 
              looking to refine your craft, Chills Dance Camp welcomes you with open arms. 
              Together, we'll create something beautiful through the universal language of movement.
            </p>
            <div className="text-gray-400 text-sm">
              Ready to embark on your dance journey? Your story starts here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;