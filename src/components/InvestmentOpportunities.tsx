"use client";

const InvestmentOpportunities = () => {
  const cards = [
    {
      name: "Power-Max Plus",
      amount: "₹5,000",
      returns: "₹33",
      period: "304 days",
      total: "₹10,032",
      image:
        "https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2025/04/PowerMax.jpg", // Replace with your image URL
    },
    {
      name: "Power-Max Ultra",
      amount: "₹15,000",
      returns: "₹99",
      period: "304 days",
      total: "₹30,096",
      image:
        "https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2025/04/PowerMax-Ultra.jpg", // Replace with your image URL
    },
    {
      name: "Power-Max Pro",
      amount: "₹20,000",
      returns: "₹132",
      period: "304 days",
      total: "₹40,128",
      image:
        "https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2025/04/VoltHive-Core.jpg", // Duplicate for example
    },
    {
      name: "Power-Boost Max",
      amount: "₹25,000",
      returns: "₹165",
      period: "304 days",
      total: "₹50,160",
      image:
        "https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2025/04/Solar-Edge.jpg", // Duplicate for example
    },
    {
      name: "Power-Boost Max",
      amount: "₹50,000",
      returns: "₹330",
      period: "304 days",
      total: "₹1,00,320",
      image:
        "https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2025/04/Solar-Edge.jpg", // Duplicate for example
    },
  ];

  return (
    <section
      className="py-20 px-4 sm:px-6 md:px-20 bg-cover bg-center text-white relative"
      style={{
        backgroundImage:
          "url('https://darkviolet-tapir-631906.hostingersite.com/wp-content/uploads/2023/10/1.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-400 mb-12">
          INVESTMENT OPPORTUNITIES
        </h2>

        <div className="space-y-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-white/10 rounded-xl p-6 md:p-10 border border-blue-400/30 shadow-xl backdrop-blur-sm"
            >
              {/* Image */}
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-[180px] h-auto rounded-lg"
                />
              </div>

              {/* Text */}
              <div className="md:w-2/3 md:pl-10 text-center md:text-left">
                <p className="text-xl font-semibold">
                  Product Name: <span className="text-white">{card.name}</span>
                </p>
                <p className="mt-2">Investment Amount: {card.amount}</p>
                <p>Daily Returns: {card.returns}</p>
                <p>Income Period: {card.period}</p>
                <p>Total Income: {card.total}</p>
                <p className="text-sm mt-2 text-gray-300">
                  Explore various investment options within the app to find the
                  perfect fit for your financial goals.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpportunities;
