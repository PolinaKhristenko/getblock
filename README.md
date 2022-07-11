# Getblock cryptocurrency converter using Vue.js

Link: [polinatimofeeva.github.io/getblock/](https://polinatimofeeva.github.io/getblock/)

## Main screen:

<img width="957" alt="Screenshot 2022-07-07 at 21 02 58" src="https://user-images.githubusercontent.com/88159970/177839835-cf6461ba-4da9-4cb1-b5f8-2ea174a64844.png">

## Search:

<img width="978" alt="Screenshot 2022-07-07 at 21 04 08" src="https://user-images.githubusercontent.com/88159970/177839998-86f869c4-5d1a-4576-9580-62b98abccc26.png">

## Minimal exchange value (left input) and estimated value (right input):

<img width="997" alt="Screenshot 2022-07-07 at 21 05 21" src="https://user-images.githubusercontent.com/88159970/177840168-8d437efd-fd98-4d2c-b5d2-866894ddd140.png">

## Error example:

<img width="907" alt="Screenshot 2022-07-07 at 21 06 50" src="https://user-images.githubusercontent.com/88159970/177840371-638480de-15b7-4c0a-9892-8624926ab45f.png">


Main requirements:

- Make possible choosingleft and right currencies;
- When choosing, put minimal possible exchange amount into the left input;
- When typing in the left input, put estimated value into the right one;
- If the amount is less then minimal put a dash into the right input and make an error appear;
- If estimated or minimal for chosen currencies return null, make 'this pair is disabled now' error appear;
- Implement search;
- Mockup: https://www.figma.com/file/fzcnpN2Pm9YY8CIpWbP3NE/Frontend-Test?node-id=0%3A1;
- Use Tailwind when styling.





## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

