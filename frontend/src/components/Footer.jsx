import React from 'react';

const Footer = () => {
  const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Supervisors', url: '/supervisors' },
    { name: 'Students', url: '/students' },
    { name: 'Contact', url: '/contact' }
  ];
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Top section with navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo or brand name */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">YourBrand</h2>
          </div>
          
          {/* Navigation links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url} 
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>
        
        {/* Bottom section with copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>© {currentYear} YourBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;