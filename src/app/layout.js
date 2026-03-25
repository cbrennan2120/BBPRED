import './globals.css';

export const metadata = {
  title: 'Cyberathlete Bodybuilding Prediction',
  description: 'Predict the Top 5 IFBB Pro Open placements.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-rich-black text-champagne-onyx font-sans">
        {/* Hidden form for Netlify to detect during build/crawl */}
        <form name="prediction-form" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="prediction-form" />
          <input type="text" name="userName" />
          <input type="text" name="showId" />
          <input type="text" name="top5" />
        </form>
        {children}
      </body>
    </html>
  );
}
