const generateMockData = (days: number = 30): any[] => {
    const data = [];

    let price = 100;

    const baseTime = new Date();
    baseTime.setDate(baseTime.getDate()- days);
    for(let i = 0; i< days; i++){
        const time = new Date(baseTime);
        time.setDate(baseTime.getDate() + i)

        const open = price;
        const volatility = Math.random() * 5
        const change = (Math.random() - 0,5) * volatility;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 2;
        const low = Math.min(open, close) - Math.random() * 2;

        data.push({
            time: time.toISOString().split('T')[0],
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2)),
            volume: Math.floor(Math.random() * 1_000_000)
        });

        price = close;
    }   
    return data;
}