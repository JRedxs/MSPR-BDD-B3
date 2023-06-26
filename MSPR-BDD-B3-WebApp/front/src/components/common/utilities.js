export const cleanSession = () => {
    window.sessionStorage.removeItem("name");
    window.sessionStorage.removeItem("number");
    window.sessionStorage.removeItem("road");
    window.sessionStorage.removeItem("complement");
    window.sessionStorage.removeItem("town");
    window.sessionStorage.removeItem("code");
    window.sessionStorage.removeItem("photo");
}


