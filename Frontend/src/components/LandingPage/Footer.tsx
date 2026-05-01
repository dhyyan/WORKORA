import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon, GithubIcon } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Company: ['About Us', 'Careers', 'Press', 'Blog'],
    Support: ['Help Center', 'Safety', 'Contact Us', 'FAQ'],
    Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Licenses'],
    Community: ['Events', 'Forum', 'Affiliates', 'Referrals']
  };

  const socialLinks = [
    { icon: FacebookIcon, href: '#' },
    { icon: TwitterIcon, href: '#' },
    { icon: LinkedinIcon, href: '#' },
    { icon: InstagramIcon, href: '#' },
    { icon: GithubIcon, href: '#' }
  ];

  return (
    <footer className="w-full bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Workora<span className="text-emerald-500">.</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-xs">
              Connecting elite talent with world-class opportunities, one project at a time.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 border border-white/5"
                  aria-label="Social Link"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-6 tracking-wider uppercase text-sm">{category}</h4>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Workora. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors duration-300">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors duration-300">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors duration-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}