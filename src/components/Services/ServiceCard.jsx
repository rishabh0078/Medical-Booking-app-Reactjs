import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { HiHeart, HiEye, HiUserGroup, HiShieldCheck, HiSparkles, HiClock, HiLocationMarker, HiAcademicCap, HiStar } from 'react-icons/hi';

const ServiceCard = ({ item, index }) => {
    const { name, desc, bgColor, textColor } = item;
    
    // Map service names to icons
    const getServiceIcon = (serviceName) => {
        const iconMap = {
            'Cardiology': <HiHeart className="w-8 h-8" />,
            'Neurology': <HiAcademicCap className="w-8 h-8" />,
            'Ophthalmology': <HiEye className="w-8 h-8" />,
            'Dental Care': <HiStar className="w-8 h-8" />,
            'Family Medicine': <HiUserGroup className="w-8 h-8" />,
            'Emergency Care': <HiShieldCheck className="w-8 h-8" />,
            'Mental Health': <HiSparkles className="w-8 h-8" />,
            '24/7 Support': <HiClock className="w-8 h-8" />,
            'Home Care': <HiLocationMarker className="w-8 h-8" />
        };
        return iconMap[serviceName] || <HiHeart className="w-8 h-8" />;
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
            {/* Service Icon */}
            <div className="flex items-center justify-center mb-6">
                <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                        background: `${bgColor}`,
                        color: `${textColor}`,
                    }}
                >
                    {getServiceIcon(name)}
                </div>
            </div>

            {/* Service Number Badge */}
            <div className="flex justify-end mb-4">
                <span
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full bg-primaryColor/10 text-primaryColor"
                >
                    {index + 1}
                </span>
            </div>

            {/* Service Content */}
            <div className="text-center">
                <h3 className="text-2xl font-bold text-headingColor mb-4 group-hover:text-primaryColor transition-colors duration-300">
                    {name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-base">
                    {desc}
                </p>
                
                {/* Action Button */}
                <div className="flex justify-center">
                    <Link
                        to="/doctors"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-all duration-200 transform hover:scale-110 group-hover:shadow-lg"
                    >
                        <BsArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primaryColor/20 transition-all duration-300 pointer-events-none"></div>
        </div>
    );
};

export default ServiceCard;