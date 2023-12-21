

class AppConfig{
    public productsUrl = 'http://localhost:3030/api/products/' ;
    public emplyeesUrl = 'http://localhost:3030/api/employees/';
    public successNotificationDuration = 2000;
    public errorNotificationDuration = 3000;
}
// React version of singleton
const appConfig = new AppConfig();
export default appConfig;

