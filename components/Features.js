import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Features = () => {
  const [aboutRef, setAboutRef] = useState(null);
  const animation = useAnimation();
  const itemAnimation = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.getBoundingClientRect().top < window.innerHeight) {
        animation.start("visible");
        itemAnimation.start("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [aboutRef, animation, itemAnimation]);

  const itemVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    hidden: {
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div
      id="features"
      ref={setAboutRef}
      className="flex flex-col items-center justify-start scroll-mt-16 lg:scroll-mt-0 mb-36 lg:mb-12"
    >
      <div className="mb-2 font-figtree w-[60%] text-center">
        <motion.h2
          animate={animation}
          initial="hidden"
          variants={itemVariants}
          className="font-bold text-4xl mb-10 lg:mt-36 text-gray-200 text-left"
        >
        Why Sotreus Stands Out
        </motion.h2>
      </div>
      <div className="w-[60%]">
        <motion.div
          animate={itemAnimation}
          initial="hidden"
          variants={itemVariants}
          className="flex lg:mb-12 lg:flex-row flex-col justify-center items-start gap-4"
        >
          <div className="lg:w-[50%] pt-32 pb-12 px-6 rounded-2xl text-black" style={{backgroundColor: '#00C0F5'}}>
            <div className="text-4xl rounded-full w-20 h-20 bg-black"><img src="/Search_fill.png" className="w-16 mx-auto pt-2"/></div>
            <div className="flex flex-col mt-2 pb-4">
              <motion.h1 className="font-bold text-3xl">
              Explore Without Limits
              </motion.h1>
              <motion.p className="lg:w-[80%] text-sm font-semibold mt-4">
              Browse securely with advanced encryption, 
safeguarding your data from threats anywhere.
              </motion.p>
            </div>
          </div>
          <div className="lg:w-[50%] pt-28 pb-12 px-6 rounded-2xl text-black" style={{backgroundColor: '#FFFFFF'}}>
          <div className="text-4xl rounded-full w-20 h-20 bg-black"><img src="/Unlock_fill.png" className="w-12 mx-auto pt-4"/></div>
            <div className="flex flex-col mt-4">
              <motion.h1 className="font-bold text-3xl">
              Break Through Barriers
              </motion.h1>
              <motion.p className="lg:w-[80%] text-sm font-semibold mt-4">
              Offers unrestricted global access, allowing 
you to bypass censorship and content 
limitations seamlessly from home or office.
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={itemAnimation}
          initial="hidden"
          variants={itemVariants}
          className="flex lg:flex-row flex-col justify-center items-start lg:mb-12 gap-4"
        >
          <div className="lg:w-[50%] pt-32 pb-10 px-6 rounded-2xl text-white" style={{backgroundColor: '#0090B8'}}>
          <div className="text-4xl rounded-full w-20 h-20 bg-white"><img src="/Chield_check_fill.png" className="w-16 mx-auto pt-3"/></div>
            <div className="flex flex-col mt-4">
              <motion.h1 className="font-bold text-3xl">
              Safeguard Your Digital World
              </motion.h1>
              <motion.p className="lg:w-[80%] text-sm font-semibold mt-4">
              Secures your network, providing reliable 
access and expanding capabilities with cloud 
storage and computing.
              </motion.p>
            </div>
          </div>
          <div className="lg:w-[50%] pt-32 pb-10 px-6 rounded-2xl text-white" style={{backgroundColor: '#004052'}}>
          <div className="text-4xl rounded-full w-20 h-20 bg-white"><img src="/Img_box_fill.png" className="w-16 mx-auto pt-4"/></div>
            <div className="flex flex-col mt-4">
              <motion.h1 className="font-bold text-3xl">
              Innovate with NFT <br></br>
Subscriptions
              </motion.h1>
              <motion.p className="lg:w-[80%] text-sm font-semibold mt-4">
              Enables future-ready, secure, and anonymous 
payments with NFT subscriptions, ensuring 
optimal performance.
              </motion.p>
            </div>
          </div>
        </motion.div>
        {/* <motion.div
          animate={itemAnimation}
          initial="hidden"
          variants={itemVariants}
          className="flex lg:flex-row flex-col justify-center items-center"
        >
          <div className="pt-32 pb-10 px-10 rounded-2xl text-white flex" style={{backgroundColor: '#202333'}}>
            <div className="flex flex-col w-1/2">
            <div className="text-4xl bg-white rounded-full w-20 h-20">
            <img src="/icon5.png" className="w-12 mx-auto pt-4"/>
            </div>
              <motion.h1 className="font-bold text-3xl mt-4">
                NFT Subscriptions
              </motion.h1>
              <motion.p className="text-sm font-semibold mt-4">
                Pay using cryptocurrencies and surf the internet securely -
                Anonymous Browsing without sacrificing speed or bandwidth had
                never been this easy.
              </motion.p>
            </div>
            <img src="/landing.png" className="w-1/2"/>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Features;
