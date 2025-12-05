// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutUs from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import SearchEngineOptimization from './pages/Digital-Marketing/SearchEngineOptimization';
import GreyHatSEO from './pages/Digital-Marketing/GreyHatSEO';
import WhiteHatSEO from './pages/Digital-Marketing/WhiteHatSEO';
import BlackHatSEO from './pages/Digital-Marketing/BlackHatSEO';
import FacebookAdvertising from './pages/Social-Media/FacebookAdvertising';
import InstagramMarketing   from './pages/Social-Media/InstagramMarketing';
import LinkedinMarketing    from './pages/Social-Media/LinkedinMarketing';
import PinterestMarketing   from './pages/Social-Media/PinterestMarketing';
import SocialMediaOptimization from './pages/Social-Media/SocialMediaOptimization';
import TwitterMarketing     from './pages/Social-Media/TwitterMarketing';
import YoutubePaidMarketing  from './pages/Social-Media/YoutubePaidMarketing';
import BingAdvertising from './pages/Paid-Marketing/BingAdvertising';
import BrandMarketingServices from './pages/Paid-Marketing/BrandMarketingServices';
import EmailMarketing from './pages/Paid-Marketing/EmailMarketing';
import InfluencerMarketing from './pages/Paid-Marketing/InfluencerMarketing';
import PPCGoogle from './pages/Paid-Marketing/PPCGoogle';
import QuoraMarketing from './pages/Paid-Marketing/QuoraMarketing';
import SearchEngineAndPaidMarketing from './pages/Paid-Marketing/SearchEngineAndPaidMarketing';
import PPCBING from './pages/Paid-Marketing/PPCBING';
import WebDesigningDevelopment from './pages/Web-Design-And-Development/WebDesigningDevelopment';
import MobileAppDevelopment from './pages/Web-Design-And-Development/MobileAppDevelopment';
import LogoDesigning from './pages/Web-Design-And-Development/LogoDesigning';
import ECommerceDevelopment from './pages/Web-Design-And-Development/ECommerceDevelopment';
import FlyerDesign from './pages/Web-Design-And-Development/FlyerDesign';
import BrochureDesigning from './pages/Web-Design-And-Development/BrochureDesigning';
import ChatbotDevelopment from './pages/Web-Design-And-Development/ChatbotDevelopment';
import AIAgentDevelopment from './pages/Web-Design-And-Development/AIAgentDevelopment';
import AIAutomation from './pages/Web-Design-And-Development/AIAutomation';

const App = () => {
  return (
    <Routes>
      {/* The Layout route wraps all pages that need the Navbar/Footer */}
      <Route element={<Layout />}>
        
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path ='/pricing' element={<Pricing/> }/>

        {/* Digital Marketing Routes */}
        <Route path ='/search-engine-optimization' element={<SearchEngineOptimization/> }/>
        <Route path ='/grey-hat-seo' element={<GreyHatSEO/> }/>
        <Route path ='/white-hat-seo' element={<WhiteHatSEO/> }/>
        <Route path ='/black-hat-seo' element={<BlackHatSEO/> }/>

        {/* Social Media Marketing Routes */}
        <Route path ='/facebook-advertising' element={<FacebookAdvertising/> }/>
        <Route path ='/instagram-marketing' element={<InstagramMarketing/> }/>
        <Route path ='/linkedin-marketing' element={<LinkedinMarketing/> }/>
        <Route path ='/pinterest-marketing' element={<PinterestMarketing/> }/>
        <Route path ='/social-media-optimization' element={<SocialMediaOptimization/> }/>
        <Route path ='/twitter-marketing' element={<TwitterMarketing/> }/>
        <Route path ='/youtube-paid-marketing' element={<YoutubePaidMarketing/> }/>
         
        {/* Paid Marketing Routes */}
        <Route path ='/bing-advertising' element={<BingAdvertising/> }/>
        <Route path ='/brand-marketing-services' element={<BrandMarketingServices/> }/>
        <Route path ='/email-marketing' element={<EmailMarketing/> }/>
        <Route path ='/influencer-marketing' element={<InfluencerMarketing/> }/>
        <Route path ='/ppc-bing' element={<PPCBING/> }/>
        <Route path ='/ppc-google' element={<PPCGoogle/> }/>
        <Route path ='/quora-marketing' element={<QuoraMarketing/> }/>
        <Route path ='/search-engine-and-paid-marketing' element={<SearchEngineAndPaidMarketing/> }/>

        {/* Web Design And Development Routes */}
        <Route path ='/website-designing-development' element={<WebDesigningDevelopment/> }/>
        <Route path ='/mobile-app-development' element={<MobileAppDevelopment/> }/>
        <Route path ='/logo-designing' element={<LogoDesigning/> }/>
        <Route path ='/ecommerce-development' element={<ECommerceDevelopment/> }/>
        <Route path ='/flyer-design' element={<FlyerDesign/> }/>
        <Route path ='/brochure-designing' element={<BrochureDesigning/> }/>
        <Route path ='/chatbot-development' element={<ChatbotDevelopment/> }/>
        <Route path ='/ai-agent-development' element={<AIAgentDevelopment/> }/>
        <Route path ='/ai-automation' element={<AIAutomation/> }/>



        
      </Route>
    </Routes>
  );
};

export default App;