import React from 'react';
import { Calendar, Clock, BarChart2, ArrowRight, Activity, Zap } from 'lucide-react';

const RegionalResultsTable = () => {
  // Data structure matching your image
  const drawData = [
    {
      id: 1,
      name: 'NEW PUNJAB',
      time: '11:10 AM',
      prevResult: '09',
      currResult: '72',
      status: 'LIVE',
      isLive: true,
    },
    {
      id: 2,
      name: 'ROYAL BAZAR',
      time: '01:15 PM',
      prevResult: '03',
      currResult: 'XX',
      status: 'NEXT',
      isNext: true,
    },
    {
      id: 3,
      name: 'SURAT CITY',
      time: '01:25 PM',
      prevResult: '29',
      currResult: 'XX',
      status: 'UPCOMING',
    },
    {
      id: 4,
      name: 'GURU MANGAL',
      time: '01:30 PM',
      prevResult: '68',
      currResult: 'XX',
      status: 'UPCOMING',
    },
    {
      id: 5,
      name: 'BAGAD',
      time: '01:30 PM',
      prevResult: '65',
      currResult: 'XX',
      status: 'UPCOMING',
    },
    {
      id: 6,
      name: 'SUPER KING',
      time: '01:45 PM',
      prevResult: '98',
      currResult: 'XX',
      status: 'UPCOMING',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* HEADER: Teal Green Gradient */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-white text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Satta King Fast Results
            </h2>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-emerald-100" />
              <span className="text-sm font-medium">Jan 28, 2026 & Jan 27, 2026</span>
            </div>
          </div>
        </div>

        {/* SUB-HEADER / LEGEND */}
        <div className="bg-gray-800 text-gray-300 text-xs sm:text-sm uppercase font-semibold tracking-wider flex justify-between px-6 py-3">
          <span className="flex-1">Regional Offline Draw</span>
          <div className="flex space-x-8 sm:space-x-12 text-right">
            <span className="w-12 sm:w-16">Tue 27th</span>
            <span className="w-12 sm:w-16 text-white">Wed 28th</span>
          </div>
        </div>

        {/* TABLE CONTENT */}
        <div className="divide-y divide-gray-100">
          {drawData.map((row) => (
            <div 
              key={row.id} 
              className={`
                group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors
                ${row.isLive ? 'bg-red-50/30' : ''}
                ${row.isNext ? 'bg-orange-50/30' : ''}
              `}
            >
              {/* Status Indicator Bar (Left) */}
              {row.isLive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 rounded-l-sm" />}
              {row.isNext && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400 rounded-l-sm" />}

              {/* LEFT SIDE: Name, Time, Chart Link */}
              <div className="flex-1 mb-4 sm:mb-0 pl-2">
                <div className="flex items-center space-x-2 mb-1">
                  {row.isLive && (
                    <span className="animate-pulse bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-200">
                      LIVE
                    </span>
                  )}
                  {row.isNext && (
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-orange-200">
                      NEXT
                    </span>
                  )}
                  <h3 className="text-gray-900 font-bold text-base sm:text-lg">{row.name}</h3>
                </div>
                
                <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    {row.time}
                  </div>
                  <button className="flex items-center text-teal-600 hover:text-teal-800 font-medium transition-colors hover:underline">
                    <BarChart2 className="w-3.5 h-3.5 mr-1" />
                    Record Chart
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE: Results */}
              <div className="flex justify-between sm:justify-end items-center sm:space-x-12 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                
                {/* Previous Result */}
                <div className="flex flex-col items-center w-12 sm:w-16">
                  <span className="sm:hidden text-[10px] text-gray-400 uppercase mb-1">Tue 27</span>
                  <span className="text-xl sm:text-2xl font-medium text-gray-400">
                    {row.prevResult}
                  </span>
                </div>

                {/* Current Result */}
                <div className="flex flex-col items-center w-12 sm:w-16 relative">
                  <span className="sm:hidden text-[10px] text-gray-400 uppercase mb-1">Wed 28</span>
                  {row.currResult === 'XX' ? (
                     <span className="text-xl sm:text-2xl font-bold text-gray-300 tracking-widest">--</span>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-black text-gray-900">
                      {row.currResult}
                    </span>
                  )}
                  {/* Highlight circle for Winner/Today */}
                  {row.currResult !== 'XX' && (
                    <div className="absolute -right-2 -top-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          ))}
        </div>
        
        {/* FOOTER CTA */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
          <button className="text-sm text-teal-700 font-semibold hover:text-teal-900 flex items-center justify-center mx-auto transition-colors">
            View All Offline Results <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegionalResultsTable;