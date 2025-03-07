# NestJS Live Stream Server

A live streaming server built with NestJS and node-media-server that allows you to stream from OBS Studio.

## Features

- RTMP server for receiving streams from OBS
- HLS output for web playback
- Simple web interface for viewing streams
- API endpoint to check active streams

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm run start:dev
   ```

3. The server will be running at:
   - NestJS API: http://localhost:3000
   - RTMP Server: rtmp://localhost:1935/live
   - HLS Endpoint: http://localhost:8000/live

## Streaming with OBS

1. Open OBS Studio
2. Go to Settings > Stream
3. Select "Custom..." as the service
4. Set Server to: `rtmp://localhost:1935/live`
5. Set Stream Key to: `stream` (or any name you prefer)
6. Click "Apply" and then "OK"
7. Click "Start Streaming" in the main OBS window

## Viewing the Stream

Open a web browser and navigate to http://localhost:3000 to view the stream through the web interface.

## API Endpoints

- `GET /streams` - Get a list of active streams

## Notes

- This server is configured for local development. For production use, you would need to modify the configuration and add proper authentication.
- FFmpeg is required for HLS transcoding. The current configuration assumes FFmpeg is installed at `/usr/bin/ffmpeg`.
