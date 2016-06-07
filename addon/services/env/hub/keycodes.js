
import * as codes from '../keycodes';

const tv = new Common.API.TVKeyValue();

const ce = {};

ce[
  tv.KEY_UP
] = codes.KEY_UP;

ce[
  tv.KEY_DOWN
] = codes.KEY_DOWN;

ce[
  tv.KEY_ENTER
] = codes.KEY_ENTER;

ce[
  tv.KEY_RETURN
] = codes.KEY_RETURN;

ce[
  tv.KEY_EXIT
] = codes.KEY_EXIT;

ce[
  tv.KEY_PLAY
] = codes.KEY_PLAY;

ce[
  tv.KEY_PAUSE
] = codes.KEY_PAUSE;

ce[
  tv.KEY_RW
] = codes.KEY_REWIND;

ce[
  tv.KEY_FF
] = codes.KEY_FORWARD;

export default ce;
