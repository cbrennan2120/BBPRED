import './globals.css';

export const metadata = {
  title: 'CBsBodybuilding Prediction',
  description: 'Predict the Top 5 IFBB Pro Open placements.',
};

import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-rich-black text-champagne-onyx font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
