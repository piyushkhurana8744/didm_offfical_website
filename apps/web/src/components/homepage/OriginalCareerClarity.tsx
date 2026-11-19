import Link from 'next/link';
import { Download, Play, BookOpen } from 'lucide-react';
import { MotionSection } from '@/components/motion';

export function OriginalCareerClarity() {
  return (
    <MotionSection preset="editorial" className="py-14 bg-gradient-to-r from-red-700 via-[#b52828] to-red-800 text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Title Column */}
          <div className="text-center lg:text-left space-y-2">
            <p className="text-sm uppercase tracking-widest text-red-200 font-semibold">
              Need Expert Guidance?
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
              Still Confused...... ??
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300 tracking-wide">
              GET INSTANT CAREER CLARITY
            </h3>
            <p className="text-sm sm:text-base text-red-100 max-w-xl font-body">
              Speak directly with our senior career advisors to explore course curriculum, batch timings, EMI options, and guaranteed 100% placement support.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[280px] sm:min-w-[340px]">
            <a
              href="/enquire?form=brochure"
              className="flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-[#b52828] font-bold text-sm sm:text-base rounded-md shadow-md hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Request brochure</span>
              <Download className="w-4 h-4 text-[#b52828]" />
            </a>

            <a
              href="/contact"
              className="flex items-center justify-center gap-3 px-6 py-3.5 bg-yellow-400 text-gray-900 font-bold text-sm sm:text-base rounded-md shadow-md hover:bg-yellow-300 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Start With Free Demo</span>
              <Play className="w-4 h-4 text-gray-900 fill-current" />
            </a>

            <Link
              href="/master-in-digital-marketing-course"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-900/60 hover:bg-black text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md border border-red-400/40 transition-all text-center"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Training Details</span>
            </Link>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
