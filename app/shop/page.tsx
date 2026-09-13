import Footer from "@/components/footer";
import Header from "@/components/header";

const Shop = () => {
  return (
    <div className="flex w-screen flex-col">
      <Header />
      <div className="mb-10 flex h-[20vh] w-full flex-row items-center">
        <div className="flex flex-1 flex-col">
          <h1 className="text-3xl font-bold text-wrap">
            Premium Hair Extensions
          </h1>
          <p className="text-wrap">
            Ethically sourced, luxury virgin hair collections. Experience
            unmatched quality and longevity with our signature bundles.
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center *:text-xs *:text-wrap">
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <div className="flex flex-row gap-2 *:rounded-2xl *:bg-[#E2E3E1] *:px-2 *:py-1 *:hover:bg-[#7c4b8b] *:hover:text-white">
              <button>All Collections</button>
              <button>Body Wave</button>
              <button>French Curls</button>
            </div>
            <div className="flex flex-row gap-2 *:rounded-2xl *:bg-[#E2E3E1] *:px-2 *:py-1 *:hover:bg-[#7c4b8b] *:hover:text-white">
              <button>Deep Wave</button>
              <button>Itaian Curls</button>
              <button>Silky Straight</button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[40vh]">
        <h1 className="text-2xl font-bold">Bundle Deals</h1>
      </div>
      <div className="h-[40vh]">
        <h1 className="text-2xl font-bold">Single Bundles</h1>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
