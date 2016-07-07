
import * as codes from '../keycodes';

export const keyNames = [
  'MediaPause',
  'MediaPlay',
  'MediaRewind',
  'MediaFastForward',
  'MediaPlayPause',
  'MediaStop'
];

export default {
  /*
    Navigation
   */
  '38': codes.KEY_UP,
  '40': codes.KEY_DOWN,
  '37': codes.KEY_LEFT,
  '39': codes.KEY_RIGHT,

  /*
    System
   */
  '13': codes.KEY_ENTER,
  '10009': codes.KEY_RETURN,
  '10182': codes.KEY_EXIT,
  '457': codes.KEY_MENU,

  '81': codes.KEY_RETURN,
  '27': codes.KEY_EXIT,

  /*
    Media
   */
  '415': codes.KEY_PLAY,
  '19': codes.KEY_PAUSE,
  '412': codes.KEY_REWIND,
  '413': codes.KEY_STOP,
  '417': codes.KEY_FORWARD,
  '10252': codes.KEY_PLAYPAUSE,

  '17': codes.KEY_PLAY,
  '16': codes.KEY_PAUSE,
  '80': codes.KEY_REWIND,
  '78': codes.KEY_FORWARD,

  /*
    Color button
   */
  '403': codes.KEY_RED,
  '404': codes.KEY_GREEN,
  '405': codes.KEY_YELLOW,
  '406': codes.KEY_BLUE,

  /*
    Virtual Keyboard
   */
  '65376': codes.KEY_KEYBOARD_DONE,
  '65385': codes.KEY_KEYBOARD_CANCEL,
  '46': codes.KEY_KEYBOARD_CLEAR,
};
