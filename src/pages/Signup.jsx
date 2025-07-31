import { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { HiEye, HiEyeOff, HiUser, HiMail, HiLockClosed, HiCamera, HiSparkles } from 'react-icons/hi';

const Signup = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: '',
        password: '',
        photo: selectedFile,
        gender: '',
        role: "patient",
    });

    const navigate = useNavigate();

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);

        setPreviewURL(data.url);
        setSelectedFile(data.url);
        setFormData({ ...formData, photo: data.url });
    };

    const submitHandler = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const { message } = await res.json();
            if (!res.ok) {
                throw new Error(message);
            }
            setLoading(false);
            toast.success(message);
            navigate('/login');

        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Side - Image */}
                        <div className="hidden lg:block bg-gradient-to-br from-primaryColor to-primaryColor/80 relative">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <figure className="relative h-full">
                                <img src={signupImg} alt="Sign up" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <div className="text-4xl font-bold mb-4">
                                            <span>Join</span>
                                            <span className="text-yellow-300"> Nirvana360</span>
                                        </div>
                                        <p className="text-lg opacity-90">Start your wellness journey today</p>
                                    </div>
                                </div>
                            </figure>
                        </div>

                        {/* Right Side - Form */}
                        <div className="p-8 lg:p-12">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primaryColor/10 text-primaryColor">
                                        <HiSparkles className="w-4 h-4 mr-2" />
                                        Create Account
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Nirvana360</h1>
                                <p className="text-gray-600">Create your account to start your wellness journey</p>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                            required
                                        />
                                        <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                            required
                                        />
                                        <HiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                            required
                                        />
                                        <HiLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Role and Gender */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            I am a:
                                        </label>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 text-gray-900"
                                        >
                                            <option value="patient">Patient</option>
                                            <option value="doctor">Doctor</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gender:
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 text-gray-900"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Photo Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Profile Photo
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <input
                                                type="file"
                                                name="photo"
                                                id="customFile"
                                                onChange={handleFileInputChange}
                                                accept=".jpg, .png"
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="customFile"
                                                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-all duration-200 border-2 border-dashed border-gray-300 hover:border-primaryColor"
                                            >
                                                <HiCamera className="w-5 h-5" />
                                                Upload Photo
                                            </label>
                                        </div>
                                        {selectedFile && (
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primaryColor">
                                                <img src={previewURL} alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primaryColor to-primaryColor/90 text-white font-semibold py-3 px-4 rounded-lg hover:from-primaryColor/90 hover:to-primaryColor/80 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <HashLoader size={20} color="#fff" />
                                            <span className="ml-2">Creating Account...</span>
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>

                                {/* Login Link */}
                                <div className="text-center">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-primaryColor font-semibold hover:text-primaryColor/80 transition-colors">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our{' '}
                        <Link to="/terms" className="text-primaryColor hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-primaryColor hover:underline">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
