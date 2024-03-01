

class AppConfig{
    public baseUrl = 'http://localhost:8080/api'
    public audienceUrl = `${this.baseUrl}/audiences`;
    public giftsUrl = `${this.baseUrl}/gifts/audience`;
    public addGiftsUrl = `${this.baseUrl}/gifts`;
    public successNotificationDuration = 2000;
    public errorNotificationDuration = 3000;
}
// React version of singleton
const appConfig = new AppConfig();
export default appConfig;

