import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

//  Metadata for the app to be used for
//  SEO, social media sharing, etc.
export const metadata = {
  title: "Promptorium",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  // Define the root html layout of the app
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        {/* Main Content Aread of the App */}
        <main className="app">
          <Nav />
          {children}
          {/* this represents content of pages injected into the layout */}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;

/*  This RootLayout component serves as the base layout for your Next.js application. 
    It includes global styles, a navigation component, and a provider component for 
    context management. The {children} prop allows individual pages to inject their 
    specific content into this common layout, ensuring consistent structure and 
    styling across the application.
*/
