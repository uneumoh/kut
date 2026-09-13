import Footer from "@/components/footer";
import Header from "@/components/header";

const Checkout = () => {
  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      <Header />

      <main className="flex w-full flex-row py-[5%]">
        <section className="flex flex-3 flex-col justify-center gap-5 px-[5%]">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Secure Checkout</h1>
            <p className="text-wrap">
              Our premium ordering process ensures that every detail is
              confirmed before payment. Please review your order and provide
              shipping details below.
            </p>

            <div className="flex flex-row gap-8">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">1. SUBMIT REQUEST</h2>
                <p className="text-wrap">
                  Place your order request. Our team will review and approve the
                  inventory allocation within 24 hours.
                </p>
              </div>

              <div className="flex flex-col">
                <h2 className="text-lg font-bold">2. BANK TRANSFER</h2>
                <p className="text-wrap">
                  Upon approval, you will receive an email with our secure bank
                  transfer details to finalize your purchase.
                </p>
              </div>
            </div>

            <section className="flex w-full flex-col gap-5">
              <h2 className="text-xl font-bold">Shipping Details</h2>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="rounded-md border border-gray-500 bg-white p-2"
                    name="firstName"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="rounded-md border border-gray-500 bg-white p-2"
                    name="lastName"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="rounded-md border border-gray-500 bg-white p-2"
                  name="email"
                />
              </div>

              <div className="flex w-full flex-col">
                <label htmlFor="streetAddress">Street Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  className="rounded-md border border-gray-500 bg-white p-2"
                  name="streetAddress"
                />
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div className="flex w-auto flex-col">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    placeholder="Lekki"
                    className="rounded-md border border-gray-500 bg-white p-2"
                    name="city"
                  />
                </div>

                <div className="flex w-auto flex-col">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    placeholder="Lagos"
                    className="rounded-md border border-gray-500 bg-white p-2"
                    name="state"
                  />
                </div>

                <div className="flex w-auto flex-col">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    placeholder="Nigeria"
                    className="rounded-md border border-gray-500 bg-white p-2"
                    name="country"
                  />
                </div>
              </div>
            </section>
          </div>
        </section>

        <aside className="flex flex-2 flex-col gap-5 px-[5%]">
          <h2 className="text-xl font-bold">Order Summary</h2>
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
