import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';

//@ts-ignore
import volleyball from 'volleyball';

import { websocketController } from './controllers/websocket.controller';

import { connectDatabase } from './utils';

import { config } from './utils';

import { NotFoundException } from './exceptions';

import { IHttpException } from './types/interfaces';

import { NameRoutes, ChatRoutes, UserRoutes } from './routes';
import { ChatRepository, UserRepository } from './repositories';

const app = express();

app.use(cors());
app.use(volleyball);
app.use(helmet());
app.use(express.json());

app.use('/name', NameRoutes);
app.use('/chat', ChatRoutes);
app.use('/user', UserRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundException();
});

app.use((error: IHttpException, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.json({
    message: error.message || 'Internal Server Error',
    statusCode: error.statusCode || 500,
  });
});

const port = config.PORT || 2022;

const server = app.listen(port, async () => {
  await connectDatabase();
  // await UserRepository.cleanUsersFromDB();
  // await ChatRepository.cleanChatMessages();

  websocketController(server);

  console.log(`Server started @ http://${config.HOST}:${port}`);
});
