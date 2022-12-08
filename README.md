# Echo.images

## How to use it

Simply call https://echo.kotorie.com/api/v1/images to generate dummy image.

### Query parameters
All parameters are optional.

| param            | default    | note                                             |
|------------------|------------|--------------------------------------------------|
| format           | jpeg       | png/jpeg                                         |
| width            | 512        | 1 ~ 2048                                         |
| height           | 512        | 1 ~ 2048                                         |
| background_color | #007aff    | RGB(hex)                                         |
| border_color     | #bbbbbb    | RGB(hex)                                         |
| text_color       | (Contrast) | RGB(hex)                                         |
| label            | n/a        | convert under score to space                     |
| theme            | legacy     | T.B.D. WANT to be able to select themes of image |

### Example

Just try to paste it to the browser 👍

```
https://echo.kotorie.com/api/v1/images?width=512&height=256&background_color=000&border_color=f00&text_color=ff0&label=Hello_World&format=png
```

## Contributing
Pull requests are welcome 🚀

## License
[MIT License](https://github.com/tom-e-kid/echo-images/blob/main/LICENSE)

## See also
[Echo.api](https://github.com/tom-e-kid/echo-api)