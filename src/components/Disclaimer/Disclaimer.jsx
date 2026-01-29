import React, { memo } from 'react';

const Disclaimer = memo(function Disclaimer() {
  return (
    <aside 
      className="w-full bg-[#0a0a0a] border-t border-white/5 py-8 px-4"
      aria-label="Legal Disclaimer"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/5 shadow-inner">
          
          {/* 1. Icon (Visual Indicator) */}
          <div className="shrink-0 mt-0.5 text-yellow-500/80">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>

          {/* 2. Text Content */}
          <div className="flex-1">
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">
              <strong className="text-slate-200 uppercase tracking-widest mr-1">
                Disclaimer:
              </strong>
              This website is an independent media portal for informational and journalistic purposes only. As a non-transactional service, we are not affiliated with any entity mentioned. Users are solely responsible for complying with all applicable laws in their jurisdiction.
              
              {/* 3. "Read More" Link (Redirects to /terms-of-service) */}
              <a 
                href="/terms-of-service" 
                className="ml-2 inline-flex items-center gap-1 text-yellow-500 hover:text-yellow-400 transition-colors font-bold whitespace-nowrap group"
                aria-label="Read full terms of service"
              >
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 transform transition-transform group-hover:translate-x-0.5">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </p>
          </div>
          
        </div>
      </div>
    </aside>
  );
});

export default Disclaimer;