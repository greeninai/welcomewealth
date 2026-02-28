/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import Accessibility from './pages/Accessibility';
import App from './pages/App';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Disclaimer from './pages/Disclaimer';
import Home from './pages/Home';
import PartnerApplication from './pages/PartnerApplication';
import Partners from './pages/Partners';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Transparency from './pages/Transparency';
import BlogAdmin from './pages/BlogAdmin';
import AdminDashboard from './pages/AdminDashboard';
import PartnersAdmin from './pages/PartnersAdmin';
import ApplicationsAdmin from './pages/ApplicationsAdmin';
import LeadsAdmin from './pages/LeadsAdmin';
import AdminLogin from './pages/AdminLogin';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Accessibility": Accessibility,
    "App": App,
    "Blog": Blog,
    "BlogPost": BlogPost,
    "Disclaimer": Disclaimer,
    "Home": Home,
    "PartnerApplication": PartnerApplication,
    "Partners": Partners,
    "Privacy": Privacy,
    "Terms": Terms,
    "Transparency": Transparency,
    "BlogAdmin": BlogAdmin,
    "AdminDashboard": AdminDashboard,
    "PartnersAdmin": PartnersAdmin,
    "ApplicationsAdmin": ApplicationsAdmin,
    "LeadsAdmin": LeadsAdmin,
    "AdminLogin": AdminLogin,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};