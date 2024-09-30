interface LessonType {
  _id: string;
  name: string;
  duration: string; // duration in seconds
  content: Array<{ [key: string]: string }>; // text, url
}
export { LessonType };
