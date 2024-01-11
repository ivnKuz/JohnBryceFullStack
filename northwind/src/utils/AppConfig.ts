

class AppConfig{
    // public apiBaseUrl = 'http://localhost:3030';
    public apiBaseUrl = 'https://murmuring-ocean-69355-1c3f77a1ae50.herokuapp.com'
    public productsUrl = `${this.apiBaseUrl}/api/products/` ;
    public emplyeesUrl = `${this.apiBaseUrl}/api/employees/`;
    public signUpUrl = `${this.apiBaseUrl}/api/register/`;
    public loginUrl = `${this.apiBaseUrl}/api/login/`;
    public categoriesUrl = `${this.apiBaseUrl}/api/categories/`;
    public successNotificationDuration = 2000;
    public errorNotificationDuration = 3000;
}
// React version of singleton
const appConfig = new AppConfig();
export default appConfig;

