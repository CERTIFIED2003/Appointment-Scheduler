export const backend = () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : "https://events-scheduler.vercel.app";
    return { backendURL };
}