"Take a Look" section = two auto-scrolling rows:
  • Videos (top, scrolls one way)
  • Photos (bottom, scrolls the opposite way)
Both pause on hover; clicking any tile opens it enlarged WITH a short
description. Edit the VIDEOS and PHOTOS arrays in js/data.js to:
  - set each `src` to your file (assets/videos/x.mp4 or assets/photos/x.jpg)
    or an image URL; leave src:null to keep a labeled placeholder tile.
  - edit `ar` / `en` for each item's short description.

Dish photos (menu slider): temporary placeholders keyed by dish name;
see MENU-PHOTO-KEYS.txt. Replace via assets/menu/<key>.jpg or send a
photo and say "this is <key>".

Printed menu: two real menu images embedded in index.html (tap to view).

Storefront / interior photos also go in this assets/ folder.
