import moment from 'moment';
class PrideTTEvent {
  constructor(id, title, content, category, location, favorite, imgUrl, registrationUrl, start_time, end_time, new_date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.location = location;
    this.favorite = favorite;
    this.imgUrl = { uri: 'http://186.96.211.174:1337' + imgUrl };
    this.registrationUrl = registrationUrl
    this.start_time = new Date(start_time);
    this.end_time = new Date(end_time);
    this.new_date = new_date;
  };
  get readableStart() {
    return moment(this.start_time).format('ddd Do, h:mm a');
  };
  get readableEnd() {
    return moment(this.end_time).format('h:mm a');
  };
  get readableDate() {
    return moment(this.start_time).format('MMMM Do YYYY');
  }
  get readableEventDetailsDate() {
    return moment(this.start_time).format('dddd Do MMMM, h:mm a');
  }
};
export default PrideTTEvent;