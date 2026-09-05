import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex w-screen flex-col">
      <div className="flex h-[10vh] w-screen flex-row bg-[#E2E3E1]">
        <div className="flex flex-1 flex-row"></div>
        <div className="flex flex-1 flex-row items-center justify-center gap-5">
          <button className="flex-1 text-xl hover:cursor-pointer hover:text-[#7c4b8b]">
            Home
          </button>
          <button className="flex-1 text-xl hover:cursor-pointer hover:text-[#7c4b8b]">
            Shop Bundles
          </button>
          <button className="flex-1 text-xl hover:cursor-pointer hover:text-[#7c4b8b]">
            My Orders
          </button>
          <button className="flex-1 text-xl hover:cursor-pointer hover:text-[#7c4b8b]">
            Admin Portal
          </button>
        </div>
        <div className="flex flex-1 flex-row">{/* Cart Image */}</div>
      </div>
      <div className="flex h-[90vh] flex-col items-center justify-center">
        <p className="text-3xl font-bold">Your New Hair Obsession</p>
        <p className="text-2xl text-[#7c4b8b]">Untamed Elegance</p>
        <div className="w-3/4 text-center">
          <p className="text-wrap">
            Discover the industry&apos;s most sought-after raw and virgin hair
            extensions, meticulously sourced and crafted for the discerning
            professional.
          </p>
        </div>
        <div className="mt-5 flex flex-row gap-5">
          <button className="rounded bg-[#7c4b8b] px-4 py-2 text-white hover:bg-transparent hover:text-black">
            Explore Bundles
          </button>
          <button className="rounded bg-[#7c4b8b] px-4 py-2 text-white hover:bg-transparent hover:text-black">
            The KUT Standard
          </button>
        </div>
      </div>
      <div className="flex h-[50vh] flex-row gap-5 p-10">
        <div className="flex flex-1 flex-col">
          <p>Body Wave</p>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1">Deep Wave</div>
          <div className="flex-1">French Curls</div>
        </div>
      </div>
      <div className="flex h-[80vh] w-screen bg-[#fffac6]">
        <div className="flex flex-1 flex-row gap-5 p-10">
          <div className="flex flex-1 flex-col items-center justify-center gap-5">
            <div className="w-full">
              <p className="text-2xl font-bold">Why KUT</p>
            </div>
            <div className="w-full">
              <h1 className="text-6xl font-semibold">
                Elevating the Art of Hair.
              </h1>
            </div>
            <p className="text-wrap">
              We bypass middlemen to source directly from temples, ensuring
              every bundle meets our obsessive standards for cuticle alignment,
              density, and longevity.
            </p>
            <div className="flex flex-row">
              <div className="flex flex-1">
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold">Raw Authenticity</p>
                  <p className="text-wrap">
                    Unprocessed, pure cuticles intact for styling versatility.
                  </p>
                </div>
              </div>
              <div className="flex flex-1">
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold">Priority Dispatch</p>
                  <p className="text-wrap">
                    Secure, expedited shipping directly to your doorstep.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <p className="text-xl font-bold">Concierge Support</p>
              <p className="text-wrap">
                Secure, expedited shipping directly to your salon.
              </p>
            </div>
          </div>
          <div className="flex flex-1">Images go here</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
