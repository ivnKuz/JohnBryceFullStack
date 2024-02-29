

class AppConfig{
    public apiBaseLoremUrl = 'http://localhost:8080/api/lorem';
    // public apiBaseUrl = 'https://murmuring-ocean-69355-1c3f77a1ae50.herokuapp.com'
    
    public successNotificationDuration = 2000;
    public errorNotificationDuration = 3000;
}
// React version of singleton
const appConfig = new AppConfig();
export default appConfig;

