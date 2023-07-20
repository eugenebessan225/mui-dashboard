## The Dashboard Front End

## Table Of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [TODO](#todo)

## About The Project

Front End Dashboard App

## Built With

ReactJS, MUI Styled Components, Vite, SocketIO, react-form-hook

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm

### Installation

1. Clone the repo

```sh
git clone https://github.com/td2thinh/mui-dashboard.git
```

2. Install dependencies

```sh
npm install
```


## Usage

Run app

```sh
npm run dev
```


3. Socket Usage

This front end app is a SocketIO client, the client is initialized in `socket.ts`

```ts
export const socket: Socket = io("IP:PORT");
```

to use the socket client to communicate with the socket server import it to the components and/or pass it with

```ts
import { socket } from "../socket";

<DataForm socket={socket} />;
```

Receiving event from the server

```ts
socket.on("data", (data) => {
  const timeStamp = data.x - timeBeginInMS;
  series.add({ x: timeStamp, y: data.y });
});
```

Sending event from the client to the server

```ts
<Button
  onClick={() => {
    // Sending event to the server
    dataRequest
      ? socket.emit("data_request_stop")
      : socket.emit("data_request");
    setDataRequest(!dataRequest);
  }}
>
  {dataRequest ? "Stop Data Request" : "Start Data Request"}
</Button>
```

App available at http://localhost:PORT

## TODO

Dockerize + Implement real API Call and real data
