import ReactDom from 'react-dom';

const PopupDom = ({ children }) => {
  // const el = document.getElementById('popupDom');
  const el = document.getElementById('testid2');
  return ReactDom.createPortal(children, el);
};

export default PopupDom;