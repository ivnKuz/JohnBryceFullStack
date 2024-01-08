

class AppConfig{
    // http://3.85.27.152/
    public productsUrl = 'http://3.85.27.152/api/products/' ;
    public emplyeesUrl = 'http://3.85.27.152/api/employees/';
    public signUpUrl = 'http://3.85.27.152/api/register/';
    public loginUrl = 'http://3.85.27.152/api/login/';
    public categoriesUrl = 'http://3.85.27.152/api/categories/';
    public successNotificationDuration = 2000;
    public errorNotificationDuration = 3000;
}
// React version of singleton
const appConfig = new AppConfig();
export default appConfig;

