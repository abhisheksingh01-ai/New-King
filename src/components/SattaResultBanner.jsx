import React from 'react';
import { AlertTriangle, Calendar, MapPin, Clock, ArrowRight, BarChart3 } from 'lucide-react';

const SattaResultModern = () => {
  // Updated list of 7 specific zones
  const zones = [
    'Delhi Bazar',
    'Shri Ganesh',
    'Faridabad',
    'Ghaziabad',
    'Gali',
    'Disawar',
    'Noida King'
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:py-12 sm:px-6 lg:px-8 font-sans">
      
      {/* Main Card Container - centered and constrained width */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-gray-900/5">
        
        {/* HERO SECTION: Gradient Background */}
        <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 p-6 sm:p-10 text-white relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <Calendar className="w-4 h-4 text-yellow-300" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-yellow-50">28th January 2026</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Daily Superfast <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
                Satta King Result
              </span>
            </h1>
            
            <p className="text-indigo-100 text-sm sm:text-lg max-w-2xl leading-relaxed opacity-90">
              Live updates and leak numbers for major zones. Fast, accurate, and historical data charts available now.
            </p>
          </div>
        </div>

        {/* CONTENT SECTION: Grid Layout */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Zone Grid - 1 col mobile, 2 cols desktop */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
              Covered Zones
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {zones.map((zone) => (
                <div key={zone} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors group cursor-default">
                  <span className="font-bold text-gray-700 group-hover:text-indigo-700 transition-colors">{zone}</span>
                  <div className="bg-white p-2 rounded-full shadow-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div> 
        </div>
        {/* DISCLAIMER SECTION: Distinct Visual Style */}
        <div className="bg-red-50 border-t border-red-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <h4 className="text-red-900 font-bold text-lg">Important Disclaimer</h4>
              <p className="text-red-800/80 text-sm leading-relaxed text-justify sm:text-left">
                This website is an independent media portal for informational and journalistic purposes only. As a non-transactional service, we are not affiliated with any entity mentioned. Users are solely responsible for complying with all applicable laws in their jurisdiction.
              </p>
              <button className="group inline-flex items-center text-sm font-bold text-red-700 hover:text-red-900 transition-colors mt-2">
                Read Full Disclaimer 
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SattaResultModern;