To test your changes easily while working on this module you can use
`yalc`: https://github.com/whitecolor/yalc

```bash
$ cd ./redux-modal-tabs
$ yalc publish
$ cd ../my-app
$ yalc add --link redux-modal-tabs
$ cd ../redux-modal-tabs
# Now make some changes to the code
$ npm run build && yalc publish --push
```