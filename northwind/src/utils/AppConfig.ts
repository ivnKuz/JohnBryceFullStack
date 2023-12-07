

class AppConfig{
    public productsUrl = 'http://localhost:3030/api/products/' ;
}
// React version of singleton
const appConfig = new AppConfig();
export default appConfig;