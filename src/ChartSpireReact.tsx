import { useEffect, useRef } from 'react'
import {
    BinanceDataFeed,
    ChartOptions,
    ChartSpire,
    // setGetWatchListsCallback,
    // setWatchListChangeCallback,
    TICKER_TYPE,
    // TickerInfoMap
} from 'chartspire'

const ChartSpireReact = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartContainerRef.current) {
            // @ts-expect-error suppress
            const options: ChartOptions  = {
                container: chartContainerRef.current,
                locale: 'en-US',
                // locale: 'zh-CN',
                ticker: {
                    exchange: 'binance',
                    market: 'Crypto',
                    name: 'Bitcoin',
                    shortName: 'BTCUSDT',
                    ticker: 'BTCUSDT',
                    priceCurrency: 'usd',
                    type: TICKER_TYPE.CRYPTO,
                },
                // ticker: {
                //     exchange: 'nasdaq',
                //     market: 'Stocks',
                //     name: 'Apple Inc',
                //     shortName: 'AAPL',
                //     ticker: 'AAPL',
                //     priceCurrency: 'usd',
                //     type: TICKER_TYPE.STOCKS,
                // },
                interval: { multiplier: 1, timespan: 'week', text: 'W' },
                // subIndicators: ['VOL', 'MACD'],
                // theme: 'Dark Theme',
                watchlistEnabled: true,
                watchListUseExternalStorage: false,
                defaultDataFeed: new BinanceDataFeed(),
                // stockDataFeed: new StocksDataFeed(),
                cryptoDataFeed: new BinanceDataFeed(),
                layoutUseExternalStorage: false,
                layoutLimit: 10,
                paperTradingEnabled: true,
                paperTradingUseExternalStorage: false,
                paperTradingPriceTrackingInterval: 30000,
                paperTradingMaxTrades: 100, // Limit to 100 trades (minimum: 1, default: 1000)
                // multiChartDelay: 1000,
                multiChartLimit: 16,
                themeUseExternalStorage: false,
                orderBookEnabled: true,
                // fontFamily: 'Roboto'
                // fontFamily: 'monospace'
            }

            // @ts-expect-error suppress
            chartRef.current = new ChartSpire(options)
            // createIndicator (volumeBars)
        }

        return () => {
            if (chartRef.current) {
                console.warn('chartRef.current.destroy() called in ChartSpireReact.tsx useEffect cleanup function')
                // @ts-expect-error suppress
                chartRef.current.destroy()
                chartRef.current = null
            }
        }
    }, [])
    return <div id="container" ref={chartContainerRef} />;
};

export default ChartSpireReact;
