import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { HiStar } from 'react-icons/hi';
import { BsQuote } from 'react-icons/bs';
import SwiperCore, { Pagination, Autoplay } from 'swiper/core';

SwiperCore.use([Pagination, Autoplay]);

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Patient",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Nirvana360 transformed my healthcare experience. The doctors are incredibly knowledgeable and the staff made me feel like family. I've never felt more cared for in a medical setting."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Patient",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The level of care and attention to detail at Nirvana360 is exceptional. They don't just treat symptoms - they focus on your overall wellness journey. Highly recommended!"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Healthcare Professional",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "As a healthcare professional, I'm impressed by Nirvana360's holistic approach to patient care. They truly embody the meaning of comprehensive wellness."
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Patient",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The virtual consultation feature is a game-changer. I can get expert medical advice from the comfort of my home. Nirvana360 is setting new standards in healthcare."
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Patient",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "From the moment I walked in, I knew this was different. The atmosphere is calming, the staff is professional yet warm, and the care is world-class. Thank you, Nirvana360!"
  }
];

const Testimonial = () => {
    return (
        <div className='mt-[30px] lg:mt-[55px]'>
            <Swiper 
                spaceBetween={30} 
                slidesPerView={1} 
                pagination={{ 
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
                className="testimonial-swiper"
                style={{
                    paddingBottom: '60px'
                }}
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                            {/* Quote Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-primaryColor to-primaryColor/80 rounded-full flex items-center justify-center">
                                    <BsQuote className="text-white text-xl" />
                                </div>
                            </div>

                            {/* Testimonial Text */}
                            <div className="flex-1 mb-6">
                                <p className="text-gray-700 leading-relaxed text-center italic text-base min-h-[80px] flex items-center justify-center">
                                    "{testimonial.text}"
                                </p>
                            </div>

                            {/* Rating */}
                            <div className="flex justify-center mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(testimonial.rating)].map((_, index) => (
                                        <HiStar key={index} className="text-yellow-400 w-5 h-5 fill-current" />
                                    ))}
                                </div>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primaryColor/20">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                        // onError={(e) => {
                                        //     e.target.src = 'https://via.placeholder.com/150/0067FF/FFFFFF?text=' + testimonial.name.charAt(0);
                                        // }}
                                    />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-lg font-semibold text-gray-900">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-primaryColor font-medium">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx>{`
                .testimonial-swiper .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    background: #e5e7eb;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                
                .testimonial-swiper .swiper-pagination-bullet-active {
                    background: #0067FF;
                    transform: scale(1.2);
                }
                
                .testimonial-swiper .swiper-pagination {
                    bottom: 0;
                }

                .testimonial-swiper .swiper-slide {
                    height: auto;
                }
            `}</style>
        </div>
    );
};

export default Testimonial;
