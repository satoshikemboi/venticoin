import React, { useState } from 'react';
import { ChevronDown, Upload, Camera, FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Verification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    country: '',
    address: '',
    documentType: '',
    documentNumber: ''
  });

  const steps = [1, 2, 3, 4];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // --- Render Helpers for Steps ---

  const renderStep1 = () => (
    <>
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-6 h-6 text-gray-800" />
        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
      </div>
      <p className="text-gray-500 text-sm mb-8">Please provide your personal details as they appear on your ID</p>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">First Name *</label>
            <input type="text" name="firstName" placeholder="Enter your first name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6ee7b7] outline-none" onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Last Name *</label>
            <input type="text" name="lastName" placeholder="Enter your last name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6ee7b7] outline-none" onChange={handleInputChange} />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Date of Birth *</label>
          <input type="date" name="dob" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6ee7b7] outline-none" onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Country *</label>
          <div className="relative">
            <select name="country" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6ee7b7] appearance-none bg-white" onChange={handleInputChange} defaultValue="">
              <option value="" disabled>Select your country</option>
              <option value="ke">Kenya</option>
              <option value="ug">Uganda</option>
            </select>
            <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Address *</label>
          <textarea name="address" rows="3" placeholder="Enter your full address" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6ee7b7] outline-none resize-none" onChange={handleInputChange}></textarea>
        </div>
        <button onClick={nextStep} className="w-full bg-[#86efac] hover:bg-[#4ade80] text-[#064e3b] font-bold py-4 rounded-xl transition-all shadow-sm">Continue</button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-6 h-6 text-gray-800" />
        <h2 className="text-xl font-bold text-gray-900">Document Information</h2>
      </div>
      <p className="text-gray-500 text-sm mb-8">Select your document type and enter the document number</p>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Document Type *</label>
          <div className="relative">
            <select name="documentType" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6ee7b7] appearance-none bg-white" onChange={handleInputChange}>
              <option value="">Select document type</option>
              <option value="id">National ID</option>
              <option value="passport">Passport</option>
            </select>
            <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Document Number *</label>
          <input type="text" name="documentNumber" placeholder="Enter your document number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#6ee7b7] outline-none" onChange={handleInputChange} />
        </div>
        <div className="flex gap-4">
          <button onClick={prevStep} className="w-1/2 border border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all">Back</button>
          <button onClick={nextStep} className="w-1/2 bg-[#86efac] hover:bg-[#4ade80] text-[#064e3b] font-bold py-4 rounded-xl transition-all shadow-sm">Continue</button>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="flex items-center gap-2 mb-2">
        <Upload className="w-6 h-6 text-gray-800" />
        <h2 className="text-xl font-bold text-gray-900">Document Upload</h2>
      </div>
      <p className="text-gray-500 text-sm mb-8">Upload clear photos of your documents</p>
      <div className="space-y-6">
        {['ID Front Side', 'ID Back Side'].map((label) => (
          <div key={label} className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">{label} *</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group">
              <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#6ee7b7] mb-2" />
              <p className="text-sm text-gray-500">Click to upload {label.toLowerCase()}</p>
            </div>
          </div>
        ))}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Selfie with ID *</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group">
            <Camera className="w-8 h-8 text-gray-400 group-hover:text-[#6ee7b7] mb-2" />
            <p className="text-sm text-gray-500">Click to upload selfie holding your ID</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={prevStep} className="w-1/2 border border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all">Back</button>
          <button onClick={nextStep} className="w-1/2 bg-[#86efac] hover:bg-[#4ade80] text-[#064e3b] font-bold py-4 rounded-xl transition-all shadow-sm">Submit Verification</button>
        </div>
      </div>
    </>
  );

  const renderStep4 = () => (
    <div className="text-center py-6">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-[#f0fdf4] rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-[#22c55e]" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Submitted!</h2>
      <p className="text-gray-500 mb-8">Your KYC verification has been submitted successfully</p>
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <p className="text-gray-600 text-sm leading-relaxed">
          Our team will review your documents within 24-72 hours. You'll receive an email notification once the review is complete.
        </p>
      </div>
      <button className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-4 rounded-xl transition-all shadow-sm">
        Back to Dashboard
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-nunito">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-2">KYC Verification</h1>
          <p className="text-gray-500">Complete your identity verification to unlock all features</p>
        </div>

        {/* Stepper Header */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-bold transition-all ${
                currentStep >= step ? 'bg-[#2dd4bf] text-white' : 'bg-[#f1f5f9] text-gray-400'
              }`}>
                {step}
              </div>
              {index < steps.length - 1 && (
                <div className="w-12 h-0.5 bg-[#f1f5f9] mx-2">
                  <div className={`h-full bg-[#2dd4bf] transition-all duration-500 ${currentStep > step ? 'w-full' : 'w-0'}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 max-w-2xl mx-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
};

export default Verification;