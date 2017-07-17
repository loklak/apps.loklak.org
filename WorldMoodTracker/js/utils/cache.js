let cachedData = {};

export function getFromCache(time) {
    if (!cachedData.expiry) {
        return undefined;
    }
    if (cachedData.expiry < Date.now()) {
        return undefined;
    }
    return cachedData.cache[time];
}

export function updateCache(data) {
    cachedData.expiry = Date.now() + 5 * 60 * 1000;  // 5 minutes
    if (!cachedData.cache) {
        cachedData.cache = {};
    }
    cachedData.cache[data.time] = data.cache;
}
