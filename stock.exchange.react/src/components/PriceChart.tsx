import { useEffect, useRef, useState } from "react";
import { CandlestickData, CandlestickSeries, ColorType, createChart, IChartApi, ISeriesApi } from "lightweight-charts";

interface PriceData{
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}

interface PriceDataProps{
    data: PriceData[];
    symbol: string;
    height?: number;
}

const PriceChart: React.FC<PriceDataProps> = ({
    data,
    symbol,
    height = 500
}) => {
    const chartConteinerRef = useRef<HTMLDivElement>(null);
    const [chart, setChart] = useState<IChartApi | null>(null);
    const [candleSeries, setCandleSeries] = useState<ISeriesApi<"Candlestick"> | null >(null);

    useEffect(()=>{
        if(!chartConteinerRef.current) return;

        const chartInstance = createChart(chartConteinerRef.current, {
            layout:{
                background: {type: ColorType.Solid, color:"#fff"},
                textColor: '#333',
            },
            grid:{
                vertLines: {color: "#000000"},
                horzLines: {color: "#000000"},
            },
            width: chartConteinerRef.current.clientWidth,
            height: height,
            timeScale:{
                timeVisible: true,
                secondsVisible: true,
            }
        });

        const series = chartInstance.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#EF5350',
            borderVisible: false,
            wickUpColor: '#26A69A',
            wickDownColor: '#EF5350',
        });

        setChart(chartInstance);
        setCandleSeries(series);

        const handleResize = () => {
            if(chartConteinerRef.current){
                chartInstance.applyOptions({
                    width: chartConteinerRef.current.clientWidth,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance.remove();
        }
    });
    
    useEffect(()=>{

        if(candleSeries && data.length > 0){
            const formatterData: CandlestickData[] = data.map(
                item => ({
                    time: item.time,
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    close: item.close,
                }));
                candleSeries.setData(formatterData);
        }
    }, [candleSeries, data]);


    return (
        <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{symbol} Price Chart</h3>
        <div className="flex space-x-2 text-sm">
          <span className="text-green-600">○ Bullish</span>
          <span className="text-red-600">○ Bearish</span>
        </div>
      </div>
      <div ref={chartConteinerRef} />
    </div>
    )
};

export default PriceChart;