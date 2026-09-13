const Footer = () => {
  return (
    <div className="flex h-[20vh] w-full flex-col bg-[#E2E3E1] px-[5%]">
      <div className="flex h-[15vh] flex-row items-center">
        <div className="flex flex-3">
          <div className="flex flex-1 flex-col">
            <h2>KUT</h2>
            <p className="text-wrap">
              Providing premium hair solutions for the discerning professional.
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <h2>Contact</h2>
            <p>Email: kut.inc@outlook.com</p>
          </div>
          <div className="flex flex-1 flex-col">
            <h2 className="">Legal</h2>
            <p className="">Privacy Policy</p>
            <p className="">Terms of Service</p>
          </div>
        </div>
        <div className="flex flex-1"></div>
      </div>
      <div className="justify-centerd h-[5vh] w-full flex-row items-center text-center">
        <p>&copy; {new Date().getFullYear()} KUT. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
