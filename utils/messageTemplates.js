module.exports = {
  'YES_NO': {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'button',
        'text': 'Hi, I am a Chuck Noriss Bot. Do you want to hear a joke?',
        'buttons': [
          {
            'title': 'Yes',
            'type': 'postback',
            'payload': 'YES'
          },
          {
            'title': 'No',
            'type': 'postback',
            'payload': 'NO'
          }
        ]
      }
    }
  },
  'PERSISTENT_MENU': {
    'persistent_menu': [
      {
        'locale': 'default',
        'composer_input_disabled': true,
        'call_to_actions': [
          {
            'title': 'Help',
            'type': 'postback',
            'payload': 'HELP'
          },
          {
            'title': 'Reset',
            'type': 'postback',
            'payload': 'RESET'
          },
          {
            'type': 'web_url',
            'title': 'Latest News',
            'url': 'http://foxnews.com',
            'webview_height_ratio': 'full'
          }
        ]
      },
      {
        'locale': 'zh_CN',
        'composer_input_disabled': false
      }
    ]
  },
  'GET_STARTED': {
    'get_started': {
      'payload': 'GET_STARTED_PAYLOAD'
    }
  }
}
