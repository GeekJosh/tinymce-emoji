# tinymce-emoji
[![Latest Stable Version](https://img.shields.io/npm/v/tinymce-emoji.svg?style=flat)](https://www.npmjs.com/package/tinymce-emoji)
[![NPM Downloads](https://img.shields.io/npm/dt/tinymce-emoji.svg?style=flat)](https://www.npmjs.com/package/tinymce-emoji)

This simple tinymce plugin adds a helper dialog to insert native emojis in to your content.

All emoji were stripped from [this test doc](http://unicode.org/Public/emoji/5.0/emoji-test.txt) made available by [The Unicode Consortium](http://unicode.org/)

[**Example on JSFiddle**](https://jsfiddle.net/wpd2umt0/1/)

## Usage
Install via npm:
```
npm install --save tinymce-emoji
```

Add to your tinymce init:
```JavaScript
import 'tinymce-emoji'
import 'tinymce'    // always import tinymce after any plugins

tinymce.init({
    plugins: [
        'tinymceEmoji'
    ],
    toolbar: 'tinymceEmoji'
})
```

Alternatively, you can install this plugin via `script` tags:
```HTML
<script src="path/to/tinymce-emoji/dist/plugin.min.js"></script>
<script src="https://cloud.tinymce.com/stable/tinymce.min.js"></script>
<script>
    tinymce.init({
        plugins: [
            'tinymceEmoji'
        ],
        toolbar: 'tinymceEmoji'
    })
</script>
```

You can also configure a few options for tinymce-emoji by adding them to your tinymce init, like so:
```JavaScript
tinymce.init({
    plugins: [
        'tinymceEmoji'
    ],
    toolbar: 'tinymceEmoji',
    emoji_add_space: false, // emoji are quite wide, so a space is added automatically after each by default; this disables that extra space
    emoji_show_groups: false,   // hides the tabs and dsiplays all emojis on one page
    emoji_show_subgroups: false,    // hides the subheadings
    emoji_show_tab_icons: false, // hides the icon on each tab label
    ...
})
```
*NOTE: by default, all options above are set to `true`*

### A note about speed
Unfortunately, the first time you load the emoji dialog during each editor session, it takes a few seconds to display, during which time the browser window is frozen. I have been unable to resolve this issue and the [world's worst docs](https://www.tinymce.com/docs/api/tinymce.ui) didn't help. If you're a developer who knows how to resolve this, please do make a PR!
