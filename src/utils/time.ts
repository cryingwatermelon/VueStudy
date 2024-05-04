export const getTime = () => {
    let message = '';
    const hours = new Date().getHours();
    if (hours <= 6) {
      message = "为什么还在熬夜？";
    } else if (hours <= 9) {
      message = "早上好";
    } else if (hours <= 12) {
      message = "吃午饭了，还忙个锤子";
    } else if (hours <= 14) {
      message = "中午好";
    } else if (hours <= 17) {
      message = "下午好";
    } else if (hours <= 19) {
      message = "傍晚好";
    } else {
      message = "晚上好";
    }
    return message;
  }