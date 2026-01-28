const DataAPI = import.meta.env.VITE_NEW_SCRAPE_DATABASED;
const api = {
    DataFetch: {
        gameChartLive: `${DataAPI}/game-chart-live`
    }
};
export default api;