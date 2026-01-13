import { useEffect, useState } from "react";
import AssetChart from "./AssetChart";

const ASSETS = [
  { symbol: "AAPL", base: 190 },
  { symbol: "MSFT", base: 410 },
  { symbol: "BTC-USD", base: 43000 },
  { symbol: "ETH-USD", base: 2300 }
];

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const updated = { ...prev };

        ASSETS.forEach(asset => {
          const last =
            updated[asset.symbol]?.slice(-1)[0]?.price ??
            asset.base;

          const nextPrice =
            last + (Math.random() - 0.5) * asset.base * 0.005;

          updated[asset.symbol] = [
            ...(updated[asset.symbol] || []).slice(-20),
            {
              time: new Date().toLocaleTimeString(),
              price: Number(nextPrice.toFixed(2))
            }
          ];
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Realtime Crypto Dashboard</h1>

      <div className="grid">
        {ASSETS.map(a => (
          <AssetChart
            key={a.symbol}
            title={a.symbol}
            data={data[a.symbol] || []}
          />
        ))}
      </div>
    </div>
  );
}
