import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Loader2, RefreshCcw } from 'lucide-react';
import api from '../api/api';

const RegionalResultsTable = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [displayDates, setDisplayDates] = useState({ prev: 'Yesterday', curr: 'Today' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const GAME_CONFIG = [
    { key: 'DELHI BAZAR', name: 'DELHI BAZAR', time: '03:00 PM' },
    { key: 'SHRI GANESH', name: 'SHRI GANESH', time: '04:30 PM' },
    { key: 'FARIDABAD',   name: 'FARIDABAD',   time: '06:15 PM' },
    { key: 'GHAZIABAD',   name: 'GHAZIABAD',   time: '08:40 PM' },
    { key: 'GALI',        name: 'GALI',        time: '11:40 PM' },
    { key: 'DESAWAR',     name: 'DESAWAR',     time: '05:00 AM' },
    { key: 'NOIDA KING',  name: 'NOIDA KING',  time: '06:00 AM' },
  ];

  // Helper function: Formats "DD-MM-YYYY" to "Tue 27th"
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;

    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = parseInt(day, 10);
    
    const getSuffix = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
    
    return `${weekday} ${dayNum}${getSuffix(dayNum)}`;
  };

  const fetchData = async (showFullLoader = false) => {
    if (showFullLoader) setLoading(true);
    else setIsRefreshing(true);

    try {
      const response = await fetch(api.DataFetch.gameChartLive);
      const json = await response.json();

      if (json.success && json.data && json.data.length >= 2) {
          // 1. Sort data by Date (Oldest to Newest)
          // This ensures that [last-1] is always Yesterday and [last] is always Today
          const sortedData = json.data.sort((a, b) => {
              const dateA = new Date(a.date.split('-').reverse().join('-'));
              const dateB = new Date(b.date.split('-').reverse().join('-'));
              return dateA - dateB;
          });

          // 2. Automatically grab the last two entries
          const prevDayData = sortedData[sortedData.length - 2]; 
          const currDayData = sortedData[sortedData.length - 1]; 

          // 3. Update the Header Dates dynamically
          setDisplayDates({
              prev: formatDate(prevDayData.date),
              curr: formatDate(currDayData.date)
          });

          // 4. Map the API data to the config
          const processedData = GAME_CONFIG.map((game, index) => {
              const prevVal = prevDayData.games[game.key]?.result || 'XX';
              const currVal = currDayData.games[game.key]?.result || 'XX';

              let status = 'UPCOMING';
              let isLive = false;

              if (currVal !== 'XX') {
                  status = 'RESULT_OUT';
              } else {
                  status = 'UPCOMING'; 
              }

              return {
                  id: index,
                  ...game,
                  prevResult: prevVal,
                  currResult: currVal,
                  status,
                  isLive
              };
          });

          setTableData(processedData);
      }
    } catch (error) {
      console.error("Failed to fetch game data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Initial Load
    fetchData(true);

    // Auto-Refresh every 10 seconds
    const intervalId = setInterval(() => {
      fetchData(false);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 bg-gray-50">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
            <p className="text-gray-500 font-medium">Loading Live Results...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-white text-center relative">
          
          {/* Refresh Indicator */}
          {isRefreshing && (
             <div className="absolute right-4 top-4 flex items-center space-x-1 bg-white/20 px-2 py-1 rounded text-xs animate-pulse">
                <RefreshCcw className="w-3 h-3 animate-spin" />
                <span>Updating...</span>
             </div>
          )}

          <div className="flex flex-col items-center justify-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Satta King Fast Results
            </h2>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-emerald-100" />
              <span className="text-sm font-medium">{displayDates.curr} & {displayDates.prev}</span>
            </div>
          </div>
        </div>

        {/* SUB-HEADER / LEGEND */}
        <div className="bg-gray-800 text-gray-300 text-xs sm:text-sm uppercase font-semibold tracking-wider flex justify-between px-6 py-3">
          <span className="flex-1">Regional Offline Draw</span>
          <div className="flex space-x-8 sm:space-x-12 text-right">
            <span className="w-16 sm:w-20">{displayDates.prev}</span>
            <span className="w-16 sm:w-20 text-white">{displayDates.curr}</span>
          </div>
        </div>

        {/* TABLE CONTENT */}
        <div className="divide-y divide-gray-100">
          {tableData.map((row) => (
            <div 
              key={row.id} 
              className={`
                group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors
                ${row.isLive ? 'bg-red-50/30' : ''}
              `}
            >
              {row.isLive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 rounded-l-sm" />}

              {/* LEFT SIDE */}
              <div className="flex-1 mb-4 sm:mb-0 pl-2">
                <div className="flex items-center space-x-2 mb-1">
                  {row.isLive && (
                    <span className="animate-pulse bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-200">
                      LIVE
                    </span>
                  )}
                  <h3 className="text-gray-900 font-bold text-base sm:text-lg">{row.name}</h3>
                </div>
                
                <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    {row.time}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex justify-between sm:justify-end items-center sm:space-x-12 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                
                {/* Previous Result */}
                <div className="flex flex-col items-center w-16 sm:w-20">
                  <span className="sm:hidden text-[10px] text-gray-400 uppercase mb-1">{displayDates.prev}</span>
                  <span className="text-xl sm:text-2xl font-medium text-gray-400">
                    {row.prevResult}
                  </span>
                </div>

                {/* Current Result */}
                <div className="flex flex-col items-center w-16 sm:w-20 relative">
                  <span className="sm:hidden text-[10px] text-gray-400 uppercase mb-1">{displayDates.curr}</span>
                  {row.currResult === 'XX' ? (
                      <span className="text-xl sm:text-2xl font-bold text-gray-300 tracking-widest">--</span>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-black text-gray-900">
                      {row.currResult}
                    </span>
                  )}
                  
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
        
        {/* FOOTER */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
          <button className="text-sm text-teal-700 font-semibold hover:text-teal-900 flex items-center justify-center mx-auto transition-colors">
            View All Results <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegionalResultsTable;