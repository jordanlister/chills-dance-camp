import { useState, useEffect } from 'react';
import GradientText from '../components/GradientText';
import PublicNavigation from '../components/PublicNavigation';

const PoliciesPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const policySection = (title: string, content: React.ReactNode, id: string) => (
    <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 backdrop-blur-md mb-6">
      <button
        onClick={() => toggleSection(id)}
        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 rounded-2xl"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-primary-400">{title}</h3>
          <svg
            className={`w-6 h-6 text-primary-400 transform transition-transform duration-300 ${
              activeSection === id ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {activeSection === id && (
        <div className="px-6 pb-6">
          <div className="text-gray-300 leading-relaxed space-y-4">
            {content}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <PublicNavigation />
      
      {/* Hero Section */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16">
        <div className={`w-full max-w-4xl mx-auto px-4 text-center z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <GradientText 
            colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
            animationSpeed={3}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            CAMP POLICIES
          </GradientText>
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-xl md:text-2xl mb-6 text-gray-300 leading-relaxed">
              Terms, Conditions & Code of Conduct
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Please review our comprehensive policies to ensure a safe and enjoyable experience for all participants.
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-3xl border border-primary-400/30 p-8 backdrop-blur-md text-center">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              <strong>Dear Participant,</strong>
            </p>
            <p className="text-gray-300 leading-relaxed">
              Thank you for choosing Chills Dance Camp. Your support drives us to deliver top-notch service and excellence. 
              This agreement outlines the terms of cooperation between the participant and Chills Dance Camp, setting the 
              foundation for a mutually beneficial relationship.
            </p>
          </div>
        </div>
      </div>

      {/* Camp Information */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-8 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-primary-400 mb-6">Upcoming Camp Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Dates</h3>
                <p className="text-gray-300">July 18 - 20, 2025</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                <p className="text-gray-300">Mihran K. Studios</p>
                <p className="text-gray-300">334 N Victory Blvd, Burbank, CA 91502, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policies Sections */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={4}
              className="text-3xl font-bold mb-4"
            >
              Terms of Service
            </GradientText>
            <p className="text-gray-400">Click on any section to expand and read the full details</p>
          </div>

          {policySection("Terms of Service", (
            <p>
              By agreeing to these terms, you are bound to adhere to them. These terms apply to all users and visitors 
              of the Organization, with confirmation of legal age required. The Service is not accessible to individuals 
              under 18 years old.
            </p>
          ), "terms")}

          {policySection("Pricing Policy", (
            <p>
              Our pricing policy allows for adjustments before order confirmation. Prices may increase as the camp start 
              date nears, but the reserved ticket price remains unchanged for you. The Organizer may not impose additional 
              fees, and participants cannot request a refund if tickets are later sold at a discounted rate.
            </p>
          ), "pricing")}

          {policySection("Payment", (
            <div>
              <p className="mb-4">
                Full prepayment is necessary for access to all purchased services. We accept various payment methods, 
                including Visa, Mastercard, Amex, ChinaUnionPay, Jcb, Diners, Discover, Electron, Maestro, as well as 
                mobile payment systems like Apple Pay, Google Pay, and PayPal.
              </p>
              <p className="mb-4">
                By confirming payment, you confirm: (i) the right to use credit, debit cards, and other payment methods 
                for orders; and (ii) the accuracy, correctness, and completeness of the provided information.
              </p>
              <p className="font-semibold text-primary-400">
                Please note that refunds are not available. Payment for participation in the dance camp is final and 
                non-refundable in case of cancellation or change of plans.
              </p>
            </div>
          ), "payment")}

          {policySection("Health and Safety Responsibility", (
            <div>
              <p className="mb-4">
                Participants are advised to possess personal health insurance to cover potential injuries and illnesses 
                during the event. In the event of injury or illness, participants should promptly seek medical assistance 
                at their expense and are accountable for their physical and mental well-being during the event.
              </p>
              <p className="font-semibold text-primary-400">
                The Organization disclaims liability for injuries, illnesses, or other incidents occurring during event 
                participation. Participants automatically agree to the terms of this Agreement upon event registration.
              </p>
            </div>
          ), "health")}

          {policySection("Photos and Videos", (
            <p>
              Participants agree to grant the Organization unrestricted use of all photos and videos taken during the 
              camp for its own purposes, free of charge and without limitations.
            </p>
          ), "media")}

          {policySection("Privacy Policy", (
            <div>
              <p className="mb-4">
                When registering on our service, personal identifying data, including email address, name, surname, 
                phone number, credit card details, card expiration date, billing address, and usage data, may be 
                collected for communication and identification purposes.
              </p>
              <p className="mb-4">
                We are dedicated to safeguarding your personal data and ensuring its confidentiality. Stringent security 
                measures are in place to prevent unauthorized access or disclosure.
              </p>
              <p>
                You retain the right to update, modify, or delete your personal data either through your website account 
                or by directly contacting us.
              </p>
            </div>
          ), "privacy")}

          {policySection("Liability and Limitations", (
            <p>
              In adherence to this Agreement, neither the organization nor its instructors bear responsibility for any 
              special, consequential, indirect, or incidental damages, such as loss of profit, data, business interruption, 
              personal injury, or breach of confidentiality, stemming from the use of the service or associated services.
            </p>
          ), "liability")}

          {policySection("Force Majeure", (
            <p>
              In circumstances of force majeure, such as natural disasters, epidemics, wars, or events beyond any party's 
              control, the affected party is absolved from contractual obligations. Prompt notification of force majeure 
              circumstances to the other party is required.
            </p>
          ), "force-majeure")}
        </div>
      </div>

      {/* Code of Conduct */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <GradientText 
              colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
              animationSpeed={4}
              className="text-3xl font-bold mb-4"
            >
              Code of Conduct
            </GradientText>
            <p className="text-gray-400">
              Creating a safe, inclusive, and respectful environment for all participants aged 16 and older
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-6 backdrop-blur-md">
              <h3 className="text-xl font-bold text-primary-400 mb-4">Respect and Inclusion</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Treat all participants, instructors, and staff with respect and courtesy</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Foster an inclusive atmosphere that welcomes all backgrounds and identities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Harassment, bullying, or discrimination will not be tolerated</span>
                </li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-6 backdrop-blur-md">
              <h3 className="text-xl font-bold text-primary-400 mb-4">Professionalism</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Maintain professional demeanor at all times</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Be punctual for classes and events</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Wear appropriate attire for dance classes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-6 backdrop-blur-md">
              <h3 className="text-xl font-bold text-primary-400 mb-4">Health and Safety</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Prioritize your health and safety</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Respect personal space and boundaries</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Maintain hygiene and cleanliness</span>
                </li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10 p-6 backdrop-blur-md">
              <h3 className="text-xl font-bold text-primary-400 mb-4">Meet & Greet Sessions</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>10-minute sessions after each class</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Maximum 5 photos with each instructor</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Stand in line and respect other participants</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Prohibited Conduct */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-3xl border border-red-400/30 p-8 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">Prohibited Conduct</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-block p-3 bg-red-500/20 rounded-full mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-red-300 mb-2">Harassment</h4>
                <p className="text-gray-300 text-sm">Any form of harassment or discrimination is strictly prohibited</p>
              </div>
              <div className="text-center">
                <div className="inline-block p-3 bg-red-500/20 rounded-full mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-red-300 mb-2">Substance Abuse</h4>
                <p className="text-gray-300 text-sm">Use of alcohol, drugs, or illegal substances is prohibited</p>
              </div>
              <div className="text-center">
                <div className="inline-block p-3 bg-red-500/20 rounded-full mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-red-300 mb-2">Violence</h4>
                <p className="text-gray-300 text-sm">Acts of violence or threats are strictly forbidden</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-3xl border border-primary-400/30 p-8 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-primary-400 mb-6">Contact Us</h3>
            <p className="text-lg text-gray-300 mb-6">
              For updated information, visit our website or contact us directly.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                <a href="mailto:chillsdancecamp@gmail.com" className="text-primary-400 hover:text-primary-300 transition-colors">
                  chillsdancecamp@gmail.com
                </a>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Website</h4>
                <a href="https://chillsdance.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">
                  chillsdance.com
                </a>
              </div>
            </div>
            <p className="text-gray-400 mt-8">
              We trust that your engagement in our camp will enrich your dance journey. 
              Should you have inquiries, please do not hesitate to reach out to us.
            </p>
            <p className="text-gray-300 mt-4 font-semibold">
              Warm regards,<br />
              Chills Dance Camp Team
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Chills Dance Camp. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Stay tuned for the latest updates and news from Chills Dance Camp
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;