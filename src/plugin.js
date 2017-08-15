import EmojiFile from './emoji'

const plugin = (editor) => {
  var add_space = true
  if ("emoji_add_space" in editor.settings) {
    add_space = editor.settings.emoji_add_space
  }

  var show_groups = true
  if("emoji_show_groups" in editor.settings) {
    show_groups = editor.settings.emoji_show_groups
  }

  var show_subgroups = true
  if("emoji_show_subgroups" in editor.settings) {
    show_subgroups = editor.settings.emoji_show_subgroups
  }

  var show_tab_icons = true
  if("emoji_show_tab_icons" in editor.settings) {
    show_tab_icons = editor.settings.emoji_show_tab_icons
  }

  var getBody = new Promise((resolve, reject) => {
    try {
      let body = [];
      let groupHtml = show_groups ? '' : '<div>'
      for (let group of EmojiFile) {
        groupHtml = show_groups ? '<div>' : groupHtml
        let tabIcon = ''
        for (let subgroup of group.subGroups) {
            groupHtml += show_subgroups ? '<p style="clear:both"><strong>' + subgroup.name.split('-').join(' ').replace(/\b\w/g, l => l.toUpperCase()) + '</strong><br/>' : ''
          for (let emoji of subgroup.emojis) {
            if (tabIcon === '') { tabIcon = emoji.emoji }
            groupHtml += '<span style="float:left; padding: 4px; font-size: 1.5em; cursor: pointer;" data-chr="' + emoji.emoji + '">' + emoji.emoji + '</span>'
          }
          groupHtml += '</p>'
        }
        groupHtml += show_groups ? '</div>' : ''
        if(show_groups) {
          body.push({
            type: 'container',
            title: (show_tab_icons ? tabIcon + ' ' : '') + group.name,
            html: groupHtml,
            onclick: function (e) {
              var target = e.target;
              if (/^(SPAN)$/.test(target.nodeName)) {
                if (target.hasAttribute('data-chr')) {
                  let char = target.getAttribute('data-chr');
                  console.log(add_space)
                  editor.execCommand('mceInsertContent', false, char + (add_space ? ' ' : ''));
                }
              }
            }
          });
        }
      }
      if(!show_groups) {
        groupHtml += '</div>'
        body.push({
          type: 'container',
          html: groupHtml,
          onclick: function (e) {
            var target = e.target;
            if (/^(SPAN)$/.test(target.nodeName)) {
              if (target.hasAttribute('data-chr')) {
                let char = target.getAttribute('data-chr');
                console.log(add_space)
                editor.execCommand('mceInsertContent', false, char + (add_space ? ' ' : ''));
              }
            }
          }
        });
      }
      resolve(body)
    } catch (error) {
      reject(error)
    }

  })

  function getLoadingHtml() {
    return '<img src="' + LoaderGIF + '" alt="Loading" />'
  }

  function showDialog() {
    getBody.then(body => {
      var win = editor.windowManager.open({
        autoScroll: true,
        width: show_tab_icons ? 900 : 800,
        height: 600,
        title: 'Insert Emoji',
        bodyType: show_groups ? 'tabPanel' : 'container',
        layout: 'fit',
        body,
        buttons: [{
          text: 'Close',
          onclick: () => {
            win.close()
          }
        }]
      })
    }).catch(error => {
      console.log(error)
    })
  }

  editor.addCommand('emojiShowDialog', showDialog);

  editor.addButton('tinymceEmoji', {
    text: '😀 ',
    icon: false,
    cmd: 'emojiShowDialog'
  });

  editor.addMenuItem('tinymceEmoji', {
    text: 'Emoji',
    icon: 'emoticons',
    context: 'insert',
    cmd: 'emojiShowDialog'
  });
};

export default plugin;