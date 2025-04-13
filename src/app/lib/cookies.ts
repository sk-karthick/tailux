import Cookies from "js-cookie";

const COOKIE_KEY = "likedProducts";

export function getLikedProductsFromCookies(): number[] {
    const cookie = Cookies.get(COOKIE_KEY);
    return cookie ? JSON.parse(cookie) : [];
}

export function saveLikedProductsToCookies(productIds: number[]) {
    Cookies.set(COOKIE_KEY, JSON.stringify(productIds), { expires: 7 }); // 7 days
}

export function clearLikedProductsCookies() {
    Cookies.remove(COOKIE_KEY);
}
