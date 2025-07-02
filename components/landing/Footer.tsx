import { Section } from "./Section";
import Image from "next/image";

const Footer = () => {
  return (
    <Section className="bg-primary">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="flex items-center">
            <Image
              src="/assets/icons/logo.png"
              alt="Logo"
              width={64}
              height={64}
              className="h-[4rem] w-auto"
              priority
            />
            <p className="text-white font-semibold text-3xl ml-2">Grammoro</p>
          </div>
          <div>
            <ul className="flex flex-col items-center justify-evenly gap-[1rem] lg:flex-row">
              <li>
                <a href="#home" className="text-lg text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-lg text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-lg text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-lg text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul className="flex flex-col items-center justify-evenly gap-[1rem] lg:flex-row lg:gap-0">
            <li>
              <a href="#home" className="text-lg text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#contact" className="text-lg text-white">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#contact" className="text-lg text-white">
                Cookie Preferences
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
          <p className="text-lg text-white text-center">
            © 2025 Grammoro. All Rights Reserved.
          </p>
          <p className="text-lg text-white text-center">
            Made with ❤️ by madlab.com
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Footer;