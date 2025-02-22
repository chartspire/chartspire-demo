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
                period: { multiplier: 1, timespan: 'week', text: 'W' },
                // subIndicators: ['VOL', 'MACD'],
                theme: 'dark',
                watchlistEnabled: true,
                useExternalWatchListStorage: false,
                defaultDataFeed: new BinanceDataFeed(),
                // stockDataFeed: new StocksDataFeed(),
                cryptoDataFeed: new BinanceDataFeed(),
                useExternalLayoutStorage: false,
                layoutLimit: 10,
            }

            // @ts-expect-error suppress
            chartRef.current = new ChartSpire(options)
            // createIndicator (volumeBars)
        }

        // const onWatchlistChange = async (watchlist: Record<string, TickerInfoMap[]>) => {
        //     console.log('Watchlist has changed:', watchlist)
        //     try {
        //         const response = await fetch('http://localhost:3000/watchlist/add', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(watchlist)
        //         })
        //         console.log('Response: ', response)
        //         if (response.ok) {
        //             console.log('Watchlist updated successfully in the backend.')
        //         } else {
        //             console.error('Failed to update watchlist in the backend.')
        //         }
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // }

        // // @ts-expect-error suppress
        // setWatchListChangeCallback(onWatchlistChange)
        //
        // const fetchWatchListWithCallback = async (): Promise<TickerInfoMap | null> => {
        //     console.log('Fetching watchlist from the backend...')
        //     try {
        //         const response = await fetch('http://localhost:3000/watchlist')
        //         if (response.ok) {
        //             const data = await response.json().catch(() => null)
        //             if (data) {
        //                 console.log('Watchlist retrieved successfully from the backend: ', data)
        //                 return data
        //             } else {
        //                 console.error('Failed to get watchlist from the backend.')
        //                 return null
        //             }
        //         } else {
        //             console.error('Failed to get watchlist from the backend.')
        //             return null
        //         }
        //     } catch (error) {
        //         console.error('Error:', error)
        //         return null
        //     }
        // }

        // setGetWatchListsCallback(fetchWatchListWithCallback)
        //
        // const getStore = async (): Promise<Layouts | null> => {
        //     try {
        //         // console.log('ChartSpire: Fetching layout from the backend...')
        //         const response = await fetch('http://localhost:3000/layouts')
        //         // console.log('ChartSpire: response received');
        //         if (response.ok) {
        //             // const data = await response.json();
        //             const data = await response.json().catch(() => null);
        //
        //             if (data) {
        //                 // console.log('ChartSpire: Layout retrieved successfully from the backend: ');
        //                 // Transform the object into an array of LayoutEntry
        //                 // console.log('Transformed Layouts:', layoutsArray);
        //                 return data
        //             } else {
        //                 console.error('ChartSpire: Failed to get layout from the backend.')
        //                 return null
        //             }
        //         } else {
        //             console.error('ChartSpire: Failed to get layout from the backend.')
        //             return null
        //         }
        //     } catch (error) {
        //         console.error('ChartSpire: Error:', error)
        //         return null
        //     }
        // }
        //
        // setGetStoreCallback(getStore)
        //
        // const updateStore = async (layoutName: string, layoutData: LayoutData): Promise<void> => {
        //     try {
        //         // console.log('ChartSpire: Updating layout in the backend...')
        //         const response = await fetch('http://localhost:3000/layouts/add', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({ [layoutName]: layoutData })
        //         });
        //         if (response.ok) {
        //             // console.log('ChartSpire: Layout updated successfully in the backend.');
        //         } else {
        //             console.error('ChartSpire:  Failed to update layout in the backend.');
        //         }
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // }
        //
        // setUpdateStoreCallback(updateStore)
        //
        // const deleteStore = async (layoutName: string): Promise<void> => {
        //     try {
        //         // console.log('ChartSpire: Deleting layout from the backend for layout: ', layoutName);
        //         const response = await fetch('http://localhost:3000/layouts/delete', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({ layoutName })
        //         });
        //         if (response.ok) {
        //             // console.log('ChartSpire: Layout deleted successfully in the backend.');
        //         } else {
        //             console.error('ChartSpire:  Failed to delete layout in the backend.');
        //         }
        //     } catch (error) {
        //         console.error('Error deleting: ', error);
        //     }
        // }
        //
        // setDeleteStoreCallback(deleteStore)

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
