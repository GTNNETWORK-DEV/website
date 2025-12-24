import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type CryptoRow = {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  price: number;
  priceChange24h: number | null;
  volume: number;
  volumeChange24h: number | null;
};

const FALLBACK_DATA: CryptoRow[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    price: 43125,
    priceChange24h: 2.1,
    volume: 36100000000,
    volumeChange24h: 5.4,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    price: 2290,
    priceChange24h: 1.6,
    volume: 18200000000,
    volumeChange24h: 3.2,
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    price: 1,
    priceChange24h: 0.01,
    volume: 15400000000,
    volumeChange24h: -1.1,
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
    image: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
    price: 312,
    priceChange24h: -0.4,
    volume: 2700000000,
    volumeChange24h: 1.9,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    price: 105,
    priceChange24h: 4.8,
    volume: 6500000000,
    volumeChange24h: 8.7,
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    price: 0.61,
    priceChange24h: 0.4,
    volume: 2100000000,
    volumeChange24h: 3.2,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    price: 0.52,
    priceChange24h: 1.8,
    volume: 980000000,
    volumeChange24h: 4.1,
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    price: 0.10,
    priceChange24h: -0.2,
    volume: 1200000000,
    volumeChange24h: 2.8,
  },
  {
    id: "avalanche-2",
    name: "Avalanche",
    symbol: "AVAX",
    image: "https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png",
    price: 39,
    priceChange24h: 3.4,
    volume: 1350000000,
    volumeChange24h: 6.3,
  },
  {
    id: "litecoin",
    name: "Litecoin",
    symbol: "LTC",
    image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
    price: 73,
    priceChange24h: 0.8,
    volume: 540000000,
    volumeChange24h: 1.5,
  },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function GTNCryptoTable() {
  const [rows, setRows] = useState<CryptoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let currentController: AbortController | null = null;

    const load = async () => {
      currentController?.abort();
      const controller = new AbortController();
      currentController = controller;

      try {
        if (rows.length === 0) setLoading(true);
        setError(null);

        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h",
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error(`Failed to load market data (${res.status})`);
        }

        const markets = (await res.json()) as Array<{
          id: string;
          name: string;
          symbol: string;
          image?: string;
          current_price: number;
          price_change_percentage_24h: number;
          total_volume: number;
        }>;

        const withVolumeChange = await Promise.all(
          markets.map(async (coin) => {
            let volumeChange: number | null = null;
            try {
              const chartRes = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=2&interval=daily`,
                { signal: controller.signal },
              );
              if (chartRes.ok) {
                const chart = await chartRes.json();
                const volumes: [number, number][] = chart?.total_volumes ?? [];
                if (Array.isArray(volumes) && volumes.length >= 2) {
                  const prev = volumes[volumes.length - 2]?.[1];
                  const latest = volumes[volumes.length - 1]?.[1];
                  if (typeof prev === "number" && typeof latest === "number" && prev > 0) {
                    volumeChange = ((latest - prev) / prev) * 100;
                  }
                }
              }
            } catch (err) {
              if ((err as Error)?.name === "AbortError") {
                return null;
              }
            }

            return {
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol.toUpperCase(),
              image: coin.image,
              price: coin.current_price,
              priceChange24h: coin.price_change_percentage_24h ?? null,
              volume: coin.total_volume,
              volumeChange24h: volumeChange,
            } satisfies CryptoRow;
          }),
        );

        if (controller.signal.aborted || cancelled) return;

        const filtered = withVolumeChange.filter(Boolean) as CryptoRow[];
        const sorted = filtered.sort((a, b) => b.volume - a.volume);
        setRows(sorted);
      } catch (err) {
        if ((err as Error)?.name === "AbortError" || cancelled) return;
        setError(null);
        setRows(FALLBACK_DATA);
      } finally {
        if (!controller.signal.aborted && !cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    const interval = setInterval(load, 45000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      currentController?.abort();
    };
  }, [rows.length]);

  const content = useMemo(
    () =>
      rows.length
        ? rows
        : loading
        ? []
        : FALLBACK_DATA,
    [rows, loading],
  );

  return (
    <section id="market" className="py-20 bg-background/60 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="md:max-w-3xl">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">
              Market Pulse
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
              Top Cryptos by Trade Volume
            </h2>
            
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Updating prices…</span>
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg shadow-xl">
          <Table className="w-full">
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10">
                <TableHead className="text-white/80 pl-4 text-center">Asset</TableHead>
                <TableHead className="text-white/80 text-center">Price</TableHead>
                <TableHead className="text-white/80 text-center">24h %</TableHead>
                <TableHead className="text-white/80 text-center hidden md:table-cell">
                  24h Volume
                </TableHead>
                <TableHead className="text-white/80 text-center pr-4 hidden md:table-cell">
                  Volume % (24h)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-gray-400">
                    Fetching live market data…
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                content.map((row) => (
                  <TableRow key={row.id} className="border-white/5 hover:bg-white/5">
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        {row.image ? (
                          <img
                            src={row.image}
                            alt={row.name}
                            className="w-8 h-8 rounded-full border border-white/10"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/70">
                            {row.symbol}
                          </div>
                        )}
                        <div>
                          <div className="text-white font-semibold">{row.name}</div>
                          <div className="text-xs text-gray-400">{row.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-white">
                      {currency.format(row.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      <ChangePill value={row.priceChange24h} />
                    </TableCell>
                    <TableCell className="text-right text-white hidden md:table-cell">
                      {compactNumber.format(row.volume)}
                    </TableCell>
                    <TableCell className="text-right pr-4 hidden md:table-cell">
                      <ChangePill value={row.volumeChange24h} />
                    </TableCell>
                  </TableRow>
                ))}

              {!loading && content.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-gray-400">
                    No market data available right now.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>Source: CoinGecko (24h metrics)</span>
        </div>
      </div>
    </section>
  );
}

function ChangePill({ value }: { value: number | null }) {
  if (value === null || Number.isNaN(value)) {
    return <span className="text-gray-400">--</span>;
  }

  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-end gap-1 text-sm font-semibold",
        positive ? "text-emerald-400" : "text-rose-400",
      )}
    >
      {positive ? (
        <ArrowUpRight className="w-4 h-4" />
      ) : (
        <ArrowDownRight className="w-4 h-4" />
      )}
      {value.toFixed(2)}%
    </span>
  );
}
