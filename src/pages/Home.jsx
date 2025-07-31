import React from 'react';
import Testimonial from '../components/Testimonial/Testimonial';
import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png"; 
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import featureImg from "../assets/images/feature-img.png";
import faqImg from "../assets/images/faq-img.png";
import FaqList from "../components/Faq/FaqList";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { HiHeart, HiLocationMarker, HiClock, HiUserGroup, HiShieldCheck, HiSparkles } from 'react-icons/hi';
import About from "../components/About/About";
import ServiceList from '../components/Services/ServiceList';
import DoctorList from "../components/Doctors/DoctorList";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero_section pt-[60px] 2xl:h-[800px] bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[570px]">
                <div className="mb-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primaryColor/10 text-primaryColor">
                    <HiSparkles className="w-4 h-4 mr-2" />
                    Premium Healthcare Experience
                  </span>
                </div>
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px] mb-6">
                  Your Journey to <span className="text-primaryColor">Complete Wellness</span> Starts Here
                </h1>
                <p className="text_para text-lg leading-relaxed mb-8">At Nirvana360, we are dedicated to empowering our patients to achieve optimal health and well-being. Our experienced team provides compassionate, personalized care using the latest medical advancements—so you and your loved ones can live healthier, happier lives.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn bg-gradient-to-r from-primaryColor to-primaryColor/90 hover:from-primaryColor/90 hover:to-primaryColor/80 transform hover:scale-105 transition-all duration-200">
                    Request an Appointment
                  </button>
                  <button className="btn-outline border-2 border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transform hover:scale-105 transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px] mb-2"></span>
                  <p className="text_para font-medium">Years of Experience</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px] mb-2"></span>
                  <p className="text_para font-medium">Clinic Locations</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px] mb-2"></span>
                  <p className="text_para font-medium">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full rounded-2xl shadow-xl" src={heroImg01} alt="Healthcare professionals" />
              </div>
              <div className="mt-[30px]">
                <img src={heroImg02} alt="Medical consultation" className="w-full mb-[30px] rounded-2xl shadow-xl" />
                <img src={heroImg03} alt="Patient care" className="w-full rounded-2xl shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>  

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="lg:w-[470px] mx-auto text-center mb-16">
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primaryColor/10 text-primaryColor">
                <HiShieldCheck className="w-4 h-4 mr-2" />
                Our Services
              </span>
            </div>
            <h2 className="heading text-center mb-4">Providing World-Class Medical Services</h2>
            <p className="text_para text-center text-lg">
              Experience healthcare excellence with our comprehensive range of medical services designed for your complete wellness journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[30px]">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primaryColor to-primaryColor/80 rounded-full flex items-center justify-center">
                  <img src={icon01} alt="Find a Doctor" className="w-8 h-8" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-headingColor mb-4">Find a Doctor</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Connect with our expert physicians who are committed to providing personalized care and comprehensive treatment plans.
                </p>
                <Link to='/doctors' className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-all duration-200 transform hover:scale-110">
                  <BsArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primaryColor to-primaryColor/80 rounded-full flex items-center justify-center">
                  <img src={icon02} alt="Find a Location" className="w-8 h-8" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-headingColor mb-4">Find a Location</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Discover our conveniently located clinics equipped with state-of-the-art facilities and compassionate staff.
                </p>
                <Link to='/doctors' className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-all duration-200 transform hover:scale-110">
                  <BsArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primaryColor to-primaryColor/80 rounded-full flex items-center justify-center">
                  <img src={icon03} alt="Book Appointment" className="w-8 h-8" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-headingColor mb-4">Book Appointment</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Schedule your consultation with ease through our streamlined booking system designed for your convenience.
                </p>
                <Link to='/doctors' className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-all duration-200 transform hover:scale-110">
                  <BsArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About/>

      {/* Medical Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center mb-16">
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primaryColor/10 text-primaryColor">
                <HiHeart className="w-4 h-4 mr-2" />
                Specialized Care
              </span>
            </div>
            <h2 className="heading text-center mb-4">Our Medical Services</h2>
            <p className="text_para text-center text-lg">
              Comprehensive healthcare solutions tailored to meet your unique needs and promote your overall well-being.
            </p>
          </div>
          <ServiceList/>
        </div>
      </section>

      {/* Virtual Treatment Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row gap-12">
            <div className="xl:w-[670px]">
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primaryColor/10 text-primaryColor">
                  <HiClock className="w-4 h-4 mr-2" />
                  Virtual Care
                </span>
              </div>
              <h2 className="heading mb-6">
                Get Virtual Treatment <br /> <span className="text-primaryColor">Anytime, Anywhere</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Experience the future of healthcare with our advanced virtual consultation platform. Connect with our expert physicians from the comfort of your home.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primaryColor rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <span className="text-gray-700 text-lg">Schedule your appointment directly through our user-friendly platform</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primaryColor rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <span className="text-gray-700 text-lg">Search for your preferred physician and review their expertise</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primaryColor rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <span className="text-gray-700 text-lg">Connect instantly for a secure, high-quality virtual consultation</span>
                </li>
              </ul>
              <Link to="/">
                <button className="btn bg-gradient-to-r from-primaryColor to-primaryColor/90 hover:from-primaryColor/90 hover:to-primaryColor/80 transform hover:scale-105 transition-all duration-200">
                  Start Virtual Consultation
                </button>
              </Link>
            </div>

            <div className="relative z-10 xl:w-[770px] flex justify-end">
              <img src={featureImg} className="w-3/4 rounded-2xl shadow-xl" alt="Virtual consultation" />
              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-4 lg:pt-6 lg:px-6 lg:pb-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <p className="text-sm lg:text-base font-semibold text-headingColor">
                      Tue, 24
                    </p>
                    <p className="text-sm lg:text-base text-textColor font-medium">
                      10:00AM
                    </p>
                  </div>
                  <span className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-yellowColor rounded-full">
                    <img src={videoIcon} alt="Video call" className="w-4 h-4 lg:w-5 lg:h-5" />
                  </span>
                </div>

                <div className="w-full bg-[#CCF0F3] py-2 px-3 lg:py-3 lg:px-4 text-xs lg:text-sm text-irisBlueColor font-semibold mb-4 rounded-full text-center">
                  Virtual Consultation
                </div>
                <div className="flex items-center gap-3">
                  <img src={avatarIcon} alt="Doctor" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full" />
                  <h4 className="text-sm lg:text-base font-bold text-headingColor">
                    Dr. Wayne Collins
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center mb-16">
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primaryColor/10 text-primaryColor">
                <HiUserGroup className="w-4 h-4 mr-2" />
                Expert Team
              </span>
            </div>
            <h2 className="heading text-center mb-4">Our Expert Doctors</h2>
            <p className="text_para text-center text-lg">
              Meet our team of highly qualified and experienced healthcare professionals dedicated to your wellness.
            </p>
          </div>
          <DoctorList/>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="FAQ" className="rounded-2xl shadow-xl" />
            </div>
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primaryColor/10 text-primaryColor">
                  <HiLocationMarker className="w-4 h-4 mr-2" />
                  Support
                </span>
              </div>
              <h2 className="heading mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Find answers to common questions about our services, appointments, and healthcare processes.
              </p>
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center mb-16">
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primaryColor/10 text-primaryColor">
                <HiHeart className="w-4 h-4 mr-2" />
                Patient Stories
              </span>
            </div>
            <h2 className="heading text-center mb-4">What Our Patients Say</h2>
            <p className="text_para text-center text-lg">
              Discover why thousands of patients trust Nirvana360 for their healthcare needs.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Home;