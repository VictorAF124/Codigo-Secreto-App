# Código Secreto

Juego de adivinar un código numérico secreto, hecho con [Expo](https://expo.dev) / React Native.

Cada intento recibe pistas:

- `*` → un dígito está en la posición correcta.
- `-` → un dígito existe en el código pero en otra posición.

El tamaño del código es configurable entre 3 y 6 dígitos.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)
- Para probar en un celular: la app [Expo Go](https://expo.dev/go) (Android/iOS)

## Instalación

```bash
npm install
```

## Ejecutar la app

```bash
npm start
```

Esto abre el Metro Bundler con un código QR: escanéalo con Expo Go para correr la app en tu celular, o usa las opciones de la terminal para abrir un emulador.

También hay atajos por plataforma:

```bash
npm run web       # abre la app en el navegador
npm run android   # abre en un emulador/dispositivo Android
npm run ios       # abre en un simulador/dispositivo iOS (requiere macOS)
```

## Estructura del proyecto

```
miApp/
├── App.js                          # punto de entrada de la app
├── index.js                        # registro del componente raíz (Expo)
├── components/
│   ├── CodigoSecreto.js            # lógica y UI del juego
│   └── CodigoSecreto.styles.js     # estilos del componente
└── assets/                         # íconos y splash screen
```
