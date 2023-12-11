

class AppConfig{
    public productsUrl = 'http://localhost:3030/api/products/' ;
    public emplyeesUrl = 'http://localhost:3030/api/employees/';
}
// React version of singleton
const appConfig = new AppConfig();
export default appConfig;