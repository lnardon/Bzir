FROM node:latest as build-frontend
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM golang:latest as build-backend
WORKDIR /usr/src/app
COPY . .
COPY --from=build-frontend /usr/src/app/dist /usr/src/app/dist
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]