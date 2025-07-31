import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const FaqItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 cursor-pointer hover:shadow-md transition-all duration-300 overflow-hidden">
            <div
                className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200"
                onClick={toggleAccordion}
            >
                <h4 className="text-lg lg:text-xl font-semibold text-headingColor pr-4 leading-relaxed">
                    {item.question}
                </h4>
                <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen 
                            ? "bg-primaryColor text-white rotate-180" 
                            : "bg-gray-100 text-gray-600 hover:bg-primaryColor hover:text-white"
                    }`}
                >
                    {isOpen ? (
                        <HiChevronUp className="w-5 h-5" />
                    ) : (
                        <HiChevronDown className="w-5 h-5" />
                    )}
                </div>
            </div>

            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-6 pb-6">
                    <div className="w-full h-px bg-gray-200 mb-4"></div>
                    <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                        {item.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FaqItem;
