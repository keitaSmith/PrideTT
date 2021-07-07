import db from '../constants/DBUrl'
class PrideTTRecentEvent{
    constructor(id, title,imgUrl) {
        this.id = id;
        this.title = title;
        this.imgUrl = {uri: db.url + imgUrl};
      }
}
export default PrideTTRecentEvent;