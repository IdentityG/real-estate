import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-alabaster to-white">
      <div className="text-center">
        <div className="w-24 h-24 bg-deep-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-deep-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h6m-6 4h6" />
          </svg>
        </div>
        <h1 className="font-playfair text-4xl font-bold text-royal-navy mb-4">
          Property Not Found
        </h1>
        <p className="font-montserrat text-lg text-slate-gray mb-8 max-w-md mx-auto">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Properties
        </Link>
      </div>
    </div>
  );
}