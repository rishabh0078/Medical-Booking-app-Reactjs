import React from "react";
import starIcon from '../../assets/images/Star.png';
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {
    const {
        name,
        avgRating,
        totalRating,
        photo,
        specialization,
        experiences = [],
        ticketPrice,
        hospital = 'N/A',
        address = 'N/A'
    } = doctor;

    // Calculate years of experience
    const getExperience = () => {
        if (!experiences?.length) return 'Fresher';

        // Sort experiences by start date
        const sortedExp = [...experiences].sort((a, b) =>
            new Date(a.startingDate) - new Date(b.startingDate)
        );

        const currentYear = new Date().getFullYear();
        const firstExp = sortedExp[0];
        const startYear = firstExp.startingDate ? new Date(firstExp.startingDate).getFullYear() : currentYear;

        const hasCurrentJob = sortedExp.some(exp => exp.currentlyWorking);
        let endYear = hasCurrentJob ? currentYear : (sortedExp[sortedExp.length - 1]?.endingDate ?
            new Date(sortedExp[sortedExp.length - 1].endingDate).getFullYear() : currentYear);

        const years = endYear - startYear;
        return years <= 0 ? 'Fresher' : `${years}+ years experience`;
    };

    return (
        <div className="p-3 lg:p-5">
            <div>
                <img src={photo} className="w-full" alt={`${name}`} />
            </div>
            <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
                {name}
            </h2>
            <div className="mt-2 lg:mt-4 flex items-center justify-between">
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {specialization}
                </span>
                <div className="flex items-center gap-[6px]">
                    <div className="flex items-center">
                        <span className="bg-[#f3f6fa] text-[#4b5563] text-[11px] leading-[16px] px-2 py-[2px] rounded-full font-medium shadow-sm border border-[#e5e7eb]">
                            Patient Stories ({totalRating || 0})
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
                <div>
                    <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
                        {getExperience()}
                    </h3>
                    <p className="text-[14px] leading-6 font-[400] text-textColor">
                        {ticketPrice ? `₹${ticketPrice} Consultation fee` : 'Free Consultation'}
                    </p>
                    <p className="text-[14px] leading-6 font-[400] font-[500] text-textColor mt-2">
                        {address}
                    </p>
                </div>
                <Link to={`/doctors/${doctor._id}`}
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
            </div>
        </div>
    );
};

export default DoctorCard;
