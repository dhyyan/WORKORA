import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Optional: You could add logic here to clear any local storage related to the payment if needed
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="rounded-full bg-emerald-100 p-3">
                        <CheckCircle className="w-16 h-16 text-emerald-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>

                <p className="text-gray-600">
                    Your milestone has been funded successfully. The freelancer has been notified and can begin work.
                </p>

                <div className="pt-4 space-y-3">
                    <button
                        onClick={() => {
                            const jobId = localStorage.getItem('lastFundedJobId');
                            if (jobId) {
                                navigate(`/client/profile/projects/${jobId}`);
                            } else {
                                navigate('/client/profile/projects');
                            }
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Go to Project
                    </button>

                    <button
                        onClick={() => navigate('/client/profile/projects')}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                        Back to Project List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
