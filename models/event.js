import moment from 'moment';
class PrideTTEvent{
    constructor(id, title, content,imgUrl,start_time,end_time,new_date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imgUrl = {uri:'http://186.96.211.174:8000' + imgUrl};
        this.start_time = new Date(start_time);
        this.end_time = new Date(end_time);
        this.new_date=new_date;
      };
      get readableStart(){
        return moment(this.start_time).format('ddd Do, h:mm a');
      };
      get readableEnd(){
        return moment(this.end_time).format('hh:mm a');
      };
      get readableDate(){
        return moment(this.start_time).format('MMMM Do YYYY');
      }
};
export default PrideTTEvent;